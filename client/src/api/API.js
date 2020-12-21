import client from "./axiosConfig";

/**
 * Get all data in restaurants
 * Optionally filter by only showing certain fields
 */
export async function getRestaurants() {
  let { data } = await client.get("/restaurants");
  console.log(data);
  return { ...data };
}

export default { getRestaurants };
