import client from "./axiosConfig";

/**
 * Get all data in restaurants
 * Optionally filter by only showing certain fields
 */
export async function getRestaurants(limit, skip) {
  let { data } = await client.get("/restaurants", {
    params: { limit, skip },
  });
  return data;
}

export default { getRestaurants };
