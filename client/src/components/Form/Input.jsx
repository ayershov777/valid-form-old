import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initFieldAction, setValidationAction, setValueAction } from '../../redux/redux';

function Input({ type, fieldname, validator }) {
    const values = useSelector((state) => state.values);
    const validation = useSelector((state) => state.validation[fieldname]);
    const timeoutId = useSelector((state) => state.timeoutIds[fieldname]);
    const validationDelay = useSelector((state) => state.validationDelay);

    const dispatch = useDispatch();

    function initField(validationDelay) {
        dispatch(initFieldAction(validationDelay));
    }
    
    function setValue(value, timeoutId) {
        dispatch(setValueAction(fieldname, value, timeoutId));
    }

    function setValidation(fieldname, valid, feedback) {
        dispatch(setValidationAction(fieldname, valid, feedback));
    }

    useEffect(() => {
        initField(fieldname);
    }, [fieldname]);

    function handleChange(e) { 
        const value = e.target.value;

        clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(async () => {
            const result = await validator(value, values, validation);
            setValidation(fieldname, result, value);
        }, validationDelay);

        setValue(e.target.value, newTimeoutId);
    }

    return (
        <input
            type={type}
            value={values[fieldname] || ''}
            onChange={handleChange}
        />
    );
}

export default Input;