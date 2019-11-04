import React, {Component} from 'react';
import ProductCard from '../../../helpers/ProductCard/ProductCard'
import classes from './NewArrivals.module.css'
import {debounce} from "../../../helpers/misc";
import Swipe from "react-easy-swipe";
class NewArrivals extends Component {

    state = {
        products: [
            {
                name: 'Panda with christmas lights',
                sub: 'Perfect present for christmas',
                price: '15',
                image: '/images/new1.png',
                linkto: '/shop',
            },
            {
                name: 'Brother and sister',
                sub: 'Lovely sibling lorem ipsum',
                price: '15',
                image: '/images/new2.png',
                linkto: '/shop',
            },
            {
                name: 'Plushie of a dog on a couch',
                sub: 'It is on a couch',
                price: '15',
                image: '/images/new3.jpg',
                linkto: '/shop',
            },
            {
                name: 'Plushie of a dog on a couch',
                sub: 'It is on a couch',
                price: '15',
                image: '/images/new3.jpg',
                linkto: '/shop',
            },
        ],
    };


    render() {
        return (
            <div className={classes.wrapper}>
                    <p className={classes.heading}>
                        <span>Featured</span>
                    </p>
                    <div className={classes.productsContainer}>
                        {
                            this.state.products.map((product, i) => (
                                <ProductCard type={'landing'} key={i} name={product.name} sub={product.sub} price={product.price} image={product.image} linkto={product.linkto} />
                            ))
                        }
                    </div>
            </div>
        );
    }
}

export default NewArrivals;