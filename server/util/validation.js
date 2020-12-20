/**
 * Check if all of the passed in fields are valid keys
 * @param {Array} allowedFields keys to allow
 * @param {Object} body from request
 * @returns {Boolean} whether or not all fields are valid
 */
const fieldsAreValid = (allowedFields, body) => {
  const updates = Object.keys(body);
  return updates.every((update) => allowedFields.includes(update));
};

module.exports = { fieldsAreValid };
