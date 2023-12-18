import palette from '../palette';


const primaryMainColor = palette.palette.default.primary.main;
const transition = '0.3s'; 

const snackbarStyles = {
  root: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginTopCenter: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginBottomCenter: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginTopRight: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginBottomRight: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginTopLeft: {
    backgroundColor: primaryMainColor,
    transition: transition, 
  },
  
  anchorOriginBottomLeft: {
    backgroundColor: primaryMainColor,
    transition: transition,
  },
};

export default snackbarStyles;
