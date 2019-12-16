import React, {Component} from 'react';
import AdminLayout from "../Layout/Layout";
import UserListBlock from "./UserBlock/UserBlock";

import classes from '../Dashboard/Dashboard.module.css'
import Loading from "../../../helpers/Loading/Loading";
import {connect} from "react-redux";
import {getUsersList} from "../../../actions/Admin/adminActions";
import Table from "../Dashboard/AdminTable/AdminTable";
class Users extends Component {

    state = {
        loading: false,
        userColumns: [
            {
                id: "_id",
                label: "User ID",
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
        ]
    };

    render() {
        return (
            this.state.loading ? <Loading/> :
                <AdminLayout>
                    <div className={classes.containerUser}>
                           <Table
                               data={this.props.location.state.data}
                               columns={this.state.userColumns}
                               keyColumn={"id"} title={'User list'}
                               height={'600px'}
                               dtKey={'userList'}   prefix={'account/admin/user'}/>
                    </div>
                </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersList: state.admin
    }
};

export default connect(mapStateToProps)(Users);