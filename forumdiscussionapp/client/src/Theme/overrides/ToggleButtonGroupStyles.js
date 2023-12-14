import palette from '../palette';

const toggleButtonGroupStyles = {
  root: {
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: palette.palette.primary.main, 
  },
  grouped: {
    '&:not(:first-child)': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&:not(:last-child)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    color: palette.palette.text.primary, 
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

export default toggleButtonGroupStyles;
