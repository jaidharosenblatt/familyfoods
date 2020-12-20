const express = require("express");
const crypto = require("crypto");

const Group = require("../models/group");
const auth = require("../middleware/auth");

const router = new express.Router();

/**
 * POST a new group
 * Add the authenticated user to the memberIDs array
 * @param {String} name required in req.body
 * @param {String} key entryKey for this group
 * @returns {Group} created group
 */
router.post("/groups", auth, async (req, res) => {
  try {
    const group = new Group(req.body);
    group.memberIDs = [req.user._id];
    const key = crypto.randomBytes(3).toString("hex");
    if (!group.entryKey) {
      group.entryKey = key;
    }
    await group.save();
    res.send(group);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: "Group name already exists" });
    }
    res.sendStatus(400);
  }
});

/**
 * Join an existing group from an entryKey
 * Find group that matches entryKey and add self to memberIDs
 * @param {String} entryKey Group code
 * @returns {Group} the group user just joined
 */
router.post("/groups/join", auth, async (req, res) => {
  try {
    const group = await Group.findOne(req.body);
    if (!group) {
      return res.status(404).send({ error: "Invalid access code" });
    }
    if (group.memberIDs.includes(req.user._id)) {
      return res.status(409).send({ error: "You are already in this group" });
    }
    group.memberIDs = group.memberIDs.concat(req.user._id);
    await group.save();
    res.send(group);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * GET all groups from the database
 * @returns {Array}
 */
router.get("/groups", async (req, res) => {
  try {
    const groups = await Group.find();
    res.send(groups);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * GET a group by id from the database
 * @param {ObjectId} id from query params
 * @returns {Group} matching id if it exists
 */
router.get("/groups/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const group = await Group.findById(_id);
    if (!group) {
      res.sendStatus(404);
    }
    res.send(group);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
