import React from 'react';
import { useSelector } from 'react-redux';

function Submit({ text }) {
    const disabled = useSelector((state) => !isFormValid(state.validation));

    function isFormValid(validation) {
        return Object.values(validation).reduce((isValid, v) => isValid && v.valid, true);
    }

    return (
        <input type="submit" value={text} disabled={disabled} />
    );
}

export default Submit;