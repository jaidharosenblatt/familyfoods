import client from "./axiosConfig";

/**
 * Get all data in restaurants
 * Optionally filter by only showing certain fields
 */
export async function getInitialRestaurants(limit) {
  let { data } = await client.get("/restaurants", {
    params: { limit, count: true },
  });
  return data;
}

/**
 * Get all data in restaurants
 * Optionally filter by only showing certain fields
 */
export async function getMoreRestaurants(limit, skip) {
  let { data } = await client.get("/restaurants", {
    params: { limit, skip },
  });
  return data;
}

export default {
  getInitialRestaurants,
  getMoreRestaurants,
};
