import fetchPosts, { fetchPost } from "../services/postsService";
import {
  SET_POSTS,
  SET_POSTS_ERROR,
  SET_ACTIVE_POST,
  SET_POSTS_LOADING,
  SET_POSTS_PAGE
} from "../constants/posts";
import Timer from "../utils/timer";
import config from "../config";

const { REQUEST_TIME_MIN } = config;

/**
 * Sets posts loading Redux state
 */
export function setPostsLoading() {
  return {
    type: SET_POSTS_LOADING,
    payload: true
  };
}

/**
 * Sets posts pagination page in Redux state
 *
 * @param {Number} page - Pagination current page number
 */
export function setPostsPage(page) {
  return {
    type: SET_POSTS_PAGE,
    payload: page
  };
}

/**
 * Gets posts and dispatches actions
 *
 * @param {Number} pageNumber - Posts Rest API page number
 */
function getPosts(pageNumber = 1) {
  return async dispatch => {
    try {
      if (pageNumber > 1) {
      }

      const timer = new Timer();
      timer.start();

      // Fetch posts
      const { data, totalPages, postsSize } = await fetchPosts(pageNumber);

      timer.stop();
      const diff = timer.diff();
      const action = {
        type: SET_POSTS,
        payload: {
          data,
          totalPages: Number(totalPages),
          postsSize: Number(postsSize)
        }
      };

      if (data instanceof Error) {
        dispatch({
          type: SET_POSTS_ERROR,
          error: data
        });
      } else if (diff < REQUEST_TIME_MIN) {
        // Delay execution of dispatch by 1 second because of UI loading
        const delay = REQUEST_TIME_MIN - diff;

        setTimeout(() => {
          dispatch(action);

          return Promise.resolve();
        }, delay + diff);
      } else {
        dispatch(action);

        return Promise.resolve();
      }
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
      const payload = await fetchPost(id);

      if (payload instanceof Error) {
        dispatch({
          type: SET_POSTS_ERROR,
          payload
        });
      }

      dispatch({
        type: SET_ACTIVE_POST,
        payload
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
