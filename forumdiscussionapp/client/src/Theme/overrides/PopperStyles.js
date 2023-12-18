import palette from '../palette';


const paddingValue = '10px';
const boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.2)';
const backgroundColor = palette.palette.default.text.primary;
const borderRadius = '4px';
const transition = '0.3s'; 

const popperStyles = {
  paper: {
    padding: paddingValue,
    backgroundColor: backgroundColor,
    boxShadow: boxShadow,
    borderRadius: borderRadius,
    transition: transition, 
  },
};

export default popperStyles;
