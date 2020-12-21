const Review = require("../models/review");
const Group = require("../models/group");

const getWeights = async (groupId, restaurants) => {
  const group = await Group.findById(groupId).populate(
    "members",
    "-tokens -password -groups"
  );

  if (!group) {
    throw new Error("No group found");
  }

  const members = group.members.toObject();
  const withRatings = await Promise.all(
    restaurants.map(async (restaurant) => {
      const ratings = await getRestaurantRatings(group, members, restaurant);
      console.log(ratings);
      return { restaurant, ratings };
    })
  );
  return withRatings;
};

/**
 * Create an array for a given restaurant that holds the all of the users
 * in the current group's ratings
 * @param {Restaurant} restaurant
 * @param {Group} group
 * @param {Array} members
 * @returns {Array} [{ name: String, rating: Integer }]
 */
const getRestaurantRatings = async (group, members, restaurant) => {
  const userReviewMap = await Promise.all(
    members.map(async (member) => {
      const review = await Review.findOne({
        groups: group,
        restaurant: restaurant._id,
        owner: member._id,
      });
      const name = member.username;
      const rating = review ? review.rating : member.averageReview;

      return { name, rating };
    })
  );
  return userReviewMap;
};

/**
 * Get the weighted average - each item is weighted exponentially less
 * the previous using a constant from environment variables
 * @param {Array} arr
 * @returns {Float} weighted average of this arr
 */
const getWeightedAverage = (arr) => {
  let weight = 1;
  let sum = 0;
  let weighted_sum = 0;
  const weightConstant = parseFloat(process.env.WEIGHT_CONST);
  for (let i = arr.length - 1; i >= 0; i--) {
    weight *= weightConstant;
    sum += weight;
    weighted_sum += arr[i] * weight;
  }
  return weighted_sum / sum;
};

/**
 * Shift the inputted array based off the number of turns taken
 * @param {Array} arr to shift
 * @param {Integer} turn number of iterations this arr has been through
 * @returns {Array} shifted array
 */
const shiftArray = (arr, turn) => {
  const n = arr.length;
  if (!arr || n === 0) {
    return [];
  }
  const shift = turn % n;
  const shifted = new Array(n);
  for (let i = 0; i < n; i++) {
    shifted[(i + shift) % n] = arr[i];
  }
  return shifted;
};

module.exports = { getWeights };
