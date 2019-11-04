import React from 'react';
import classes from './NoResult.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFrown} from '@fortawesome/free-solid-svg-icons/faFrown'
import {faSmile} from '@fortawesome/free-solid-svg-icons/faSmile'

const NoResult = ({success, content}) => {
    const icon = success ? faSmile : faFrown;
    return (
        <div className={classes.NoResultContainer}>
            <div className={classes.content}>
                <FontAwesomeIcon icon={icon} style={{
                    fontSize: '48px'
                }} />
                <h2>{content}</h2>
            </div>
        </div>
    );
};

export default NoResult;
