import React from 'react';
import classes from './ProductCard.module.css'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from 'react-alert';
import StyledButton from "../Button/Button";

String.prototype.trunc =
    function( n, useWordBoundary ){
        if (this.length <= n) { return this; }
        let subString = this.substr(0, n-1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + " ...";
    };

const Card = ({image, name, sub, price, linkto, addToCart, type, id, role}) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
    };
    const alert = useAlert();
    switch(type){
        case('landing'):
            return (
                <div className={classes.cardContainer}>
                    <Link to={linkto} className={classes.productLink}>
                        <img src={image}  alt={`${name} photo`}/>
                    </Link>
                    <div className={classes.heartContainer}>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                    <div className={classes.infoContainer}>
                        <p>
                            <span> {name.trunc(20, true)} <br/></span>
                            {sub.trunc(20,true)} <br/>
                            <span>${price} </span>
                        </p>
                        <div className={classes.buttonContainer} onClick={() => alert.show('Product added', {type: 'success'})}>
                            <StyledButton content={'Add to cart'} clicked={addToCart} />
                        </div>
                    </div>
                </div>
            );
        case('shop'):
            return (
                <div className={classes.cardContainerShop}>
                    <Link to={linkto} className={classes.productLink}>
                        <div className={classes.productImage} style={styles}>
                        </div>
                    </Link>
                    <div className={classes.infoContainerShop}>
                        <p>
                            <span> {name.trunc(20, true)} <br/></span>
                            {sub.trunc(20,true)} <br/>
                            <span>${price} </span>
                        </p>
                        <div className={classes.buttonContainerShop} onClick={() => alert.show('Product added', {type: 'success'})}>
                            <StyledButton content={'Add to cart'} clicked={addToCart} />
                        </div>
                        {
                            role ? <div className={classes.buttonContainerShop}>
                                <StyledButton content={'Edit'} linkto={`/account/admin/edit_product/${id}`} />
                            </div> : null
                        }
                    </div>
                </div>
            );
        default: return null;

    }
};

export default Card;
