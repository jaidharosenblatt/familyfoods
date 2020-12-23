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
 * @param {Object} values new group from form
 * @returns {Group} new group from db
 */
export async function createGroup(values) {
  let { data } = await client.post("/groups", values);
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

/**
 * Leave/delete a group depending on whether user is last in group
 * @param {ObjectId} id of a group
 * @returns {Group} the group from db
 */
export async function deleteGroup(id) {
  let { data } = await client.delete(`/groups/${id}`);
  return data;
}

/**
 * Edit a group
 * @param {ObjectId} id of a group
 * @param {Object} values new group from form
 * @returns {Group} the group from db
 */
export async function editGroup(id, values) {
  let { data } = await client.patch(`/groups/${id}`, values);
  return data;
}
