import axois from "axios";
import Pick from "object.pick";
import config from "../config";

const { API_URL } = config;

const pageProps = [
  "id",
  "title",
  "excerpt",
  "date",
  "slug",
  "content",
  "_embedded",
  "parent"
];
const postProps = [
  "id",
  "date",
  "title",
  "excerpt",
  "slug",
  "content",
  "_embedded"
];
const eventProps = [
  "id",
  "image",
  "description",
  "title",
  "excerpt",
  "venue",
  "start_date",
  "end_date_details",
  "start_date_details"
];

/**
 * If there is results as in response.data includes Array
 * then we pick from all the objects the desired props in props array
 *
 * @param {Object} response - Axios response object
 * @param {Array} props - Desired props to pick
 * @param {String} type - Search type pages|posts|events
 * @returns {Array|Object
 */
function pickObject(response, props, type) {
  if (type === "events") {
    return response.data.events
      ? response.data.events.map(d => Pick(d, props))
      : response.data;
  }

  return response.data.length > 0
    ? response.data.map(d => Pick(d, props))
    : response.data;
}

/**
 * Searches wordpress pages, events and pages
 * @param {String} value - Search string value
 * @returns {Object}
 */
export default async function searchAll(value) {
  try {
    const promises = [
      axois.get(`${API_URL}/wp-json/wp/v2/posts?_embed&search=${value}`),
      axois.get(`${API_URL}/wp-json/wp/v2/pages?_embed&search=${value}`),
      axois.get(`${API_URL}/wp-json/tribe/events/v1/events?search=${value}`)
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
