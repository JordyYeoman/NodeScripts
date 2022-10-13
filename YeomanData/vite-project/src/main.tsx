import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./fonts/dogica.ttf";
import "./fonts/dogicabold.ttf";
import "./fonts/dogicapixel.ttf";
import "./fonts/dogicapixelbold.ttf";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
