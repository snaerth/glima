import fetchPhotos from "../services/photosService";
import {
  SET_PHOTOS,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_LOADING,
  SET_ACITVE_ALBUM
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
 * Sets active photo album id
 * @param {Number} id - Photo album id
 * @param {String} slug - Photo album slug
 */
export function setActiveAlbum(id, slug) {
  return async (dispatch, getStore) => {
    const store = getStore();
    const photos = store.photos.data.filter(
      album => album.id === id && album.slug === slug
    );

    dispatch({
      type: SET_ACITVE_ALBUM,
      payload: photos && photos.length === 1 ? photos[0] : null
    });
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

      if (slug) {
        dispatch({
          type: SET_ACITVE_ALBUM,
          payload: Array.isArray(data) && data.length > 0 ? data[0] : data
        });
      } else {
        dispatch({
          type: SET_PHOTOS,
          payload: data
        });
      }
    } catch (error) {
      dispatch({
        type: SET_PHOTOS_ERROR,
        payload: error
      });
    }
  };
}

export default getPhotos;
