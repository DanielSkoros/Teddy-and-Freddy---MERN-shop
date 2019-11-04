import React from 'react';
import classes from './CartBlock.module.css'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faMinus} from '@fortawesome/free-solid-svg-icons'

const CartBlock = ({id, name, price, image, linkto, count, deleteFromCart, addOne, subtractOne}) => {
    return (
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
                            <p>{name}</p>
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
    );
};

export default CartBlock;