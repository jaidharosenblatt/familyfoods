const express = require("express");
const searchPlace = require("../api/places");
const { authNoError } = require("../middleware/auth");
const { findDistance } = require("../api/distance");
const { getWeights } = require("../util/weighting-algorithms");
const Restaurant = require("../models/restaurant");

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
    const restaurants = await Restaurant.find()
      .sort(sort)
      .limit(limit)
      .skip(skip * limit);

    if (req.query.group && restaurants.length !== 0) {
      getWeights(req.query.group, restaurants);
    }

    // Update user's location if it exists
    if (req.query.location && req.user) {
      req.user.location = JSON.parse(req.query.location);
      await req.user.save();
    }
    const startingLocation = req.user ? req.user.location : req.query.location;
    const restaurantWithDistance = await Promise.all(
      restaurants.map(async (restaurant) =>
        addDistanceToRestaurant(startingLocation, restaurant)
      )
    );
    res.send(restaurantWithDistance);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/**
 * @returns a restaurant with distance and duration from Google Maps API
 * @param {Location} startingLocation the coordinate to begin with
 * @param {Restaurant} restaurant to add distance and duration field
 */
const addDistanceToRestaurant = async (startingLocation, restaurant) => {
  const res = await findDistance(startingLocation, restaurant.location);
  const path = res.rows[0].elements[0];
  const distance = path.distance.text;
  const duration = path.duration.text;

  return { ...restaurant._doc, distance, duration };
};

module.exports = router;
