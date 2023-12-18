import palette from '../palette';

const backgroundColorDefault = palette.palette.default.background.default;

const buttonGroupStyles = {
  root: {
    display: 'inline-flex',
    borderRadius: '0.5rem',
    backgroundColor: backgroundColorDefault,
    opacity: 0.8, 
    alignItems: 'center',
    transition: '0.3s', 
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)', 
  },
  grouped: {
    '&:not(:first-of-type)': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
  },
  groupedHorizontal: {
    '&:not(:first-child)': {
      marginLeft: '-1px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&:not(:last-child)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
  },
  groupedVertical: {
    '&:not(:first-child)': {
      marginTop: '-1px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
    '&:not(:last-child)': {
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
    },
  },
};

export default buttonGroupStyles;
