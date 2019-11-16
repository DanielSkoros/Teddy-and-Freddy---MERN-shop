import * as actionTypes from './actionTypes';

import axios from 'axios';
import {ADMIN_SERVER} from "../../helpers/serverURLs";

export const getOrdersList = () => {
    const request = axios.get(`${ADMIN_SERVER}/ordersList`)
        .then(res => res.data)
        .catch(err => err);
    return {
        type: actionTypes.GET_ORDERS_LIST,
        payload: request
    }
};

export const getUsersList = () => {
    const request = axios.get(`${ADMIN_SERVER}/usersList`)
        .then(res => res.data)
        .catch(err => err);
    return {
        type: actionTypes.GET_USERS_LIST,
        payload: request
    }
};

export const getUserInfo = id => {
    const data = {
        id
    };

    const request = axios.post(`${ADMIN_SERVER}/getUserInfo`, data)
        .then(res => res.data)
        .catch(err => err)

    return {
        type: actionTypes.GET_USER_INFO,
        payload: request
    }
};

export const getUserOrders = userId => {
    const data = {
        userId
    };
    const request = axios.post(`${ADMIN_SERVER}/getUserOrders`, data)
        .then(res => res.data)
        .catch(err => err);
    return {
        type: actionTypes.GET_USER_ORDERS,
        payload: request
    }
};