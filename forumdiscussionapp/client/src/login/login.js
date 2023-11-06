import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSuccess = (data) => {
    setCookie('token', data.token, { path: '/' });
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('roleId', data.roleId);
    localStorage.setItem('courseId', data.courseId);
    navigate('/home');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/Login/login', values);
      if (response.data.success) {
        handleLoginSuccess(response.data);
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Sign-In</h2>
        {error && <div className="message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field}>{field === 'email' ? 'Email' : 'Password'}</label>
              <input
                type={field === 'email' ? 'email' : 'password'}
                placeholder={`Enter ${field === 'email' ? 'Email' : 'Password'}`}
                name={field}
                autoComplete={field === 'email' ? 'email' : 'current-password'}
                value={values[field]}
                onChange={handleInput}
              />
            </div>
          ))}
          <button type="submit">Log in</button>
          <p>You agree to our terms and conditions</p>
          <Link to="/sign-up">Create Account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
