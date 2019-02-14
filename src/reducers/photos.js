import {
  SET_PHOTOS,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_LOADING,
  SET_ACITVE_ALBUM
} from "../constants/photos";

const initialState = {
  data: [],
  error: null,
  loading: false,
  activeAlbum: null
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, data: action.payload, loading: false };

    case SET_PHOTOS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_PHOTOS_LOADING:
      return { ...state, loading: action.payload };

    case SET_ACITVE_ALBUM:
      return { ...state, loading: false, activeAlbum: action.payload };

    default:
      return state;
  }
}

export default posts;
