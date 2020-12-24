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
 * Set restaurants to context
 * @param {Array} restaurants
 */
export const setRestaurants = (restaurants) => {
  return {
    type: actionTypes.SET_RESTAURANTS,
    payload: restaurants,
  };
};

/**
 * Set filters for restaurants to context
 * @param {Array} filters filters to apply to search
 */
export const setFilters = (filters) => {
  return {
    type: actionTypes.SET_FILTERS,
    payload: filters,
  };
};

/**
 * Set filters for restaurants to context
 * @param {String} sortKey filters to apply to search
 */
export const setSort = (sortKey) => {
  return {
    type: actionTypes.SET_SORT,
    payload: sortKey,
  };
};
