import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const useReactLatest = true;
if (import.meta.env.MODE !== "production") {
  console.log(`running in ${import.meta.env.MODE} environment`);
}
if (useReactLatest) {
  const rootElem = document.getElementById("root")
  if (!rootElem) {
    throw new Error("Root div with id root could not be found")
  }
  else {
    createRoot(rootElem).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
