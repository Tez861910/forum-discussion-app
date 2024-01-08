import palette from "../palette";

const primaryColor = palette.palette.default.primary.main;
const textColor = palette.palette.default.text.primary;
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
