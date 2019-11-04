import React, {Component} from 'react';
import FormField from "../../../helpers/Forms/FormField";
import StyledButton from "../../../helpers/Button/Button";

import classes from './index.module.css'
import AdminLayout from "../Layout/Layout";
import FileUpload from "../../../helpers/Forms/FileUpload";
import {generateData, isFormValid, updateForm, populateOptionFields, resetFields} from "../../../helpers/Forms/formActions";
import {addProduct, getBrands, getMaterials} from "../../../actions/Products/productActions";
import {connect} from "react-redux";

class AddProduct extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter product price'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product brand',
                    name: 'brand_input',
                    options: [],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            material: {
                element: 'select',
                value: '',
                config: {
                    label: 'product material',
                    name: 'material_input',
                    options: [],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            type: {
                element: 'select',
                value: '',
                config: {
                    label: 'Type',
                    name: 'type_input',
                    options: [
                        {
                            key: 'plushies',
                            value: 'plushies',
                        },
                        {
                            key: 'blankets',
                            value: 'blankets'
                        },
                        {
                            key: 'pillows',
                            value: 'pillows',
                        },
                    ],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product shipping',
                    name: 'shipping_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No'
                        }
                    ],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available in stock',
                    name: 'available_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No'
                        }
                    ],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish product?',
                    name: 'publish_input',
                    options: [
                        {
                            key: true,
                            value: 'Yes',
                        },
                        {
                            key: false,
                            value: 'No'
                        }
                    ],
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            images: {
                value: [],
                validation: {
                    required: false,
                    email: false,
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false,
            },
        }
    };
    imagesHandler = images => {
        const newFormData = { ...this.state.formData };
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formData: newFormData
        })

    };

    componentDidMount() {
        const formCopy = this.state.formData;

        this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'brand');
            this.setState({
                formData: newFormData
            })
        })
        this.props.dispatch(getMaterials()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'material');
            this.setState({
                formData: newFormData
            })
        })
    }

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'products');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };

    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formData)

        this.setState({
            formSuccess: true,
            formData: newFormData,
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false,
            })
        }, 2000)

    };

    onSubmit = event => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formData, 'products');
        const formIsValid = isFormValid(this.state.formData, 'products');

        if(formIsValid) {
            this.props.dispatch(addProduct(dataToSubmit)).then(res => {
                if(res.payload.success){
                    this.resetFieldsHandler();
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
            <AdminLayout>
            <div className={classes.formContainer}>
                <h1>Add product</h1>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <FormField
                        id={'name'}
                        formData={this.state.formData.name}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'description'}
                        formData={this.state.formData.description}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'price'}
                        formData={this.state.formData.price}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'brand'}
                        formData={this.state.formData.brand}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'material'}
                        formData={this.state.formData.material}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'type'}
                        formData={this.state.formData.type}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'shipping'}
                        formData={this.state.formData.shipping}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'available'}
                        formData={this.state.formData.available}
                        change={element => this.onChange(element)}
                    />
                    <FormField
                        id={'publish'}
                        formData={this.state.formData.publish}
                        change={element => this.onChange(element)}
                    />
                    {this.state.formError ?
                        <div className={"error_label"}>
                            Please check your data
                        </div>
                        :null }
                    {this.state.formSuccess ?
                        <div className={"form_success"}>Success</div>
                        :null}

                        <FileUpload imageHandler={this.imagesHandler}/>
                    <StyledButton onClick={(event) => this.onSubmit(event)} content={'Add product'}/>
                </form>
            </div>
            </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
    }
}

export default connect(mapStateToProps)(AddProduct);