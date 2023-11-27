import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', 
    },
    secondary: {
      main: '#FF4081',
    },
    error: {
      main: '#FF5252', 
    },
    background: {
      default: '#ffe4c4',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    common: {
      white: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333333',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333333',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333333',
    },
    // Add more typography styles as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px', 
          padding: '12px 24px', 
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Add additional styling if needed
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '8px 0',
        },
      },
    },
    // Add style overrides for other components as needed
  },
});

export default theme;
