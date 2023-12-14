import palette from './palette';

const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightBold: 700,
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  h3: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  subtitle1: {
    fontSize: '1rem',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  subtitle2: {
    fontSize: '0.875rem',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  body1: {
    fontSize: '1rem',
    color: palette.palette.mode === 'light' ? palette.palette.default.text.primary : palette.palette.dark.text.primary,
  },
  body2: {
    fontSize: '0.875rem',
    color: palette.palette.mode === 'light' ? palette.palette.default.text.primary : palette.palette.dark.text.primary,
  },
  button: {
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    color: palette.palette.mode === 'light' ? palette.palette.default.primary.main : palette.palette.dark.primary.main,
  },
  caption: {
    fontSize: '0.75rem',
    color: palette.palette.mode === 'light' ? palette.palette.default.text.primary : palette.palette.dark.text.primary,
  },
  overline: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: palette.palette.mode === 'light' ? palette.palette.default.text.primary : palette.palette.dark.text.primary,
  },
};

export default typography;
