import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRepository } from "./modules/auth/auth.repository";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import CreateWorkspace from "./pages/CreateWorkspace";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = useCurrentUserStore();

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

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
