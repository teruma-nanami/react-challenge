import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;