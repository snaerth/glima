import { combineReducers } from "redux";
import posts from "./posts";

const rootReducer = combineReducers({
  blog: posts
});

export default rootReducer;
