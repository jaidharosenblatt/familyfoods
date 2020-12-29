const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Gets JWT token from cookie and adds user object to req
 * Throws 401 error if user is not authenticated
 * @param {Object} cookies in req object
 * @param {Function} next callback
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;

    if (!token) {
      throw new Error();
    }
    const user = await getAuthFromCookies(token);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

/**
 * Gets JWT token from cookie and adds user object to req
 * Does NOT throw error unless there was a server error
 * @param {Object} cookies in req object
 * @param {Function} next callback
 */
const authNoError = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;

    if (token) {
      const user = await getAuthFromCookies(token);

      req.user = user;
      req.token = token;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
};

/**
 * Gets JWT token and user from cookie
 * @param {Object} token from req.cookies object
 * @returns {User}
 */
const getAuthFromCookies = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  return user;
};

module.exports = { auth, authNoError };
