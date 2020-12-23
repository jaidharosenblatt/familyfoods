/**
 * Custom error to throw in nested functions
 * @param {String} message ex 'Something went wrong...'
 * @param {Integer} status HTTP status code to send
 * @returns {Error}
 */
class ServerError extends Error {
  constructor(message, status, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
    this.type = "server";
    this.status = status;
    this.message = message;
  }
}

/**
 * Catch a custom error if it exists or return a 500 status code and log error
 * @param {Error} error thrown error
 * @param {Function} res from express
 */
const catchServerError = (error, res) => {
  if (error.type === "server") {
    return res.status(error.status).send(error.message);
  }
  console.log(error);
  res.status(500).send({ error: "Something went wrong" });
};

module.exports = { ServerError, catchServerError };
