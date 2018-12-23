import axios from "axios";

import {
    GET_USERS,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS
} from "../actions/types";


export const getUsers = () => dispatch => {
    const request = axios.get("http://localhost:3010/api/user");

    request.then(response => {
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        });
    });
    request.catch(error => {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: error
        });
    });

    return dispatch({ type: GET_USERS });
};
