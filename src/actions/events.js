import fetchEvents from "../services/eventsService";
import {
  SET_EVENTS,
  SET_EVENTS_ERROR,
  SET_EVENTS_LOADING,
  SET_ACTIVE_EVENT,
  SET_EVENTS_PAGE
} from "../constants/events";

/**
 * Sets events loading Redux state
 * @param {Boolean} loading - Loading boolean state
 */
export function setEventsLoading(loading = true) {
  return {
    type: SET_EVENTS_LOADING,
    payload: loading
  };
}

/**
 * Sets active event
 * @param {Object} event - Wordpress event
 */
export function setActiveEvent(event) {
  return {
    type: SET_ACTIVE_EVENT,
    payload: event
  };
}

/**
 * Sets events pagination page in Redux state
 *
 * @param {Number} page - Pagination current page number
 */
export function setEventPage(page) {
  return {
    type: SET_EVENTS_PAGE,
    payload: page
  };
}

/**
 * Gets event and dispatches actions
 *
 * @param {String} id - Post id
 */
export function getEvent(id) {
  return async dispatch => {
    try {
      const { data } = await fetchEvents(null, id);

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_EVENTS_ERROR,
          payload: true
        });
      }

      return dispatch({
        type: SET_ACTIVE_EVENT,
        payload: data
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: SET_EVENTS_ERROR,
        payload: true
      });
    }
  };
}

/**
 * Gets events and dispatches actions
 * @param {Number} page - page number
 */
function getEvents(page) {
  return async dispatch => {
    try {
      // Fetch events
      const { data, totalPages } = await fetchEvents(page);

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_EVENTS_ERROR,
          payload: true
        });
      }

      return dispatch({
        type: SET_EVENTS,
        payload: {
          data: data.events,
          totalPages: Number(totalPages)
        }
      });
    } catch (error) {
      console.error(error);

      return dispatch({
        type: SET_EVENTS_ERROR,
        payload: true
      });
    }
  };
}

export default getEvents;
