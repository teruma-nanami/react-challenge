import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InlineStyles } from "./components/InlineStyles.jsx";
import { Rendering } from "./Rendering.jsx";
import { CssModules } from "./components/CssModules.jsx";
import { StyledJsx } from "./components/StyledJsx.jsx";
import { StyledComponents } from "./components/StyledComponents.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rendering" element={<Rendering />} />
        <Route path="/inline-style" element={<InlineStyles />} />
        <Route path="/css-modules" element={<CssModules />} />
        <Route path="/styled-jsx" element={<StyledJsx />} />
        <Route path="/styled-components" element={<StyledComponents />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
