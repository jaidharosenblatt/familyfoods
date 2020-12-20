const express = require("express");

const Group = require("../models/group");
const auth = require("../middleware/auth");

const router = new express.Router();

/**
 * POST a new group
 * Add the authenticated user to the memberIDs array
 * @param {String} name required in req.body
 * @returns {Group} created group
 */
router.post("/groups", auth, async (req, res) => {
  try {
    const group = new Group(req.body);
    group.memberIDs = [req.user._id];
    await group.save();
    res.send(group);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: "Group name already exists" });
    }
    res.status(400).send(error);
  }
});

module.exports = router;
