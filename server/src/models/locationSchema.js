const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

// Remove the _id field when translating to JSON
locationSchema.methods.toJSON = function () {
  const location = this;
  const locationObject = location.toObject();

  delete locationObject._id;

  return locationObject;
};

module.exports = locationSchema;
