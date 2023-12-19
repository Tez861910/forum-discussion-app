import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  Avatar,
  Box,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/system';
import logo from './logo.png';

const NavigationButton = ({ to, color, children }) => (
  <Button
    variant="contained"
    component={RouterLink}
    to={to}
    color={color}
    sx={{
      fontSize: '1.2rem',
      py: 1,
      px: 2, 
      borderRadius: 2,
      textTransform: 'none',
      ml: 2, 
    }}
  >
    {children}
  </Button>
);

const Start = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{p:6}}>
      <AppBar position="static" sx={{ boxShadow: 2, bgcolor: theme.palette.background.paper }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="div">
              University Website
            </Typography>
          </Box>
          <NavigationButton to="/login" color="primary" sx={{ ml: 1 }}>
            Login
          </NavigationButton>
          <NavigationButton to="/sign-up" color="secondary" sx={{ ml: 1 }}>
            Signup
          </NavigationButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} sx={{ width: 240 }} > 
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div">
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ButtonBase component={ListItem} sx={{ py: 2 }}>
            <ListItemText primary="Dummy Button 1" />
          </ButtonBase>
          <ButtonBase component={ListItem} sx={{ py: 2 }}>
            <ListItemText primary="Dummy Button 2" />
          </ButtonBase>
        </List>
      </Drawer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          pt: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4, 
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            opacity: 0.9,
            transition: 'opacity .3s',
            '&:hover': { opacity: 1 },
          }}
        >
          <Avatar src={logo} alt="Logo" sx={{ width: 200, height: 200 }} />
          <Typography variant="h1" sx={{ mt: 4, textAlign: 'center' }}>
            Welcome to the University Website!
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Start;
