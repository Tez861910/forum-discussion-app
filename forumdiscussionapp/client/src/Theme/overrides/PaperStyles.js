import palette from '../palette';

const paperStyles = {
  root: {
    backgroundColor: palette.palette.default.primary.main,
  },
  rounded: {
    borderRadius: '10px',
  },
  outlined: {
    border: `1px solid ${palette.palette.default.primary.main}`,
  },
  elevation0: {
    boxShadow: 'none',
  },
  elevation1: {
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  },
};

export default paperStyles;
