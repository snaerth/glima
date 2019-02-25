import axois from "axios";
import config from "../config";

const { API_URL, EVENTS_PER_PAGE } = config;

/**
 * Gets wordpress events
 * @param {Number} page - page number
 * @param {Number} id - Event id
 */
async function fetchEvents(page, id) {
  try {
    let url = `${API_URL}/wp-json/tribe/events/v1/events`;

    if (page) {
      url = `${url}?page=${page >= 1 ? page : 1}&per_page=${EVENTS_PER_PAGE}`;
    }

    if (id) {
      url = `${url}/${id}`;
    }

    const response = await axois.get(url);

    return {
      data: response.data,
      totalPages: response.data.total_pages
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

export default fetchEvents;
