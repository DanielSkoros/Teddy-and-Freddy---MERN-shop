import React, {Component} from 'react';
import AdminLayout from "../Layout/Layout";
import UserListBlock from "./UserBlock/UserBlock";

import classes from '../Dashboard/Dashboard.module.css'
import Loading from "../../../helpers/Loading/Loading";
import {connect} from "react-redux";
import {getUsersList} from "../../../actions/Admin/adminActions";
class Users extends Component {

    state = {
        loading: true,
    };

    componentDidMount() {
        this.componentMounted = true;
        this.props.dispatch(getUsersList())
            .then(res => {
                if(this.componentMounted){
                    this.setState({
                        loading: false
                    })
                }
            })
            .catch(err => err);
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    renderUserBlocks = () => (
        this.props.usersList.usersList.map(user => (
            <UserListBlock
              key={user._id}
              name={user.name}
              lastName={user.lastName}
              linkto={`/account/admin/user/${user._id}`}
              id={user._id}
              ordersCount={user.history.length}
            />
        ))
    );

    render() {
        return (
            this.state.loading ? <Loading/> :
                <AdminLayout>
                    <h2 className={classes.heading}>Users list</h2>
                    <div className={classes.container}>
                        {
                            this.props.usersList ? this.renderUserBlocks() : null
                        }
                    </div>
                </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersList: state.admin.usersList
    }
};

export default connect(mapStateToProps)(Users);