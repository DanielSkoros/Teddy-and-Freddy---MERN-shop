import React from 'react';
import {faCog, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import classes from './UserBlock.module.css';

const UserListBlock = ({name, lastName, linkto, id, ordersCount}) => {
    return (
           <div className={classes.card}>
               <div className={classes.iconLeft}>
                   <FontAwesomeIcon icon={faUser}/>
               </div>
               <div className={classes.rightPanel}>
                   <div className={classes.userContainer}>
                       <div className={classes.credentials}>
                           <h3>{lastName}</h3>
                           <h3>{name}</h3>
                       </div>
                       <div className={classes.ordersCount}>
                           <p style={{fontWeight: 'bold'}}>Orders: {ordersCount}</p>
                       </div>
                   </div>
               </div>
               <div className={classes.manage}>
                   <Link to={{
                       pathname: `${linkto}`,
                       state: {
                           ordersCount,
                           name,
                           lastName,
                           id
                       }
                   }}>
                       <div className={classes.iconRight}>
                           <FontAwesomeIcon icon={faCog} />
                       </div>
                   </Link>
               </div>
           </div>
    );
};

export default UserListBlock;
