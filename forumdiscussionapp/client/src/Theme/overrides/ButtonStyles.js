import palette from '../palette';

const buttonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        backgroundColor: palette.palette.primary.main,
        color: palette.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: palette.palette.secondary.main,
        },
    },
    label: {
        color: palette.palette.text.primary,
    },
    text: {
        padding: '6px 8px',
    },
    textPrimary: {
        color: palette.palette.primary.main,
    },
    textSecondary: {
        color: palette.palette.secondary.main,
    },
    outlined: {
        padding: '6px 16px',
        border: `1px solid ${palette.palette.primary.main}`,
    },
    outlinedPrimary: {
        borderColor: palette.palette.primary.main,
    },
    outlinedSecondary: {
        borderColor: palette.palette.secondary.main,
    },
    contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
    },
    containedPrimary: {
        backgroundColor: palette.palette.primary.main,
        '&:hover': {
          backgroundColor: palette.palette.secondary.main,
        },
    },
    containedSecondary: {
        backgroundColor: palette.palette.secondary.main,
        '&:hover': {
          backgroundColor: palette.palette.primary.main,
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
