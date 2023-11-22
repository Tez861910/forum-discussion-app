import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './report-web-vitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/system';
import theme from './Theme';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    // Use createRoot instead of ReactDOM.render
    createRoot(rootElement).render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Error rendering the app:", error);
  }
} else {
  console.error("Root element 'root' not found in the document.");
}

// Report web vitals
try {
  reportWebVitals(console.log);
} catch (error) {
  console.error("Error reporting web vitals:", error);
}
