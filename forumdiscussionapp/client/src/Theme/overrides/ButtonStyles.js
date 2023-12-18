import palette from '../palette';

const tertiaryColor = palette.palette.default.tertiary.main;
const quaternaryColor = palette.palette.default.quaternary.main;
const quinaryColor = palette.palette.default.quinary.main;
const senaryColor = palette.palette.default.senary.main;
const contrastTextColorTertiary = palette.palette.default.tertiary.contrastText;
const contrastTextColorQuaternary = palette.palette.default.quaternary.contrastText;
const contrastTextColorQuinary = palette.palette.default.quinary.contrastText;
const contrastTextColorSenary = palette.palette.default.senary.contrastText;
const textColorPrimary = palette.palette.default.text.primary;

const hexToRGBA = (hex, opacity) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const buttonStyles = {
    root: {
        textTransform: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: hexToRGBA(tertiaryColor, 0.8),
        color: contrastTextColorTertiary,
        '&:hover': {
          backgroundColor: hexToRGBA(quaternaryColor, 0.8),
          color: contrastTextColorQuaternary,
        },
        transition: '0.3s', 
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)', 
    },
    label: {
        color: textColorPrimary,
    },
    text: {
        padding: '0.375rem 0.5rem',
    },
    textPrimary: {
        color: hexToRGBA(quinaryColor, 0.8),
    },
    textSecondary: {
        color: hexToRGBA(senaryColor, 0.8),
    },
    outlined: {
        padding: '0.375rem 1rem',
        border: `1px solid ${hexToRGBA(quinaryColor, 0.8)}`,
    },
    outlinedPrimary: {
        borderColor: hexToRGBA(senaryColor, 0.8),
    },
    outlinedSecondary: {
        borderColor: hexToRGBA(quinaryColor, 0.8),
    },
    contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
    },
    containedPrimary: {
        backgroundColor: hexToRGBA(quinaryColor, 0.8),
        '&:hover': {
          backgroundColor: hexToRGBA(senaryColor, 0.8),
        },
    },
    containedSecondary: {
        backgroundColor: hexToRGBA(senaryColor, 0.8),
        '&:hover': {
          backgroundColor: hexToRGBA(quinaryColor, 0.8),
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
