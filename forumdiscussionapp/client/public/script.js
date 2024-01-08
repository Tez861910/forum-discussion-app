if (window.MSInputMethodContext && document.documentMode) {
  (async () => {
    try {
      const { createTheme } = await import("@mui/material/styles");
      const theme = createTheme({
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
      });
      window.MUI_THEME = theme;
    } catch (error) {
      // Handle error in a user-friendly way
    }
  })();
}
