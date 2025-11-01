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
  <BrowserRouter basename="">
    <Routes>
      <Route path="/day1/" element={<App />} />
      <Route path="/day1/router" element={<ReactRouter />} />
      <Route path="/day1/state" element={<StateDemo />} />
      <Route path="/day1/state-name" element={<StateNameDemo />} />
      <Route path="/day1/state-toggle" element={<StateToggleDemo />} />
      <Route path="/day1/state-todo" element={<StateTodoDemo />} />
      <Route path="/day1/state-user" element={<StateUserDemo />} />
      <Route
        path="/day1/state-styled-toggle"
        element={<StateStyledToggleDemo />}
      />
      <Route path="/day1/state-multi" element={<StateMultiDemo />} />
      <Route path="/day1/state-reset" element={<StateResetDemo />} />
      <Route
        path="/day1/state-conditional"
        element={<StateConditionalRenderDemo />}
      />
      <Route path="/day1/state-history" element={<StateHistoryDemo />} />
    </Routes>
  </BrowserRouter>
);
