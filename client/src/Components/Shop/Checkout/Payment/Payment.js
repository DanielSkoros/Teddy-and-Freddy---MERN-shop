import React, {Component} from 'react';
import classes from './Payment.module.css'
import Layout from "../../../../hoc/Layout";
import Paypal from "./Paypal";
import {successBuy} from "../../../../actions/User/userActions";
import {connect} from "react-redux";
import NoResult from "../../NoResult";
import {Redirect} from "react-router";

class Payment extends Component {
    state = {
        success: false,
        error: false,
        cancelled: false,
    };

    renderPaymentScreen = () => (
        <div className={classes.Card}>
            <div className={classes.cardContent}>
                <h1 className={classes.Heading}>Please make a following payment: </h1>
                <p>Total: <span>{this.props.location.state.total}$</span></p>
                <p>Account no: <span>xxxxxxxxxxxxxxxxxxxxx</span></p>
                <p>Title: <span>{this.props.location.state.id}</span></p>
            </div>
            <div className={classes.cardFooter}>
                <Paypal
                    toPay={this.props.location.state.total}
                    transactionError={data => this.transactionError(data)}
                    transactionCancelled={data => this.transactionCancelled(data)}
                    onSuccess={data => this.transactionSuccess(data)}
                />
            </div>
        </div>
    );

    render() {
        return (
            !this.props.location.state ?
                <Redirect to={'/'}/>
                :
            <Layout>
                {
                        this.state.error ? <NoResult content={'There was an error with your payment. Try again or do a bank transfer'} /> :
                            this.state.cancelled ? <NoResult content={'You have cancelled your payment. Try again or do a bank transfer'} /> :
                                this.state.success ? <NoResult success content={'Payment done. Now wait to receive your product'} /> : this.renderPaymentScreen()
                }
            </Layout>
        );
    }

    transactionError(data) {
        this.setState({
            error: true,
        })
    }

    transactionCancelled(data) {
        this.setState({
            cancelled: true,
        })
    }

    transactionSuccess(data) {
        this.props.dispatch(successBuy(this.props.location.state.id))
            .then(res => {
                localStorage.removeItem('cart')
                this.setState({
                    success: true
                })
            })
    }
}

export default connect()(Payment);