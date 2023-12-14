import palette from '../palette';

const selectStyles = {
  defaultProps: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
        },
        icon: {
          color: palette.palette.default.primary.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
        },
      },
    },
  },
};

export default selectStyles;
