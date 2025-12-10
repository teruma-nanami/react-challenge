import api from "../../lib/api";
import { User } from "./user.entity";

export const userRepository = {
  // ユーザー関連のデータ操作メソッドをここに追加
  async find(keyword: string): Promise<User[]> {
    // 例: APIリクエストを送信してユーザーを検索
    const result = await api.get(`/users`, { params: { search: keyword } });
    return result.data.map((user: User) => new User(user));
  },
};
