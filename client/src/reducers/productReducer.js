import * as actionTypes from '../actions/Products/actionTypes';

export default function (state = [], action){
    switch(action.type){
        case(actionTypes.GET_BRANDS):
            return {
                ...state,
                brands: action.payload
            };
        case(actionTypes.GET_TYPES):
            return {
                ...state,
                types: action.payload
            };
        case(actionTypes.GET_MATERIALS):
            return {
                ...state,
                materials: action.payload
            };
        case(actionTypes.ADD_PRODUCT):
            return {
                ...state,
                product: action.payload
            };
        case(actionTypes.GET_PRODUCTS):
            return {
                ...state,
                articles: action.payload.articles,
                size: action.payload.size
            };
        case(actionTypes.GET_PRODUCTS_BY_ID):
            return {
                ...state,
                item: action.payload
            };
        default: return state;

    }
}