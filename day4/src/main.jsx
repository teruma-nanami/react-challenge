import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <BrowserRouter basename="/day4">
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //   </Routes>
  // </BrowserRouter>
  <App />
);
