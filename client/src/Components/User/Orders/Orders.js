import React, {Component} from 'react';
import classes from './Orders.module.css'
import Layout from "../../../hoc/Layout";
import OrderBlock from "./OrderBlock";
import {connect} from "react-redux";
import Table from "../../Admin/Dashboard/AdminTable/AdminTable";

import axios from 'axios'
import Loading from "../../../helpers/Loading/Loading";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        const data = {
            userId: this.props.user.userData.userId
        }
        axios.post(`/api/user/userOrders`, data)
            .then(res => {
                this.setState({
                    orders: res.data.userOrders,
                    loading: false,
                }, () => {
                    console.log(this.state.orders)
                })
            })
    }

    ordersColumns = [
        {
            id: "_id",
            label: "Order ID",
            colSize: "80px",
            dataType: "text"
        },
        {
            id: "createdAt",
            label: "Date",
            colSize: "100px",
            dataType: "date"
        },
        {
            id: "status",
            label: "Status",
            colSize: "80px"
        },
    ];
    render() {
        return (
           this.state.loading ? <Loading/> :
               <Layout>
                   <div className={classes.ordersContainer}>
                       <h1>Your orders</h1>
                       <Table data={this.state.orders}
                              columns={this.ordersColumns}
                              prefix={'user/order'} keyColumn={"id"}
                              title={"Your orders"} dtKey={'userOrders'}/>
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