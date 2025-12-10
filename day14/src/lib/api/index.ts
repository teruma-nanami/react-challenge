// axiosライブラリを読み込む
import axios from "axios";

// 先ほど作った「Authorizationヘッダーを追加する関数」を読み込む
import { addAuthorizationHeader } from "./interceptors/request";

// 環境変数からAPIのベースURLを取得
// VITE_API_URL は .env ファイルなどで設定されている値
const baseURL = import.meta.env.VITE_API_URL;

// axiosインスタンスを作成（このインスタンスを通してAPI通信を行う）
const api = axios.create({ baseURL });

// デフォルトのヘッダーに Content-Type を設定
// → 送信するデータは JSON ですよ、とサーバーに伝える
api.defaults.headers.common["Content-Type"] = "application/json";

// リクエストインターセプターを登録
// → リクエストが送られる直前に addAuthorizationHeader が呼ばれ、
//トークンがあれば Authorization ヘッダーを自動で付与してくれる
api.interceptors.request.use(addAuthorizationHeader);

// この axios インスタンスを他のファイルから使えるように export
export default api;
