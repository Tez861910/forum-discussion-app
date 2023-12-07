import { createTheme } from '@mui/material/styles';
import logobg from './logobg.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057', 
    },
    error: {
      main: '#FF5252',
    },
    background: {
      default: '#fafafa',
      backgroundImage: `url(${logobg})`,
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 700,
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
          color: 'secondary.main',
          '&.Mui-focused': {
            color: 'primary.main',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'secondary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'primary.main',
          color: 'background.default',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '240px',
          backgroundColor: 'background.default',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '16px',
          borderRadius: '8px',
        },
      },
    },
    // Add style overrides for other components as needed
  },
});

export default theme;
