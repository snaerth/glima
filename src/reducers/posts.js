import {
  SET_POSTS,
  SET_POSTS_ERROR,
  SET_ACTIVE_POST,
  SET_POSTS_LOADING,
  SET_POSTS_PAGE
} from "../constants/posts";

const initialState = {
  data: [],
  totalPages: 0,
  post: null,
  error: false,
  loading: false,
  page: 1
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      const { data, totalPages } = action.payload;
      return { ...state, data, totalPages, loading: false, error: false };

    case SET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        totalPages: 0,
        loading: false
      };

    case SET_ACTIVE_POST:
      return { ...state, post: action.payload };

    case SET_POSTS_LOADING:
      return { ...state, loading: action.payload };

    case SET_POSTS_PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
}

export default posts;
