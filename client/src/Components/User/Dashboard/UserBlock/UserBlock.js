import React from 'react';
import classes from './UserBlock.module.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserBlock = ({linkto, description, icon}) => {
    return (
        <Link to={linkto}>
            <div className={classes.card}>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className={classes.description}>
                    {description}
                </div>
            </div>
        </Link>
    );
};

export default UserBlock;
