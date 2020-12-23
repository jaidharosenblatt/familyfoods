const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    public: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: {
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
      ],
      default: [],
    },
    turns: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

groupSchema.methods.toJSON = function () {
  const group = this;
  const groupObject = group.toObject();

  delete groupObject.password;

  return groupObject;
};

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
