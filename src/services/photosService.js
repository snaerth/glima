import axois from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Fetches wordpress photos from Envira-gallery
 *
 * @param {String} slug - Wordpress Envira-gallery slug
 * @returns {Object}
 */
export default async function fetchPhotos(slug) {
  try {
    const response = await axois.get(
      `${API_URL}/wp-json/wp/v2/envira-gallery?slug=${slug}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
