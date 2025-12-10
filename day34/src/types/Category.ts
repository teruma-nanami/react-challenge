export type CategoryType = "食費" | "交通費" | "日用品" | "娯楽";

export type Category = {
  id: string;
  name: string; // "食費" など
  color: string; // 必須
};
