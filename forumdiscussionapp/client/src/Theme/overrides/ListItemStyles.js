const listItemStyles = {
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          },
        },
      },
      MuiImageListItem: {
        styleOverrides: {
          root: {
            listStyle: 'none',
            height: 'auto',
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
  
  export default listItemStyles;
  