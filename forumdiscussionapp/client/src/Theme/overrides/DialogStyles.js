import { palette } from "../palette";

// Define colors
const primaryColor = palette.palette.default.primary.main;
const tertiaryColor = palette.palette.default.tertiary.main;
const contrastTextColorPrimary = palette.palette.default.primary.contrastText;
const contrastTextColorSecondary =
  palette.palette.default.secondary.contrastText;

// Define common styles
const commonStyles = {
  padding: "1rem",
  borderRadius: "0.5rem",
  transition: "0.3s",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
};

export const dialogStyles = {
  paper: {
    ...commonStyles,
    backgroundColor: primaryColor,
    color: contrastTextColorPrimary,
    "&:hover": {
      backgroundColor: tertiaryColor,
      color: contrastTextColorSecondary,
    },
  },
  defaultProps: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: primaryColor,
          color: contrastTextColorPrimary,
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: tertiaryColor,
          color: contrastTextColorSecondary,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: primaryColor,
          color: contrastTextColorPrimary,
          justifyContent: "center",
        },
      },
    },
  },
};
