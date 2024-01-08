import { alpha } from "@mui/material/styles";
import { palette } from "../palette";

const primaryColor = alpha(palette.palette.default.primary.main, 0.5);
const secondaryColor = alpha(palette.palette.default.secondary.main, 0.5);
const contrastTextColorPrimary = alpha(
  palette.palette.default.primary.contrastText,
  0.5
);
const contrastTextColorSecondary = alpha(
  palette.palette.default.secondary.contrastText,
  0.5
);

export const cardStyles = {
  root: {
    padding: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: primaryColor,
    color: contrastTextColorPrimary,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: secondaryColor,
      color: contrastTextColorSecondary,
      transform: "scale(1.05)",
    },
  },
  defaultProps: {
    MuiCardHeader: {
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
          color: contrastTextColorSecondary,
          padding: "1rem",
          "&:last-child": {
            paddingBottom: "1rem",
          },
        },
      },
    },
    MuiCardActions: {
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
