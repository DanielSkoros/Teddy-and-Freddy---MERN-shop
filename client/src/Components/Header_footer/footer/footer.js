import React from 'react';
import { Link } from 'react-router-dom'

import classes from './footer.module.css'
import Logo from "../header/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faTwitter, faInstagram, faGooglePlus} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer>
           <div className={classes.footerContainer}>
               <div className={classes.left}>
                   <div className={classes.Logo}>
                       <Logo/>
                   </div>
                   <div className={classes.logoDescription}>
                       <div>
                           <h3>Finest quality <span>plushies</span></h3>
                           <span className={classes.subHeading}>Delivered right at your doorstep</span>
                           <p>Hand crafted & stitched to suit your preferences </p>
                       </div>
                   </div>
               </div>
               <div className={classes.footerLinksContainer}>
                   <div className={classes.footerLinksLeft}>
                        <ul>
                            <li className={classes.navItem}>
                                <h4>CATEGORIES</h4>
                            </li>
                            <li className={classes.navItem}>
                                <Link to={'/shop/plushies'} className={classes.navLinkSmall}>Plushies</Link>
                            </li>
                            <li className={classes.navItem}>
                                <Link to={'/shop/blankets'} className={classes.navLinkSmall}>Blankets</Link>
                            </li>
                            <li className={classes.navItem}>
                                <Link to={'/shop/pillows'} className={classes.navLinkSmall}>Pillows</Link>
                            </li>
                        </ul>
                   </div>
                   <div className={classes.footerLinksRight}>
                        <ul>
                            <li className={classes.navItem}>
                                <h4>ABOUT</h4>
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
               </div>
               <div className={classes.footerSocialIcons}>
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faGooglePlus} />
               </div>
           </div>
        </footer>
    );
};

export default Footer;
