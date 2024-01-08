import palette from "../palette";

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const textColorPrimary = palette.palette.default.text.primary;
const textColorSecondary = palette.palette.default.text.secondary;

export const chipStyles = {
  root: {
    color: primaryColor,
    "&:hover": {
      backgroundColor: secondaryColor,
    },
    "&$outlined": {
      borderColor: primaryColor,
    },
    "&$contained": {
      backgroundColor: primaryColor,
      color: textColorPrimary,
      "&:hover": {
        backgroundColor: secondaryColor,
      },
    },
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  label: {
    color: textColorPrimary,
  },
  deleteIcon: {
    color: primaryColor,
    "&:hover": {
      color: secondaryColor,
    },
  },
  outlined: {},
  contained: {},
};
