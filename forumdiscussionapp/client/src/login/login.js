import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Button, Container, Grid, Typography, TextField } from '@mui/material';
import './login.css';

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
    navigate('/home');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/Login/login', {
        email: values.email,
        password: values.password,
      });
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
    <Container component="main" maxWidth="xs">
      <div className="login-page">
        <div className="form">
          <Typography component="h2" variant="h5">
            Sign-In
          </Typography>
          {error && <div className="message">{error}</div>}
          <form onSubmit={handleSubmit}>
            {['email', 'password'].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id={field}
                  label={field === 'email' ? 'Email' : 'Password'}
                  type={field === 'email' ? 'email' : 'password'}
                  placeholder={`Enter ${field === 'email' ? 'Email' : 'Password'}`}
                  name={field}
                  autoComplete={field === 'email' ? 'email' : 'current-password'}
                  value={values[field]}
                  onChange={handleInput}
                />
              </Grid>
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
            <Typography variant="body2">
              You agree to our terms and conditions
            </Typography>
            <Link to="/sign-up" variant="body2">
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
