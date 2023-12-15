import palette from '../palette';

const greyColor = palette.palette.default.grey[200];
const pulseAnimation = '$pulse 1.5s ease-in-out 0.5s infinite';
const waveAnimation = '$wave 1.6s linear 0.5s infinite';

const skeletonStyles = {
  root: {
    backgroundColor: greyColor,
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
    animation: pulseAnimation,
  },
  
  wave: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      animation: waveAnimation,
      background: `linear-gradient(90deg, transparent, ${greyColor}, transparent)`,
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
