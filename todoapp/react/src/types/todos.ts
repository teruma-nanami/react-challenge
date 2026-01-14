export type Todo = {
  id: number;
  auth0_user_id: string;
  title: string;
  is_completed: number; // ← 0 or 1（今はこれでOK）
  created_at: string;
  updated_at: string;
};