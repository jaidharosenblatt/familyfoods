const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    userIDs: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    entryKey: {
      type: String,
      required: true,
    },
    reviewedRestaurants: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("turn", groupSchema);

module.exports = Group;
