import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';

const Start = () => {
  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Grid item xs={12} align="center">
          <Typography variant="h1" gutterBottom>
           <strong> Welcome to Forum Discussion App!</strong>
           <br/>
           <br/>
           <br/>
          </Typography>
        
          <nav>
            <Button variant="contained" component={Link} to="/login" color="primary">
              Login
            </Button>
            <Button variant="contained" component={Link} to="/sign-up" color="secondary" style={{ marginLeft: '10px' }}>
              Signup
            </Button>
          </nav>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Start;
