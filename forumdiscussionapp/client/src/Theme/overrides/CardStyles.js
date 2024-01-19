import { alpha } from "@mui/material/styles";
import { palette } from "../palette";

// Define colors with alpha
const primaryColor = alpha(palette.palette.default.primary.main, 0.5);
const tertiaryColor = alpha(palette.palette.default.tertiary.main, 0.5);
const contrastTextColorPrimary = alpha(
  palette.palette.default.primary.contrastText,
  0.5
);
const contrastTextColorSecondary = alpha(
  palette.palette.default.secondary.contrastText,
  0.5
);

// Define common styles
const commonStyles = {
  padding: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "0.3s",
};

export const cardStyles = {
  root: {
    ...commonStyles,
    backgroundColor: primaryColor,
    color: contrastTextColorPrimary,
    "&:hover": {
      backgroundColor: tertiaryColor,
      color: contrastTextColorSecondary,
      transform: "scale(1.05)",
    },
  },
  defaultProps: {
    MuiCardHeader: {
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: tertiaryColor,
          color: contrastTextColorSecondary,
          "&:last-child": {
            paddingBottom: "1rem",
          },
        },
      },
    },
    MuiCardActions: {
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
