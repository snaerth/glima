import {
  SET_POSTS,
  SET_POSTS_ERROR,
  SET_ACTIVE_POST
} from "../constants/posts";

const initialState = {
  posts: [],
  post: null,
  error: null
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };

    case SET_POSTS_ERROR:
      return { ...state, error: action.payload };

    case SET_ACTIVE_POST:
      return { ...state, post: action.payload };

    default:
      return state;
  }
}

export default posts;
