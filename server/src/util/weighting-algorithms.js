const Review = require("../models/review");
const Group = require("../models/group");

/**
 * Get the weighted rating information for a restaurant and a group
 * @param {Group} group from req.query
 * @param {Restaurant} restaurant
 * For each restaurant return the following
 * @returns {Restaurant} initial properties
 * @returns {Array} array of ratings for this group shifted according to the current turn
 * @returns {Float} its weighted rating
 */
const getGroupRatings = async (group, restaurant) => {
  const ratings = await getRestaurantRatings(group, group.members, restaurant);
  const groupRatings = shiftRatings(ratings, group.turns);
  const weightedRating = getWeightedAverage(groupRatings);

  return { groupRatings, weightedRating };
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
 * @param {Array} ratings
 * @returns {Float} weighted average of this ratings array
 */
const getWeightedAverage = (ratings) => {
  let weight = 1;
  let sum = 0;
  let weighted_sum = 0;
  const weightConstant = parseFloat(process.env.WEIGHT_CONST);
  for (let i = ratings.length - 1; i >= 0; i--) {
    weight *= weightConstant;
    sum += weight;
    weighted_sum += ratings[i].rating * weight;
  }
  return weighted_sum / sum;
};

/**
 * Shift the inputted array based off the number of turns taken
 * @param {Array} array to shift
 * @param {Integer} turns number of iterations
 * @returns {Array} shifted array
 */
const shiftRatings = (array, turns) => {
  const n = array.length;
  if (!array || n === 0) {
    return [];
  }
  const shift = turns % n;
  const shifted = new Array(n);
  for (let i = 0; i < n; i++) {
    shifted[(i + shift) % n] = array[i];
  }
  return shifted;
};

module.exports = { getGroupRatings, shiftRatings };
