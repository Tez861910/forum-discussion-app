import palette from '../palette';

const buttonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        backgroundColor: palette.palette.default.primary.main,
        color: palette.palette.default.primary.contrastText,
        '&:hover': {
          backgroundColor: palette.palette.default.secondary.main,
        },
    },
    label: {
        color: palette.palette.default.text.primary,
    },
    text: {
        padding: '6px 8px',
    },
    textPrimary: {
        color: palette.palette.default.primary.main,
    },
    textSecondary: {
        color: palette.palette.default.secondary.main,
    },
    outlined: {
        padding: '6px 16px',
        border: `1px solid ${palette.palette.default.primary.main}`,
    },
    outlinedPrimary: {
        borderColor: palette.palette.default.primary.main,
    },
    outlinedSecondary: {
        borderColor: palette.palette.default.secondary.main,
    },
    contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
    },
    containedPrimary: {
        backgroundColor: palette.palette.default.primary.main,
        '&:hover': {
          backgroundColor: palette.palette.default.secondary.main,
        },
    },
    containedSecondary: {
        backgroundColor: palette.palette.default.secondary.main,
        '&:hover': {
          backgroundColor: palette.palette.default.primary.main,
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
        '& > *:first-path': {
          fontSize: '18px',
        },
    },
    iconSizeMedium: {
        '& > *:first-path': {
          fontSize: '20px',
        },
    },
    iconSizeLarge: {
        '& > *:first-path': {
          fontSize: '22px',
        },
    },
};

export default buttonStyles;
