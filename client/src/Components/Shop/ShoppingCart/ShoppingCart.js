import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import CartBlock from "./CartBlock/CartBlock";
import classes from './ShoppingCart.module.css'
import StyledButton from "../../../helpers/Button/Button";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class ShoppingCart extends Component {
    state = {
        products: null,
        sum: 0,
    };
    componentDidMount() {
        this.setState({
            products: JSON.parse(localStorage.getItem('cart'))
        }, () => this.calculateTotalPrice(this.state.products));

    }

    deleteItem = id => {
        const newProducts = this.state.products.filter(el => el.id !== id);
        this.calculateTotalPrice(newProducts);
        this.setState({
            products: newProducts
        }, () => localStorage.setItem('cart', JSON.stringify(this.state.products)))
    };

    addItem = (id, count) => {
        const item = this.state.products.find(el => el.id === id);
        const index = this.state.products.findIndex(el => el.id === id);
        let newProducts = this.state.products;
        newProducts[index] = item;

        item.count = count + 1;
        this.calculateTotalPrice(newProducts);
        this.setState({
            products: newProducts
        }, () => localStorage.setItem('cart', JSON.stringify(this.state.products)))

    };

    subtractItem = (id, count) => {
        const item = this.state.products.find(el => el.id === id);
        const index = this.state.products.findIndex(el => el.id === id);
        let newProducts = this.state.products;
        newProducts[index] = item;
        item.count = count - 1;
        this.calculateTotalPrice(newProducts);
        if(item.count === 0) {
            this.deleteItem(id)
        } else {
            this.setState({
                products: newProducts
            }, () => localStorage.setItem('cart', JSON.stringify(this.state.products)))
        }
    };

    renderShoppingCart = () => (
        this.state.products.map(item => (
            <CartBlock
                id={item.id}
                name={item.name}
                count={item.count}
                price={item.price}
                image={item.images}
                linkto={item.linkto}
                key={item.id}
                deleteFromCart={this.deleteItem}
                addOne={this.addItem}
                subtractOne={this.subtractItem}/>
        ))
    );

    calculateTotalPrice = (products) => {
        let sum = 0;
        if(products){
           products.forEach(item => {
               sum += item.price * item.count
           });
           this.setState({
               sum,
           })
       }
    };

    render() {
        return (
            <Layout>
                <h2 className={classes.pageTitle}>Shopping cart</h2>
                <div className={classes.container}>
                    <div className={classes.shoppingCart}>
                        {
                            this.state.products ?  this.renderShoppingCart() : null
                        }
                    </div>
                    {
                        this.state.products ?
                            <div className={classes.summary}>
                                <div className={classes.basketTotal}>
                                    <h5>Basket totals</h5>
                                    <hr />
                                    <p>Total price: <span>${this.state.sum}</span></p>
                                    <hr className={classes.lightLine}/>
                                </div>
                                <div className={classes.Checkout}>
                                    <Link to={{
                                        pathname: '/user/checkout',
                                        state: {
                                            products: this.state.products,
                                            total: this.state.sum,
                                        }
                                    }}>
                                        <StyledButton content={'Checkout'} />
                                    </Link>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userData
    }
};

export default connect(mapStateToProps)(ShoppingCart);