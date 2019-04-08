import { api }  from "./helper";
import {
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_FAILURE,
    AUTH_CHECK_SUCCESS,

    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS
}               from "./types";


export const checkAuth = () => dispatch => {
    const request = api.post("/auth/check");

    request.then(response => {
        dispatch({
            type: AUTH_CHECK_SUCCESS,
            payload: response.data.data
        });
    });

    request.catch(error => {
        dispatch({
            type: AUTH_CHECK_FAILURE,
            payload: error
        });
    });

    return dispatch({
        type: AUTH_CHECK_REQUEST
    });
};


export const logIn = (credentials) => dispatch => {
    const request = api.post("auth/login", { data: credentials });

    // Success
    request.then(response => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data
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
