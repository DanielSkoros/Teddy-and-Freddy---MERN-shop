import React, {Component} from 'react';
import Layout from "../../hoc/Layout";

import classes from './Landing.module.css'
import Carousel from "../../helpers/Carousel/Carousel";
import NewArrivals from "./NewArrivals/NewArrivals";
import Social from "./Social/Social";

class Landing extends Component {
    render() {
        return (
            <Layout>
                <div className={classes.mainContainer}>
                    <Carousel type={'main'} />
                </div>
                <div className={classes.mainContainer}>
                    <NewArrivals />
                </div>
            </Layout>
        );
    }
}

export default Landing;