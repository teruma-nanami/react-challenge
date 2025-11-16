import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateWorkspace from "./CreateWorkspace";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";

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
