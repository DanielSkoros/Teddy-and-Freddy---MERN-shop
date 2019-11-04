import React, {Component} from 'react';
import classes from './Login.module.css'
import Layout from "../../hoc/Layout";
import StyledButton from "../../helpers/Button/Button";
import FormField from "../../helpers/Forms/FormField";
import Fade from 'react-reveal';
import { updateForm, generateData, isFormValid } from "../../helpers/Forms/formActions";
import {userLogin} from "../../actions/User/userActions";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import Register from "../Register/Register";


class Login extends Component {
    state = {
        desktop: window.innerWidth >= 768,
        login: true,
        formError: false,
        formSuccess: '',
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
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
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

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'login');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    onSubmit = event => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formData, 'login');
        const formIsValid = isFormValid(this.state.formData, 'login');

        if(formIsValid) {
            this.props.dispatch(userLogin(dataToSubmit))
                .then(res => {
                    if (res.payload.loginSuccess){
                        this.props.history.push('/')
                    }else {
                        this.setState({
                            formError: true,
                        })
                    }
                })
        }else {
            this.setState({
                formError: true
            })
        }
    };

    changeType = () => {
        this.setState((prevState) =>( {
            login: !prevState.login
        }))
    };

    renderLogin = () => (
          <Fade bottom>
                <div className={classes.formContainer}>
                    <h1 className={classes.heading}>Log In</h1>
                    <form onSubmit={this.onSubmit}>
                        <FormField
                            id={'email'}
                            formData={this.state.formData.email}
                            change={element => this.onChange(element)}
                        />
                        <FormField
                            id={'password'}
                            formData={this.state.formData.password}
                            change={element => this.onChange(element)}
                        />
                        {this.state.formError ?
                            <div className={classes.errorLabel}>
                                Please check your data
                            </div>
                            :null }
                        <div className={classes.buttonsContainer}>
                            <StyledButton clicked={this.onSubmit} content={'Login'} linkto={''}/>
                        </div>
                        <div className={classes.switchType}>OR</div>
                        <div className={classes.buttonsContainerCenter} onClick={this.changeType}>
                            <StyledButton  content={'Register'}/>
                        </div>
                    </form>
                </div>
          </Fade>
    );

    render() {
        return (
            <Layout>
                {this.props.user.success ? 'You can now log in' : null}
                <div className={classes.logInContainer}>
                    <div className={classes.logInPhoto}>

                    </div>
                    {this.state.login ? this.renderLogin() : <Register changeType={this.changeType}/>}
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(withRouter(Login));