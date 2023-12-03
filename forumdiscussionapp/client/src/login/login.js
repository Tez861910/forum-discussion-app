import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Button, Container, Grid, Typography, TextField, Box, Paper, Stack } from '@mui/material';

const Login = () => {
  const [values, setValues] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLoginSuccess = (data) => {
    setCookie('token', data.token, { path: '/login' });
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
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography component="h2" variant="h5">
              Sign-In
            </Typography>
            {error && <Box className="login-message">{error}</Box>}
            <form onSubmit={handleSubmit}>
              {['email', 'password'].map((field) => (
                <Grid item xs={12} key={field}>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id={field}
                    label={field === 'email' ? 'Email' : 'Password'}
                    type={field === 'email' ? 'email' : 'password'}
                    placeholder={`Enter ${field === 'email' ? 'Email' : 'Password'}`}
                    name={field}
                    autoComplete={field === 'email' ? 'email' : 'current-password'}
                    value={values[field]}
                    onChange={handleInput}
                    sx={{ '.MuiInputBase-input': { fontSize: '1rem' } }}
                  />
                </Grid>
              ))}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Log in
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                You agree to our terms and conditions
              </Typography>
              <Link to="/sign-up" variant="body2" sx={{ mt: 2 }}>
                Create Account
              </Link>
            </form>
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/')}
            >
            Go back to start
            </Button>

          </Grid>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
