import React from 'react';
import ReactDOM from  "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

try {
  reportWebVitals(console.log);
} catch (error) {
  console.error("Error reporting web vitals:", error);
}
