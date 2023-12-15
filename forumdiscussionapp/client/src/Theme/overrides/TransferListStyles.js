import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;

const transferListStyles = {
  MuiList: {
    styleOverrides: {
      root: {
        backgroundColor: primaryMainColor,
      },
    },
  },
  
  MuiListItem: {
    styleOverrides: {
      root: {
        color: textPrimaryColor,
      },
    },
  },
  
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
      },
    },
  },
  
  MuiButton: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
      },
    },
  },
};

export default transferListStyles;
