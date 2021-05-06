import { createStore } from 'redux';

const formState = {
    promises: {},
    timeoutIds: {},
    validation: {},
    validationDelay: undefined,
    values: {},
};

export const store = createStore(
    reducer,
    formState,
    window.devToolsExtension && window.devToolsExtension()
);

function reducer(state, action) {
    switch(action.type) {
        case 'INIT_FORM': {
            const { validationDelay } = action.payload;
            return { ...state, validationDelay };
        }
        case 'INIT_FIELD': {
            const fieldname = action.payload;
            return {
                ...state,
                values: { ...state.values, [fieldname]: '' },
                validation: { ...state.validation, [fieldname]: { valid: false, feedback: '' }},
                timeoutIds: { ...state.timeoutIds, [fieldname]: 0 },
            };
        }
        case 'SET_VALUE': {
            const { fieldname, value, timeoutId } = action.payload;
            return {
                ...state,
                values: { ...state.values, [fieldname]: value },
                timeoutIds: { ...state.timeoutIds, [fieldname]: timeoutId },
            };
        }
        case 'SET_VALIDATION': {
            const { fieldname, validationResult, value } = action.payload;

            if(state.values[fieldname] !== value)
                return state;

            return {
                ...state,
                validation: { ...state.validation, ...validationResult },
            };
        }
        case 'SET_PROMISE': {
            const { fieldname, promise } = action.payload;
            return {
                ...state,
                promises: { ...state.promises, [fieldname]: promise },
            };
        }
        default: {
            return state;
        }
    }
}

export function initFormAction(validationDelay) {
    return {
        type: 'INIT_FORM',
        payload: { validationDelay },
    };
}

export function initFieldAction(fieldname) {
    return {
        type: 'INIT_FIELD',
        payload: fieldname,
    };
}

export function setValueAction(fieldname, value, timeoutId) {
    return {
        type: 'SET_VALUE',
        payload: { fieldname, value, timeoutId },
    }
}

export function setValidationAction(fieldname, validationResult, value) {
    return {
        type: 'SET_VALIDATION',
        payload: { fieldname, validationResult, value },
    }
}