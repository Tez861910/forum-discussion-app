import { onLCP, onFID, onCLS } from "web-vitals/attribution";

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    Promise.all([onCLS(onPerfEntry), onFID(onPerfEntry), onLCP(onPerfEntry)])
      .then(() => console.log("Web vitals reported successfully."))
      .catch((error) => console.error("Error reporting web vitals:", error));
  }
};
