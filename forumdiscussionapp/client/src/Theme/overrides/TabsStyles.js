const paperColor = "inherit";
const infoMainColor = "inherit";
const primaryMainColor = "inherit";
const secondaryMainColor = "inherit";
const transition = "0.3s";

export const tabsStyles = {
  defaultProps: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: paperColor,
          minHeight: 48,
          transition: transition,
        },
        indicator: {
          backgroundColor: infoMainColor,
          transition: transition,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minWidth: 72,
          "&:hover": {
            color: primaryMainColor,
            opacity: 1,
            transition: transition,
          },
          "&$selected": {
            color: secondaryMainColor,
            transition: transition,
          },
          "&:focus": {
            color: secondaryMainColor,
            transition: transition,
          },
          transition: transition,
        },
      },
    },
  },
};
