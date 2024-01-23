export const accordionStyles = {
  root: {
    margin: "1rem 0",
    "&.Mui-expanded": {
      margin: "1rem 0",
    },
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0px 4px 8px -2px rgba(0, 0, 0, 0.3)",
    },
  },
  rounded: {
    borderRadius: "0.25rem",
  },
  gutters: {
    padding: "0 1rem",
  },
  defaultProps: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          color: "inherit",
          "&:hover": {
            backgroundColor: "inherit",
            color: "inherit",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          color: "inherit",
        },
      },
    },
  },
};
