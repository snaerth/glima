import axois from "axios";
import config from "../config";

const { API_URL, POST_PER_PAGE } = config;

/**
 * Gets wordpress post
 * @param {String} id - Post id
 * @returns {Object} wordpress post object
 */
export async function fetchPost(id) {
  try {
    const { data } = await axois.get(
      `${API_URL}/wp-json/wp/v2/posts/${id}?_embed`
    );

    return data;
  } catch (error) {
    return error;
  }
}

/**
 * Gets wordpress posts
 *
 * @param {Number} page - page number
 * @returns {Array} wordpress posts array
 */
export default async function fetchPosts(page) {
  try {
    const response = await axois.get(
      `${API_URL}/wp-json/wp/v2/posts?_embed&page=${
        page >= 1 ? page : 1
      }&per_page=${POST_PER_PAGE}`
    );

    return {
      data: response.data,
      totalPages: response.headers["x-wp-totalpages"],
      postsSize: response.headers["x-wp-total"]
    };
  } catch (error) {
    return error;
  }
}
