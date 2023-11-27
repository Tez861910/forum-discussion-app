import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';
import './logo.png';

const Start = () => {
  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
        <Grid item xs={12} align="center">
          {/* Logo */}
          <img src={require('./logo.png')} alt="Logo" style={{ marginBottom: '20px', maxWidth: '100%' }} />

          {/* Welcome Message */}
          <Typography variant="h1" gutterBottom>
            <strong>Welcome to Forum Discussion App!</strong>
          </Typography>

          {/* Navigation Buttons */}
          <nav style={{ marginTop: '20px' }}>
            <Button variant="contained" component={Link} to="/login" color="primary" sx={{ marginRight: 1 }}>
              Login
            </Button>
            <Button variant="contained" component={Link} to="/sign-up" color="secondary">
              Signup
            </Button>
          </nav>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
