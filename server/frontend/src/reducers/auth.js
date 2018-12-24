import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS
} from "../actions/types";


const authReducer = (state = {
    authenticating: false,
    user: null
}, action) => {
    switch (action.type) {
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
                user: null
            };
        default:
            return state;
    }
};


export default authReducer;
