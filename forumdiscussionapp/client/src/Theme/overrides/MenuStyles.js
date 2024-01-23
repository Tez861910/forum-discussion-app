// Define colors
const primaryColor = "inherit";
const backgroundColor = "inherit";
const paperColor = "inherit";

export const menuStyles = {
  defaultProps: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: backgroundColor,
          transition: "0.3s",
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: backgroundColor,
          },
          "&$selected": {
            backgroundColor: primaryColor,
            border: "none",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: primaryColor,
        },
      },
    },
  },
};
