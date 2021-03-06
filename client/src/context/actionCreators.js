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
 * Set restaurants to context
 * @param {Integer} count of restaurants matching filter criteria
 */
export const setRestaurantsCount = (count) => {
  return {
    type: actionTypes.SET_RESTAURANTS_COUNT,
    payload: count,
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

/**
 * Set the group to use for restaurants call
 * @param {ObjectId} groupId from user's groups
 */
export const setGroup = (group) => {
  return {
    type: actionTypes.SET_GROUP,
    payload: group,
  };
};

/**
 * Refresh all restaurants
 */
export const refreshRestaurants = () => {
  return {
    type: actionTypes.REFRESH_RESTAURANTS,
  };
};
