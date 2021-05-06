import React from 'react';

import Form from '../Form/Form';
import Input from '../Form/Input';
import InputFeedback from '../Form/InputFeedback';
import Submit from '../Form/Submit';

async function validateUsername(username, values, validation) {
    try{
        const { payload: { isValid, feedback }} = await (await fetch(`/validation/username?username=${username}`)).json();
        if(!isValid) return { username: { valid: false, feedback }};
    }
    catch(err) {
        console.log(err);
    }

    if(username === '')
        return { username: { valid: false, feedback: 'required' }};

    if(username.length < 3)
        return { username: { valid: false, feedback: 'too short' }};

    if(username.length > 20)
        return { username: { valid: false, feedback: 'too long' }};

    if(!username.match(/^\w*$/))
        return { username: { valid: false, feedback: 'invalid symbols' }};

    return { username: { valid: true, feedback: 'valid' }};
}

function validatePassword(password, values, validation) {
    const tooShort = password.length < 3;
    const shortPasswordResult = { valid: false, feedback: 'too short' };
    const validPasswordResult = { valid: true, feedback: 'valid' };
    const passwordValidation = tooShort ? shortPasswordResult : validPasswordResult;
    
    const passwordsMatch = password === values.confirmation;
    const mismatchConfirmationResult = { valid: false, feedback: 'must match' }
    const validConfirmationResult = { valid: true, feedback: 'valid' }
    const confirmationValidation =
        passwordsMatch ? validConfirmationResult : mismatchConfirmationResult;

    return {
        password: passwordValidation,
        confirmation: confirmationValidation
    };
}

function validateConfirmation(confirmation, values, validation) {
    if(values.password !== confirmation)
        return { confirmation: { valid: false, feedback: 'must match' }};

    return { confirmation: { valid: true, feedback: 'valid' }};
}

function validateRange1(value, values, validation) {
    if(value > 50) return { range1: { valid: false, feedback: 'can not be greater than 50' } }
    else return { range1: { valid: true, feedback: 'valid' } }
}

function validateRange2(value, values, validation) {
    if(value < values.range1) return { range2: { valid: false, feedback: 'can not be less than range 1' } }
    else return { range2: { valid: true, feedback: 'valid' } }
}

function SignupPage() {
    function handleSubmitForm(e, formState) {
        e.preventDefault();
        console.log(formState);
    }

    return (
        <Form handleSubmit={handleSubmitForm}>
            <h1>Form Title</h1>
            <label>Username</label> <br />
            <Input fieldname="username" type="text" validator={validateUsername} />
            <InputFeedback fieldname="username" />
            <br />
            <label>Password</label><br />
            <Input fieldname="password" type="text" validator={validatePassword} />
            <InputFeedback fieldname="password" />
            <br />
            <label>Confirm Password</label><br />
            <Input fieldname="confirmation" type="text" validator={validateConfirmation} />
            <InputFeedback fieldname="confirmation" />
            <br />
            <label>Range 1</label><br />
            <Input fieldname="range1" type="range" validator={validateRange1} />
            <InputFeedback fieldname="range1" />
            <br />
            <label>Range 2</label><br />
            <Input fieldname="range2" type="range" validator={validateRange2} />
            <InputFeedback fieldname="range2" />
            <br />
            <Submit text="submit" />
        </Form>
    );
}

export default SignupPage;