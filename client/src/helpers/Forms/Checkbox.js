import React from 'react';
import classes from './FormField.module.css'

const Checkbox = ({id, name, checked, onChange, type = 'checkbox'}) => {
    return (
        <label htmlFor={name}>
            <div className={classes.formBlock}>
                <div style={{display:'flex'}}>
                    <input type={type}
                           checked={checked}
                           onChange={onChange}
                           id={id}
                           className={classes.checkbox}
                    />
                    <span className={classes.checkboxSpan}>{name}</span>
                </div>
            </div>
        </label>
    );
};

export default Checkbox;
