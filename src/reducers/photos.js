import {
  SET_PHOTOS,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_LOADING
} from "../constants/photos";

const initialState = {
  photos: [],
  error: null,
  loading: false
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: action.payload, loading: false };

    case SET_PHOTOS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_PHOTOS_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export default posts;
