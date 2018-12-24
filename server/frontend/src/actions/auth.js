import { api }  from "./helper";
import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT
}               from "./types";


export const attemptLogin = (credentials) => dispatch => {
    const request = api.post(
        "auth/login",
        credentials,
        {
            withCredentials: true
        }
    );

    // Success
    request.then(response => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.user
        });
    });

    // Failure
    request.catch(error => {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error
        });
    });

    return dispatch({ type: LOGIN_REQUEST });
};


export const logOut = () => dispatch => {
    return dispatch({ type: LOGOUT });
};
