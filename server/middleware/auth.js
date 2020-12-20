const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Gets JWT token from cookie and adds user object to req
 * @param {Object} cookies in req object
 * @param {Function} next callback
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
