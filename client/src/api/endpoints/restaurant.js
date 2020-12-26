import client from "../axiosConfig";

/**
 * Get the initial data for restaurants
 * @param {Object} params including count, sort, filter, and group
 * @returns {Array} restaurants
 * @returns {Integer} count of all restaurants
 */
export async function getRestaurants(params) {
  let { data } = await client.get("/restaurants", { params });
  return data;
}

/**
 * Create a new restaurant using a Google search
 * @param {String} name of restaurant
 * @returns {Restaurant} created restaurant
 */
export async function createRestaurant(name) {
  let { data } = await client.post("/restaurants", { name });
  return data;
}

/**
 * Create a new restaurant using a Google search
 * @param {ObjectId} id of restaurant
 * @param {Object} changes
 * @returns {Restaurant} created restaurant
 */
export async function editRestaurant(id, changes) {
  let { data } = await client.patch(`/restaurants/${id}`, changes);
  return data;
}
