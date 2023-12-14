import palette from '../palette';

const toggleButtonStyles = {
  root: {
    textTransform: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    color: palette.palette.default.primary.main,
    '&.Mui-selected': {
      backgroundColor: palette.palette.default.primary.main,
      color: palette.palette.default.text.primary,
      '&:hover': {
        backgroundColor: palette.palette.default.info.main,
      },
    },
    '&:hover': {
      backgroundColor: palette.palette.default.grey[200],
    },
    '&.Mui-disabled': {
      color: palette.palette.default.grey[400],
    },
  },
  sizeSmall: {
    padding: '8px 16px',
    fontSize: '0.8125rem',
  },
  sizeLarge: {
    padding: '16px 32px',
    fontSize: '0.9375rem',
  },
  label: {
    color: palette.palette.default.primary.main,
  },
};

export default toggleButtonStyles;
