export type Setting = {
  id: string;
  theme: "light" | "dark" | "system"; // テーマ設定
  notificationsEnabled: boolean; // 通知の有効/無効
};
