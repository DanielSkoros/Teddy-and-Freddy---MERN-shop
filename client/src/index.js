import React from 'react';
import ReactDOM from 'react-dom';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { BrowserRouter } from "react-router-dom";
import Routes from './routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

import Reducer from './reducers';

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

const storeWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);
export const store = storeWithMiddleware(
   Reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </AlertProvider>,
    document.getElementById('root'));