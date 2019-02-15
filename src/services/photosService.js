import axois from "axios";
import config from "../config";

const { API_URL, PHOTOS_PER_PAGE } = config;

/**
 * Fetches wordpress photos from Envira-gallery
 *
 * @param {String} slug - Wordpress Envira-gallery slug
 * @param {Number} page - page number
 * @returns {Object|Object<Error>}
 */
export default async function fetchPhotos(slug, page) {
  try {
    let url = `${API_URL}/wp-json/wp/v2/envira-gallery`;

    if (slug && !page) {
      url = `${url}?slug=${slug}`;
    } else {
      url = `${url}?page=${page >= 1 ? page : 1}&per_page=${PHOTOS_PER_PAGE}`;
    }

    const response = await axois.get(url);

    return {
      data: response.data,
      totalPages: response.headers["x-wp-totalpages"]
    };
  } catch (error) {
    return error;
  }
}
