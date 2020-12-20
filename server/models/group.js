const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  { timestamps: true }
);

groupSchema.methods.toJSON = function () {
  const group = this;
  const groupObject = group.toObject();

  delete groupObject.entryKey;

  return groupObject;
};

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
