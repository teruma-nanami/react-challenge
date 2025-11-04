import { createRoot } from "react-dom/client";
import { AppRouter } from "./Routes/AppRouter.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
