import { Routes, Route } from "react-router-dom";
import { Top } from "../components/pages/Top.jsx";
import { User } from "../components/pages/User.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};
