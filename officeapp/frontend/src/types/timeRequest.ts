// src/types/timeRequest.ts

export type TimeRequestStatus = "pending" | "approved" | "rejected";

export type TimeRequest = {
  id: number;
  user_id: number;
  attendance_id: number;

  requested_check_in_at: string; // ISO string
  requested_check_out_at: string; // ISO string

  reason: string;
  status: TimeRequestStatus;
  rejected_reason: string | null;

  created_at: string;
  updated_at: string;
};

export type TimeRequestCreateInput = {
  requested_check_in_at: string; // ISO string or datetime-local string
  requested_check_out_at: string; // ISO string or datetime-local string
  reason: string;
};
