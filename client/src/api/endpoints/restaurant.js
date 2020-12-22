import client from "../axiosConfig";

/**
 * Get the initial data for restaurants
 * @param {Integer} limit number of restaurants to fetch
 * @returns {Array} restaurants
 * @returns {Integer} count of all restaurants
 */
export async function getInitialRestaurants(limit) {
  let { data } = await client.get("/restaurants", {
    params: { limit, count: true },
  });
  return data;
}

/**
 * Get more data for restaurants using a skip
 * @param {Integer} limit number of restaurants to fetch
 * @param {Integer} skip page number
 * @returns {Array} restaurants
 */
export async function getMoreRestaurants(limit, skip) {
  let { data } = await client.get("/restaurants", {
    params: { limit, skip },
  });
  return data;
}

/**
 * Create a new restaurant using a Google search
 * @param {String} name of restaurant
 * @returns {Restaurant} created restaurant
 */
export async function createRestaurant(name) {
  let { data } = await client.post("/restaurants", { name });
  console.log(data);
  return data;
}
