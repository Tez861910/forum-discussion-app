export const toggleButtonStyles = {
  root: {
    textTransform: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    color: "inherit",
    "&.Mui-selected": {
      backgroundColor: "inherit",
      color: "inherit",
      "&:hover": {
        backgroundColor: "inherit",
      },
    },
    "&:hover": {
      backgroundColor: "inherit",
    },
    "&.Mui-disabled": {
      color: "inherit",
    },
  },

  sizeSmall: {
    padding: "8px 16px",
    fontSize: "0.8125rem",
  },

  sizeLarge: {
    padding: "16px 32px",
    fontSize: "0.9375rem",
  },

  label: {
    color: "inherit",
  },
};
