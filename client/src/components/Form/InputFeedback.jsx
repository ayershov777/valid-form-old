import React from 'react';
import { useSelector } from 'react-redux';

function InputFeedback({ fieldname }) {
    const validation = useSelector((state) => state.validation[fieldname]);
    const text = validation ? validation.feedback : '';
    return (
        <label>{text}</label>
    );
}

export default InputFeedback;