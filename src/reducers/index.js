import { combineReducers } from "redux";
import blog from "./posts";
import photos from "./photos";
import events from "./events";
import pages from "./pages";
import search from "./search";

const rootReducer = combineReducers({
  blog,
  photos,
  events,
  pages,
  search
});

export default rootReducer;
