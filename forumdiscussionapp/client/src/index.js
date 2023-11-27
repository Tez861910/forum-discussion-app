import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './report-web-vitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Error rendering the app:", error);
  }
} else {
  console.error("Root element 'root' not found in the document.");
}

try {
  reportWebVitals(console.log);
} catch (error) {
  console.error("Error reporting web vitals:", error);
}
