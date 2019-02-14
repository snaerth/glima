import axois from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Fetches wordpress photos from Envira-gallery
 *
 * @param {String} slug - Wordpress Envira-gallery slug
 */
export default async function fetchPhotos(slug) {
  try {
    let url = `${API_URL}/wp-json/wp/v2/envira-gallery`;

    if (slug) {
      url = `${url}?slug=${slug}`;
    }

    const response = await axois.get(url);

    return response.data;
  } catch (error) {
    return error;
  }
}
