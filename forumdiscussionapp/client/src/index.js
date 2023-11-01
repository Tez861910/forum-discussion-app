import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Get the root element
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    // Create a React root and render the app within a strict mode
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
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
