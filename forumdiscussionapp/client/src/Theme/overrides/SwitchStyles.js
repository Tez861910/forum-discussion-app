import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;

const switchStyles = {
  root: {
    color: primaryMainColor,
  },
  
  switchBase: {
    color: primaryMainColor,
    '&.Mui-checked': {
      color: primaryMainColor,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: primaryMainColor,
    },
  },
  
  thumb: {
    color: primaryMainColor,
  },
  
  track: {
    backgroundColor: primaryMainColor,
  },
  
  checked: {},
};

export default switchStyles;
