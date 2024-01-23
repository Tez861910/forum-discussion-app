const primaryColor = "inherit";

export const breadcrumbsStyles = {
  root: {
    "& > * + *": {
      marginLeft: "0.5rem",
    },
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  ol: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  separator: {
    display: "flex",
    userSelect: "none",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  },
  defaultProps: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: primaryColor,
        },
        underlineHover: {
          textDecoration: "none",
        },
        button: {
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
};
