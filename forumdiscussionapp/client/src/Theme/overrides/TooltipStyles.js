import palette from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const transition = "0.3s";

export const tooltipStyles = {
  tooltip: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    transition: transition,
  },

  tooltipPlacementLeft: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    transition: transition,
  },

  tooltipPlacementRight: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    transition: transition,
  },

  tooltipPlacementTop: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    transition: transition,
  },

  tooltipPlacementBottom: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    transition: transition,
  },

  arrow: {
    color: primaryMainColor,
    transition: transition,
  },

  touch: {
    color: primaryMainColor,
    transition: transition,
  },

  popper: {
    color: primaryMainColor,
    transition: transition,
  },

  popperInteractive: {
    color: primaryMainColor,
    transition: transition,
  },

  popperArrow: {
    color: primaryMainColor,
    transition: transition,
  },

  popperClose: {
    color: primaryMainColor,
    transition: transition,
  },

  popperOpen: {
    color: primaryMainColor,
    transition: transition,
  },
};
