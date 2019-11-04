import React from 'react';
import classes from './Button.module.css'

import { Link } from "react-router-dom";

const StyledButton = ({clicked, content, linkto, hideButton}) => {
    if (linkto){
        return (
            <Link to={linkto}>
                <button onClick={clicked} className={classes.btn}>
                    {content}
                </button>
            </Link>
        )
    }
    return (
        <button onClick={clicked} className={`${classes.btn} ${content === 'Filters' ? classes.filtersBtn : null} ${content === 'Filters' && hideButton ? classes.hideBtn : null}`}>
            {content}
        </button>
    );
};

export default StyledButton;
