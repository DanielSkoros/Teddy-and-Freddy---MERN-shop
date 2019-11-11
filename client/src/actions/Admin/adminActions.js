import * as actionTypes from './actionTypes';

import axios from 'axios';
import {ADMIN_SERVER} from "../../helpers/serverURLs";

export const getTodos = () => {
    const request = axios.get(`${ADMIN_SERVER}/getTodo`)
        .then(res => res.data)
        .catch(err => err)
    return {
        type: actionTypes.GET_TODO,
        payload: request
    }
}

export const addTodo = (todo) => {
    const data = {
        todo
    };
    const request = axios.post(`${ADMIN_SERVER}/addTodo`, data)
        .then(res => res.data)
        .catch(err => err)
    return {
        type: actionTypes.ADD_TODO,
        payload: request
    }
};

export const deleteTodo = (id) => {
    console.log(id)
    const request = axios.delete(`${ADMIN_SERVER}/deleteTodo`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        params: {id}
    })
        .then(res => res.data)
        .catch(err => err)
    return {
        type: actionTypes.DELETE_TODO,
        payload: request
    }
}

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