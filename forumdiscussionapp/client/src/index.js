import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { reportWebVitals } from "./report-web-vitals";
import { CookiesProvider } from "react-cookie";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element 'root' not found in the document.");
}

try {
  createRoot(rootElement).render(
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering the app:", error);
}

try {
  reportWebVitals(console.log);
} catch (error) {
  console.error("Error reporting web vitals:", error);
}
