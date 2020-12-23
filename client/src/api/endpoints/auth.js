import client from "../axiosConfig";

/**
 * Login an existing user
 * @param {Object} user containing username and password
 * @returns {Cookie} http cookie set in browser with auth
 * @returns {User} signed in user
 */
export async function login(user) {
  let { data } = await client.post("/users/login", { ...user });
  return data;
}

/**
 * Signup a new user
 * @param {Object} user containing username and password
 * @returns {Cookie} http cookie set in browser with auth
 * @returns {User} signed in user
 */
export async function signup(user) {
  let { data } = await client.post("/users", { ...user });
  return data;
}

/**
 * Signup a new user
 * @param {Object} edits containing changes made
 * @returns {Cookie} http cookie set in browser with auth
 * @returns {User} signed in user
 */
export async function editProfile(edits) {
  let { data } = await client.patch("/users/me", { ...edits });
  return data;
}

/**
 * Signup a new user
 * @returns {User} signed in user
 */
export async function logout() {
  let { data } = await client.post("/users/logout");
  return data;
}

/**
 * Load user from cookie
 * @returns {User} signed in user
 */
export async function loadUser(user) {
  let { data } = await client.get("/users/me", { ...user });
  return data;
}
