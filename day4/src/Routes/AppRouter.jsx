import { Routes, Route } from "react-router-dom";
import { Top } from "../components/pages/Top";
import { User } from "../components/pages/User";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
};
