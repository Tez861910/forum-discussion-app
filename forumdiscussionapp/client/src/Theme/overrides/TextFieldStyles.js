import palette from '../palette';

const textFieldStyles = {
  root: {
    margin: '8px 0',
  },
  defaultProps: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.grey[200],
          borderRadius: '4px',
          padding: '10px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
          fontWeight: 'bold',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: palette.palette.warning.main,
        },
      },
    },
  },
};

export default textFieldStyles;
