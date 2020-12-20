const mongoose = require("mongoose");
const { defaultLocation } = require("../api/distance");

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  default: defaultLocation,
});

module.exports = locationSchema;
