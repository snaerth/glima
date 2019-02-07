import fetchPosts, { fetchPost } from "../services/postsService";
import {
  SET_POSTS,
  SET_POSTS_ERROR,
  SET_ACTIVE_POST
} from "../constants/posts";

/**
 * Gets posts and dispatches actions
 */
function getPosts() {
  return async dispatch => {
    try {
      const posts = await fetchPosts();

      dispatch({
        type: SET_POSTS,
        payload: posts
      });
    } catch (error) {
      dispatch({
        type: SET_POSTS_ERROR,
        payload: error
      });
    }
  };
}

/**
 * Gets post and dispatches actions
 *
 * @param {String} id - Post id
 */
export function getPost(id) {
  return async dispatch => {
    try {
      const post = await fetchPost(id);

      dispatch({
        type: SET_ACTIVE_POST,
        payload: post
      });
    } catch (error) {
      dispatch({
        type: SET_POSTS_ERROR,
        payload: error
      });
    }
  };
}

/**
 * Sets active post
 * @param {Object} post - Wordpress blog post
 */
export function setActivePost(post) {
  return {
    type: SET_ACTIVE_POST,
    payload: post
  };
}

export default getPosts;
