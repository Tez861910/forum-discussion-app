import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import logo from './logo.png';

const Start = () => {
  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} align="center">
            {/* Logo */}
            <Box component="div" sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>

            {/* Welcome Message */}
            <Typography variant="h1" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary', textAlign: 'center' }}>
              Welcome to the Forum Discussion App!
            </Typography>

            {/* Navigation Buttons */}
            <Box component="nav" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    sx={{ width: '100%', fontSize: '1rem', py: 2, borderRadius: 1 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/sign-up"
                    color="secondary"
                    sx={{ width: '100%', fontSize: '1rem', py: 2, borderRadius: 1 }}
                  >
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Start;
