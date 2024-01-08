import { palette } from "../palette";
import logobg from "../logobg.jpg";

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;

export const cssBaselineStyles = {
  body: {
    backgroundImage: `url(${logobg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: primaryColor,
    color: textColorPrimary,
    transition: "0.3s",
  },
  "@global": {
    html: {
      WebkitFontSmoothing: "auto",
    },
    a: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    img: {
      maxWidth: "100%",
      height: "auto",
    },
    input: {
      "&::-webkit-input-placeholder": {
        color: primaryColor,
      },
      "&::-moz-placeholder": {
        color: primaryColor,
      },
      "&:-ms-input-placeholder": {
        color: primaryColor,
      },
      "&::placeholder": {
        color: primaryColor,
      },
    },
    "*": {
      boxSizing: "border-box",
    },
    "*::before": {
      boxSizing: "border-box",
    },
    "*::after": {
      boxSizing: "border-box",
    },
  },
};
