import palette from '../palette';

const alertStyles = {
  root: {
      width: '100%',
      borderRadius: '4px',
  },
  message: {
      padding: '8px 0',
  },
  action: {
      alignItems: 'flex-start',
  },
  icon: {
      padding: '7px 0',
  },
  filledSuccess: {
      color: palette.palette.default.text.primary,
      backgroundColor: palette.palette.default.success.main,
  },
  filledInfo: {
      color: palette.palette.default.text.primary,
      backgroundColor: palette.palette.default.info.main,
  },
  filledWarning: {
      color: palette.palette.default.text.primary,
      backgroundColor: palette.palette.default.warning.main,
  },
  filledError: {
      color: palette.palette.default.text.primary,
      backgroundColor: palette.palette.default.error.main,
  },
  outlinedSuccess: {
      color: palette.palette.default.success.main,
      borderColor: palette.palette.default.success.main,
  },
  outlinedInfo: {
      color: palette.palette.default.info.main,
      borderColor: palette.palette.default.info.main,
  },
  outlinedWarning: {
      color: palette.palette.default.warning.main,
      borderColor: palette.palette.default.warning.main,
  },
  outlinedError: {
      color: palette.palette.default.error.main,
      borderColor: palette.palette.default.error.main,
  },
  standardSuccess: {
      color: palette.palette.default.success.main,
      backgroundColor: palette.palette.default.background.default,
  },
  standardInfo: {
      color: palette.palette.default.info.main,
      backgroundColor: palette.palette.default.background.default,
  },
  standardWarning: {
      color: palette.palette.default.warning.main,
      backgroundColor: palette.palette.default.background.default,
  },
  standardError: {
      color: palette.palette.default.error.main,
      backgroundColor: palette.palette.default.background.default,
  },
};

export default alertStyles;
