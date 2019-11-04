import React from 'react';
import classes from './header.module.css';
import {Link} from "react-router-dom";

const Logo = (props) => {
    return (
        <Link to={'/'}>
            <div>
                <img src={'/images/logo.png'} alt={'Company logo'} className={`${classes.logo} ${props.open ? classes.open : null}`}/>
            </div>
        </Link>
    );
};

export default Logo;
