import React from 'react';
import classes from './FormField.module.css'

const Checkbox = ({id, name, checked, onChange}) => {
    return (
        <label htmlFor={name}>
            <div className={classes.formBlock}>
                <div style={{display:'flex'}}>
                    <input type={'checkbox'}
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
