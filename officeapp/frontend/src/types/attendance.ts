export type Attendance = {
  id: number;
  user_id: number;
  work_date: string; // YYYY-MM-DD
  check_in_at: string; // ISO datetime
  check_out_at: string | null;
  created_at: string;
  updated_at: string;
};
