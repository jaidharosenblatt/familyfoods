const express = require("express");

const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

/**
 * Create a new account
 * @param {String} username unique name for account
 * @param {String} password
 * @param {Location} location user's current lat and long
 * @returns {JWT} generated JWT token
 * @returns {User} user object
 */
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    await user.setJWTCookie(req, res);

    res.status(201).send({ user, token });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).send({ error: "Username already exists" });
    }
    res.sendStatus(500);
  }
});

/**
 * Login a user
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

module.exports = router;
