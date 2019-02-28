import { SET_SEARCH_VALUE } from "../constants/search";

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
