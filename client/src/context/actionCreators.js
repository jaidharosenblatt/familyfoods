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
 * Set a user into context
 * @returns {Object} to dispatch to context
 */
export const logout = () => {
  return {
    type: actionTypes.SET_USER,
    payload: undefined,
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
 * Stop loading for Context
 * @returns {Object} to dispatch to context
 */
export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
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

/**
 * Clear error in Context
 * @returns {Object} to dispatch to context
 */
export const clearError = () => {
  return {
    type: actionTypes.SET_ERROR,
    payload: undefined,
  };
};

/**
 * Add a group to user's group's
 * @param {Group} group next group to add
 * @returns {Object} to dispatch to context
 */
export const addGroup = (group) => {
  return {
    type: actionTypes.ADD_GROUP,
    payload: group,
  };
};
