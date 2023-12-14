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
      color: palette.palette.text.primary,
      backgroundColor: palette.palette.success.main,
  },
  filledInfo: {
      color: palette.palette.text.primary,
      backgroundColor: palette.palette.info.main,
  },
  filledWarning: {
      color: palette.palette.text.primary,
      backgroundColor: palette.palette.warning.main,
  },
  filledError: {
      color: palette.palette.text.primary,
      backgroundColor: palette.palette.error.main,
  },
  outlinedSuccess: {
      color: palette.palette.success.main,
      borderColor: palette.palette.success.main,
  },
  outlinedInfo: {
      color: palette.palette.info.main,
      borderColor: palette.palette.info.main,
  },
  outlinedWarning: {
      color: palette.palette.warning.main,
      borderColor: palette.palette.warning.main,
  },
  outlinedError: {
      color: palette.palette.error.main,
      borderColor: palette.palette.error.main,
  },
  standardSuccess: {
      color: palette.palette.success.main,
      backgroundColor: palette.palette.background.default,
  },
  standardInfo: {
      color: palette.palette.info.main,
      backgroundColor: palette.palette.background.default,
  },
  standardWarning: {
      color: palette.palette.warning.main,
      backgroundColor: palette.palette.background.default,
  },
  standardError: {
      color: palette.palette.error.main,
      backgroundColor: palette.palette.background.default,
  },
};

export default alertStyles;
