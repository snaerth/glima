const path = require("path");
const url = require("url");

const EVENT_TYPE = "EVENT_TYPE";
const POST_TYPE = "POST_TYPE";
const PAGE_TYPE = "PAGE_TYPE";

/**
 * Creates full url from request object
 * @param {Object} req - Request object
 * @returns {String} concatenated full url string
 */
function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl
  });
}

/**
 * Gets the path the main html file (index.html)
 */
function getHtmlPath() {
  return path.resolve(process.cwd(), "build", "index.html");
}

/**
 * Strips HTML tags from string
 * @param {String} str - Any string
 * @returns {String}
 */
function stripHtmlFromString(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Replaces from content attribute in social media tags and set
 * new content for image, title and description
 * @param {String} html - Index.html file
 * @param {Object} data - Wordpress Blog/Post object
 * @returns {String}
 */
function replaceSocialMetaTags(html, data, type) {
  if (!type || !html || !data) {
    return html;
  }

  let titleDesc = "";
  let imageUrl = "";
  let description = "";

  if (type === EVENT_TYPE) {
    const { title, excerpt, image } = data;
    titleDesc = title;
    description = excerpt;

    if (image && image.sizes) {
      imageUrl = image.sizes.medium.url;
    }
  } else if (type === POST_TYPE) {
    const { title, excerpt, _embedded } = data;
    const featuredmedia = _embedded ? _embedded["wp:featuredmedia"] : "";
    titleDesc = title.rendered;
    description = excerpt.rendered;

    if (featuredmedia) {
      imageUrl = featuredmedia[0].media_details.sizes.medium.source_url;
    }
  }

  if (imageUrl) {
    html = html.replace(/\$OG_IMAGE/g, imageUrl);
  }

  html = html.replace(/\$OG_TITLE/g, titleDesc);
  html = html.replace(/\$OG_DESCRIPTION/g, stripHtmlFromString(description));

  return html;
}

module.exports = {
  fullUrl,
  getHtmlPath,
  replaceSocialMetaTags,
  EVENT_TYPE,
  POST_TYPE,
  PAGE_TYPE
};
