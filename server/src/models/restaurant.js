const mongoose = require("mongoose");
const locationSchema = require("./locationSchema");

const restaurantSchema = new mongoose.Schema(
  {
    location: {
      type: locationSchema,
      required: true,
    },
    name: { type: String, required: true, trim: true },
    place_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    distance: {
      type: String,
    },

    duration: {
      type: String,
    },

    price_level: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    groupRatings: {
      type: [{ name: { type: String }, rating: { type: Number } }],
    },

    weightedRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
