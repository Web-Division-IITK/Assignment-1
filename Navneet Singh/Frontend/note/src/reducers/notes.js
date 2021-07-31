import { GET_NOTES, DELETE_NOTES, ADD_NOTES } from "../actions/types.js"

const initialState={
    notes: []
}

export default function( state=initialState, action){
    switch (action.type){
        case GET_NOTES:
            return{
                ...state,
                notes: action.payload
            };
        case DELETE_NOTES:
            return{
               ...state,
               notes: state.notes.filter((note) => note.id !== action.payload) 
            };
        case ADD_NOTES:
            return{
                ...state,
                notes: [...state.notes, action.payload]
            };
        default:
            return state;
    }
}