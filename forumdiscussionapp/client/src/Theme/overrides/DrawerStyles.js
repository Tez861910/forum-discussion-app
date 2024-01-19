import { alpha } from "@mui/material/styles";
import { palette } from "../palette";

// Define colors with alpha
const primaryColor = alpha(palette.palette.default.primary.main, 0.3);
const secondaryColor = alpha(palette.palette.default.secondary.main, 0.3);
const contrastTextColorPrimary = alpha(
  palette.palette.default.primary.contrastText,
  0.3
);
const contrastTextColorSecondary = alpha(
  palette.palette.default.secondary.contrastText,
  0.3
);

// Define common styles
const commonStyles = {
  width: "240px",
  backgroundColor: primaryColor,
  color: contrastTextColorPrimary,
  transition: "0.3s",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
};

export const drawerStyles = {
  paper: {
    ...commonStyles,
    "&:hover": {
      backgroundColor: secondaryColor,
      color: contrastTextColorSecondary,
    },
  },
  defaultProps: {
    MuiList: {
      styleOverrides: {
        root: {
          ...commonStyles,
          maxWidth: "360px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: contrastTextColorPrimary,
        },
        button: {
          "&:hover": {
            backgroundColor: secondaryColor,
            color: contrastTextColorSecondary,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: contrastTextColorPrimary,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: contrastTextColorPrimary,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
        },
      },
    },
  },
};
