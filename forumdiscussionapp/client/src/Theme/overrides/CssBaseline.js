import logobg from '../logobg.jpg';

const cssBaseline = {
    body: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff', 
      },
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        a: {
          textDecoration: 'none',
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
        },
        input: {
          '&::-webkit-input-placeholder': {
            color: '#1a237e',
          },
          '&::-moz-placeholder': {
            color: '#1a237e',
          },
          '&:-ms-input-placeholder': {
            color: '#1a237e',
          },
          '&::placeholder': {
            color: '#1a237e',
          },
        },
        '*': {
          boxSizing: 'border-box',
        },
        '*::before': {
          boxSizing: 'border-box',
        },
        '*::after': {
          boxSizing: 'border-box',
        },
      },
};

export default cssBaseline;