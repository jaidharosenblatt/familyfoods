const express = require("express");
const crypto = require("crypto");

const Group = require("../models/group");
const { auth } = require("../middleware/auth");
const { fieldsAreValid } = require("../util/validation");
const { catchServerError, ServerError } = require("../util/errors");

const router = new express.Router();

/**
 * POST a new group
 * Add the authenticated user to the members array
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

    // add this user to the group's members
    group.members = group.members.concat(req.user._id);
    await group.save();

    // add this group id to user's groups
    req.user.groups = req.user.groups.concat(group._id);
    await req.user.save();

    res.send(group);
  } catch (error) {
    console.log(error);
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
 * Find group that matches entryKey and add self to members
 * @param {String} entryKey Group code
 * @returns {Group} the group user just joined
 */
router.post("/groups/join", auth, async (req, res) => {
  try {
    const group = await Group.findOne(req.body);
    if (!group) {
      return res.status(404).send({ error: "Invalid access code" });
    }
    if (group.members.includes(req.user._id)) {
      return res.status(400).send({ error: "You are already in this group" });
    }
    // add this user to the group's members
    group.members = group.members.concat(req.user._id);
    await group.save();

    // add this group id to user's groups
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
    const groups = await Group.find().populate(
      "members",
      "-tokens -password -groups"
    );

    res.send(groups);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/**
 * GET a group by id from the database
 * @param {ObjectId} id from query params
 * @returns {Group} matching id if it exists
 */
router.get("/groups/:id", auth, async (req, res) => {
  try {
    const group = await getGroupById(req, res, true);
    res.send(group);
  } catch (error) {
    catchServerError(error, res);
  }
});

/**
 * Update a group by id
 * @param {ObjectId} id from query params
 * @param {Integer} turns taken by this group
 * @param {String} name of group
 * @returns {Group} updated group
 */
router.patch("/groups/:id", auth, async (req, res) => {
  if (!fieldsAreValid(["turns", "name"], req.body)) {
    return res.status(400).send("Invalid update params");
  }
  try {
    const group = await getGroupById(req, res);
    const updates = Object.keys(req.body);

    updates.forEach((update) => (group[update] = req.body[update]));
    await group.save();
    res.send(group);
  } catch (error) {
    catchServerError(error, res);
  }
});

/**
 * Leave a group by id or delete if last member in group
 * Remove self from the group
 * @param {ObjectId} id from query params
 * @returns {Group} matching id if it exists
 */
router.delete("/groups/:id/", auth, async (req, res) => {
  try {
    const group = await getGroupById(req, res);

    // Remove from authenticated user group's
    group.members = group.members.filter(
      (groupId) => groupId.toString() !== req.user._id.toString()
    );

    // add this group id to user's groups
    req.user.groups = req.user.groups.filter(
      (groupId) => groupId.toString() !== group._id.toString()
    );
    await req.user.save();

    if (group.members.length === 0) {
      await group.delete();
      return res.send("Group deleted");
    } else {
      await group.save();
      res.send(group);
    }
  } catch (error) {
    catchServerError(error, res);
  }
});

/**
 * Helper function for GET/PATCH group by id
 * @param {ObjectId} id from query params
 * @returns {Group} updated group
 */
const getGroupById = async (req, res, includeMembers) => {
  const group = includeMembers
    ? await Group.findById(req.params.id).populate(
        "members",
        "-tokens -password -groups"
      )
    : await Group.findById(req.params.id);
  if (!group) {
    throw new ServerError("No group found", 404);
  }

  const userInGroup = group.members.some(
    (member) => member._id.toString() === req.user._id.toString()
  );
  if (!userInGroup) {
    throw new ServerError("User not in group", 403);
  }
  return group;
};

module.exports = router;
