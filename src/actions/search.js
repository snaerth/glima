import {
  SET_SEARCH_VALUE,
  SET_SEARCH_DATA,
  SET_SEARCH_LOADING,
  SET_SEARCH_ERROR
} from "../constants/search";
import searchAll from "../services/searchService";

/**
 * Sets search loading Redux state
 */
export function setSearchLoading() {
  return {
    type: SET_SEARCH_LOADING,
    payload: true
  };
}

/**
 * Sets search value
 * @param {String} val - Search value
 */
export function setSearchValue(val) {
  return {
    type: SET_SEARCH_VALUE,
    payload: val
  };
}

function search(value) {
  return async dispatch => {
    const data = await searchAll(value);

    if (data instanceof Error) {
      console.error(data);

      return dispatch({
        type: SET_SEARCH_ERROR,
        payload: true
      });
    }

    return dispatch({
      type: SET_SEARCH_DATA,
      payload: data
    });
  };
}

export default search;
