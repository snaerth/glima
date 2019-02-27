import { combineReducers } from "redux";
import posts from "./posts";
import photos from "./photos";
import events from "./events";
import categories from "./categories";
import pages from "./pages";

const rootReducer = combineReducers({
  blog: posts,
  photos,
  events,
  categories,
  pages
});

export default rootReducer;
