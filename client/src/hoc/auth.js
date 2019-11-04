import React, {Component} from 'react';
import {connect} from "react-redux";
import { Auth as auth} from '../actions/User/userActions';
import Loading from "../helpers/Loading/Loading";

export default function (ComposedClass, reload, adminRoute = null) {
    class AuthCheck extends Component {

        state = {
            loading: true,
        };

        componentDidMount() {
            this.componentMounted = true;
            this.props.dispatch(auth())
                .then(res => {
                    let user = this.props.user.userData;
                    if(!user.isAuth){
                        if(reload){
                            this.props.history.push("/account/login");
                        }
                    }else{
                        if(adminRoute && !user.isAdmin){
                            this.props.history.push('/user/dashboard')
                        }else{
                            if(reload === false){
                                this.props.history.push('/user/dashboard')
                            }
                        }
                    }
                    if(this.componentMounted){
                        this.setState({
                            loading: false,
                        })
                    }
                })
        }

        componentWillUnmount() {
            this.componentMounted = false;
        }

        render() {
            if(this.state.loading){
                return (
                    <div className={"main_loader"}>
                        <Loading/>
                    </div>
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user,
        }
    };


    return connect(mapStateToProps)(AuthCheck)
}


