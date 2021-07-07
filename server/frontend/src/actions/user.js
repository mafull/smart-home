import { api }  from "./helper";

import {
    GET_USERS_REQUEST,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS
} from "../actions/types";


export const getUsers = () => dispatch => {
    const request = api.get("users");

    // Success
    request.then(response => {
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data.data
        });
    });

    // Failure
    request.catch(error => {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: error
        });
    });

    return dispatch({ type: GET_USERS_REQUEST });
};
