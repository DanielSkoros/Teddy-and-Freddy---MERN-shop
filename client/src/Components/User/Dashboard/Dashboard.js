import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import UserBlock from "./UserBlock/UserBlock";
import {faTags, faUserCircle, faEnvelope, faUser, faEject} from "@fortawesome/free-solid-svg-icons";

import classes from './Dashboard.module.css'
import {connect} from "react-redux";
import {userLogout} from "../../../actions/User/userActions";

class Dashboard extends Component {

    renderUser = () => (
        <div className={classes.container}>
            <UserBlock description={'Check my orders'} linkto={'/user/orders'} icon={faTags}/>
            <UserBlock description={'Change account details'} linkto={'/user/credentials'} icon={faUserCircle}/>
            <UserBlock description={'Get in touch with us'} linkto={'/contact'} icon={faEnvelope}/>
            <div onClick={this.logoutUser}>
                <UserBlock description={'Log Out'}  icon={faEject} linkto={'/'}/>
            </div>
        </div>
    );

    renderAdmin = () => (
        <div className={classes.container}>
            <UserBlock description={'Open admin panel'} linkto={'/account/admin'} icon={faUser}/>
            <div onClick={this.logoutUser}>
            <UserBlock description={'Log Out'}  icon={faEject} linkto={'/'}/>
            </div>
        </div>
    );

    logoutUser = () => {
        userLogout()
    };

    render() {
        return (
            <Layout>
               <div className={classes.descContainer}>
                   <h1>What would you like to do?</h1>
               </div>
                <div>
                    {
                        this.props.user.userData.isAdmin ? null :
                            this.renderUser()
                    }
                    {
                        this.props.user.userData.isAdmin ? this.renderAdmin() : null
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

export default connect(mapStateToProps)(Dashboard);