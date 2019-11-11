import React, {Component} from 'react';
import {connect} from "react-redux";
import classes from './UserDetail.module.css';
import OrderBlock from "../../../User/Orders/OrderBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../../Layout/Layout";
import {getUserInfo, getUserOrders} from "../../../../actions/Admin/adminActions";
import Loading from "../../../../helpers/Loading/Loading";


class UserDetail extends Component {

    state = {
        loading: true,
        orders: [],
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
                    }, () => console.log(this.state))
                }
            })
    }

    render() {
        return (
            this.state.loading && !this.props.user ? <Loading /> :
                <AdminLayout>
                    <div className={classes.container}>
                        <div className={classes.userContent}>
                            <div className={classes.mainIcon}>
                                <FontAwesomeIcon icon={faUserEdit}/>
                            </div>
                            <div className={classes.credentials}>
                                <h3>{this.props.user.lastName}</h3>
                                <h3>{this.props.user.name}</h3>
                            </div>
                            <div className={classes.ordersCount}>
                                <p style={{fontWeight: 'bold'}}>Orders: {this.state.orders.length}</p>
                            </div>
                            <div className={classes.ordersContainer}>
                                {
                                    this.state.orders.map(order => (
                                        <OrderBlock
                                            id={order._id}
                                            key={order._id}
                                            date={order.createdAt}
                                        />
                                    ))
                                }
                            </div>
                        </div>
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