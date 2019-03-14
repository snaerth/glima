import axios from "axios";
import {
  pageProps,
  postProps,
  eventProps,
  pickObject
} from "../shared/desiredProps";
import config from "../config";

const { API_URL } = config;

/**
 * Searches wordpress pages, events and pages
 * @param {String} value - Search string value
 * @returns {Object}
 */
export default async function searchAll(value) {
  try {
    const promises = [
      axios.get(`${API_URL}/wp/v2/posts?_embed&search=${value}`),
      axios.get(`${API_URL}/wp/v2/pages?_embed&search=${value}`),
      axios.get(`${API_URL}/tribe/events/v1/events?search=${value}`)
    ];

    const [postsResponse, pagesResponse, eventsResponse] = await Promise.all(
      promises
    );

    return {
      pages: pickObject(pagesResponse, pageProps, "pages"),
      posts: pickObject(postsResponse, postProps, "posts"),
      events: pickObject(eventsResponse, eventProps, "events")
    };
  } catch (error) {
    return error;
  }
}
