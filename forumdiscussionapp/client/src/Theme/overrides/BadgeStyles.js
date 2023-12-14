import palette from '../palette';

const badgeStyles = {
      root: {
        marginRight: '16px',
      },
      badge: {
        backgroundColor: palette.palette.secondary.main,
        color: palette.palette.text.primary,
      },
      colorPrimary: {
        backgroundColor: palette.palette.primary.main,
      },
      colorSecondary: {
        backgroundColor: palette.palette.secondary.main,
      },
      colorError: {
        backgroundColor: palette.palette.error.main,
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
