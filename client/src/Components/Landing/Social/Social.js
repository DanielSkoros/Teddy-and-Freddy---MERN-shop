import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

import classes from './Social.module.css'

const Social = () => {
    return (
        <div className={classes.socialContainer}>
            <a href="http://facebok.com">
                <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="http://twitter.com">
                <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="http://instagram.com">
                <FontAwesomeIcon icon={faInstagram}/>
            </a>
        </div>
    );
};

export default Social;
