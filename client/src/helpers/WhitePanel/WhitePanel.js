import React from 'react';
import { Link } from 'react-router-dom'
import classes from './WhitePanel.module.css'
import StyledButton from "../Button/Button";

const WPanel = ({title, sub, linkName, linkTo}) => {
    return (
        <div className={classes.container}>
            <div className={classes.WPanel}>
                <div className={classes.textWrapper}>
                    <h3>{linkName}</h3>
                </div>
                <div className={classes.subWrapper}>
                    <h3>Finest quality <span>{linkName}</span></h3>
                    <span className={classes.subHeading}>Delivered right at your doorstep</span>
                    <p>Hand crafted & stitched to suit your preferences </p>
                    <div className={classes.btn}>
                        <StyledButton content={'Shop now'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WPanel;
