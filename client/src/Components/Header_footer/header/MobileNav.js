import React from 'react';
import Hamburger from "./hamburger";
import classes from "./MobileNav.module.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const MobileNav = ({hamburgerClickHandler, open}) => {
    return (
        <div className={classes.mobileNav}>
            <div className={classes.left}>
                <Hamburger hamburgerClickHandler={hamburgerClickHandler} open={open}/>
            </div>
            <div className={classes.middle}>
                <Logo/>
            </div>
            <div className={classes.right}>
                <Link to={'/user/shopingCart'} className={classes.navLinkSmall}>
                    <FontAwesomeIcon icon={faShoppingBag} />
                </Link>
            </div>
        </div>
    );
};

export default MobileNav;
