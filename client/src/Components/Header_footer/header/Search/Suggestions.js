import React from 'react'
import classes from './Search.module.css'
import Fade from "react-reveal//Fade";
import CartBlock from "../../../Shop/ShoppingCart/CartBlock/CartBlock";


const Suggestions = (props) => {
    const options = props.results.map(item => (
        <li key={item._id}>
            <CartBlock
                id={item._id}
                name={item.name}
                count={item.count}
                price={item.price}
                image={item.images[0].url}
                linkto={`/shop/pillows/${item._id}`}
                key={item.id}
                cart={false}
            />
                 </li>
    ));
    return (
        <Fade top>
            <ul className={classes.suggestions}>{options}</ul>
        </Fade>
    )
};

export default Suggestions