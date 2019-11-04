import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const Arrow = ({type, prev, next}) => {
   if (type === 'left') {
       return (
           <button onClick={prev}>
               <FontAwesomeIcon icon={faArrowLeft} />
           </button>
       )
   }
   if (type === 'right') {
       return (
           <button onClick={next}>
               <FontAwesomeIcon icon={faArrowRight} />
           </button>
       )
   }
   return null;
};

export default Arrow;
