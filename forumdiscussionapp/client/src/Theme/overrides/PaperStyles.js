import palette from '../palette';

const primaryColor = palette.palette.default.tertiary.main;
const boxShadow = '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)';

const paperStyles = {
  root: {
    backgroundColor: primaryColor,
  },
  rounded: {
    borderRadius: '10px',
  },
  outlined: {
    border: `1px solid ${primaryColor}`,
  },
  elevation0: {
    boxShadow: 'none',
  },
  elevation1: {
    boxShadow: boxShadow,
  },
};

export default paperStyles;