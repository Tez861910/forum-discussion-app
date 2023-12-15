import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const tertiaryColor = palette.palette.default.tertiary.main;
const quaternaryColor = palette.palette.default.quaternary.main;
const contrastTextColorPrimary = palette.palette.default.primary.contrastText;
const contrastTextColorSecondary = palette.palette.default.secondary.contrastText;
const contrastTextColorTertiary = palette.palette.default.tertiary.contrastText;
const contrastTextColorQuaternary = palette.palette.default.quaternary.contrastText;
const textColorPrimary = palette.palette.default.text.primary;

const buttonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: primaryColor,
        color: contrastTextColorPrimary,
        '&:hover': {
          backgroundColor: secondaryColor,
          color: contrastTextColorSecondary,
        },
    },
    label: {
        color: textColorPrimary,
    },
    text: {
        padding: '0.375rem 0.5rem',
    },
    textPrimary: {
        color: tertiaryColor,
    },
    textSecondary: {
        color: quaternaryColor,
    },
    outlined: {
        padding: '0.375rem 1rem',
        border: `1px solid ${tertiaryColor}`,
    },
    outlinedPrimary: {
        borderColor: quaternaryColor,
    },
    outlinedSecondary: {
        borderColor: primaryColor,
    },
    contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
    },
    containedPrimary: {
        backgroundColor: secondaryColor,
        '&:hover': {
          backgroundColor: tertiaryColor,
        },
    },
    containedSecondary: {
        backgroundColor: quaternaryColor,
        '&:hover': {
          backgroundColor: primaryColor,
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
        padding: '0.25rem 0.5rem',
        fontSize: '0.8125rem',
    },
    sizeLarge: {
        padding: '0.5rem 1.5rem',
        fontSize: '0.9375rem',
    },
    fullWidth: {
        width: '100%',
    },
    startIcon: {
        marginRight: '0.5rem',
    },
    endIcon: {
        marginLeft: '0.5rem',
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
