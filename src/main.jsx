import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Import component App
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> {/* Render component App thay vì định nghĩa routes trực tiếp */}
  </React.StrictMode>
);