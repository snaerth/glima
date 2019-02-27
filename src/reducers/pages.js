import {
  SET_PAGES,
  SET_PAGES_ERROR,
  SET_ACTIVE_PAGE,
  SET_PAGES_LOADING
} from "../constants/pages";

const initialState = {
  data: [],
  sortedData: [],
  totalPages: 0,
  page: null,
  error: false,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_PAGES:
      const { data, sortedData, totalPages } = action.payload;
      return {
        ...state,
        data,
        sortedData,
        totalPages,
        loading: false,
        error: false,
        page: null
      };

    case SET_PAGES_ERROR:
      return {
        ...state,
        error: action.payload,
        totalPages: 0,
        loading: false
      };

    case SET_ACTIVE_PAGE:
      return { ...state, page: action.payload, loading: false, error: false };

    case SET_PAGES_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export default posts;
