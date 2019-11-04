import React from 'react';
import classes from './FormField.module.css'

const FormField = ({formData, change, id}) => {

    const showError = () => {
        let errorMessage = '';
        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className={classes.errorLabel}>
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    };

    const formatInput = (e) => {
        // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
        let checkIfNum;
        if (e.key !== undefined) {
            // Check if it's a "e", ".", "+" or "-"
            checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
        }
        else if (e.keyCode !== undefined) {
            // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
            checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
        }
        return checkIfNum && e.preventDefault();
    }

    const renderTemplate = () => {
        let template = '';
        switch(formData.element){
            case('input'):
                template = (
                    <div className={classes.formBlock}>
                        {formData.showLabel ? <div className={classes.labelInputs}>{formData.config.label}</div> : null }
                        <input
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => {
                                change({event, id, blur: true})
                            }}
                            onChange={event => {
                                change({event, id})
                            }}

                            onKeyDown={formData.config.type === 'number' ? formatInput : null}
                        />
                        {showError()}
                    </div>
                );
                break;
            case('textarea'):
                template = (
                    <div className={classes.formBlock}>
                        {formData.showLabel ? <div className={classes.labelInputs}>{formData.config.label}</div> : null }
                        <textarea
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => {
                                change({event, id, blur: true})
                            }}
                            onChange={event => {
                                change({event, id})
                            }}
                        />
                        {showError()}
                    </div>)
                break;
            case('select'):
                template = (
                    <div className={classes.formBlock}>
                        {formData.showLabel ? <div className={classes.labelInputs}>{formData.config.label}</div> : null }
                        <select
                            {...formData.config}
                            value={formData.value}
                            onBlur={(event) => {
                                change({event, id, blur: true})
                            }}
                            onChange={event => {
                                change({event, id})
                            }}
                        >
                            <option value={""}>Select one</option>
                            {
                                formData.config.options.map(item => (
                                    <option key={item.key} value={item.key}>{item.value} </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                );
                break;


            default: template = '';
        }

        return template;
    };

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;
