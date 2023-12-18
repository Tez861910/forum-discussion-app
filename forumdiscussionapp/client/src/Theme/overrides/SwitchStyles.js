import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const transition = '0.3s'; 

const switchStyles = {
  root: {
    color: primaryMainColor,
    transition: transition, 
  },
  
  switchBase: {
    color: primaryMainColor,
    '&.Mui-checked': {
      color: primaryMainColor,
      transition: transition,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: primaryMainColor,
      transition: transition, 
    },
    transition: transition, 
  },
  
  thumb: {
    color: primaryMainColor,
    transition: transition, 
  },
  
  track: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  checked: {
    transition: transition, 
  },
};

export default switchStyles;
