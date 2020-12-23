import client from "../axiosConfig";

/**
 * Get all groups
 * @param {Boolean} newOnly only show groups not already in
 * @returns {Array} of group objects
 */
export async function getGroups(newOnly = false) {
  let { data } = await client.get("/groups", { params: { newOnly } });
  return data;
}

/**
 * Create a new group
 * @param {String} name from client form
 * @param {String} password optional
 * @returns {Group} new group from db
 */
export async function createGroup(name, password) {
  let { data } = await client.post("/groups", { name, password });
  return data;
}

/**
 * Join a group
 * @param {ObjectId} id of a group
 * @param {String} password if group is private
 * @returns {Group} the group from db
 */
export async function joinGroup(id, password) {
  let { data } = await client.post("/groups/join", { id, password });
  return data;
}
