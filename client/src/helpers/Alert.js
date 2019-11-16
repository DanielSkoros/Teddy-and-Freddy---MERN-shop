import React from 'react';
import { useAlert } from 'react-alert'


const Alert = ({type, text}) => {
    const alert = useAlert();
    return (
        <button
            onLoad={() => {
                alert.show('Oh look, an alert!')
            }}
        >
            Show Alert
        </button>
    );
};

export default Alert;
