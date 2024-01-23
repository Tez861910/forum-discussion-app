// Define colors
const primaryMainColor = "inherit";
const secondaryMainColor = "inherit";
const actionActiveColor = "inherit";
const actionDisabledColor = "inherit";
const errorMainColor = "inherit";

const transition = "0.3s";

export const svgIconStyles = {
  root: {
    color: primaryMainColor,
    transition: transition,
  },

  colorPrimary: {
    color: primaryMainColor,
    transition: transition,
  },

  colorSecondary: {
    color: secondaryMainColor,
    transition: transition,
  },

  colorAction: {
    color: actionActiveColor,
    transition: transition,
  },

  colorError: {
    color: errorMainColor,
    transition: transition,
  },

  colorDisabled: {
    color: actionDisabledColor,
    transition: transition,
  },
};
