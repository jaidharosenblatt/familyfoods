const express = require("express");

const Restaurant = require("../models/restaurant");
const User = require("../models/user");

const router = new express.Router();

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

module.exports = router;
