import palette from "../palette";

const backgroundColorDefault = palette.palette.default.background.default;
const textColorPrimary = palette.palette.default.text.primary;

export const imageListStyles = {
  defaultProps: {
    MuiImageList: {
      styleOverrides: {
        root: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.625rem",
          backgroundColor: backgroundColorDefault,
          transition: "0.3s",
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: {
          listStyle: "none",
          height: "auto",
          color: textColorPrimary,
        },
        imgFullHeight: {
          height: "100%",
        },
        imgFullWidth: {
          width: "100%",
        },
      },
    },
  },
};
