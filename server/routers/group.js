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

    const key = crypto.randomBytes(3).toString("hex");
    if (!group.entryKey) {
      group.entryKey = key;
    }

    await group.save();

    // Add this group id to the user
    req.user.groups = req.user.groups.concat(group._id);
    await req.user.save();

    res.send(group);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ error: "Group name or entry code already exists" });
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
    if (req.user.groups.includes(group._id)) {
      return res.status(409).send({ error: "You are already in this group" });
    }
    await group.save();

    // Add this group id to the user
    req.user.groups = req.user.groups.concat(group._id);
    await req.user.save();

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

/**
 * Leave a group by id or delete if last member in group
 * Remove self from the group
 * @param {ObjectId} id from query params
 * @returns {Group} matching id if it exists
 */
router.delete("/groups/:id/", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const group = await Group.findById(_id);
    if (!group) {
      return res.sendStatus(404);
    }

    if (!group.memberIDs.includes(req.user._id)) {
      return res.status(400).send({ error: "You are not in this group" });
    }

    // Remove from authenticated user group's
    group.memberIDs = group.memberIDs.filter(
      (groupId) => groupId.toString() !== req.user._id.toString()
    );

    if (group.memberIDs.length === 0) {
      await group.delete();
      return res.send("Group deleted");
    } else {
      await group.save();
      res.send(group);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
