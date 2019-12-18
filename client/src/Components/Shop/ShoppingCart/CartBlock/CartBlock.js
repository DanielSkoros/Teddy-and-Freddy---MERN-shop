import React from 'react';
import classes from './CartBlock.module.css'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faMinus} from '@fortawesome/free-solid-svg-icons'

String.prototype.trunc =
    function( n, useWordBoundary ){
        if (this.length <= n) { return this; }
        let subString = this.substr(0, n-1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + " ...";
    };

const CartBlock = ({id, name, price, image, linkto, count, deleteFromCart, addOne, subtractOne, cart = true}) => {
    return (
        cart ?
            <div className={classes.cartBlock}>
                <div className={classes.item}>
                    <div className={classes.buttons}>
                        <button className={classes.deleteBtn} onClick={() => deleteFromCart(id)}>
                        </button>
                    </div>

                    <div className={classes.image}>
                        <img src={image} alt=""/>
                    </div>

                    <div className={classes.description}>
                        <Link to={linkto}>
                            {name.trunc(15, true)}
                        </Link>
                        <div className={classes.totalPrice}>{count} x ${price}</div>
                    </div>

                    <div className={classes.quantity}>
                        <button className={classes.plusBtn} onClick={() => addOne(id, count)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                        <div className={classes.quantityCount}>{count}</div>
                        <button className={classes.minusBtn} onClick={() => subtractOne(id, count)}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </button>
                    </div>
                </div>
            </div>
            :
            <div className={classes.cartBlockModified}>
                <div className={classes.itemModified}>
                    <div className={classes.image}>
                        <img src={image} alt=""/>
                    </div>

                    <div className={classes.descriptionModified}>
                            {name.trunc(15, true)}
                        <div className={classes.totalPrice} style={{color: 'white'}}>${price}</div>
                    </div>
                </div>
            </div>


    );
};

export default CartBlock;