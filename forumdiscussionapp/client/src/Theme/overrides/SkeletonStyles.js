import palette from '../palette';

const skeletonStyles = {
  root: {
    backgroundColor: palette.palette.grey[200],
  },
  text: {
    transform: 'scale(1, 0.60)',
  },
  circle: {
    borderRadius: '50%',
  },
  rect: {
    borderRadius: '4px',
  },
  pulse: {
    animation: '$pulse 1.5s ease-in-out 0.5s infinite',
  },
  wave: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      animation: '$wave 1.6s linear 0.5s infinite',
      background: `linear-gradient(90deg, transparent, ${palette.palette.grey[200]}, transparent)`,
      content: '""',
      position: 'absolute',
      transform: 'translateX(-100%)',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1,
    },
  },
  withChildren: {
    '& > *': {
      visibility: 'hidden',
    },
  },
  fitContent: {
    maxWidth: 'fit-content',
  },
  heightAuto: {
    height: 'auto',
  },
  keyframes: {
    pulse: {
      '0%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.4,
      },
      '100%': {
        opacity: 1,
      },
    },
    wave: {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '60%': {
        transform: 'translateX(100%)',
      },
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },
};

export default skeletonStyles;
