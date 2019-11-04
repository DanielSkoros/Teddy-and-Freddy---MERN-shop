import React, {Component} from 'react';
import AdminLayout from "../Layout/Layout";
import {connect} from "react-redux";
import {getOrdersCount, getUsersCount} from "../../../actions/Admin/adminActions";
import Loading from "../../../helpers/Loading/Loading";
import AdminBlock from "./AdminBlock/AdminBlock";
import {faEdit, faPlus, faTags, faUser} from "@fortawesome/free-solid-svg-icons";
import classes from "./Dashboard.module.css";

class AdminDashboard extends Component {

    state = {
        loading: true,
        usersCount: 0,
        ordersCount: 0,
    };

    componentDidMount() {
        this.componentMounted = true;

        this.props.dispatch(getUsersCount())
            .then(res => {
                if(this.componentMounted){
                    this.setState({
                        usersCount: res.payload.usersCount
                    }, () => {
                        this.props.dispatch(getOrdersCount())
                            .then(res => {
                                if(this.componentMounted){
                                    this.setState({
                                        ordersCount: res.payload.ordersCount,
                                        loading: false,
                                    })
                                }
                            });
                    })
                }
            });
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    render() {
        return (
            this.state.loading ? <Loading /> :
               this.props.user.userData.isAdmin ?
                   <AdminLayout>
                       {console.log(this.state)}
                       <div className={classes.container}>
                           <AdminBlock description={'Users'} count={this.state.usersCount} icon={faUser} linkto={`/account/admin/users`} />
                           <AdminBlock description={'Orders'} count={this.state.ordersCount} icon={faTags} linkto={`/account/admin/orders`} />
                           <AdminBlock description={'Add product'} icon={faPlus} linkto={`/account/admin/add_product`} />
                           <AdminBlock description={'Edit product'} icon={faEdit} linkto={`/account/admin/edit_product`} />
                       </div>
                   </AdminLayout>

                   : null
        );
    }
}

export default connect()(AdminDashboard);