import {
  SET_EVENTS,
  SET_EVENTS_ERROR,
  SET_EVENTS_LOADING,
  SET_ACTIVE_EVENT
} from "../constants/events";

const initialState = {
  data: [],
  event: null,
  error: false,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, data: action.payload, loading: false, error: false };

    case SET_EVENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_ACTIVE_EVENT:
      return { ...state, event: action.payload };

    case SET_EVENTS_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export default posts;
