import palette from '../palette';

const buttonGroupStyles = {
    root: {
        display: 'inline-flex',
        borderRadius: '8px',
        backgroundColor: palette.palette.background.default,
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
