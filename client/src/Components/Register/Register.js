import React, {Component} from 'react';
import classes from '../LogIn/Login.module.css'
import StyledButton from "../../helpers/Button/Button";
import FormField from "../../helpers/Forms/FormField";
import Fade from 'react-reveal';
import { updateForm, generateData, isFormValid } from "../../helpers/Forms/formActions";
import {userRegister} from "../../actions/User/userActions";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";


class Register extends Component {
    state = {
        desktop: window.innerWidth >= 768,
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
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirmPassword_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    email: false,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    };

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    onSubmit = event => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formData, 'register');
        const formIsValid = isFormValid(this.state.formData, 'register');

        if(formIsValid) {
            this.props.dispatch(userRegister(dataToSubmit))
                .then(res => {
                    if (res.payload.success){
                        this.setState({
                            formError: false,
                            formSuccess: true
                        });
                        setTimeout(() => this.props.history.push('/account/login'), 3000)
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

    render() {
        return (
               <Fade top>
                   <div className={classes.formContainerRegister}>
                       <h2 className={classes.heading}>Register</h2>
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
                               id={'password'}
                               formData={this.state.formData.password}
                               change={element => this.onChange(element)}
                           />
                           <FormField
                               id={'confirmPassword'}
                               formData={this.state.formData.confirmPassword}
                               change={element => this.onChange(element)}
                           />
                           {this.state.formError ?
                               <div className={classes.errorLabel}>
                                   Please check your data
                               </div>
                               :null }
                           <div className={classes.buttonsContainer}>
                               <StyledButton clicked={this.onSubmit} content={'Register'}/>
                           </div>
                           <div className={classes.switchType}>OR</div>
                           <div className={classes.buttonsContainerCenter} onClick={this.props.changeType}>
                               <StyledButton  content={'Login'}/>
                           </div>
                       </form>
                   </div>
               </Fade>
        );
    }
}


export default connect()(withRouter(Register));