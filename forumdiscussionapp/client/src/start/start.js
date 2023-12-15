import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Typography,
  Paper,
  Avatar,
  Stack,
  Grid,
  Box,
  Container,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from './logo.png';

// Define constants
const BUTTON_STYLES = {
  width: '100%',
  fontSize: '1.2rem',
  py: 2,
  borderRadius: 4,
  boxShadow: 3,
  textTransform: 'none',
};

// Create reusable components
const NavigationButton = ({ to, color, children }) => (
  <Button
    variant="contained"
    component={RouterLink}
    to={to}
    color={color}
    sx={BUTTON_STYLES}
  >
    {children}
  </Button>
);

const Start = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          opacity: 0.9,
          transition: 'opacity .3s',
          '&:hover': { opacity: 1 },
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6} align="center">
            {/* Logo */}
            <Box
              component="div"
              sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack>
                <Avatar src={logo} alt="Logo" sx={{ width: 200, height: 200 }} />
              </Stack>
            </Box>

            {/* Welcome Message */}
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                textAlign: 'center',
                textShadow: '1px 1px 2px gray',
              }}
            >
              Welcome to the Forum Discussion App!
            </Typography>

            {/* Navigation Buttons */}
            <Box component="nav" sx={{ mt: 2 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
              >
                <NavigationButton to="/login" color="primary">
                  Login
                </NavigationButton>
                <NavigationButton to="/sign-up" color="secondary">
                  Signup
                </NavigationButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Start;
