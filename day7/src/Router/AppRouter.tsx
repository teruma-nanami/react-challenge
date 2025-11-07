import { Routes, Route } from "react-router-dom"
import { Home } from "../components/pages/Home"
import { Login } from "../components/pages/Login"
import { UserManagement } from "../components/pages/UserManagement"
import { Settings } from "../components/pages/Setting"
import { Page404 } from "../components/pages/Page404"


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}