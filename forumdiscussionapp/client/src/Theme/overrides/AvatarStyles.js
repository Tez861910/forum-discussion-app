import palette from "../palette";

const primaryColor = palette.palette.default.primary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;
const fontFamily = "Roboto, Helvetica, Arial, sans-serif";

export const avatarStyles = {
  root: {
    width: "3rem",
    height: "3rem",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  colorDefault: {
    backgroundColor: primaryColor,
    color: contrastTextColor,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    textAlign: "center",
    textIndent: "10000px",
  },
  fallback: {
    fontSize: "1rem",
    fontFamily: fontFamily,
  },
  avatarGroup: {
    avatar: {
      width: 48,
      height: 48,
      border: `2px solid ${primaryColor}`,
    },
  },
};
