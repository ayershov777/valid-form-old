import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { initFormAction, store } from '../../redux/redux';

function Form({ children, handleSubmit, validationDelay }) {
    const values = useSelector((state) => state.values);
    
    const dispatch = useDispatch();

    const initForm = (validationDelay) => dispatch(initFormAction(validationDelay));

    useEffect(() => {
        initForm(validationDelay || 1000/5);
    }, [validationDelay]);

    function handleSubmitForm(e) {
        handleSubmit(e, values);
    }

    return (
        <form onSubmit={handleSubmitForm}>
            {children}
        </form>
    );
}

function Wrapper(props) {
    return (
        <Provider store={store}>
            <Form {...props} />
        </Provider>
    );
}

export default Wrapper;