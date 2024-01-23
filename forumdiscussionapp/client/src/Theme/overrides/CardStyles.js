// Define colors
const primaryColor = "inherit";
const tertiaryColor = "inherit";
const contrastTextColorPrimary = "inherit";
const contrastTextColorSecondary = "inherit";

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
