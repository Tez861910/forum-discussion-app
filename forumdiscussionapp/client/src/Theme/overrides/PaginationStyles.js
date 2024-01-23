const primaryColor = "inherit";
const textColor = "inherit";
const infoColor = "inherit";

export const paginationStyles = {
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  ul: {
    justifyContent: "center",
  },
  defaultProps: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: primaryColor,
        },
        page: {
          "&.Mui-selected": {
            backgroundColor: primaryColor,
            color: textColor,
            "&:hover": {
              backgroundColor: infoColor,
            },
          },
        },
        previous: {
          color: primaryColor,
        },
        next: {
          color: primaryColor,
        },
        first: {
          color: primaryColor,
        },
        last: {
          color: primaryColor,
        },
      },
    },
  },
};
