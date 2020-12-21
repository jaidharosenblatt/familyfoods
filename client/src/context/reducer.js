import actionTypes from "./actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.CLEAR_USER:
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default reducer;
