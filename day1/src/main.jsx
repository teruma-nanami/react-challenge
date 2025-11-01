//import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ReactRouter from "./ReactRouter.jsx";
import StateDemo from "./StateDemo.jsx";
import StateNameDemo from "./StateNameDemo.jsx";
import StateToggleDemo from "./StateToggleDemo.jsx";
import StateTodoDemo from "./StateTodoDemo.jsx";
import StateUserDemo from "./StateUserDemo.jsx";
import StateStyledToggleDemo from "./StateStyleToggleDemo.jsx";
import StateMultiDemo from "./StateMultiDemo.jsx";
import StateResetDemo from "./StateResetDemo.jsx";
import StateConditionalRenderDemo from "./StateConditionalRenderDemo.jsx";
import StateHistoryDemo from "./StateHistoryDemo.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/day1">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/router" element={<ReactRouter />} />
      <Route path="/state" element={<StateDemo />} />
      <Route path="/state-name" element={<StateNameDemo />} />
      <Route path="/state-toggle" element={<StateToggleDemo />} />
      <Route path="/state-todo" element={<StateTodoDemo />} />
      <Route path="/state-user" element={<StateUserDemo />} />
      <Route path="/state-styled-toggle" element={<StateStyledToggleDemo />} />
      <Route path="/state-multi" element={<StateMultiDemo />} />
      <Route path="/state-reset" element={<StateResetDemo />} />
      <Route
        path="/state-conditional"
        element={<StateConditionalRenderDemo />}
      />
      <Route path="/state-history" element={<StateHistoryDemo />} />
    </Routes>
  </BrowserRouter>
);
