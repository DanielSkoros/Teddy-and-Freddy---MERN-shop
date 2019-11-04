import React from 'react';
import classes from '../../Orders/OrderBlock.module.css';

const ProductInfo = ({name, price, quantity}) => {
    return (
        <div className={classes.productBlock}>
            <div className={classes.product}>
                <span>{name}</span>
                <span>{price}$</span>
                <span>{quantity}</span>
            </div>
        </div>
    );
};

export default ProductInfo;
