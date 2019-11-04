import classes from './imageScroller.module.css'
import React, {Component} from 'react';
import Slide from "../Carousel/Slide/Slide";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight'

class ImageScroller extends Component {
    state = {
        currentImage: 0
    };

    componentDidMount() {
        console.log(this.props.images.length)
    }

    handleNextImage = () => {
        if (this.state.currentImage < this.props.images.length - 1){
            this.setState(prevState => ({
                currentImage: prevState.currentImage + 1
            }))
        }
    }
    handlePrevImage = () => {
        if (this.state.currentImage !== 0){
            this.setState(prevState => ({
                currentImage: prevState.currentImage - 1
            }))
        }
    }

    render() {
        return (
            <div className={classes.imageContainer}>
                <Slide image={this.props.images[this.state.currentImage].url}/>
                <div className={classes.icons}>
                    <div onClick={this.handlePrevImage}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                    <div onClick={this.handleNextImage}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageScroller;

