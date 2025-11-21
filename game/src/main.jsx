// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // keep if your project uses this file

createRoot(document.getElementById("root")).render(
  <App />
);
