import axios from "axios";
import config from "../config";

const {
  INSTAGRAM_PHOTOS_COUNT,
  INSTAGRAM_USER_ID,
  INSTAGRAM_ACCESS_TOKEN
} = config;

/**
 * Gets Instagram most recent photos
 *
 * @returns {Object|Object<Error>}
 */
async function fetchInstagramPhotos() {
  try {
    const url = `https://api.instagram.com/v1/users/${INSTAGRAM_USER_ID}/media/recent?access_token=${INSTAGRAM_ACCESS_TOKEN}&count=${INSTAGRAM_PHOTOS_COUNT}`;
    const response = await axios.get(url);

    return {
      data: response.data
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

export default fetchInstagramPhotos;
