import palette from '../palette';

const greyColor = palette.palette.default.grey[200];
const primaryMainColor = palette.palette.default.primary.main;
const warningMainColor = palette.palette.default.warning.main;

const textFieldStyles = {
  root: {
    margin: '8px 0',
  },
  
  defaultProps: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: greyColor,
          borderRadius: '4px',
          padding: '10px',
        },
      },
    },
    
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          fontWeight: 'bold',
        },
      },
    },
    
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
      },
    },
    
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: warningMainColor,
        },
      },
    },
  },
};

export default textFieldStyles;
