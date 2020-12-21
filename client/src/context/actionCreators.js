import actionTypes from "./actionTypes";

/**
 * Set a user into context
 * @param {User} user
 * @returns {Object} to dispatch to context
 */
export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};

/**
 * Start loading for Context
 * @returns {Object} to dispatch to context
 */
export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

/**
 * Set error into Context
 * @param {String} errorMessage
 * @returns {Object} to dispatch to context
 */
export const setError = (errorMessage) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: errorMessage,
  };
};
