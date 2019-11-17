import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./sidebar.module.css";

const Sidebar = (props) => {
    const adminLinks = [
        {
            name: 'Home',
            linkto: '/'
        },
            {
                name: 'Dashboard',
                linkto: '/account/admin'
            },
            {
                name: 'Add product',
                linkto: '/account/admin/add_product'
            },
            {
                name: 'Orders',
                linkto: '/account/admin/orders'
            },
            {
                name: 'Clients',
                linkto: '/account/admin/users'
            },
        ];
    const renderUser = () => (
        <>
            <ul className={classes.sidebarNav}>
                <li className={classes.navItem} onClick={props.close}>
                    <Link to={'/'} className={classes.navLink}>Search</Link>
                    <FontAwesomeIcon icon={faSearch} className={classes.faLight}/>
                </li>
            </ul>
            <hr/>
            <ul className={classes.sidebarNav}>
                <li className={classes.navItem} onClick={props.close}>
                    <Link to={'/shop/plushies'} className={classes.navLinkSmall}>Plushies</Link>
                    <FontAwesomeIcon icon={faDog} className={classes.faNormal}/>
                </li>
                <li className={classes.navItem} onClick={props.close}>
                    <Link to={'/shop/blankets'} className={classes.navLinkSmall} >Blankets</Link>
                    <FontAwesomeIcon icon={faBacon} className={classes.faNormal}/>
                </li>
                <li className={classes.navItem} onClick={props.close}>
                    <Link to={'/shop/pillows'} className={classes.navLinkSmall} >Pillows</Link>
                    <FontAwesomeIcon icon={faSquare} className={classes.faNormal}/>
                </li>
            </ul>
            <hr/>
            <ul className={`${classes.sidebarNav} ${classes.noBottomMargin}`}>
                <li className={classes.navItem} onClick={props.close}>
                    <Link to={'/account/login'} className={classes.navLinkCompany} >Account</Link>
                </li>
                <li className={`${classes.navItem} ${classes.noBottomMargin}`} onClick={props.close}>
                    <Link to={'/company/contact'} className={classes.navLinkCompany} >Contact</Link>
                </li>
            </ul>
        </>
    );
    const renderAdmin = () => (
        <ul className={classes.sidebarNav}>
            {
                adminLinks.map((admin, i) => (
                    <li className={classes.navAdminItem} onClick={props.close} key={i}>
                        <Link to={admin.linkto} className={classes.navLink}>{admin.name}</Link>
                    </li>
                ))
            }
        </ul>
    );
    return (
            <div className={`${classes.sidebar} ${props.open ? classes.active : ''}`}>
                <div className={classes.container}>
                    {props.admin ? renderAdmin() : renderUser()}
                    <div onClick={props.close} className={classes.goBackContainer}>
                        <div className={classes.backBtn}>
                            <FontAwesomeIcon icon={faArrowRight} className={classes.faBack}/>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Sidebar;
