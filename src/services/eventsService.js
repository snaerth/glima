import axois from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Gets wordpress events
 * @param {Number} id - Event id
 */
async function fetchEvents(id) {
  try {
    let url = `${API_URL}/wp-json/tribe/events/v1/events`;

    if (id) {
      url = `${url}/${id}`;
    }

    const response = await axois.get(url);

    return {
      data: response.data
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

export default fetchEvents;
