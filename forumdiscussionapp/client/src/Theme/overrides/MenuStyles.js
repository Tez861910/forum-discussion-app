import palette from "../palette";

const primaryColor = palette.palette.default.tertiary.main;
const backgroundColor = palette.palette.default.background.default;
const paperColor = palette.palette.default.background.paper;

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
