import React, {Component} from 'react';
import classes from './carousel.module.css'
import Slide from './Slide/Slide'
import Swipe from 'react-easy-swipe';
import {debounce} from "../misc";

class Carousel extends Component {
    state = {
        images: [
            "/images/landing1.jpg",
            "/images/landing2.jpg",
            "/images/landing3.jpg",
        ],
        links: [
            {
                name: 'Plushies',
                to: '/shop/plushies'
            },
            {
                name: 'Blankets',
                to: '/shop/blankets'
            },
            {
                name: 'Pillows',
                to: '/shop/pillows'
            },
        ],

        currentIndex: 0,
        translateValue: 0,
        isMobile: true,
        offset: 25,
    };

    componentDidMount() {
        this.intervalID = setInterval(this.goToNextSlide, 10000);
        this.setState({
            isMobile: window.innerWidth <= 768,
            offset: window.innerWidth <= 768 ? 25 : 500
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }


    goToNextSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if(this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue - window.innerWidth
        }),() => {
            clearInterval(this.intervalID);
            this.intervalID = setInterval(this.goToNextSlide, 10000);
        });
    };

    goToPrevSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if(this.state.currentIndex === 0) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + window.innerWidth
        }), () => {
            clearInterval(this.intervalID);
            this.intervalID = setInterval(this.goToNextSlide, 10000);
        });
    };


    onSwipeMove(position, event) {
        if (position.x < -30){
            this.goToNextSlide()
        }
        else if (position.x > 30) {
            this.goToPrevSlide()
        }
    }



    render() {
        return (
            <div className={classes.slider}>
                <div className={`${classes.arrowLeft} ${this.state.currentIndex === 0 ? classes.hideArrow : null}`} onClick={this.goToPrevSlide}> </div>
                <div className={`${classes.arrowRight} ${this.state.currentIndex === this.state.images.length - 1 ? classes.hideArrow : null}`} onClick={this.goToNextSlide}> </div>
                <Swipe
                    onSwipeMove={debounce(this.onSwipeMove.bind(this), 35)}
                >
                <div className={classes.sliderWrapper} style={{
                    transform: `translateX(${this.state.translateValue}px)`,
                    transition: `all 0.45s ease-in-out`
                }}>
                    {
                        this.state.images.map((image, i) => (
                            <Slide key={i} mobile={this.state.isMobile} image={image} name={this.state.links[i].name} linkto={this.state.links[i].to}/>
                        ))
                    }
                </div>
                </Swipe>
            </div>
        );
    }
}

export default Carousel;
