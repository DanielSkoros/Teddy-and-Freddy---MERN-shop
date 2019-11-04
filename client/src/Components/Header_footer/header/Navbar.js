import React from 'react';
import classes from "./Navbar.module.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faShoppingBag} from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const Navbar = (props) => {
    const adminLinks = [
        {
            name: 'Dashboard',
            linkto: '/user/dashboard'
        },
        {
            name: 'Add product',
            linkto: '/account/admin/add_product'
        },
        {
            name: 'Edit product',
            linkto: '/account/admin/edit_product'
        },
        {
            name: 'Orders',
            linkto: '/account/admin/orders'
        },
        {
            name: 'Clients',
            linkto: '/account/admin/clients'
        },
    ];

    const renderUser = () => (
        <>
            <div className={classes.left}>
                <ul className={classes.navbarNav}>
                    <li className={classes.navItem}>
                        <Link to={'/shop/plushies'} className={classes.navLinkSmall}>Plushies</Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link to={'/shop/blankets'} className={classes.navLinkSmall}>Blankets</Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link to={'/shop/pillows'} className={classes.navLinkSmall}>Pillows</Link>
                    </li>
                    <li className={classes.iconCart}>
                        <Link to={'/user/shopingCart'} className={classes.navLinkSmall}>
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={classes.middle}>
                <Logo/>
            </div>
            <div className={classes.right}>
                <ul className={classes.navbarNav}>
                    <li className={classes.iconContact}>
                        <Link to={'/company/contact'} className={classes.navLinkSmall}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link to={'/account/login'} className={classes.navLinkSmall}>account</Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link to={'/company/about'} className={classes.navLinkSmall}>about</Link>
                    </li>
                    <li className={classes.navItem}>
                        <Link to={'/search'} className={classes.navLinkSmall}>search</Link>
                    </li>
                </ul>
            </div>
        </>
    );
    const renderAdmin = () => (
        <div className={classes.left}>
            <ul className={classes.navbarNav}>
                {
                    adminLinks.map((admin, i) => (
                        <li className={classes.navItem} onClick={props.close} key={i}>
                            <Link to={admin.linkto} className={classes.navLink}>{admin.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
    return (
        <div className={classes.navbar}>
            {props.admin ? renderAdmin() : renderUser()}
        </div>
    );
};

export default Navbar;
