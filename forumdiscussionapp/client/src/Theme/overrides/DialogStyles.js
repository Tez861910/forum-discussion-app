import palette from "../palette";

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const contrastTextColorPrimary = palette.palette.default.primary.contrastText;
const contrastTextColorSecondary =
  palette.palette.default.secondary.contrastText;

export const dialogStyles = {
  paper: {
    padding: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: primaryColor,
    color: contrastTextColorPrimary,
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: secondaryColor,
      color: contrastTextColorSecondary,
    },
  },
  defaultProps: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
          color: contrastTextColorPrimary,
          padding: "1rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
          color: contrastTextColorSecondary,
          padding: "1rem",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
          color: contrastTextColorPrimary,
          padding: "1rem",
          justifyContent: "center",
        },
      },
    },
  },
};
