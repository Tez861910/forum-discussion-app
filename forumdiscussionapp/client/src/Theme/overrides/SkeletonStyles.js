import palette from '../palette';

const greyColor = palette.palette.default.grey[200];
const pulseAnimation = '$pulse 1.5s ease-in-out 0.5s infinite';
const waveAnimation = '$wave 1.6s linear 0.5s infinite';
const transition = '0.3s';

const skeletonStyles = {
  root: {
    backgroundColor: greyColor,
    transition: transition, 
  },
  
  text: {
    transform: 'scale(1, 0.60)',
    transition: transition,
  },
  
  circle: {
    borderRadius: '50%',
    transition: transition, 
  },
  
  rect: {
    borderRadius: '4px',
    transition: transition, 
  },
  
  pulse: {
    animation: pulseAnimation,
    transition: transition, 
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
      transition: transition,
    },
  },
  
  withChildren: {
    '& > *': {
      visibility: 'hidden',
      transition: transition, 
    },
  },
  
  fitContent: {
    maxWidth: 'fit-content',
    transition: transition, 
  },
  
  heightAuto: {
    height: 'auto',
    transition: transition, 
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
