import axois from "axios";
import config from "../config";

const { API_URL } = config;

/**
 * Gets wordpress events
 */
async function fetchEvents() {
  try {
    const url = `${API_URL}/wp-json/tribe/events/v1/events`;
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
