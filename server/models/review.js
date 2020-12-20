const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId },
    rating: { type: Number, required },
  },
  { timestamps: true }
);

const Review = mongoose.model("turn", reviewSchema);

module.exports = Review;
