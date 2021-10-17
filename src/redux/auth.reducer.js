import { combineReducers } from "redux";

const initState = {
  username: "",
  userID: "",
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        username: action.payload,
      };

    default:
      return { ...state };
  }
};

const allReducers = combineReducers({
  authReducer,
});

export default allReducers;
