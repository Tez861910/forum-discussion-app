import { alpha } from '@mui/material/styles';
import palette from '../palette';

const primaryColor = alpha(palette.palette.default.primary.main, 0.5); 
const secondaryColor = alpha(palette.palette.default.secondary.main, 0.5);
const contrastTextColorPrimary = alpha(palette.palette.default.primary.contrastText, 0.5); 
const contrastTextColorSecondary = alpha(palette.palette.default.secondary.contrastText, 0.5); 

const dialogStyles = {
    paper: {
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: primaryColor,
      color: contrastTextColorPrimary,
      transition: '0.3s', 
      boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)', 
      '&:hover': {
        backgroundColor: secondaryColor,
        color: contrastTextColorSecondary,
      },
    },
    defaultProps: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: contrastTextColorPrimary,
            padding: '1rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: secondaryColor,
            color: contrastTextColorSecondary,
            padding: '1rem',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: contrastTextColorPrimary,
            padding: '1rem',
            justifyContent: 'center',
          },
        },
      },
    },
};

export default dialogStyles;
