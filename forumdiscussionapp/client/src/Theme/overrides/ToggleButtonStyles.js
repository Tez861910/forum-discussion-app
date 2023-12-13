const toggleButtonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        color: '#1a237e',
        '&.Mui-selected': {
          backgroundColor: '#1a237e',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0d47a1',
          },
        },
        '&:hover': {
          backgroundColor: '#eeeeee',
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
      disabled: {
        color: '#bdbdbd',
      },
      label: {
        color: '#1a237e',
      },
};

export default toggleButtonStyles;