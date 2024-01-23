// Define colors
const primaryColor = "inherit";
const secondaryColor = "inherit";
const contrastTextColor = "inherit";

export const fabStyles = {
  defaultProps: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
          color: contrastTextColor,
          "&:hover": {
            backgroundColor: secondaryColor,
          },
          transition: "0.3s",
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
        },
        primary: {
          backgroundColor: primaryColor,
          "&:hover": {
            backgroundColor: secondaryColor,
          },
        },
        secondary: {
          backgroundColor: secondaryColor,
          "&:hover": {
            backgroundColor: primaryColor,
          },
        },
      },
      variants: [
        {
          props: { variant: "extended" },
          style: {
            backgroundColor: primaryColor,
            "&:hover": {
              backgroundColor: secondaryColor,
            },
          },
        },
      ],
    },
  },
};
