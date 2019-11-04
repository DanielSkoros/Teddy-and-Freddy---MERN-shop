import React from 'react';
import classes from './page404.module.css'
import WPanel from "../WhitePanel/WhitePanel";

const Page404 = ({unwanted}) => {
    return (
            <div className={classes.container}>
                {
                    !unwanted ? <WPanel title={'You should not be here'} sub={'If you think it is our mistake, contact us'}/>
                    :   <WPanel title={'You should not be here'} sub={'You probably tried to checkout with empty cart'}/>

                }
            </div>
    );
};

export default Page404;
