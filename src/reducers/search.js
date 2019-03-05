import {
  SET_SEARCH_VALUE,
  SET_SEARCH_DATA,
  SET_SEARCH_ERROR,
  SET_SEARCH_LOADING
} from "../constants/search";

const initialState = {
  data: {
    posts: [],
    pages: [],
    events: []
  },
  value: "",
  loading: false,
  error: null
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...state, value: action.payload };

    case SET_SEARCH_DATA:
      return { ...state, data: action.payload, error: null, loading: false };

    case SET_SEARCH_LOADING:
      return { ...state, loading: action.payload };

    case SET_SEARCH_ERROR:
      return {
        ...state,
        data: initialState.data,
        error: true,
        loading: false
      };

    default:
      return state;
  }
}

export default posts;
