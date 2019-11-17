import React , { useEffect } from 'react';
import { useAlert } from 'react-alert'




const Alert = ({type, text}) => {
    const alert = useAlert();
    useEffect(() => {
        alert.show(text, {type})
    }, []);
    return (
       <div>

       </div>
    );
};

export default Alert;
