import { combineReducers } from "redux";
import notes from "./notes.js";
import auth from "./auth";

export default combineReducers({
    notes,
    auth
});