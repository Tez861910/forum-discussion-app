import palette from '../palette';

const primaryTextColor = palette.palette.default.text.primary;
const backgroundColorDefault = palette.palette.default.background.default;

const successColor = palette.palette.default.success.main;
const infoColor = palette.palette.default.info.main;
const warningColor = palette.palette.default.warning.main;
const errorColor = palette.palette.default.error.main;

const alertStyles = {
  root: {
      width: '100%',
      borderRadius: '0.25rem',
      padding: '0.5rem', 
      '&:hover': { 
        opacity: 0.9,
      },
  },
  message: {
      padding: '0.5rem 0',
  },
  action: {
      alignItems: 'flex-start',
  },
  icon: {
      padding: '0.4375rem 0',
  },
  filledSuccess: {
      color: primaryTextColor,
      backgroundColor: successColor,
  },
  filledInfo: {
      color: primaryTextColor,
      backgroundColor: infoColor,
  },
  filledWarning: {
      color: primaryTextColor,
      backgroundColor: warningColor,
  },
  filledError: {
      color: primaryTextColor,
      backgroundColor: errorColor,
  },
  outlinedSuccess: {
      color: successColor,
      borderColor: successColor,
  },
  outlinedInfo: {
      color: infoColor,
      borderColor: infoColor,
  },
  outlinedWarning: {
      color: warningColor,
      borderColor: warningColor,
  },
  outlinedError: {
      color: errorColor,
      borderColor: errorColor,
  },
  standardSuccess: {
      color: successColor,
      backgroundColor: backgroundColorDefault,
  },
  standardInfo: {
      color: infoColor,
      backgroundColor: backgroundColorDefault,
  },
  standardWarning: {
      color: warningColor,
      backgroundColor: backgroundColorDefault,
  },
  standardError: {
      color: errorColor,
      backgroundColor: backgroundColorDefault,
  },
};

export default alertStyles;
