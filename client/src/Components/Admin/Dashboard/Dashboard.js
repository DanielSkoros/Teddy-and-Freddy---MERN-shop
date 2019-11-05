import React, {Component} from 'react';
import AdminLayout from "../Layout/Layout";
import {connect} from "react-redux";
import {getOrdersList, getUsersList} from "../../../actions/Admin/adminActions";
import Loading from "../../../helpers/Loading/Loading";
import AdminBlock from "./AdminBlock/AdminBlock";
import {faEdit, faPlus, faTags, faUser} from "@fortawesome/free-solid-svg-icons";
import classes from "./Dashboard.module.css";
import Table from "./AdminTable/AdminTable";

class AdminDashboard extends Component {

    state = {
        loading: true,
        orders: null,
        users: null,
        usersCount: 0,
        ordersCount: 0,
        total: 0,
    };

    componentDidMount() {
        this.componentMounted = true;

        const users = this.props.dispatch(getOrdersList()).then(res => {
            if(this.componentMounted){
                this.setState({
                    orders: res.payload.ordersList.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                })
            }
        });

        const orders = this.props.dispatch(getUsersList()).then(res => {
            if(this.componentMounted){
                this.setState({
                    users: res.payload.usersList
                })
            }
        });

        Promise.all([users, orders])
            .then(() => this.setState({
                ordersCount: this.state.orders.length,
                usersCount: this.state.users.length,
                loading: false,
            }, () => console.log(this.state.orders)))
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }



    render() {
        return (
            this.state.loading ? <Loading /> :
               this.props.user.userData.isAdmin ?
                   <AdminLayout>
                       <div className={classes.container}>
                           <AdminBlock description={'Users'} count={this.state.usersCount} icon={faUser} linkto={`/account/admin/users`} />
                           <AdminBlock description={'Orders'} count={this.state.ordersCount} icon={faTags} linkto={`/account/admin/orders`} />
                           <AdminBlock description={'Add product'} icon={faPlus} linkto={`/account/admin/add_product`} />
                           <AdminBlock description={'Edit product'} icon={faEdit} linkto={`/account/admin/edit_product`} />
                       </div>
                           <div className={classes.ordersContainer}>
                               {
                                   this.state.orders ? <Table data={this.state.orders.slice(0, 5)}/> : null
                               }
                           </div>
                   </AdminLayout>

                   : null
        );
    }
}

export default connect()(AdminDashboard);