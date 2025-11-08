import { useState, useCallback } from "react";
import axios from "axios";
import type { User } from "../types/api/User";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          if (response.data) {
            const isAdmin = response.data.id === 10 ? true : false;
            setLoginUser({ ...response.data, isAdmin });
            showMessage({ title: "Login successful!", status: "success" });
            navigate("/");
          } else {
            navigate("/login");
            showMessage({
              title: "Please enter a number between 1 and 10.",
              status: "warning",
            });
          }
        })
        .catch(() => {
          navigate("/login");
          showMessage({ title: "Please log in.", status: "error" });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [navigate, showMessage, setLoginUser]
  );

  return { login, loading };
};
