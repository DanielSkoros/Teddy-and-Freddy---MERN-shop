import React from 'react';
import { Link } from 'react-router-dom'
import classes from './slide.module.css'
import WPanel from "../../WhitePanel/WhitePanel";
const Slide = ({image, name, linkto, mobile}) => {
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
    };
    return (
        linkto ?
            <Link to={linkto}>
                <div className={classes.slide} style={styles}>
                    { name ? <WPanel linkName={name} linkTo={linkto} mobile={mobile}/> : null }
                </div>
            </Link> :
            <div className={classes.slide} style={styles}>
                { name ? <WPanel linkName={name} linkTo={linkto} mobile={mobile}/> : null }
            </div>
    );
};

export default Slide;
