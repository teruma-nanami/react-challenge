import type { User } from "@/types/api/User";
import axios from "axios";
import { useState } from "react";
import { useMessage } from "./useMessage";;
import { useCallback } from "react";


export const useAllUsers = () => {
  const {showMessage} = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(() => {
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        showMessage({ title: err.message, status: "error" });
      })
      .finally(() => setLoading(false));
  }, [showMessage]);
  return { getUsers, users, loading };
}