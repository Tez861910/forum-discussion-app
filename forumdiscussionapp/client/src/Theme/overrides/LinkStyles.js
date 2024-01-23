// Define colors
const primaryColor = "inherit";
const secondaryColor = "inherit";

export const linkStyles = {
  root: {
    color: primaryColor,
    transition: "0.3s",
    "&:hover": {
      color: secondaryColor,
    },
  },
  underlineHover: {
    textDecoration: "underline",
  },
  underlineAlways: {
    textDecoration: "underline",
  },
  button: {
    color: primaryColor,
  },
};
