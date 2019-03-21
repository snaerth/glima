import {
  SET_INSTAGRAM_PHOTOS,
  SET_INSTAGRAM_ERROR,
  SET_INSTAGRAM_LOADING
} from "../constants/instagram";

const initialState = {
  data: [],
  error: false,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_INSTAGRAM_PHOTOS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false
      };

    case SET_INSTAGRAM_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_INSTAGRAM_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export default posts;
