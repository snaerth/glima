import fetchPages, { fetchPage } from "../services/pagesService";
import {
  SET_PAGES,
  SET_PAGES_ERROR,
  SET_ACTIVE_PAGE,
  SET_PAGES_LOADING
} from "../constants/pages";

/**
 * Sets pages loading Redux state
 */
export function setPagesLoading() {
  return {
    type: SET_PAGES_LOADING,
    payload: true
  };
}

/**
 * Sets active page
 * @param {Object} page - Wordpress page
 */
export function setActivePage(page) {
  return {
    type: SET_ACTIVE_PAGE,
    payload: page
  };
}

/**
 * Sorts pages from request. If pages
 * @param {Array<Object>} pages - Wordpress pages array
 * @returns {Array<Object>} new pages with new children prop array
 */
function sortPages(pages) {
  const hasParentPages = [];
  const sortedPages = [];

  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];

    if (page.parent > 0) {
      hasParentPages.push(page);
    } else {
      sortedPages.push(page);
    }
  }

  for (let i = 0; i < sortedPages.length; i++) {
    const childrenPages = hasParentPages.filter(
      p => p.parent === sortedPages[i].id
    );

    if (childrenPages.length > 0 && sortedPages[i].children) {
      sortedPages[i].children = sortedPages[i].children.concat(childrenPages);
    } else if (childrenPages.length > 0) {
      sortedPages[i].children = childrenPages;
    }
  }

  return sortedPages;
}

/**
 * Gets pages and dispatches actions
 *
 * @param {Number} pageNumber - Posts Rest API page number
 */
function getPages(pageNumber = 1) {
  return async dispatch => {
    try {
      // Fetch pages
      const { data, totalPages } = await fetchPages(pageNumber);

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_PAGES_ERROR,
          payload: true
        });
      }

      return dispatch({
        type: SET_PAGES,
        payload: {
          data,
          sortedData: sortPages(data),
          totalPages: Number(totalPages)
        }
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_PAGES_ERROR,
        payload: true
      });
    }
  };
}

/**
 * Gets page and dispatches actions
 *
 * @param {String} id - Page id
 */
export function getPage(id) {
  return async dispatch => {
    try {
      const payload = await fetchPage(id);

      if (payload instanceof Error) {
        dispatch({
          type: SET_PAGES_ERROR,
          payload
        });
      }

      return dispatch(setActivePage(payload));
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_PAGES_ERROR,
        payload: true
      });
    }
  };
}

export default getPages;
