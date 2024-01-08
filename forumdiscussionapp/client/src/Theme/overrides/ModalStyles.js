import palette from "../palette";

const backgroundColor = palette.palette.default.background.default;

export const modalStyles = {
  defaultProps: {
    MuiModal: {
      styleOverrides: {
        root: {
          position: "fixed",
          zIndex: 1300,
          right: 0,
          bottom: 0,
          top: 0,
          left: 0,
          overflow: "auto",
          outline: 0,
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
        },
        backdrop: {
          backgroundColor: backgroundColor,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundColor,
          transition: "opacity 300ms ease-out",
        },
      },
    },
  },
};
