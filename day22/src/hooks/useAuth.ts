import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  const Register = (username: string, password: string) => {
    const newUser = { username, password };
    sessionStorage.setItem("registeredUser", JSON.stringify(newUser));
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };
  const login = (username: string, password: string) => {
    const registeredUser = sessionStorage.getItem("registeredUser");
    if (!registeredUser) return false;

    const parsedUser: User = JSON.parse(registeredUser);
    if (parsedUser.username === username && parsedUser.password === password) {
      sessionStorage.setItem("user", JSON.stringify(parsedUser));
      setUser(parsedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return { user, Register, login, logout };
};
