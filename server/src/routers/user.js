const express = require("express");

const User = require("../models/user");
const Group = require("../models/group");

const { auth } = require("../middleware/auth");
const { fieldsAreValid } = require("../util/validation");
const getAvatar = require("../api/avatar");

const router = new express.Router();

/**
 * Create a new account and set a HTTP only JWT token in client cookies
 * @param {String} username unique name for account
 * @param {String} password
 * @param {Location} location user's current lat and long
 * @returns {User} user object
 */
router.post("/users", async (req, res) => {
  const avatar = await getAvatar(req.body.username);
  const user = new User({ ...req.body, avatar });

  try {
    await user.save();
    await user.setJWTCookie(req, res);
    const userWithGroups = await getUserWithGroups(user);
    res.status(201).send(userWithGroups);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }
    res.status(500).send({ error: "Unable to create user" });
  }
});

/**
 * Login a user and set a HTTP only JWT token in client cookies
 * @param {String} username unique name for account
 * @param {String} password
 * @returns {JWT} generated JWT token
 * @returns {User} user object
 */
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    await user.setJWTCookie(req, res);
    const userWithGroups = await getUserWithGroups(user);

    res.send(userWithGroups);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Unable to login" });
  }
});

/**
 * Get profile of logged in user
 * @returns {User} user object
 */
router.get("/users/me", auth, async (req, res) => {
  try {
    const userWithGroups = await getUserWithGroups(req.user);

    res.send(userWithGroups);
  } catch (error) {
    res.status(500).send({ error: "Unable to load user" });
  }
});

/**
 * Logout the current user (just one token)
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token.toString() !== req.token.toString()
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * PATCH update profile
 * Only allows the following updates
 * @param {String} username unique name for account
 * @param {String} password
 * @param {Location} location user's current lat and long
 * @returns {User} after changes
 */
router.patch("/users/me", auth, async (req, res) => {
  if (!fieldsAreValid(["username", "location", "password"], req.body)) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const updates = Object.keys(req.body);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    const userWithGroups = await getUserWithGroups(req.user);
    res.send(userWithGroups);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }
    return res.sendStatus(400).send({ error: "Unable to update profile" });
  }
});

/**
 * DELETE the authenticated user's account
 * @returns {User} deleted profile
 */
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ error: "Server unable to delete user" });
  }
});

/**
 * Add Group name to user groups
 * @param {User} user
 * @returns {User} with group
 */
const getUserWithGroups = async (user) => {
  if (!user.groups) return user;
  const groups = await Promise.all(
    user.groups.map(async (id) => {
      const group = await Group.findById(id);
      return { _id: group._id, name: group.name };
    })
  );
  return { ...user._doc, groups };
};

module.exports = router;
