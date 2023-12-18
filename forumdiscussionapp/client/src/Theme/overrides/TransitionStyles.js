const transitionStyles = {
  create: (props = ['all'], options = {}, theme) => {
    const {
      duration = theme.transitions.duration.standard,
      easing = theme.transitions.easing.easeInOut,
      delay = 0,
    } = options;

    return `${props.join(',')} ${duration}ms ${easing} ${delay}ms`;
  },
  
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  delay: (delayTime = 0) => `${delayTime}ms`,
};

export default transitionStyles;
