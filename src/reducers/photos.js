import {
  SET_PHOTOS,
  SET_PHOTOS_PAGE,
  SET_PHOTOS_ERROR,
  SET_PHOTOS_LOADING,
  SET_ACITVE_ALBUM
} from "../constants/photos";

const initialState = {
  data: [],
  totalPages: 0,
  page: 1,
  error: null,
  loading: false,
  activeAlbum: null
};

function posts(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      const { data, totalPages } = action.payload;
      return { ...state, data, totalPages, loading: false };

    case SET_PHOTOS_ERROR:
      return {
        ...state,
        error: action.payload,
        totalPages: 0,
        loading: false
      };

    case SET_PHOTOS_LOADING:
      return { ...state, loading: action.payload };

    case SET_ACITVE_ALBUM:
      return { ...state, loading: false, activeAlbum: action.payload };

    case SET_PHOTOS_PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
}

export default posts;
