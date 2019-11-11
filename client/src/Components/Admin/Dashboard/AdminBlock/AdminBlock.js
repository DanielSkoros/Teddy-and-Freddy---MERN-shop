import React from 'react';
import {Link} from "react-router-dom";
import classes from "./AdminBlock.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AdminBlock = ({description, count, linkto, icon, data}) => {
    return (
        <Link to={{
            pathname: linkto,
            state: {
                data: data ? data : null
            }
        }}>
            <div className={classes.card}>
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className={classes.description}>
                    {description}
                    {
                        count > 0 ?
                            <>
                                <br/>
                                {count}
                            </> : null
                    }
                </div>
            </div>
        </Link>
    );
};

export default AdminBlock;
