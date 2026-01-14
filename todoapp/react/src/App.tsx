import { Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;