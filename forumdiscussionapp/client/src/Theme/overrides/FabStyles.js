import palette from '../palette';

const fabStyles = {
    defaultProps: {
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.main,
            color: palette.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: palette.palette.secondary.main,
            },
          },
          primary: {
            backgroundColor: palette.palette.primary.main,
            '&:hover': {
              backgroundColor: palette.palette.secondary.main,
            },
          },
          secondary: {
            backgroundColor: palette.palette.secondary.main,
            '&:hover': {
              backgroundColor: palette.palette.primary.main,
            },
          },
        },
        variants: [
          {
            props: { variant: 'extended' },
            style: {
              backgroundColor: palette.palette.primary.main,
              '&:hover': {
                backgroundColor: palette.palette.secondary.main,
              },
            },
          },
        ],
      },
    },
};

export default fabStyles;
