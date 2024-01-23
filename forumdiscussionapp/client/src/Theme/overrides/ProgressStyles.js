// Define colors
const primaryColor = "inherit";
const textColor = "inherit";
const transition = "0.3s";

export const progressStyles = {
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: primaryColor,
        transition: transition,
      },
      bar: {
        backgroundColor: textColor,
        transition: transition,
      },
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: primaryColor,
        transition: transition,
      },
    },
  },
};
