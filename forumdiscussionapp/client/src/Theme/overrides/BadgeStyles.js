import { palette } from "../palette";

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const errorColor = palette.palette.default.error.main;
const textColorPrimary = palette.palette.default.text.primary;

export const badgeStyles = {
  root: {
    marginRight: "1rem",
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  badge: {
    backgroundColor: secondaryColor,
    color: textColorPrimary,
  },
  colorPrimary: {
    backgroundColor: primaryColor,
  },
  colorSecondary: {
    backgroundColor: secondaryColor,
  },
  colorError: {
    backgroundColor: errorColor,
  },
  dot: {
    borderRadius: "50%",
  },
  anchorOriginTopRightRectangle: {
    top: "0",
    right: "0",
  },
  anchorOriginBottomRightRectangle: {
    bottom: "0",
    right: "0",
  },
  anchorOriginTopLeftRectangle: {
    top: "0",
    left: "0",
  },
  anchorOriginBottomLeftRectangle: {
    bottom: "0",
    left: "0",
  },
  anchorOriginTopRightCircular: {
    top: "14%",
    right: "14%",
  },
  anchorOriginBottomRightCircular: {
    bottom: "14%",
    right: "14%",
  },
  anchorOriginTopLeftCircular: {
    top: "14%",
    left: "14%",
  },
  anchorOriginBottomLeftCircular: {
    bottom: "14%",
    left: "14%",
  },
};
