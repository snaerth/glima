import axois from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Gets wordpress post
 * @param {String} id - Post id
 * @returns {Object} wordpress post object
 */
export async function fetchPost(id) {
  try {
    const { data } = await axois.get(`${API_URL}/wp-json/wp/v2/posts/${id}`);

    return data;
  } catch (error) {
    return error;
  }
}

/**
 * Gets wordpress posts
 * @returns {Array} wordpress posts array
 */
export default async function fetchPosts() {
  try {
    const { data } = await axois.get(`${API_URL}/wp-json/wp/v2/posts?_embed`);

    return data;
  } catch (error) {
    return error;
  }
}
