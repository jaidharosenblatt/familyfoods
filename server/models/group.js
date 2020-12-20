const mongoose = require("mongoose");
const User = require("./user");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    entryKey: {
      type: String,
      unique: true,
      validate(value) {
        if (value.length < 4) {
          throw new Error("entryKey must be at least 4 characters");
        }
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

groupSchema.methods.toJSON = function () {
  const group = this;
  const groupObject = group.toObject();

  delete groupObject.entryKey;

  return groupObject;
};

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
