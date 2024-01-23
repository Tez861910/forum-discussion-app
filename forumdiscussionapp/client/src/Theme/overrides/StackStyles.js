// Define colors
const tertiaryMainColor = "inherit";
const textPrimaryColor = "inherit";

// Define common styles
const commonStyles = {
  padding: "16px",
  transition: "0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const stackStyles = {
  root: {
    ...commonStyles,
  },

  defaultProps: {
    MuiBox: {
      styleOverrides: {
        root: {
          ...commonStyles,
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: tertiaryMainColor,
          color: textPrimaryColor,
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          ...commonStyles,
        },
      },
    },
  },
};
