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
    const { user, token } = await getAuthFromCookies(req.cookies);
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
    const { user, token } = await getAuthFromCookies(req.cookies);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

/**
 * Gets JWT token and user from cookie
 * @param {Object} cookies from req object
 * @returns {User}
 * @returns {JWT}
 */
const getAuthFromCookies = async (cookies) => {
  const token = cookies.JWT;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  return { user, token };
};

module.exports = { auth, authNoError };
