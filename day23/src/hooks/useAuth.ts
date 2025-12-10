import { useNavigate } from "react-router-dom";
import { login, logout } from "../app/features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const Register = (username: string, password: string) => {
    const newUser = { username, password };
    sessionStorage.setItem("registeredUser", JSON.stringify(newUser));
    sessionStorage.setItem("user", JSON.stringify(newUser));
    dispatch(login(username)); // Redux に反映
  };

  const loginUser = (username: string, password: string) => {
    const registeredUser = sessionStorage.getItem("registeredUser");
    if (!registeredUser) return false;

    const parsedUser = JSON.parse(registeredUser);
    if (parsedUser.username === username && parsedUser.password === password) {
      sessionStorage.setItem("user", JSON.stringify(parsedUser));
      dispatch(login(username)); // Redux に反映
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    dispatch(logout()); // Redux に反映
    navigate("/login");
  };

  return { user, Register, login: loginUser, logout: logoutUser };
};