import React from 'react';
import classes from './Dialog.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

const Dialog = (props) => {
    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modal}>
                <div className={classes.head}>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
                <div className={classes.content}>
                    <div className={classes.goodJob}>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <h1>Good Job!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
