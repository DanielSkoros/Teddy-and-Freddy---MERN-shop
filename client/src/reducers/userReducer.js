import * as actionTypes from '../actions/User/actionTypes';
export default function (state = {}, action) {
    switch (action.type) {
        case (actionTypes.REGISTER):
            return {
                ...state,
                registerSuccess: action.payload.registerSuccess,
            };
        case (actionTypes.LOGIN):
            return {
                ...state,
                loginSuccess: action.payload.loginSuccess,
            };
        case(actionTypes.AUTH_USER):
            return {
                ...state,
                userData: action.payload,
            };
        case(actionTypes.CHECKOUT):
            return {
                ...state,
                checkout: action.payload,
            };
        case(actionTypes.UPDATE_HISTORY):
            return {
                ...state,
                history: action.payload,
            };
            case(actionTypes.SUCCESS_BUY):
            return {
                ...state,
                success: action.payload,
            };
        case(actionTypes.GET_ORDER_PRODUCTS):
            return {
                ...state,
                orderInfo: action.payload
            };
        case(actionTypes.LOGOUT):
            return {
                ...state,
                userData: [],
            };
        default: return state;
    }
}