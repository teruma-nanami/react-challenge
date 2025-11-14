export class User {
  id!: string;          // ユーザーID（必須）
  name!: string;        // 名前（必須）
  email!: string;       // メールアドレス（必須）
  thumbnailUrl?: string; // サムネイル画像URL（任意）

  constructor(data: User) {
    Object.assign(this, data); // 渡されたデータをこのクラスにコピー
  }
}
