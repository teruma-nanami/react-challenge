import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateWorkspace from "./pages/CreateWorkspace";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<CreateWorkspace />} />
            <Route path="/:workspaceId/:channelId" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
