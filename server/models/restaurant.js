const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({});

const Restaurant = mongoose.model("turn", restaurantSchema);

module.exports = Restaurant;
