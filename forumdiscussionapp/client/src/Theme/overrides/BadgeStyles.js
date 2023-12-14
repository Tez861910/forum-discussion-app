import palette from '../palette';

const badgeStyles = {
      root: {
        marginRight: '16px',
      },
      badge: {
        backgroundColor: palette.palette.default.secondary.main,
        color: palette.palette.default.text.primary,
      },
      colorPrimary: {
        backgroundColor: palette.palette.default.primary.main,
      },
      colorSecondary: {
        backgroundColor: palette.palette.default.secondary.main,
      },
      colorError: {
        backgroundColor: palette.palette.default.error.main,
      },
      dot: {
        borderRadius: '50%',
      },
      anchorOriginTopRightRectangle: {
        top: '0',
        right: '0',
      },
      anchorOriginBottomRightRectangle: {
        bottom: '0',
        right: '0',
      },
      anchorOriginTopLeftRectangle: {
        top: '0',
        left: '0',
      },
      anchorOriginBottomLeftRectangle: {
        bottom: '0',
        left: '0',
      },
      anchorOriginTopRightCircular: {
        top: '14%',
        right: '14%',
      },
      anchorOriginBottomRightCircular: {
        bottom: '14%',
        right: '14%',
      },
      anchorOriginTopLeftCircular: {
        top: '14%',
        left: '14%',
      },
      anchorOriginBottomLeftCircular: {
        bottom: '14%',
        left: '14%',
      },
};

export default badgeStyles;
