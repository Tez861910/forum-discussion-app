import palette from '../palette';

// Define the repeated color values
const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;

const toggleButtonGroupStyles = {
  root: {
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: primaryMainColor, 
  },
  
  grouped: {
    '&:not(:first-path)': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&:not(:last-path)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    color: textPrimaryColor, 
  },
  
  groupedHorizontal: {
    '&:not(:first-path)': {
      marginLeft: '-1px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&:not(:last-path)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
  },
  
  groupedVertical: {
    '&:not(:first-path)': {
      marginTop: '-1px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
    '&:not(:last-path)': {
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
    },
  },
};

export default toggleButtonGroupStyles;
