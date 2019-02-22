import fetchCategories from "../services/categoriesService";
import {
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING
} from "../constants/categories";

/**
 * Sets CATEGORIES loading Redux state
 */
export function setCategoriesLoading() {
  return {
    type: SET_CATEGORIES_LOADING,
    payload: true
  };
}

/**
 * Gets categories and dispatches actions
 * @param {String} slug - Category slug
 */
function getCategories(slug = "") {
  return async (dispatch, getStore) => {
    try {
      const { categories } = getStore();

      // Check if categories has already be fetched
      if (categories.data.length > 0) {
        return categories.data;
      }

      // Fetch categories
      const { data } = await fetchCategories(slug);

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_CATEGORIES_ERROR,
          payload: true
        });
      }

      dispatch({
        type: SET_CATEGORIES,
        payload: data
      });

      return data;
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_CATEGORIES_ERROR,
        payload: true
      });
    }
  };
}

export default getCategories;
