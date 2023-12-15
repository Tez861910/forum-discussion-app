import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;

const selectStyles = {
  defaultProps: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
        icon: {
          color: primaryMainColor,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
      },
    },
  },
};

export default selectStyles;
