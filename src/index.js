import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";

const useReactLatest = true;
if (process.env.NODE_ENV !== "production") {
  console.log(`running in ${process.env.NODE_ENV} environment`);
}
if (useReactLatest) {
  createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
  );
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
