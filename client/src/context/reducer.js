import actionTypes from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, loading: false, user: action.payload, error: false };
    case actionTypes.CLEAR_USER:
      return { restaurants: [], filters: [], refreshRestaurants: true };
    case actionTypes.SET_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        refreshRestaurants: false,
        error: false,
      };
    case actionTypes.SET_RESTAURANTS_COUNT:
      return {
        ...state,
        loading: false,
        restaurantsCount: action.payload,
        error: false,
      };
    case actionTypes.REFRESH_RESTAURANTS:
      return {
        ...state,
        restaurants: [],
        refreshRestaurants: true,
        error: false,
      };
    case actionTypes.SET_FILTERS:
      return {
        ...state,
        loading: false,
        filters: action.payload,
        refreshRestaurants: true,
        error: false,
      };
    case actionTypes.SET_GROUP:
      return {
        ...state,
        loading: false,
        refreshRestaurants: true,
        group: action.payload,
        error: false,
      };
    case actionTypes.SET_SORT:
      return {
        ...state,
        loading: false,
        refreshRestaurants: true,
        sort: action.payload,
        error: false,
      };
    case actionTypes.START_LOADING:
      return { ...state, loading: true };
    case actionTypes.STOP_LOADING:
      return { ...state, loading: false };
    case actionTypes.SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
