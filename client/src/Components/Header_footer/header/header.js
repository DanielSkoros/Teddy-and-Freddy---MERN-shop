import React, {Component} from 'react';
import Hamburger from './hamburger';
import classes from './header.module.css'
import Sidebar from "./sidebar";
import Navbar from "./Navbar";

import {withRouter} from 'react-router-dom';
import MobileNav from "./MobileNav";


class Header extends Component {
    state = {
        sidebarOpen: false,
        isMobile: true,
        stickyHeader: this.props.location.pathname !== '/',
    };

    hamburgerClickHandler = () => {
        this.setState(prevState => ({
            sidebarOpen: !prevState.sidebarOpen
            })
        )
    };

    componentDidMount() {
        this.setState({
            isMobile: window.innerWidth < 1200
        }, () => {
            if(!this.state.isMobile && this.props.location.pathname === '/'){
                window.addEventListener('scroll', this.stickHeader);
            }
            window.addEventListener('resize', this.resize)
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.stickHeader);
        window.removeEventListener('resize', this.resize);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            if(this.props.location.pathname === '/'){
                window.addEventListener('scroll', this.stickHeader);
            }
        }
    }

    resize = () => {
        this.setState({
            isMobile: window.innerWidth < 770
        })
    }

    stickHeader = () => {
        const scrollTop = window.pageYOffset;
        if(scrollTop >= 500){
            this.setState({
                stickyHeader: true
            })
        }
        if(scrollTop <= 500){
            this.setState({
                stickyHeader: false
            })
        }

    };

    render() {
        return (
            <>
            <header className={`${classes.header} ${this.state.stickyHeader && !this.state.isMobile ? classes.stickyHeader : null}`}>
                <nav className={`${this.state.sidebarOpen ? `${classes.navbar} ${classes.open}` : `${classes.navbar}`}`}>
                    {this.state.isMobile ?
                        <MobileNav hamburgerClickHandler={this.hamburgerClickHandler} open={this.state.sidebarOpen}/>
                        : <Navbar admin={this.props.admin}/>}
                </nav>
            </header>
                <Sidebar open={this.state.sidebarOpen} close={this.hamburgerClickHandler} admin={this.props.admin}/>
            </>
        );
    }
}

export default withRouter(Header);