import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

import { apiFetch } from "../lib/api";
import type { Attendance } from "../types/attendance";
import type { BreakTime } from "../types/breakTime";

// ✅ {data: ...} 形式でも、生の値でも両方受け取れるようにする
function unwrapData<T>(v: unknown): T {
  if (v && typeof v === "object" && "data" in (v as any)) {
    return (v as any).data as T;
  }
  return v as T;
}

function formatJst(isoOrNullable: string | null | undefined): string {
  if (!isoOrNullable) return "—";
  const d = new Date(isoOrNullable);
  if (Number.isNaN(d.getTime())) return String(isoOrNullable);

  return d.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function AttendancePage() {
  const userId = 1; // Auth0 導入まで仮

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

      // today: {data, message} でも 生でも両対応
      const todayRaw = await apiFetch<unknown>(
        `/api/attendances/today?user_id=${userId}`,
      );
      const today = unwrapData<Attendance | null>(todayRaw) ?? null;

      setAttendance(today);

      if (today) {
        // break-times: {data, message} でも 生でも両対応
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
      setError(null);

      await apiFetch("/api/attendances/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      await fetchToday();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const checkOut = async () => {
    try {
      setSubmitting(true);
      setError(null);

      await apiFetch("/api/attendances/check-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      await fetchToday();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const startBreak = async () => {
    if (!attendance) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch("/api/break-times/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance_id: attendance.id,
          break_start_at: new Date().toISOString(),
        }),
      });

      await fetchToday();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const endBreak = async () => {
    if (!activeBreak) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch(`/api/break-times/${activeBreak.id}/end`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          break_end_at: new Date().toISOString(),
        }),
      });

      await fetchToday();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Heading mb={4}>勤怠管理</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={4}>勤怠管理</Heading>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      {!attendance ? (
        <Button colorScheme="blue" onClick={checkIn} isLoading={submitting}>
          出勤
        </Button>
      ) : (
        <VStack align="start" spacing={4}>
          <Text>出勤時刻：{formatJst(attendance.check_in_at)}</Text>
          <Text>
            退勤時刻：
            {attendance.check_out_at
              ? formatJst(attendance.check_out_at)
              : "未退勤"}
          </Text>

          {!attendance.check_out_at && (
            <HStack>
              {!activeBreak ? (
                <Button
                  colorScheme="yellow"
                  onClick={startBreak}
                  isLoading={submitting}
                >
                  休憩開始
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  onClick={endBreak}
                  isLoading={submitting}
                >
                  休憩終了
                </Button>
              )}

              <Button
                colorScheme="red"
                onClick={checkOut}
                isLoading={submitting}
              >
                退勤
              </Button>
            </HStack>
          )}

          <Divider />

          <Box>
            <Heading size="sm" mb={2}>
              本日の休憩履歴
            </Heading>

            {breaks.length === 0 ? (
              <Text fontSize="sm" color="gray.500">
                休憩はまだありません
              </Text>
            ) : (
              <VStack align="start" spacing={1}>
                {breaks.map((b, index) => (
                  <Text key={b.id} fontSize="sm">
                    {index + 1}. {formatJst(b.break_start_at)} 〜{" "}
                    {b.break_end_at ? formatJst(b.break_end_at) : "休憩中"}
                  </Text>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      )}
    </Box>
  );
}

export default AttendancePage;
