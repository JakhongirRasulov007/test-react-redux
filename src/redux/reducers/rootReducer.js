import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import dialogReducer from "./dialogReducer";

export default combineReducers({ usersReducer, dialogReducer });
