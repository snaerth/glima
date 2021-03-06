import axios from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Gets wordpress posts
 *
 * @param {String} slug - Category slug string
 * @returns {Object|Object<Error>}
 */
async function fetchCategories(slug) {
  try {
    let url = `${API_URL}/wp/v2/categories`;

    if (slug) {
      url = `${url}?slug=${slug}`;
    }

    const response = await axios.get(url);

    return {
      data: response.data
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

export default fetchCategories;
