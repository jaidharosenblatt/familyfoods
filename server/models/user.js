const mongoose = require("mongoose");
const locationSchema = require("./locationSchema");

const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    location: {
      type: locationSchema,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a new JWT token and send it back to res as a cookie
userSchema.methods.setJWTCookie = async function (req, res) {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  res.cookie("JWT", token, {
    httpOnly: true,
  });
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Unable to log in");
  }
  // Compare hashed password
  const isMatch = await brcypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to log in");
  }

  return user;
};

userSchema.statics.findByID = async (_id) => {
  const user = await User.findOne({ _id });
  if (!user) {
    throw new Error("No user matches this id");
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await brcypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
