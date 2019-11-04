import { combineReducers } from "redux";
import user from './userReducer'
import product from './productReducer'
import admin from './adminReducer'

const rootReducer = combineReducers({
    user,
    product,
    admin
});

export default rootReducer;