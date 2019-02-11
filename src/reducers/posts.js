import {
  SET_POSTS,
  SET_POSTS_ERROR,
  SET_ACTIVE_POST,
  SET_POSTS_LOADING,
  SET_POSTS_PAGE
} from "../constants/posts";

const initialState = {
  posts: [],
  totalPages: 0,
  postsSize: 0,
  post: null,
  error: null,
  loading: false,
  page: 1
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      const { data, totalPages, postsSize } = action.payload;
      return { ...state, posts: data, totalPages, postsSize, loading: false };

    case SET_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        totalPages: 0,
        postsSize: 0,
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
