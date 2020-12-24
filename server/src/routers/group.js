const express = require("express");

const Group = require("../models/group");
const { auth, authNoError } = require("../middleware/auth");
const { fieldsAreValid } = require("../util/validation");
const { catchServerError, ServerError } = require("../util/errors");

const router = new express.Router();
const userFieldsToOmit = "-tokens -password -groups";

/**
 * POST a new group
 * Add the authenticated user to the members array
 * @param {String} name required in req.body
 * @param {String} password password to join this group
 * @returns {Group} created group
 */
router.post("/groups", auth, async (req, res) => {
  try {
    const group = new Group(req.body);

    if (req.body.password) {
      group.public = false;
    }

    // add this user's id to the group's members and as owner
    group.members = group.members.concat(req.user);
    group.owner = req.user._id;

    await group.save();

    // add this group id to user's groups
    req.user.groups = req.user.groups.concat(group._id);
    await req.user.save();

    res.send(group);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ error: "Group name already exists" });
    }
    res.sendStatus(400);
  }
});

/**
 * Join an existing group from an password or id if group is open
 * Find group that matches entryKey and add self to members
 * @param {String} id the id for the open group to join
 * @param {String} password Group code
 * @returns {Group} the group user just joined
 */
router.post("/groups/join", auth, async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.body.id }).populate(
      "members",
      userFieldsToOmit
    );

    if (!group) {
      return res.status(404).send({ error: "No group found" });
    }
    if (!group.public && group.password !== req.body.password) {
      return res.status(403).send({ error: "Invalid password" });
    }

    if (group.members.includes(req.user._id)) {
      return res.status(400).send({ error: "You are already in this group" });
    }
    // add this user to the group's members
    group.members = group.members.concat(req.user);
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
 * If authenticated user, split groups by which user is in
 * @returns {Array} groups
 */
router.get("/groups", auth, async (req, res) => {
  try {
    if (req.user) {
      const myGroups = await Group.find({ members: req.user._id })
        .populate("members", userFieldsToOmit)
        .sort({ updatedAt: -1 });
      const otherGroups = await Group.find({ members: { $ne: req.user._id } })
        .populate("members", userFieldsToOmit)
        .sort({ updatedAt: -1 });

      return res.send({ myGroups, otherGroups });
    }

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
 * @param {String} password for entry
 * @param {String} name of group
 * @returns {Group} updated group
 */
router.patch("/groups/:id", auth, async (req, res) => {
  if (!fieldsAreValid(["password", "name", "public"], req.body)) {
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
 * Increment this group's turn count
 * @param {ObjectId} id from query params
 * @returns {Group} updated group
 */
router.post("/groups/:id/turn", auth, async (req, res) => {
  try {
    const group = await getGroupById(req, res);
    group.turns++;
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
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).send({ error: "No group with that id" });
    }

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
    console.log(error);
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
    ? await Group.findById(req.params.id).populate("members", userFieldsToOmit)
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
