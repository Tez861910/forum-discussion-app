import palette from '../palette';

// Define constants for better reusability and readability
const primaryMainColor = palette.palette.default.primary.main;
const transition = 'color 0.3s ease-in-out'; // Existing transition for a smooth change
const height = '60px';
const width = '100%';
const padding = '0 10px';

const selectStyles = {
  root: {
    color: primaryMainColor,
    height: height,
    width: width,
    padding: padding,
    transition: transition,
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    outline: 'none',
    borderRadius: '5px', 
  },
  icon: {
    color: primaryMainColor,
    transition: transition, 
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
        transition: transition, 
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
        transition: transition,
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        color: primaryMainColor,
        transition: transition, 
      },
    },
  },
};

export default selectStyles;
