const mongoose = require("mongoose");
const crypto = require("crypto");

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
    },
  },
  { timestamps: true }
);

groupSchema.pre("save", async function (next) {
  const group = this;
  const key = crypto.randomBytes(3).toString("hex");
  group.entryKey = key;
  next();
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
