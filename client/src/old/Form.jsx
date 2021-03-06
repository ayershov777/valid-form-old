import React from 'react';
import { Link } from 'react-router-dom';

export const FormInput = ({ name, label, value, valid, feedback, type, autoComplete, handleChange }) => {
  const feedbackColor = (valid === 'warning') ? 'warning' : (valid) ? 'success' : 'danger';
  return (
    <div className='row my-2'>
      <div className='col-10 mx-auto'>
        <label className='d-block'>
          <h6 className="d-inline">{label}</h6>
          <span className={`text-${feedbackColor} pl-1 pl-md-2`}>{feedback}</span>
        </label>
        <input
          className='form-control'
          autoComplete={autoComplete || 'off'}
          type={type || 'text'}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export const Form = ({ children, title, actionText, handleSubmit, errorMessage }) => (
  <form onSubmit={handleSubmit} className='m-4 p-3'>
    <h4 className='pb-2 text-center'>{title}</h4>
    {children}
    <p className="text-danger text-center">{errorMessage}</p>
    <div className='d-flex justify-content-center mt-4'>
      <input
        className='btn btn-primary text-uppercase'
        type='submit'
        value={actionText}
      />
    </div>
  </form>
);

export const FormTemplate = ({ children, linkTo, linkText }) => (
  <div className='container'>
    <div className='row'>
      <div className='col-10 col-md-8 mx-auto m-4 border'>
        {children}
      </div>
      <Link className="col-12 text-center" to={linkTo}>{linkText}</Link>
    </div>
  </div>
);
