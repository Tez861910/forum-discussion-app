import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useError } from './ErrorHandling';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  useError();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // handleLoginSuccess function
const handleLoginSuccess = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = token;
  console.log('JWT token set in local storage and as a default header.');
  navigate('/Home');
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit button clicked');

    try {
      const response = await axios.post('http://localhost:8081/auth/login', values);

      if (response.data.success) {
        handleLoginSuccess(response.data.token);
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response) {
        setError(error.response.data.error || 'Login failed. Please try again.');
        console.log(error.response);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>

        {error && (
          <div className='text-danger'>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              autoComplete='email'
              value={values.email}
              onChange={handleInput}
              className='form-control rounded-0'
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              autoComplete='current-password'
              value={values.password}
              onChange={handleInput}
              className='form-control rounded-0'
            />
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Log in
          </button>

          <p>You agree to our terms and conditions</p>

          <Link
            to='/signup'
            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
