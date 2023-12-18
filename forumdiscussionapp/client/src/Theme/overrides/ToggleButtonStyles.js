import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const infoMainColor = palette.palette.default.info.main;
const grey200Color = palette.palette.default.grey[200];
const grey400Color = palette.palette.default.grey[400];
const transition = '0.3s'; 

const toggleButtonStyles = {
  root: {
    textTransform: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    color: primaryMainColor,
    '&.Mui-selected': {
      backgroundColor: primaryMainColor,
      color: textPrimaryColor,
      '&:hover': {
        backgroundColor: infoMainColor,
        transition: transition,
      },
      transition: transition, 
    },
    '&:hover': {
      backgroundColor: grey200Color,
      transition: transition,
    },
    '&.Mui-disabled': {
      color: grey400Color,
      transition: transition, 
    },
    transition: transition,
  },
  
  sizeSmall: {
    padding: '8px 16px',
    fontSize: '0.8125rem',
    transition: transition, 
  },
  
  sizeLarge: {
    padding: '16px 32px',
    fontSize: '0.9375rem',
    transition: transition, 
  },
  
  label: {
    color: primaryMainColor,
    transition: transition, 
  },
};

export default toggleButtonStyles;
