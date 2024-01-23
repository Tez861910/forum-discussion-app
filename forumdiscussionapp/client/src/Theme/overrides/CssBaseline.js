import logobg from "../logobg.jpg";

export const cssBaselineStyles = {
  body: {
    backgroundImage: `url(${logobg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "inherit",
    color: "inherit",
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
        color: "inherit",
      },
      "&::-moz-placeholder": {
        color: "inherit",
      },
      "&:-ms-input-placeholder": {
        color: "inherit",
      },
      "&::placeholder": {
        color: "inherit",
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
