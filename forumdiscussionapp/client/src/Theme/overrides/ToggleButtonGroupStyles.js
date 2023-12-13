const toggleButtonGroupStyles = {
    root: {
        display: 'flex',
        borderRadius: '8px',
        overflow: 'hidden',
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