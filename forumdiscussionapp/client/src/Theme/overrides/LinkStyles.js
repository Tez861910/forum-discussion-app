import { palette } from "../palette";

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;

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
