// src/types/todayAttendance.ts
import type { Attendance } from "./attendance";
import type { BreakTime } from "./breakTime";

export type TodayAttendance = {
  attendance: Attendance | null;
  break_times: BreakTime[];
};
