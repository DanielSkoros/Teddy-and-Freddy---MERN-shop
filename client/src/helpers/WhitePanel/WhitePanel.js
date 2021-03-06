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
                    {
                        !title ? <h3>Finest quality <span>{linkName}</span></h3>
                            : <h3>{title}</h3>
                    }
                    {
                        !sub ? <span className={classes.subHeading}>Delivered right at your doorstep</span>
                            : <span className={classes.subHeading}>{sub}</span>
                    }
                    {
                        !title ? <p>Hand crafted & stitched to suit your preferences </p>
                            : <p>Here is what you can do </p>
                    }
                    <div className={classes.btn}>
                        {
                            !title ? <StyledButton content={'Shop now'} />
                            : <StyledButton content={'Home page'} linkto={'/'}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WPanel;
