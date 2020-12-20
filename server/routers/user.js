const express = require("express");

const Restaurant = require("../models/restaurant");
const User = require("../models/user");

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
    const token = await user.generateAuthToken();
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
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
