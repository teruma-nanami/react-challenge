export type Housekeep = {
  id: string;
  date: string; // ISO形式 "2025-12-01"
  title: string; // 必須：支出のタイトル（例: "ランチ代"）
  categoryId: string; // Category.id を参照
  amount: number;
  memo?: string; // 補足メモ（任意）
};
