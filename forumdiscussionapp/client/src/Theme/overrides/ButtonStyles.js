const buttonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        backgroundColor: '#1a237e',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#0d47a1',
        },
      },
      label: {
        color: '#ffffff',
      },
      text: {
        padding: '6px 8px',
      },
      textPrimary: {
        color: '#1a237e',
      },
      textSecondary: {
        color: '#ff6f00',
      },
      outlined: {
        padding: '6px 16px',
        border: '1px solid #1a237e',
      },
      outlinedPrimary: {
        borderColor: '#1a237e',
      },
      outlinedSecondary: {
        borderColor: '#ff6f00',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: '#1a237e',
        '&:hover': {
          backgroundColor: '#0d47a1',
        },
      },
      containedSecondary: {
        backgroundColor: '#ff6f00',
        '&:hover': {
          backgroundColor: '#c41c00',
        },
      },
      disableElevation: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&$focusVisible': {
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        padding: '4px 8px',
        fontSize: '0.8125rem',
      },
      sizeLarge: {
        padding: '8px 24px',
        fontSize: '0.9375rem',
      },
      fullWidth: {
        width: '100%',
      },
      startIcon: {
        marginRight: '8px',
      },
      endIcon: {
        marginLeft: '8px',
      },
      iconSizeSmall: {
        '& > *:first-child': {
          fontSize: '18px',
        },
      },
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: '20px',
        },
      },
      iconSizeLarge: {
        '& > *:first-child': {
          fontSize: '22px',
        },
      },
    };
  
  export default buttonStyles;
  