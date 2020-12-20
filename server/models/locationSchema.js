const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

module.exports = locationSchema;
