import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateWorkspace from "./pages/CreateWorkspace";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<CreateWorkspace />} />
            <Route path="/workspace/:workspaceId" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
