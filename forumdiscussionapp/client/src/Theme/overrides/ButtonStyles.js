export const buttonStyles = {
  root: {
    textTransform: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem 1.5rem",
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0px 4px 8px -2px rgba(0, 0, 0, 0.3)",
    },
  },
  label: {},
  text: {
    padding: "0.375rem 0.5rem",
  },
  textPrimary: {},
  textSecondary: {},
  outlined: {
    padding: "0.375rem 1rem",
    border: "1px solid #ddd",
  },
  outlinedPrimary: {},
  outlinedSecondary: {},
  contained: {
    boxShadow: "none",
    "&:active": {
      boxShadow: "none",
    },
  },
  containedPrimary: {
    "&:hover": {
      backgroundColor: "#007bff",
    },
  },
  containedSecondary: {
    "&:hover": {
      backgroundColor: "#6c757d",
    },
  },
  disableElevation: {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
    "&$focusVisible": {
      boxShadow: "none",
    },
  },
  sizeSmall: {
    padding: "0.25rem 0.5rem",
    fontSize: "0.875rem",
  },
  sizeLarge: {
    padding: "0.5rem 1.5rem",
    fontSize: "1.25rem",
  },
  fullWidth: {
    width: "100%",
  },
  startIcon: {
    marginRight: "0.5rem",
  },
  endIcon: {
    marginLeft: "0.5rem",
  },
  iconSizeSmall: {
    "& > *:first-path": {
      fontSize: "18px",
    },
  },
  iconSizeMedium: {
    "& > *:first-path": {
      fontSize: "20px",
    },
  },
  iconSizeLarge: {
    "& > *:first-path": {
      fontSize: "22px",
    },
  },
};
