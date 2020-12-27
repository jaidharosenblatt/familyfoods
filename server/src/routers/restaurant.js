const express = require("express");
const searchPlace = require("../api/places");
const { authNoError } = require("../middleware/auth");
const { addDistanceToRestaurant } = require("../api/distance");
const { getGroupRatings } = require("../util/weighting-algorithms");
const Restaurant = require("../models/restaurant");
const Group = require("../models/group");
const { ServerError, catchServerError } = require("../util/errors");
const Review = require("../models/review");
const { fieldsAreValid } = require("../util/validation");

const router = new express.Router();

/**
 * POST a new restaurant by searching the Google Place API,
 * getting the first restaurant from the results, and using it
 * to create our own Restaurant in database
 * @param {String} name the search to make in Google API
 * @returns {Restaurant} the created restaurant
 */
router.post("/restaurants", authNoError, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      error: "Please specify the name of the restaurant you want to add",
    });
  }

  try {
    const { candidates } = await searchPlace(req.body.name);
    if (!candidates || candidates.length === 0) {
      return res.status(404).send({ error: "No restaurant found" });
    }

    // move location to top level of each restaurant
    const { location } = candidates[0].geometry;
    delete candidates[0].geometry;
    const withLocation = { ...candidates[0], location };

    const restaurant = new Restaurant(withLocation);

    const distance = await addDistanceToRestaurant(
      req.user?.location,
      restaurant.location
    );

    await restaurant.save();
    res.send({ ...restaurant._doc, ...distance });
  } catch (error) {
    // Mongo Key error (triggered by unique place_id)
    if (error.code === 11000) {
      return res.status(409).send({
        error: "This restaurant already exists",
      });
    }
    console.log(error);
    res.status(500).send({ error: "Error loading restaurant" });
  }
});

/**
 * Update a restaurant by its id
 * @param {ObjectId} id in req.params
 * @param {Object} body updates to make
 * @returns {Restaurant} updated
 */
router.patch("/restaurants/:id", async (req, res) => {
  const allowedUpdates = [
    "hasBreakfast",
    "hasDinner",
    "hasTakeout",
    "hasOutdoorSeating",
  ];
  if (!fieldsAreValid(allowedUpdates, req.body)) {
    return res.status(400).send({ error: "Invalid update params" });
  }
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      res.status(404).send({ error: "Unable to find this user" });
    }
    const updates = Object.keys(req.body);
    updates.forEach((update) => (restaurant[update] = req.body[update]));
    await restaurant.save();
    res.send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Unable make updates" });
  }
});

/**
 * GET all restaurants from the database.
 * Uses pagination to limit number of restaurants returned
 * @param {String} sortBy the sort type in format param:asc or param:desc
 * @param {Integer} limit the number of restaurants to load in each request
 * @param {Integer} skip page offset
 * @param {String} filterBy the filters comma separated ex "filter1,filter2"
 * @param {Location} location starting location for distance calc (in JSON)
 * @param {ObjectId} group the group to find reviews for
 * @param {Boolean} count include the total number of restaurants
 * @returns {Array} of restaurants
 */
router.get("/restaurants", authNoError, async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit) || 5;
  const sort = getSort(req.query.sortBy);
  const filters = getFilter(req.query.filterBy);

  try {
    let restaurants = await Restaurant.find();
    // Update each restaurant to add distance and ratings properties
    // @TODO figure out how to avoid slow query then update
    await Promise.all(
      restaurants.map(async (restaurant) => {
        const { distance, duration } = await addDistanceToRestaurant(
          req.user?.location,
          restaurant.location
        );
        restaurant.distance = distance;
        restaurant.duration = duration;

        // check if user has rated the restaurant otherwise set to 0
        restaurant.myRating = null;

        if (req.user) {
          const myReview = await Review.findOne({
            restaurant: restaurant._id,
            owner: req.user._id,
          });
          restaurant.myRating = myReview && myReview.rating;
        }

        // If group in query then get weighted ratings
        if (req.query.group) {
          const group = await Group.findById(req.query.group).populate(
            "members"
          );

          if (!group) {
            throw new ServerError("No group found", 404);
          }
          const { groupRatings, weightedRating } = await getGroupRatings(
            group,
            restaurant
          );
          restaurant.groupRatings = groupRatings;
          restaurant.weightedRating = weightedRating;
        }

        restaurant.save();
      })
    );

    restaurants = await Restaurant.find(filters)
      .sort(sort)
      .limit(limit)
      .skip(skip * limit);

    if (req.query.count) {
      const count = await Restaurant.estimatedDocumentCount();
      return res.send({ count, restaurants });
    }
    res.send(restaurants);
  } catch (error) {
    catchServerError(error, res);
  }
});

/**
 * Get the mongoose sort parameter
 * @param {String} sortBy from query string
 */
const getSort = (sortBy) => {
  const sort = {};
  if (sortBy) {
    const allowedSorts = [
      "name",
      "rating",
      "createdAt",
      "distance",
      "duration",
      "weightedRating",
      "myRating",
    ];
    const [param, order] = sortBy.split(":");
    if (!allowedSorts.includes(param)) {
      throw new ServerError("Invalid sort param");
    }
    sort[param] = order === "desc" ? -1 : 1;
  }
  return sort;
};

const getFilter = (filterBy) => {
  let filters = {};
  if (filterBy) {
    const keys = filterBy.split(",");
    const allowedFilters = {
      rating: { myRating: { $gt: 0 } },
      noRating: { myRating: null },
      breakfast: { hasBreakfast: true },
      dinner: { hasDinner: true },
      takeout: { hasTakeout: true },
      outdoorSeating: { hasOutdoorSeating: true },
    };
    keys.forEach((key) => {
      if (!(key in allowedFilters)) {
        throw new ServerError("Invalid key param", key);
      }
      const filter = allowedFilters[key];
      filters = { ...filters, ...filter };
    });
  }
  return filters;
};

module.exports = router;
