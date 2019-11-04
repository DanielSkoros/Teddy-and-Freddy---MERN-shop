import * as actionTypes from './actionTypes';

import axios from 'axios';
import {USER_SERVER} from "../../helpers/serverURLs";

export const userLogin = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.LOGIN,
        payload: request,
    }
};

export const userLogout = () => {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(res => res.data)
        .catch(err => err);
    return {
        type: actionTypes.LOGOUT,
        payload: request
    }
};

export const userRegister = dataToSubmit => {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.REGISTER,
        payload: request
    }
};

export const Auth = () => {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(res => res.data);

    return {
        type: actionTypes.AUTH_USER,
        payload: request,
    }
};

export const placeOrder = dataToSubmit => {
    const request = axios.post(`${USER_SERVER}/orders`, dataToSubmit)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.CHECKOUT,
        payload: request
    }
};

export const updateHistory = orderId => {
    const data = {
        id: orderId
    };
    const request = axios.post(`${USER_SERVER}/updateHistory`, data)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.UPDATE_HISTORY,
        payload: request
    }
};

export const successBuy = orderId => {
    const data = {
        id: orderId
    };
    const request = axios.post(`${USER_SERVER}/purchaseSuccess`, data)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.SUCCESS_BUY,
        payload: request
    }
};

export const getOrderProducts = orderId => {
    const data = {
        id: orderId
    };
    const request = axios.post(`${USER_SERVER}/orderInfo`, data)
        .then(res => res.data)
        .catch(err => err);

    return {
        type: actionTypes.GET_ORDER_PRODUCTS,
        payload: request
    }
};