import palette from '../palette';

const imageListStyles = {
    defaultProps: {
      MuiImageList: {
        styleOverrides: {
          root: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
            backgroundColor: palette.palette.background.default, 
          },
        },
      },
      MuiImageListItem: {
        styleOverrides: {
          root: {
            listStyle: 'none',
            height: 'auto',
            color: palette.palette.text.primary, 
          },
          imgFullHeight: {
            height: '100%',
          },
          imgFullWidth: {
            width: '100%',
          },
        },
      },
    },
};

export default imageListStyles;
