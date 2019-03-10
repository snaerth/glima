import fetchPhotos from "../services/photosService";
import {
  SET_PHOTOS,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_PAGE,
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
 * Sets photos pagination page in Redux state
 *
 * @param {Number} page - Pagination current page number
 */
export function setPhotosPage(page) {
  return {
    type: SET_PHOTOS_PAGE,
    payload: page
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
 * @param {Number} pageNumber - Pagination page number
 */
function getPhotos(slug, pageNumber) {
  return async (dispatch, getStore) => {
    try {
      const { photos } = getStore();

      // Check if photos has already be fetched
      if (photos.data.length > 0 && pageNumber === 1) {
        return null;
      }

      // Fetch posts
      const { data, totalPages } = await fetchPhotos(slug, pageNumber);

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_PHOTOS_ERROR,
          payload: true
        });
      }

      if (slug) {
        return dispatch({
          type: SET_ACITVE_ALBUM,
          payload: Array.isArray(data) && data.length > 0 ? data[0] : data
        });
      } else {
        return dispatch({
          type: SET_PHOTOS,
          payload: {
            data,
            totalPages: Number(totalPages)
          }
        });
      }
    } catch (error) {
      console.error(error);

      return dispatch({
        type: SET_PHOTOS_ERROR,
        payload: true
      });
    }
  };
}

export default getPhotos;
