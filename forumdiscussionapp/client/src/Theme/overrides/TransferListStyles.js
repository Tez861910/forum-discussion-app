import palette from '../palette';

const transferListStyles = {
  MuiList: {
    styleOverrides: {
      root: {
        backgroundColor: palette.palette.default.primary.main,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        color: palette.palette.default.text.primary,
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: palette.palette.default.primary.main,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        color: palette.palette.default.primary.main,
      },
    },
  },
};

export default transferListStyles;
