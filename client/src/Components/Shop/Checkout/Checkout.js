import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import {generateData, isFormValid, updateForm} from "../../../helpers/Forms/formActions";
import classes from "../../Register/Register.module.css";
import orderClasses from './Checkout.module.css'
import FormField from "../../../helpers/Forms/FormField";
import StyledButton from "../../../helpers/Button/Button";
import {connect} from "react-redux";
import {placeOrder, updateHistory} from "../../../actions/User/userActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSmile} from "@fortawesome/free-solid-svg-icons/faSmile";
import {Link} from "react-router-dom";
import Login from "../../LogIn/Login";
import {Redirect} from "react-router-dom";

class Checkout extends Component {
    state = {
        unwantedEntry: false,
        orderSuccess: false,
        id: null,
        formError: false,
        formSuccess: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Enter your last name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            address: {
                element: 'input',
                value: '',
                config: {
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter your address'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    };

    componentDidMount() {
        if(!localStorage.getItem('cart')){
            this.setState({
                unwantedEntry: true,
            })
        }
    }

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'checkout');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    onSubmit = event => {
        event.preventDefault();
        const formData = generateData(this.state.formData, 'checkout');
        const {name, lastName, address, email} = formData;
        const { userId } = this.props.user.userData;
        const formIsValid = isFormValid(this.state.formData, 'checkout');
        const { products } = this.props.location.state;
        const dataToSubmit = {
            name,
            lastName,
            address,
            email,
            products,
            userId
        };

        if(formIsValid) {
           this.props.dispatch(placeOrder(dataToSubmit))
               .then(res => {
                   this.setState({id: res.payload.order._id});
                   this.props.dispatch(updateHistory(res.payload.order._id))
                       .then(res => {
                           this.setState({
                               orderSuccess: true,
                           }, () => localStorage.removeItem('cart'))
                       })
               })
        }else {
            this.setState({
                formError: true
            })
        }
    };

    renderForm = () => (
        <>
            <h1 className={classes.heading}>Your credentials</h1>
            <div className={classes.formContainer}>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <FormField
                        id={'email'}
                        formData={this.state.formData.email}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'name'}
                        formData={this.state.formData.name}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'lastName'}
                        formData={this.state.formData.lastName}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'address'}
                        formData={this.state.formData.address}
                        change={element => this.onChange(element)}
                    />
                    {this.state.formError ?
                        <div className={classes.errorLabel}>
                            Please check your data
                        </div>
                        :null }
                    <div className={classes.buttonsContainer}>
                        <StyledButton clicked={this.onSubmit} content={'Continue'}/>
                    </div>
                </form>
            </div>
        </>
    );

    renderOrderSuccessScreen = () => (
            <div className={orderClasses.orderSuccess}>
                <div className={orderClasses.orderSuccesIcon}>
                    <FontAwesomeIcon icon={faSmile}/>
                </div>
                <h2>Order placed successfully</h2>
                <Link to={{
                    pathname: '/user/checkout/payment',
                    state: {
                        id: this.state.id,
                        total: this.props.location.state.total,
                    }
                }}>
                    <StyledButton content={'Payment'} />
                </Link>
            </div>
    );

    render() {

        return (
            !this.props.location.state ?
                <Redirect to={'/'}/>
                :
            <Layout no>
                {
                    !this.props.user.userData.isAuth ? <Login /> :
                        !this.state.orderSuccess ? this.renderForm() : this.renderOrderSuccessScreen()
                }
            </Layout>
        );
    }
}


export default connect()(Checkout);