import fetchInstagramPhotos from "../services/instagramService";
import {
  SET_INSTAGRAM_PHOTOS,
  SET_INSTAGRAM_ERROR,
  SET_INSTAGRAM_LOADING
} from "../constants/instagram";

/**
 * Sets CATEGORIES loading Redux state
 */
export function setInstagramLoading() {
  return {
    type: SET_INSTAGRAM_LOADING,
    payload: true
  };
}

/**
 * Gets Instgram photos and dispatches actions
 */
function getInstagramPhotos() {
  return async dispatch => {
    try {
      // Fetch Instagram photos
      const { data } = await fetchInstagramPhotos();

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_INSTAGRAM_ERROR,
          payload: true
        });
      }

      dispatch({
        type: SET_INSTAGRAM_PHOTOS,
        payload: data
      });

      return data;
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_INSTAGRAM_ERROR,
        payload: true
      });
    }
  };
}

export default getInstagramPhotos;
