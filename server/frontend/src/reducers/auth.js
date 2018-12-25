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
} from "../actions/types";


const authReducer = (state = {
    authenticating: false,
    loggedIn: null,
    user: null
}, action) => {
    switch (action.type) {
        case AUTH_CHECK_REQUEST:
            return {
                ...state,
                authenticating: true
            };
        case AUTH_CHECK_SUCCESS:
            return {
                ...state,
                authenticating: false,
                loggedIn: action.payload
            };
        case AUTH_CHECK_FAILURE:
            return {
                ...state,
                authenticating: false
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                authenticating: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                loggedIn: true,
                user: action.payload
            };
        case LOGOUT_REQUEST:
            return {
                ...state
            };
        case LOGOUT_FAILURE:
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedOut: true,
                user: null
            };
        default:
            return state;
    }
};


export default authReducer;
