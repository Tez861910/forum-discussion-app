import palette from '../palette';

const fabStyles = {
    defaultProps: {
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.primary.main,
            color: palette.palette.default.primary.contrastText,
            '&:hover': {
              backgroundColor: palette.palette.default.secondary.main,
            },
          },
          primary: {
            backgroundColor: palette.palette.default.primary.main,
            '&:hover': {
              backgroundColor: palette.palette.default.secondary.main,
            },
          },
          secondary: {
            backgroundColor: palette.palette.default.secondary.main,
            '&:hover': {
              backgroundColor: palette.palette.default.primary.main,
            },
          },
        },
        variants: [
          {
            props: { variant: 'extended' },
            style: {
              backgroundColor: palette.palette.default.primary.main,
              '&:hover': {
                backgroundColor: palette.palette.default.secondary.main,
              },
            },
          },
        ],
      },
    },
};

export default fabStyles;
