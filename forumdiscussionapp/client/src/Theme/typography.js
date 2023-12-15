import palette from './palette';

const primaryColor = palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main;
const textColor = palette.palette.mode === 'light' ? palette.palette.default.text.primary : palette.palette.dark.text.primary;

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
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: fontWeightMedium,
    color: primaryColor,
  },
  h3: {
    fontSize: '1.2rem',
    fontWeight: fontWeightRegular,
    color: primaryColor,
  },
  h4: {
    fontSize: '1rem',
    fontWeight: fontWeightRegular,
    color: primaryColor,
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: fontWeightRegular,
    color: primaryColor,
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: fontWeightLight,
    color: primaryColor,
  },
  subtitle1: {
    fontSize: '1rem',
    color: primaryColor,
  },
  subtitle2: {
    fontSize: '0.875rem',
    color: primaryColor,
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
