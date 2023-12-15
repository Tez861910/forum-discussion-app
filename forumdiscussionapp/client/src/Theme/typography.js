import palette from './palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const tertiaryColor = palette.palette.default.tertiary.main;
const quaternaryColor = palette.palette.default.quaternary.main;
const contrastTextColorPrimary = palette.palette.default.primary.contrastText;
const contrastTextColorSecondary = palette.palette.default.secondary.contrastText;
const contrastTextColorTertiary = palette.palette.default.tertiary.contrastText;
const contrastTextColorQuaternary = palette.palette.default.quaternary.contrastText;
const textColor = palette.palette.default.text.primary;

const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 500;
const fontWeightBold = 700;

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: fontWeightLight,
  fontWeightRegular: fontWeightRegular,
  fontWeightMedium: fontWeightMedium,
  fontWeightBold: fontWeightBold,
  h1: {
    fontSize: '2rem',
    fontWeight: fontWeightBold,
    color: primaryColor,
    contrastText: contrastTextColorPrimary,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: fontWeightMedium,
    color: secondaryColor,
    contrastText: contrastTextColorSecondary,
  },
  h3: {
    fontSize: '1.2rem',
    fontWeight: fontWeightRegular,
    color: tertiaryColor,
    contrastText: contrastTextColorTertiary,
  },
  h4: {
    fontSize: '1rem',
    fontWeight: fontWeightRegular,
    color: quaternaryColor,
    contrastText: contrastTextColorQuaternary,
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: fontWeightRegular,
    color: primaryColor,
    contrastText: contrastTextColorPrimary,
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: fontWeightLight,
    color: secondaryColor,
    contrastText: contrastTextColorSecondary,
  },
  subtitle1: {
    fontSize: '1rem',
    color: tertiaryColor,
    contrastText: contrastTextColorTertiary,
  },
  subtitle2: {
    fontSize: '0.875rem',
    color: quaternaryColor,
    contrastText: contrastTextColorQuaternary,
  },
  body1: {
    fontSize: '1rem',
    color: textColor,
  },
  body2: {
    fontSize: '0.875rem',
    color: textColor,
  },
  button: {
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    color: primaryColor,
    contrastText: contrastTextColorPrimary,
  },
  caption: {
    fontSize: '0.75rem',
    color: textColor,
  },
  overline: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: textColor,
  },
};

export default typography;
