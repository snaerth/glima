import {
  SET_EVENTS,
  SET_EVENTS_ERROR,
  SET_EVENTS_LOADING,
  SET_ACTIVE_EVENT,
  SET_EVENTS_PAGE
} from "../constants/events";

const initialState = {
  data: [],
  totalPages: 0,
  page: 1,
  event: null,
  error: false,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      const { data, totalPages } = action.payload;
      return {
        ...state,
        totalPages,
        data,
        loading: false,
        error: false,
        event: null
      };

    case SET_EVENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        event: null
      };

    case SET_ACTIVE_EVENT:
      return { ...state, event: action.payload, loading: false, error: false };

    case SET_EVENTS_LOADING:
      return { ...state, loading: action.payload };

    case SET_EVENTS_PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
}

export default posts;
