// Define colors
const primaryColor = "inherit";
const secondaryColor = "inherit";
const textColorPrimary = "inherit";
const textColorSecondary = "inherit";

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
