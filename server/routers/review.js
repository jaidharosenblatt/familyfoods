const express = require("express");

const Review = require("../models/review");
const { auth } = require("../middleware/auth");
const { fieldsAreValid } = require("../util/validation");

const router = new express.Router();

/**
 * POST a new review of a restaurant
 * @param {String} restaurant id of restaurant
 * @param {Integer} rating 0-5 rating
 * @returns {Review} created review
 */
router.post("/reviews", auth, async (req, res) => {
  if (!fieldsAreValid(["rating", "restaurant"], req.body)) {
    return res.status(400).send({ error: "Invalid reviews body" });
  }

  try {
    req.body.owner = req.user._id;

    // Delete the previous rating of this restaurant
    const toDelete = await Review.findOneAndDelete({
      owner: req.user._id,
      restaurant: req.body.restaurant,
    });

    if (toDelete) {
      req.user.reviews = req.user.reviews.filter(
        (rating) => rating._id.toString() !== toDelete._id.toString()
      );
      req.user.ratingsSum -= toDelete.rating;
    }

    const review = new Review(req.body);
    if (!review) {
      throw new Error();
    }
    await review.save();

    // Add rating and ratingSum to authenticated user
    req.user.ratingsSum += req.body.rating;
    req.user.reviews = req.user.reviews.concat(review._id);
    await req.user.save();

    res.send(review);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
