import palette from '../palette';

const paddingValue = '20px';
const boxShadow = '0px 3px 5px rgba(0, 0, 0, 0.2)';
const backgroundColor = palette.palette.default.text.primary;

const popoverStyles = {
  paper: {
    padding: paddingValue,
    backgroundColor: backgroundColor,
    boxShadow: boxShadow,
  },
};

export default popoverStyles;
