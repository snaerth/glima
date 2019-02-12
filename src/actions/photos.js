import fetchPhotos from "../services/photosService";
import {
  SET_PHOTOS,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_LOADING
} from "../constants/photos";

/**
 * Sets posts loading Redux state
 */
export function setPhotosLoading() {
  return {
    type: SET_PHOTOS_LOADING,
    payload: true
  };
}

/**
 * Gets posts and dispatches actions
 *
 * @param {String} slug - Wordpress Envira-gallery slug
 */
function getPhotos(slug) {
  return async dispatch => {
    try {
      // Fetch posts
      const data = await fetchPhotos(slug);

      if (data instanceof Error) {
        dispatch({
          type: SET_PHOTOS_ERROR,
          error: data
        });
      }

      dispatch({
        type: SET_PHOTOS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: SET_PHOTOS_ERROR,
        payload: error
      });
    }
  };
}

export default getPhotos;
