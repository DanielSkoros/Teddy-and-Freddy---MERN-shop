import * as actionTypes from './actionTypes';

import axios from 'axios';
import {PRODUCT_SERVER} from "../../helpers/serverURLs";

export const getBrands = () => {
  const request = axios.get(`${PRODUCT_SERVER}/brands`)
      .then(res => res.data);
  return {
      type: actionTypes.GET_BRANDS,
      payload: request
  }
};

export const getTypes = () => {
    const request = axios.get(`${PRODUCT_SERVER}/types`)
        .then(res => res.data);
    return {
        type: actionTypes.GET_TYPES,
        payload: request
    }
};

export const getMaterials = () => {
    const request = axios.get(`${PRODUCT_SERVER}/materials`)
        .then(res => res.data);
    return {
        type: actionTypes.GET_MATERIALS,
        payload: request
    }
};

export const addProduct = data => {
    const request = axios.post(`${PRODUCT_SERVER}/article`, data)
        .then(res => res.data);
    return {
        type: actionTypes.ADD_PRODUCT,
        payload: request
    }
};

export const getProductsByType = (filters, skip, limit, sortBy, order, prevState = []) => {
    const data = {
        filters,
        skip,
        limit,
        sortBy,
        order
    };
    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(res => {
            let newState = [
                ...prevState,
                ...res.data.articles
            ];
            return {
                articles: newState,
                size: res.data.articles.length
            }
            }
        );
    return {
        type: actionTypes.GET_PRODUCTS,
        payload: request
    }
};

export const getProductById = id => {
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id/${id}`)
        .then(res => res.data);

    return {
        type: actionTypes.GET_PRODUCTS_BY_ID,
        payload: request
    }
};
