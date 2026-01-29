// src/hooks/useAttendance.ts
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Attendance } from "../types/attendance";
import type { BreakTime } from "../types/breakTime";
import { unwrapData } from "../utils/unwrap";

export function useAttendance(userId: number) {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [breaks, setBreaks] = useState<BreakTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeBreak = useMemo(
    () => breaks.find((b) => b.break_end_at === null),
    [breaks],
  );

  const fetchToday = async () => {
    try {
      setLoading(true);
      setError(null);

      const todayRaw = await apiFetch<unknown>(
        `/api/attendances/today?user_id=${userId}`,
      );
      const today = unwrapData<Attendance | null>(todayRaw) ?? null;

      setAttendance(today);

      if (today) {
        const breakRaw = await apiFetch<unknown>(
          `/api/attendances/${today.id}/break-times`,
        );
        const breakList = unwrapData<BreakTime[]>(breakRaw);
        setBreaks(Array.isArray(breakList) ? breakList : []);
      } else {
        setBreaks([]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setAttendance(null);
      setBreaks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIn = async () => {
    try {
      setSubmitting(true);
      await apiFetch("/api/attendances/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      await fetchToday();
    } finally {
      setSubmitting(false);
    }
  };

  const checkOut = async () => {
    try {
      setSubmitting(true);
      await apiFetch("/api/attendances/check-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      await fetchToday();
    } finally {
      setSubmitting(false);
    }
  };

  const startBreak = async () => {
    if (!attendance) return;
    try {
      setSubmitting(true);
      await apiFetch("/api/break-times/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance_id: attendance.id,
          break_start_at: new Date().toISOString(),
        }),
      });
      await fetchToday();
    } finally {
      setSubmitting(false);
    }
  };

  const endBreak = async () => {
    if (!activeBreak) return;
    try {
      setSubmitting(true);
      await apiFetch(`/api/break-times/${activeBreak.id}/end`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          break_end_at: new Date().toISOString(),
        }),
      });
      await fetchToday();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    attendance,
    breaks,
    activeBreak,
    loading,
    submitting,
    error,
    checkIn,
    checkOut,
    startBreak,
    endBreak,
  };
}
