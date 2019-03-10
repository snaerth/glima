const express = require("express");
const path = require("path");
const fs = require("fs");
const axois = require("axios");
const {
  fullUrl,
  getHtmlPath,
  replaceSocialMetaTags,
  EVENT_TYPE,
  POST_TYPE
} = require("./utils");
const config = require("../src/config");
const {
  postProps,
  eventProps,
  pickSingleObject
} = require("../src/shared/desiredProps");

// Set variables
const { API_URL } = config;
const server = express();
const port = process.env.PORT || 5000;
let defaultHtml = null;
let html = null;
const STATUS_OK = 200;

server.use(
  express.static(path.resolve(process.cwd(), "build"), {
    index: false
  })
);

/**
 * Post route.
 * Make request to WP api to fetch post by id.
 * Then replace the social metatags (title,description,image)
 * with content from the api
 */
server.get("/frett/:slug/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axois.get(
      `${API_URL}/wp-json/wp/v2/posts/${id}?_embed`
    );

    if (data instanceof Error) {
      return res.status(STATUS_OK).send(html);
    }

    const mutatedData = pickSingleObject(data, postProps);
    html = replaceSocialMetaTags(html, mutatedData, POST_TYPE);

    // Send cached html file
    return res.status(STATUS_OK).send(html);
  } catch (error) {
    // Send cached html file anyway
    return res.status(STATUS_OK).send(html);
  }
});

/**
 * Events route.
 * Make request to WP api to fetch events by id.
 * Then replace the social metatags (title,description,image)
 * with content from the api
 */
server.get("/vidburdir/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axois.get(
      `${API_URL}/wp-json/tribe/events/v1/events?id=${id}`
    );

    if (data instanceof Error) {
      return res.status(STATUS_OK).send(html);
    }

    if (data.events[0]) {
      const mutatedData = pickSingleObject(data.events[0], eventProps);
      html = replaceSocialMetaTags(html, mutatedData, EVENT_TYPE);
      html = html.replace(/\$OG_URL/g, fullUrl(req));
    }

    // Send cached html file
    return res.status(STATUS_OK).send(html);
  } catch (error) {
    // Send cached html file anyway
    return res.status(STATUS_OK).send(html);
  }
});

server.get("*", (req, res) => {
  // Replace the special strings from html with default server generated strings
  defaultHtml = defaultHtml.replace(/\$OG_URL/g, fullUrl(req));
  res.status(STATUS_OK).send(defaultHtml);
});

// Read in the index.html file
fs.readFile(getHtmlPath(), "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  // Cache file data in defaultHtml variable
  defaultHtml = data;

  const title = "Glímusamband Íslands - íslensk glíma";
  const description =
    "Glíman, þjóðaríþrótt Íslendinga, hefur lifað með þjóðinni allt frá Þjóðveldisöld. Íslendingum ber nauðsyn til að undirstrika sérstöðu sína og þar liggur beinast";

  // Replace the special strings from html with default server generated strings
  defaultHtml = defaultHtml.replace(/\$OG_TITLE/g, title);
  defaultHtml = defaultHtml.replace(/\$OG_DESCRIPTION/g, description);
  defaultHtml = defaultHtml.replace(/\$OG_IMAGE/g, "/img/glima.jpg");

  // Cache modifyed file data in html variable
  html = data;

  // Start the server
  server.listen(port, () => console.log(`Listening on port ${port}`));
});
