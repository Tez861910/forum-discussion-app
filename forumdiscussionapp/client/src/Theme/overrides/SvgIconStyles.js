import palette from "../palette";

const {
  primary: { main: primaryMainColor },
  secondary: { main: secondaryMainColor },
  action: { active: actionActiveColor, disabled: actionDisabledColor },
  error: { main: errorMainColor },
} = palette.palette.default;

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
