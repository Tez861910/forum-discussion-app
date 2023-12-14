import palette from '../palette';

const selectStyles = {
  defaultProps: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
        icon: {
          color: palette.palette.primary.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
      },
    },
  },
};

export default selectStyles;
