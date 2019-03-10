const Pick = require("object.pick");

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
 * Pick desired props from object
 *
 * @param {Object} data - Object data
 * @param {Array} props - Desired props to pick
 * @returns {Object}
 */
function pickSingleObject(data, props) {
  return Pick(data, props);
}

module.exports = {
  pageProps,
  postProps,
  eventProps,
  pickObject,
  pickSingleObject
};
