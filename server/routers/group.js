const express = require("express");

const Group = require("../models/group");
const auth = require("../middleware/auth");

const router = new express.Router();

module.exports = router;
