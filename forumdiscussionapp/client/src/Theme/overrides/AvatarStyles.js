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
    backgroundColor: "inherit",
    color: "inherit",
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
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  avatarGroup: {
    avatar: {
      width: 48,
      height: 48,
      border: `2px solid "inherit"`,
    },
  },
};
