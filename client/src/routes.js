import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css'
import Landing from "./Components/Landing/Landing";
import Shop from "./Components/Shop/Shop";
import Login from "./Components/LogIn/Login";
import Register from "./Components/Register/Register";
import AddProduct from "./Components/Admin/AddProduct";
import ProductPage from "./Components/Shop/Product page/ProductPage";
import ShoppingCart from "./Components/Shop/ShoppingCart/ShoppingCart";
import Auth from './hoc/auth'
import Checkout from "./Components/Shop/Checkout/Checkout";
import Payment from './Components/Shop/Checkout/Payment/Payment'
import Dashboard from "./Components/User/Dashboard/Dashboard";
import Orders from "./Components/User/Orders/Orders";
import AdminDashboard from "./Components/Admin/Dashboard/Dashboard";
import Users from "./Components/Admin/Users/Users";
import UserDetail from "./Components/Admin/Users/UserDetail/UserDetail";
import Page404 from "./helpers/404/page404";
import EditProduct from "./Components/Admin/EditProduct/EditProduct";
const Routes = () => {

  return (
      <Switch>
        <Route exact path={'/'} component={Auth(Landing, null)} />
        <Route exact path={'/shop/:type'} component={Auth(Shop, null)} />
        <Route exact path={'/shop/:type/:id'} component={Auth(ProductPage, null)} />
        <Route exact path={'/account/login'} component={Auth(Login, false)} />
        <Route exact path={'/account/register'} component={Auth(Register, false)} />
        <Route exact path={'/user/shopingCart'} component={Auth(ShoppingCart, null)} />
        <Route exact path={'/user/checkout'} component={Auth(Checkout, null, false)}/>
        <Route exact path={'/user/checkout/payment'} component={Auth(Payment, null, false)} />
        <Route exact path={'/user/dashboard'} component={Auth(Dashboard, false)} />
        <Route exact path={'/user/orders'} component={Auth(Orders, false)} />


        <Route exact path={'/account/admin/add_product'} component={Auth(AddProduct, true, true)} />
        <Route exact path={'/account/admin/edit_product/:id'} component={Auth(EditProduct, true, true)} />
        <Route exact path={'/account/admin/users'} component={Auth(Users, true, true)} />
        <Route exact path={'/account/admin/user/:id'} component={Auth(UserDetail, true, true)} />
        <Route exact path={'/account/admin'} component={Auth(AdminDashboard, true, true)} />
        <Route component={Auth(Page404, null, false)} />
      </Switch>
  )
};
export default Routes;
