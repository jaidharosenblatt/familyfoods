import client from "../axiosConfig";

/**
 * Create a new review
 * @param {ObjectId} restaurant id of restaurant
 * @param {Number} rating 0 -5
 * @returns {Review} new review from db
 */
export async function createReview(restaurant, rating) {
  let { data } = await client.post("/reviews", { restaurant, rating });
  return data;
}
