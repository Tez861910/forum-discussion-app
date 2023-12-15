import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const infoMainColor = palette.palette.default.info.main;

const ratingStyles = {
  root: {
    color: primaryMainColor,
  },
  
  iconFilled: {
    color: primaryMainColor,
  },
  
  iconHover: {
    color: infoMainColor,
  },
};

export default ratingStyles;
