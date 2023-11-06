import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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

  const handleLoginSuccess = (data) => {
    // Store the token as a cookie
    setCookie('token', data.token, { path: '/' });

    // Store other data in local storage
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('roleId', data.roleId);
    localStorage.setItem('courseId', data.courseId);

    console.log('Redirecting to /home');
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Sign-In</h2>

        {error && <div className="message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInput}
            />
          </div>

          <button type="submit">Log in</button>

          <p>You agree to our terms and conditions</p>

          <Link to="/sign-up">Create Account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
