import React, {Component} from 'react';
import {connect} from "react-redux";
import classes from './UserDetail.module.css';
import OrderBlock from "../../../User/Orders/OrderBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../../Layout/Layout";
import {getUserInfo, getUserOrders} from "../../../../actions/Admin/adminActions";
import Loading from "../../../../helpers/Loading/Loading";
import Table from "../../Dashboard/AdminTable/AdminTable";


class UserDetail extends Component {

    state = {
        loading: true,
        orders: [],
        ordersColumns: [
            {
                id: "_id",
                label: "Order ID",
                colSize: "80px",
                dataType: "text"
            },
            {
                id: "name",
                label: "First name",
                colSize: "50px"
            },
            {
                id: "lastName",
                label: "Last name",
                colSize: "50px",
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
        ],
    };

    componentDidMount() {
        this.componentMounted = true;

        this.props.dispatch(getUserInfo(this.props.match.params.id))
            .then(res => {
                if (this.componentMounted){
                    this.setState({
                        loading: false,
                    })
                }
            })
            .catch(err => err);

        this.props.dispatch(getUserOrders(this.props.match.params.id))
            .then(res => {
                if(this.componentMounted){
                    this.setState({
                        orders: res.payload
                    })
                }
            })
    }

    render() {
        return (
            this.state.loading && !this.props.user ? <Loading /> :
                <AdminLayout>
                    <div className={classes.container}>
                        {
                            this.state.orders ?
                                <Table
                                    data={this.state.orders}
                                    columns={this.state.ordersColumns}
                                    height={'600px'}
                                    prefix={'user/orders'} keyColumn={"id"}
                                    title={`${this.props.user.lastName} ${this.props.user.name}`}
                                    dtKey={'orders'}/> : null
                        }
                    </div>
                </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.admin.userInfo
    }
};

export default connect(mapStateToProps)(UserDetail);