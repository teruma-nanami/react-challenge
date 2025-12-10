import { createRoot } from "react-dom/client";
import App from "./Routes/App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/day4">
    <App />
  </BrowserRouter>
);
