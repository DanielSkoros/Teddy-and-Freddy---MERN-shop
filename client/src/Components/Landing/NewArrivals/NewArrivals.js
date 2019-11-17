import React, {Component} from 'react';
import ProductCard from '../../../helpers/ProductCard/ProductCard'
import classes from './NewArrivals.module.css'
import {debounce} from "../../../helpers/misc";
import Swipe from "react-easy-swipe";
import {addToCart} from "../../../helpers/ShopMethods/methods";
import {connect} from "react-redux";
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
        console.log(this.props)

        return (
            <div className={classes.wrapper}>
                    <p className={classes.heading}>
                        <span>Featured</span>
                    </p>
                    <div className={classes.productsContainer}>
                        {
                            this.props.data.articles.map((product) => (
                                <ProductCard
                                    role={this.props.isAdmin}
                                    type={'landing'}
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
                        }
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.user.userData.isAuth,
        isAdmin: state.user.userData.isAdmin
    }
};

export default connect(mapStateToProps)(NewArrivals);