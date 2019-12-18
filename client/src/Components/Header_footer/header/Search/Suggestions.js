import React from 'react'
import classes from './Search.module.css'
import Fade from "react-reveal//Fade";
import CartBlock from "../../../Shop/ShoppingCart/CartBlock/CartBlock";
import {Link} from "react-router-dom";


const Suggestions = (props) => {
    const options = props.results.map(item => (
        <li key={item._id} onClick={props.hideMenu}>
            <Link to={`/shop/${item.type}/${item._id}`}>
                <CartBlock
                    id={item._id}
                    name={item.name}
                    count={item.count}
                    price={item.price}
                    image={item.images[0].url}
                    key={item.id}
                    cart={false}
                />
            </Link>
        </li>
    ));
    return (
        <Fade top>
            <ul className={classes.suggestions}>{options}</ul>
        </Fade>
    )
};

export default Suggestions