import React, {Component} from 'react';
import FormField from "../../../helpers/Forms/FormField";
import StyledButton from "../../../helpers/Button/Button";
import classes from './EditProduct.module.css'
import { withAlert } from 'react-alert'
import AdminLayout from "../Layout/Layout";
import FileUpload from "../../../helpers/Forms/FileUpload";
import {generateData, isFormValid, updateForm, populateOptionFields, resetFields, populateFields} from "../../../helpers/Forms/formActions";
import {
    editProduct,
    getBrands,
    getMaterials,
    getProductById
} from "../../../actions/Products/productActions";
import {connect} from "react-redux";
import Loading from "../../../helpers/Loading/Loading";
import Alert from "../../../helpers/Alert";

class EditProduct extends Component {
    state = {
        editSuccess: false,
        formError: false,
        formSuccess: false,
        loading: true,
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
                showLabel: true,
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
                showLabel: true,
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
                showLabel: true,
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

        const data = this.props.dispatch(getProductById(this.props.match.params.id))
            .then(res => {

                const newFormData =  populateFields(this.state.formData, res.payload);
                this.setState({
                    formData: newFormData
                })
            });

        const brands = this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'brand');
            this.setState({
                formData: newFormData
            })
        });
        const materials = this.props.dispatch(getMaterials()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'material');
            this.setState({
                formData: newFormData
            })
        });
        Promise.all([data, brands, materials])
            .then(res => this.setState({
                loading: false,
            }))

    }

    onChange = element => {
        const newFormData = updateForm(element, this.state.formData, 'products');
        this.setState({
            formError: false,
            formData: newFormData
        })
    };



    onSubmit = event => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formData, 'products');
        const formIsValid = isFormValid(this.state.formData, 'products');

        if(formIsValid) {
            this.props.dispatch(editProduct(dataToSubmit,this.props.match.params.id)).then(res => {
                if(res.payload.success){
                    this.setState({
                        editSuccess: true
                    })
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
        const { alert } = this.props
        return (
            this.state.loading ? <Loading/>:
                <AdminLayout>
                    <div className={classes.formContainer}>
                        <h1>Edit product</h1>
                        <form onSubmit={(event) => this.onSubmit(event)}>
                            <div className={classes.formLayout}>
                                <div>
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
                                </div>
                                <div>
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
                                </div>
                                <div>
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
                                </div>
                                {this.state.formError ?
                                    <div className={"error_label"}>
                                        Please check your data
                                    </div>
                                    :null }
                                {this.state.formSuccess ?
                                    <div className={"form_success"}>Success</div>
                                    :null}
                            </div>
                            <div className={classes.dropzone}>
                               <FileUpload imageHandler={this.imagesHandler} images={this.state.formData.images.value}/>
                            </div>
                            <div className={classes.btn}>
                                <StyledButton onClick={(event) => this.onSubmit(event)} content={'Edit product'}/>
                            </div>
                            {
                                this.state.editSuccess ?
                                    <img src={'/'} style={{display: 'none'}} onLoad={() => {
                                        alert.show('Oh look, an alert!')
                                    }}/>

                                        : null
                            }
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

export default connect(mapStateToProps)(withAlert()(EditProduct));