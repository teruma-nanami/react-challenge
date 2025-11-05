// 全ユーザーを一覧取得するカスタムフック
import { useState } from "react";
import axios from "axios";
import type { ApiUser } from "../types/ApiUser";
import type { ApiUserOutput } from "../types/ApiUserOutput";

export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<ApiUserOutput[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    axios
      .get<ApiUser[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          address: `, ${user.address.city} ${user.address.suite} ${user.address.street}`,
        }));
        setUserProfiles(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
