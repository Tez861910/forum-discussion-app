import palette from '../palette';

const transferListStyles = {
  MuiList: {
    styleOverrides: {
      root: {
        backgroundColor: palette.palette.primary.main,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        color: palette.palette.text.primary,
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: palette.palette.primary.main,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        color: palette.palette.primary.main,
      },
    },
  },
};

export default transferListStyles;
