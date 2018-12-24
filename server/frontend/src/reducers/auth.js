import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT
} from "../actions/types";


const authReducer = (state = {
    attemptingLogin: false,
    token: null
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                attemptingLogin: true
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                attemptingLogin: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                attemptingLogin: false,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};


export default authReducer;
