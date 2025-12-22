import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "trix";
import "trix/dist/trix.css";
import "./styles/trix-fix.css";

document.addEventListener("trix-file-accept", (e) => {
  e.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
