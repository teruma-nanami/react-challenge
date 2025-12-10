// axios が内部で使うリクエスト設定の型を import
import type { InternalAxiosRequestConfig } from "axios";

// Authorization ヘッダーを追加する関数
export const addAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  // ローカルストレージからトークンを取得
  const token = localStorage.getItem("token");

  // トークンが存在しない場合は何もせずそのまま返す
  if (token === null) return config;

  // トークンがある場合は Authorization ヘッダーを追加
  config.headers.Authorization = `Bearer ${token}`;

  // 最終的に修正済みの config を返す
  return config;
};
