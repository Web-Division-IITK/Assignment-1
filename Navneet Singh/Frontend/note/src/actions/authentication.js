import { USER_LOADING,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";

import axios from "axios";

export const loaduser=()=> (dispatch,getState)=>{
    dispatch({type:USER_LOADING});

    const token= getState().auth.token;
    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization']=`Token ${token}`;
    }

    axios.get('/api/auth/user', config)
    .then(res =>{
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }).catch(err=>{
        dispatch({type:AUTH_ERROR});
    });
}
export const signin= (username,password) => dispatch => {

    const config ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
const body= JSON.stringify({ username, password });

    axios.post('/api/auth/login/',body, config)
    .then(res =>{
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err=>{
        dispatch({type:LOGIN_FAILED});
    });
}