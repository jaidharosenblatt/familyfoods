const express = require("express");
const searchPlace = require("../api/places");
const { authNoError } = require("../middleware/auth");
const { addDistanceToRestaurant } = require("../api/distance");
const { getGroupRatings } = require("../util/weighting-algorithms");
const Restaurant = require("../models/restaurant");
const Group = require("../models/group");

const router = new express.Router();

/**
 * POST a new restaurant by searching the Google Place API,
 * getting the first restaurant from the results, and using it
 * to create our own Restaurant in database
 * @param {String} name the search to make in Google API
 */
router.post("/restaurants", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      error: "Please specify the name of the restaurant you want to add",
    });
  }

  try {
    const { candidates } = await searchPlace(req.body.name);

    // move location to top level of each restaurant
    const { location } = candidates[0].geometry;
    delete candidates[0].geometry;
    const withLocation = { ...candidates[0], location };

    const restaurant = new Restaurant(withLocation);

    await restaurant.save();
    res.send(restaurant);
  } catch (error) {
    // Mongo Key error (triggered by unique place_id)
    if (error.code === 11000) {
      return res.status(409).send({
        error: "This restaurant already exists",
      });
    }
  }
});

/**
 * GET all restaurants from the database.
 * Uses pagination to limit number of restaurants returned
 * @param {String} sortBy the sort type in format param:asc or param:desc
 * @param {Integer} limit the number of restaurants to load in each request
 * @param {Integer} skip page offset
 * @param {Location} location starting location for distance calc (in JSON)
 * @param {ObjectId} group the group to find reviews for
 */
router.get("/restaurants", authNoError, async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit) || 5;

  const sort = {};
  if (req.query.sortBy) {
    const allowedSorts = ["name", "rating", "createdAt", "updatedAt"];
    const [param, order] = req.query.sortBy.split(":");
    if (!allowedSorts.includes(param)) {
      return res.status(400).send("Invalid sort param");
    }
    sort[param] = order === "desc" ? -1 : 1;
  }

  try {
    let restaurants = await Restaurant.find()
      .sort(sort)
      .limit(limit)
      .skip(skip * limit);

    // Update user's location if it exists
    if (req.query.location && req.user) {
      req.user.location = JSON.parse(req.query.location);
      await req.user.save();
    }
    const startingLocation = req.user ? req.user.location : req.query.location;

    // Add distance and ratings properties to each restaurants
    restaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const distance = await addDistanceToRestaurant(
          startingLocation,
          restaurant.location
        );

        // If group in query then get weighted ratings
        let ratings = {};
        if (req.query.group) {
          const group = await Group.findById(req.query.group).populate(
            "members",
            "-tokens -password -groups"
          );

          if (!group) {
            throw new Error({ code: 404, message: "No group found" });
          }
          ratings = await getGroupRatings(group, restaurant);
        }
        return { ...restaurant._doc, ...distance, ...ratings };
      })
    );
    res.send(restaurants);
  } catch (error) {
    if (error.status === 404) {
      return res.send(error);
    }
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
