// Todoのデータの型を定義する
export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
};