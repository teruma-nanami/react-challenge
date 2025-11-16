import api from "../../lib/api";
import { User } from "../users/user.entity";

export const authRepository = {
  // サインアップ用のメソッドを追加
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signup/", { name, email, password });
    const { user, token } = result.data;
    return { user: new User(user), token };
  },

  // サインイン用のメソッドを追加
  async signin(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signin/", { email, password });
    const { user, token } = result.data;
    return { user: new User(user), token };
  },

  // 現在のユーザー情報を取得するメソッドを追加
  async getCurrentUser(): Promise<User | undefined> {
    const result = await api.get("/auth/me/");
    if (result.data === null) return undefined;
    return new User(result.data);
  },
};
