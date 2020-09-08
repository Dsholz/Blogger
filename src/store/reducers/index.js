import posts from "../reducers/posts";
import user from "../reducers/user";
import { combineReducers } from "redux";

export default combineReducers({ user, posts });
