import palette from "../palette";

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;
const backgroundColor = palette.palette.default.background.default;
const textColor = palette.palette.default.text.primary;

export const accordionStyles = {
  root: {
    margin: "1rem 0",
    "&.Mui-expanded": {
      margin: "1rem 0",
    },
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
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
          backgroundColor: primaryColor,
          color: contrastTextColor,
          "&:hover": {
            backgroundColor: secondaryColor,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundColor,
          color: textColor,
        },
      },
    },
  },
};
