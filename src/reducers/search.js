import { SET_SEARCH_VALUE } from "../constants/search";

const initialState = {
  value: ""
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...state, value: action.payload };

    default:
      return state;
  }
}

export default posts;
