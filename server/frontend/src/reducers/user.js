import {
    GET_USERS_REQUEST,
    GET_USERS_FAILURE,
    GET_USERS_SUCCESS
} from "../actions/types";


const userReducer = (state = {
    error: null,
    loading: false,
    users: []
}, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        default:
            return state;
    }
};


export default userReducer;
