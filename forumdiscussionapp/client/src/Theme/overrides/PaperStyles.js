// Define colors
const primaryColor = "inherit";
const boxShadow =
  "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)";

// Define common styles
const commonStyles = {
  transition: "0.3s",
};

export const paperStyles = {
  root: {
    ...commonStyles,
    backgroundColor: primaryColor,
  },
  rounded: {
    ...commonStyles,
    borderRadius: "10px",
  },
  outlined: {
    ...commonStyles,
    border: `1px solid ${primaryColor}`,
  },
  elevation0: {
    ...commonStyles,
    boxShadow: "none",
  },
  elevation1: {
    ...commonStyles,
    boxShadow: boxShadow,
  },
};
