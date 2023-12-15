import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const secondaryMainColor = palette.palette.default.secondary.main;
const actionActiveColor = palette.palette.default.action.active;
const errorMainColor = palette.palette.default.error.main;
const actionDisabledColor = palette.palette.default.action.disabled;

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
