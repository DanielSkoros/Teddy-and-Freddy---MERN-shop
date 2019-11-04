import React from 'react';
import classes from './page404.module.css'
import WPanel from "../WhitePanel/WhitePanel";

const Page404 = ({unwanted}) => {
    return (
            <div className={classes.container}>
                <WPanel title={'You should not be here'} sub={'If you thinks it is our mistake, contact us'}/>
            </div>
    );
};

export default Page404;
