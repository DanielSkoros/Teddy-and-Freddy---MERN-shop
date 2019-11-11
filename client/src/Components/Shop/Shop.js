import React, {Component} from 'react';
import classes from './Shop.module.css'
import formStyles from '../../helpers/Forms/FormField.module.css'
import Layout from "../../hoc/Layout";
import {getBrands, getMaterials, getProductsByType} from "../../actions/Products/productActions";
import {connect} from "react-redux";
import Card from "../../helpers/ProductCard/ProductCard";
import StyledButton from "../../helpers/Button/Button";
import Loading from "../../helpers/Loading/Loading";
import FormField from "../../helpers/Forms/FormField";
import {populateOptionFields, updateForm} from "../../helpers/Forms/formActions";
import Checkbox from "../../helpers/Forms/Checkbox";
import NoResult from "./NoResult";

import { addToCart } from "../../helpers/ShopMethods/methods";

class Shop extends Component {
    state = {
        desktop: window.innerWidth >= 768,
        brands: false,
        materials: false,
        loading: true,
        filtering: false,
        limit: 6,
        skip: 0,
        sortBy: '',
        order: '',
        filters: {
            brand: new Set(),
            material: new Set(),
            type: [],
            price: [],
        },
        formError: false,
        formSuccess: false,
        formData: {
            priceFrom: {
                element: 'input',
                value: '',
                config: {
                    label: 'Price',
                    name: 'priceFrom_input',
                    type: 'number',
                    placeholder: 'Min',
                    min: 0
                },
                validation: {
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            priceTo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'priceTo_input',
                    type: 'number',
                    placeholder: 'Max',
                    min: 0,
                },
                validation: {
                    required: false,
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
                    required: false,
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
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
            sortBy: {
                element: 'select',
                value: '',
                config: {
                    label: 'Sort by',
                    name: 'sort_input',
                    options: [
                        {
                            key: 'name',
                            value: 'Name'
                        },
                        {
                            key: 'price',
                            value: 'Price ascending'
                        },
                        {
                            key: 'sold',
                            value: 'Sold'
                        },
                    ],
                },
                validation: {
                    required: false,
                    email: false,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true,
            },
        }
    };


    componentDidMount() {
       this.setState({
           filters: {
               type: this.props.match.params.type
           }
       },() => this.handleFilters() );

       this.selectedCheckboxes = {
           brand: new Set(),
           material: new Set(),
       };

        const formCopy = this.state.formData;

        this.props.dispatch(getBrands()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'brand');
            this.setState({
                formData: newFormData,
                brands: true,
            })
        });
        this.props.dispatch(getMaterials()).then(res => {
            const newFormData = populateOptionFields(formCopy, res.payload, 'material');
            this.setState({
                formData: newFormData,
                materials: true,
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.type !== prevProps.match.params.type){
            this.setState({
                filters: {
                    type: this.props.match.params.type
                }
            }, () => this.handleFilters())
        }
    }

    handleFilters() {
        this.setState({
            loading: true,
            filtering: false
        });
        this.props.dispatch( getProductsByType(
            this.state.filters,
            this.state.skip,
            this.state.limit,
            this.state.sortBy
        )).then(res => {
            this.setState({loading: false})
        })
    }

    renderProducts = () => (
        this.props.shop.articles.map((product) => (
            <Card
                role={this.props.user.userData.isAdmin}
                type={'shop'}
                image={product.images[0].url}
                name={product.name}
                sub={product.description}
                price={product.price}
                linkto={`/shop/${product.type}/${product._id}`}
                key={product._id}
                id={product._id}
                addToCart={() => addToCart(product._id, this.props.isAuth, product.name, product.price, product.images[0].url,`/shop/${product.type}/${product._id}` )}
            />
        ))
    );

    openFilters = () => {
        this.setState({
            filtering: true,
        })
    };

    onSubmit = event => {
        event.preventDefault();
        this.handleFilters();
    };

    onChange = element => {
        const { id } = element;
        const newFormData = updateForm(element, this.state.formData, 'filters');
        if (id === 'sortBy'){
            this.setState({
                formError: false,
                formData: newFormData,
                sortBy: newFormData.sortBy.value
            })
        }else {
            this.setState(prevState => ({
                formError: false,
                formData: newFormData,
                filters: {
                    ...prevState.filters,
                    [id]: newFormData[id].value
                }
            }))
        }
    };

    handleCheckbox = (id, type) => {
        if(this.selectedCheckboxes[type].has(id)){
            this.selectedCheckboxes[type].delete(id)
        }else{
            this.selectedCheckboxes[type].add(id)
        }
        this.setState(prevState => ({
            filters: {
                ...prevState.filters,
                brand: Array.from(this.selectedCheckboxes.brand),
                material: Array.from(this.selectedCheckboxes.material),
            }
        }));
    };

    renderFilterPage = () => (
        <div className={classes.filtersContainer}>
            <h1>Apply filters</h1>
            <form onSubmit={(event) => this.onSubmit(event)}>
                <FormField
                    id={'priceFrom'}
                    formData={this.state.formData.priceFrom}
                    change={element => this.onChange(element)}
                />
                <FormField
                    id={'priceTo'}
                    formData={this.state.formData.priceTo}
                    change={element => this.onChange(element)}
                />
                <div className={formStyles.formBlock}>
                    <label className={formStyles.labelInputs}>Brand</label>
                    {
                        this.props.brands.map((brand) => (
                            <Checkbox
                                key={brand._id}
                                id={brand._id}
                                name={brand.name}
                                checked={this.selectedCheckboxes.brand.has(brand._id)}
                                onChange={() => this.handleCheckbox(brand._id, 'brand')}
                            />
                        ))
                    }
                </div>
                <div className={formStyles.formBlock}>
                    <label className={formStyles.labelInputs}>Material</label>
                    {
                        this.props.materials.map(material => (
                            <Checkbox
                                key={material._id}
                                id={material._id}
                                name={material.name}
                                checked={this.selectedCheckboxes.material.has(material._id)}
                                onChange={() => this.handleCheckbox(material._id, 'material')}
                            />
                        ))
                    }

                </div>
                <FormField
                    id={'sortBy'}
                    formData={this.state.formData.sortBy}
                    change={element => this.onChange(element)}
                />
                <StyledButton onClick={(event) => this.onSubmit(event)} content={'Apply'} />
            </form>
        </div>
    );

    render() {
        return (
                  this.state.loading ? <Loading/> :
                      <Layout no>
                          { this.props.shop.size === 0 ? <NoResult success={false} content={'Sorry, no results'}/> :
                              <div className={classes.shop}>
                                  {
                                      this.state.desktop && this.state.brands && this.state.materials ? this.renderFilterPage() : null
                                  }
                                  <div className={classes.shopContainer}>
                                      {
                                          this.props.shop.articles ? this.renderProducts() : null
                                      }
                                      {
                                          this.state.filtering ? this.renderFilterPage() : null
                                      }

                                  </div>
                              </div>
                          }
                          {
                              this.state.filtering ? this.renderFilterPage() : null
                          }
                          <StyledButton content={'Filters'} clicked={this.openFilters} hideButton={this.state.filtering}/>
                      </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        shop: state.product,
        brands: state.product.brands,
        materials: state.product.materials,
        isAuth: state.user.userData.isAuth,
        isAdmin: state.user.userData.isAdmin
    }
};

export default connect(mapStateToProps)(Shop);