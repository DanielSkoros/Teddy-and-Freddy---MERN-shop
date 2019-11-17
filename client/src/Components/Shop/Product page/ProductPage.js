import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import {getProductById} from "../../../actions/Products/productActions";
import {connect} from "react-redux";

import classes from './ProductPage.module.css';
import Loading from "../../../helpers/Loading/Loading";
import ImageScroller from "../../../helpers/ImageScroller/imageScroller";
import StyledButton from "../../../helpers/Button/Button";
import {addToCart} from "../../../helpers/ShopMethods/methods";
class ProductPage extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.dispatch(getProductById(this.props.match.params.id)).then(res => this.setState({loading: false}));
    }

    render() {
        const { item } = this.props;
        return (
            this.state.loading ? <Loading /> :
                <Layout>
                    <div className={classes.heading}>
                        <div>
                            <p>{item.name}</p>
                        </div>
                        <div>
                            <p>${item.price}</p>
                        </div>
                    </div>
                   <div className={classes.pageContainer}>
                       <div className={classes.productContainer}>
                           <div className={classes.imageContainer}>
                               <ImageScroller images={item.images} />
                           </div>
                       </div>
                       <div className={classes.descriptionContainer}>
                           <span>Description: </span>
                           <p>{item.description}</p>
                           <StyledButton content={'Add to cart'} clicked={() => addToCart(item._id)}/>
                       </div>
                   </div>
                </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        item: state.product.item
    }
};

export default connect(mapStateToProps)(ProductPage);