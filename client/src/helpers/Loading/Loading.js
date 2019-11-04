import React from 'react';
import classes from './Loading.module.css'
const Loading = () => {
    return (
        <div className={classes.loaderBackground}>
            <div className={classes.heartLoader}>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
