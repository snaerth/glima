import axios from "axios";
import config from "../config";

const { API_URL, POSTS_PER_PAGE } = config;

/**
 * Gets wordpress post
 * @param {String} id - Post id
 * @returns {Object} wordpress post object
 */
export async function fetchPost(id) {
  try {
    const { data } = await axios.get(
      `${API_URL}/wp/v2/posts/${id}?_embed`
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
 * @param {Array<Number>} categories - Array of categories numbers
 * @returns {Object|Object<Error>}
 */
export default async function fetchPosts(page, categories = []) {
  try {
    let url = `${API_URL}/wp/v2/posts?_embed&page=${
      page >= 1 ? page : 1
    }&per_page=${POSTS_PER_PAGE}`;

    if (categories.length > 0 && Array.isArray(categories)) {
      url = `${url}&categories=${categories.join(",")}`;
    }

    const response = await axios.get(url);

    return {
      data: response.data,
      totalPages: response.headers["x-wp-totalpages"]
    };
  } catch (error) {
    return {
      data: error
    };
  }
}
