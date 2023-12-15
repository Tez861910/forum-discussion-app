import palette from '../palette';

const {
  primary: { main: primaryMainColor },
  secondary: { main: secondaryMainColor },
  action: { active: actionActiveColor, disabled: actionDisabledColor },
  error: { main: errorMainColor },
} = palette.palette.default;

const svgIconStyles = {
  root: {
    color: primaryMainColor,
  },

  colorPrimary: {
    color: primaryMainColor,
  },

  colorSecondary: {
    color: secondaryMainColor,
  },

  colorAction: {
    color: actionActiveColor,
  },

  colorError: {
    color: errorMainColor,
  },

  colorDisabled: {
    color: actionDisabledColor,
  },
};

export default svgIconStyles;
