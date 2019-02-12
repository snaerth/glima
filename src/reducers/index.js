import { combineReducers } from "redux";
import posts from "./posts";
import photos from "./photos";

const rootReducer = combineReducers({
  blog: posts,
  photos
});

export default rootReducer;
