const express = require("express");

const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

/** @TODO PATCH, DELETE, logoutAll */

/**
 * Create a new account and set a HTTP only JWT token in client cookies
 * @param {String} username unique name for account
 * @param {String} password
 * @param {Location} location user's current lat and long
 * @returns {User} user object
 */
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    await user.setJWTCookie(req, res);

    res.status(201).send(user);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }
    res.sendStatus(500);
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

    res.send(user);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

/**
 * Get profile of logged in user
 * @returns {User} user object
 */
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

/**
 * Logout the current user (just one token)
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    req.sendStatus(500);
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
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "location", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }
    res.sendStatus(400);
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
    res.sendStatus(500);
  }
});

module.exports = router;
