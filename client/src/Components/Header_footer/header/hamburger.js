import classes from './hamburger.module.css';

import React, {Component} from 'react';

class Hamburger extends Component {
    render() {
        return (
            <button className={`${classes.hamburger} ${this.props.open ? classes.hamburgerActive : null}`} onClick={this.props.hamburgerClickHandler}>
              <span className={classes.hamburger__box}>
                <span className={classes.hamburger__inner}></span>
              </span>
            </button>
        );
    }
}

export default Hamburger;

