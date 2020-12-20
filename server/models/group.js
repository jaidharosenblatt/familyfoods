const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    memberIDs: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    entryKey: {
      type: String,
      validate(value) {
        if (value.length < 4) {
          throw new Error("entryKey must be at least 4 characters");
        }
      },
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
