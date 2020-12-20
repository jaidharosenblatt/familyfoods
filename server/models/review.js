const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
