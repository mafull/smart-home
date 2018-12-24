import { api }  from "./helper";
import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS
}               from "./types";


export const logIn = (credentials) => dispatch => {
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
    const request = api.post("auth/logout");

    // Success
    request.then(response => {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    });

    // Failure
    request.catch(error => {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error
        });
    })

    return dispatch({ type: LOGOUT_REQUEST });
};
