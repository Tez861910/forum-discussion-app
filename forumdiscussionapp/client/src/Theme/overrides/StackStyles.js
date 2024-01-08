import { palette } from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const transition = "0.3s";

export const stackStyles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: transition,
  },

  defaultProps: {
    MuiBox: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          transition: transition,
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "16px",
          backgroundColor: primaryMainColor,
          color: textPrimaryColor,
          transition: transition,
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: transition,
        },
      },
    },
  },
};
