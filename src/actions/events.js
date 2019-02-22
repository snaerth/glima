import fetchEvents from "../services/eventsService";
import {
  SET_EVENTS,
  SET_EVENTS_ERROR,
  SET_EVENTS_LOADING,
  SET_ACTIVE_EVENT
} from "../constants/events";

/**
 * Sets events loading Redux state
 */
export function setEventsLoading() {
  return {
    type: SET_EVENTS_LOADING,
    payload: true
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
 * Gets event and dispatches actions
 *
 * @param {String} id - Post id
 */
export function getEvent(id) {
  return async dispatch => {
    try {
      const { data } = await fetchEvents(id);

      if (data instanceof Error) {
        dispatch({
          type: SET_EVENTS_ERROR,
          payload: data
        });
      }

      dispatch({
        type: SET_ACTIVE_EVENT,
        payload: data
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_EVENTS_ERROR,
        payload: true
      });
    }
  };
}

/**
 * Gets events and dispatches actions
 */
function getEvents() {
  return async dispatch => {
    try {
      // Fetch posts with categories type events
      const { data } = await fetchEvents();

      if (data instanceof Error) {
        console.error(data);

        return dispatch({
          type: SET_EVENTS_ERROR,
          payload: true
        });
      }

      dispatch({
        type: SET_EVENTS,
        payload: data.events
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: SET_EVENTS_ERROR,
        payload: true
      });
    }
  };
}

export default getEvents;
