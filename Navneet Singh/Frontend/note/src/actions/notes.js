import axios from "axios";
import { GET_NOTES, DELETE_NOTES, ADD_NOTES } from "./types";


//for fetching notes
export const getNotes = () => dispatch => {
    axios.get("/api/notes/")
    .then( (res) => {dispatch({
        type: GET_NOTES,
        payload: res.data
    });
    }).catch(
        err=> 
        console.log("something went wrong")
    );
};

//for deleting notes
export const deleteNotes = (id) => dispatch => {
    axios.delete(`/api/notes/${id}/`)
    .then( (res) => {dispatch({
        type: DELETE_NOTES,
        payload: id
    });
    }).catch(
        err=> 
        console.log("something went wrong")
    );
};

//for adding notes
export const addNotes = (title,description) => dispatch => {
    axios.post("/api/notes/",
    {
        "title": title,
        "description": description
    } )
    .then( (res) => {dispatch({
        type: ADD_NOTES,
        payload: res.data
    });
    }).catch(
        err=> 
        console.log("something went wrong")
    );
};