import React, {Component} from 'react';
import classes from './Orders.module.css'
import Layout from "../../../hoc/Layout";
import OrderBlock from "./OrderBlock";
import {connect} from "react-redux";

class Orders extends Component {


    render() {
        return (
           <Layout>
               <div className={classes.ordersContainer}>
                   <h1>Your orders</h1>
                   {
                       this.props.user.userData.history.map(order => (
                           <OrderBlock key={order.id} id={order.id} date={order.date}/>
                       ))
                   }
               </div>
           </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Orders);