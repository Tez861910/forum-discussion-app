import { palette } from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const transition = "0.3s";

export const transferListStyles = {
  MuiList: {
    styleOverrides: {
      root: {
        backgroundColor: primaryMainColor,
        transition: transition,
      },
    },
  },

  MuiListItem: {
    styleOverrides: {
      root: {
        color: textPrimaryColor,
        transition: transition,
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
        transition: transition,
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
        transition: transition,
      },
    },
  },
};
