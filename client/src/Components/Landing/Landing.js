import React, {Component} from 'react';
import Layout from "../../hoc/Layout";

import classes from './Landing.module.css'
import Carousel from "../../helpers/Carousel/Carousel";
import NewArrivals from "./NewArrivals/NewArrivals";
import {getProductsByType} from "../../actions/Products/productActions";
import Card from "../../helpers/ProductCard/ProductCard";
import {addToCart} from "../../helpers/ShopMethods/methods";
import Loading from "../../helpers/Loading/Loading";

class Landing extends Component {
    state = {
        loading: true,
        limit: 4,
        skip: 0,
        filters: {
            brand: new Set(),
            material: new Set(),
            type: [] || 'blankets',
            price: [],
        },
        products: []
    };

    componentDidMount() {
        this.props.dispatch( getProductsByType(
            this.state.filters,
            this.state.skip,
            this.state.limit,
            this.state.sortBy
        )).then(res => {
            this.setState({loading: false, products: res.payload}, () => console.log(this.state))
        })
    }



    render() {
        return (
            this.state.loading ? <Loading/>
            :
                <Layout>
                    <div className={classes.mainContainer}>
                        <Carousel type={'main'} />
                    </div>
                    <div className={classes.mainContainer}>
                        <NewArrivals data={this.state.products}/>
                    </div>
                </Layout>
        );
    }
}

export default Landing;