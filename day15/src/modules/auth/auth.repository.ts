/* repositoryと書くと、api周りの処理を書く名前になる */
import api from "../../lib/api";
import { User } from "../users/user.entity";

// ユーザー認証に関する処理をまとめたオブジェクト
export const authRepository = {
  // signup関数: ユーザー登録処理
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    // signup関数: ユーザー登録処理
    // 引数は name, email, password
    // 戻り値は { user: User, token: string } の形をPromiseで返す

    // サーバーにPOSTリクエストを送信
    // → http://localhost:8888/auth/signup に { name, email, password } を送る
    const result = await api.post("/auth/signup", {
      name,
      email,
      password,
    });

    // サーバーから返ってきたレスポンスを分解
    // result.data の中に { user, token } が入っている想定
    const { user, token } = result.data;

    // userは生データなので、Userクラスのインスタンスに変換して返す
    // tokenはそのまま返す
    return { user: new User(user), token };
  },

  // signin関数: ユーザーログイン処理
  async signin(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const result = await api.post("/auth/signin", {
      email,
      password,
    });

    const { user, token } = result.data;

    return { user: new User(user), token };
  },

  async getCurrentUser(): Promise<User | undefined> {
    const result = await api.get("/auth/me");
    if (result.data == null) return undefined;

    return new User(result.data);
  },
};
