import * as actionTypes from '../actions/Admin/actionTypes';

export default function (state = [], action) {
    switch(action.type){
        case(actionTypes.GET_USERS_COUNT):
            return {
                ...state,
                usersCount: action.payload,
            };
        case(actionTypes.GET_ORDERS_COUNT):
            return {
                ...state,
                ordersCount: action.payload,
            };
        case(actionTypes.GET_USERS_LIST):
            return {
                ...state,
                usersList: action.payload,
            };
        case(actionTypes.GET_ORDERS_LIST):
            return {
                ...state,
                ordersList: action.payload,
            };
        case(actionTypes.EDIT_PRODUCT):
            return {
                ...state,
                product: action.payload,
            };
        case(actionTypes.GET_USER_INFO):
            return {
                ...state,
                userInfo: action.payload
            };
        case(actionTypes.GET_USER_ORDERS):
            return {
                ...state,
                userOrders: action.payload
            };
        default: return state;
    }
}