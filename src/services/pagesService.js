import axois from "axios";
import Pick from "object.pick";
import config from "../config";

const { API_URL, PAGES_PER_PAGE, PAGES_SESSION_CACHE } = config;
const desiredPageProps = [
  "title",
  "id",
  "slug",
  "content",
  "_embedded",
  "parent"
];

/**
 * Gets wordpress page
 * @param {String} id - Page id
 * @returns {Object} wordpress page object
 */
export async function fetchPage(id) {
  try {
    const { data } = await axois.get(
      `${API_URL}/wp-json/wp/v2/pages/${id}?_embed`
    );

    return data;
  } catch (error) {
    return error;
  }
}

/**
 * Gets wordpress pages and also caches
 * the first response in session storage
 *
 * @param {Number} page - page number
 * @returns {Object|Object<Error>}
 */
export default async function fetchPages(page) {
  try {
    if (PAGES_SESSION_CACHE) {
      const cachedResponse = sessionStorage.getItem("pages");

      // Return cached response
      if (cachedResponse) {
        return JSON.parse(cachedResponse);
      }
    }

    const response = await axois.get(
      `${API_URL}/wp-json/wp/v2/pages?_embed&page=${
        page >= 1 ? page : 1
      }&per_page=${PAGES_PER_PAGE}`
    );
    const returnValue = {
      data:
        response.data.length > 0
          ? response.data.map(page => Pick(page, desiredPageProps))
          : response.data,
      totalPages: response.headers["x-wp-totalpages"]
    };

    if (PAGES_SESSION_CACHE) {
      // Cache response
      sessionStorage.setItem("pages", JSON.stringify(returnValue));
    }

    return returnValue;
  } catch (error) {
    return {
      data: error
    };
  }
}
