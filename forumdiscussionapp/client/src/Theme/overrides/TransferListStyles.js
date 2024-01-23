// Define colors
const primaryMainColor = "inherit";
const textPrimaryColor = "inherit";
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
