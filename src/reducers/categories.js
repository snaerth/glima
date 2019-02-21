import {
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING
} from "../constants/categories";

const initialState = {
  data: [],
  error: false,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, data: action.payload, loading: false, error: false };

    case SET_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_CATEGORIES_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export default posts;
