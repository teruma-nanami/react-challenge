// src/types/dateRequest.ts

export type DateRequestStatus = "pending" | "approved" | "rejected";
export type DateRequestSession = "full" | "am" | "pm";

export type DateRequest = {
  id: number;
  user_id: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  session: DateRequestSession;

  reason: string;
  status: DateRequestStatus;
  rejected_reason: string | null;

  created_at: string;
  updated_at: string;
};

export type DateRequestCreateInput = {
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  session: DateRequestSession;
  reason: string;
};
