// src/hooks/useAttendance.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Attendance } from "../types/attendance";
import type { BreakTime } from "../types/breakTime";
import { isoToLocalInput, localInputToIso } from "../utils/time";

type TimeRequestPayload = {
  requested_check_in_at: string;
  requested_check_out_at: string | null;
  reason: string;
};

type UseAttendanceOptions = {
  onError?: (title: string, error?: unknown) => void;
  onSuccess?: (title: string) => void;
};

/**
 * 最新の値（コールバック含む）を常に参照するための ref
 * options が毎レンダー変わっても、hookが返す関数を不安定にしない。
 */
function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

/** アンマウント後の setState を防ぐ */
function useIsMountedRef() {
  const ref = useRef(true);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return ref;
}

// today API の戻りを「Attendance|null」に正規化（最低限の検証）
function normalizeTodayAttendance(payload: unknown): Attendance | null {
  if (!payload) return null;
  if (Array.isArray(payload)) return null;
  if (typeof payload !== "object") return null;

  const p = payload as Record<string, unknown>;
  if (typeof p.id !== "number") return null;
  if (typeof p.work_date !== "string") return null;

  // 実態揺れに備えて最低限だけ確認
  if (typeof p.check_in_at !== "string") return null;

  return payload as Attendance;
}

// list API は配列以外が来たら空配列に落とす（事故防止）
function normalizeAttendanceList(payload: unknown): Attendance[] {
  if (!Array.isArray(payload)) return [];
  return payload as Attendance[];
}

export function useAttendance(options?: UseAttendanceOptions) {
  const optionsRef = useLatestRef(options);
  const isMountedRef = useIsMountedRef();

  const notifyError = useCallback(
    (title: string, error?: unknown) => {
      optionsRef.current?.onError?.(title, error);
    },
    [optionsRef],
  );

  const notifySuccess = useCallback(
    (title: string) => {
      optionsRef.current?.onSuccess?.(title);
    },
    [optionsRef],
  );

  // ===== 当日（勤怠＋休憩） =====
  const [today, setToday] = useState<Attendance | null>(null);
  const [breaks, setBreaks] = useState<BreakTime[]>([]);
  const [todayLoading, setTodayLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ===== 一覧 =====
  const [list, setList] = useState<Attendance[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  // ===== 詳細モーダル（時刻修正申請） =====
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Attendance | null>(null);
  const [reqCheckIn, setReqCheckIn] = useState<string>("");
  const [reqCheckOut, setReqCheckOut] = useState<string>("");
  const [reqReason, setReqReason] = useState<string>("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  const activeBreak = useMemo(() => {
    return breaks.find(
      (b) => b.break_end_at === null || b.break_end_at === undefined,
    );
  }, [breaks]);

  // ===== リクエスト世代管理（古いレスポンスで上書きしない） =====
  const todayReqIdRef = useRef(0);
  const listReqIdRef = useRef(0);
  const breaksReqIdRef = useRef(0);

  const fetchBreaks = useCallback(
    async (attendanceId: number) => {
      const reqId = ++breaksReqIdRef.current;

      try {
        const b = await apiFetch<BreakTime[]>(
          `/api/attendances/${attendanceId}/break-times`,
          { method: "GET" },
        );

        if (!isMountedRef.current) return [];
        if (reqId !== breaksReqIdRef.current) return [];

        const normalized = Array.isArray(b) ? b : [];
        setBreaks(normalized);
        return normalized;
      } catch (e) {
        if (isMountedRef.current && reqId === breaksReqIdRef.current) {
          notifyError("休憩一覧の取得に失敗しました", e);
          setBreaks([]);
        }
        return [];
      }
    },
    [isMountedRef, notifyError],
  );

  const fetchToday = useCallback(async () => {
    const reqId = ++todayReqIdRef.current;

    if (isMountedRef.current) setTodayLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/attendances/today", {
        method: "GET",
      });

      if (!isMountedRef.current) return null;
      if (reqId !== todayReqIdRef.current) return null;

      const data = normalizeTodayAttendance(raw);
      setToday(data);

      if (data?.id) {
        await fetchBreaks(data.id);
      } else {
        setBreaks([]);
      }

      return data;
    } catch (e) {
      if (isMountedRef.current && reqId === todayReqIdRef.current) {
        notifyError("当日勤怠の取得に失敗しました", e);
        setToday(null);
        setBreaks([]);
      }
      return null;
    } finally {
      if (isMountedRef.current && reqId === todayReqIdRef.current) {
        setTodayLoading(false);
      }
    }
  }, [fetchBreaks, isMountedRef, notifyError]);

  const fetchList = useCallback(async () => {
    const reqId = ++listReqIdRef.current;

    if (isMountedRef.current) setListLoading(true);
    try {
      const qs = new URLSearchParams();
      if (from) qs.set("from", from);
      if (to) qs.set("to", to);

      const path =
        qs.toString().length > 0
          ? `/api/attendances?${qs.toString()}`
          : "/api/attendances";

      const raw = await apiFetch<unknown>(path, { method: "GET" });

      if (!isMountedRef.current) return [];
      if (reqId !== listReqIdRef.current) return [];

      const normalized = normalizeAttendanceList(raw);
      setList(normalized);
      return normalized;
    } catch (e) {
      if (isMountedRef.current && reqId === listReqIdRef.current) {
        notifyError("勤怠一覧の取得に失敗しました", e);
        setList([]);
      }
      return [];
    } finally {
      if (isMountedRef.current && reqId === listReqIdRef.current) {
        setListLoading(false);
      }
    }
  }, [from, to, isMountedRef, notifyError]);

  const onCheckIn = useCallback(async () => {
    setSubmitting(true);
    try {
      await apiFetch<Attendance>("/api/attendances/check-in", {
        method: "POST",
      });
      notifySuccess("出勤打刻しました");
      await Promise.all([fetchToday(), fetchList()]);
    } catch (e) {
      notifyError("出勤打刻に失敗しました", e);
    } finally {
      if (isMountedRef.current) setSubmitting(false);
    }
  }, [fetchToday, fetchList, isMountedRef, notifyError, notifySuccess]);

  const onCheckOut = useCallback(async () => {
    setSubmitting(true);
    try {
      await apiFetch<Attendance>("/api/attendances/check-out", {
        method: "POST",
      });
      notifySuccess("退勤打刻しました");
      await Promise.all([fetchToday(), fetchList()]);
    } catch (e) {
      notifyError("退勤打刻に失敗しました", e);
    } finally {
      if (isMountedRef.current) setSubmitting(false);
    }
  }, [fetchToday, fetchList, isMountedRef, notifyError, notifySuccess]);

  const onStartBreak = useCallback(async () => {
    if (!today?.id) {
      notifyError("当日の勤怠が取得できていません");
      return;
    }

    setSubmitting(true);
    try {
      const body: { attendance_id: number; break_start_at: string } = {
        attendance_id: today.id,
        break_start_at: new Date().toISOString(),
      };

      await apiFetch("/api/break-times/start", {
        method: "POST",
        body: body as any,
      });

      notifySuccess("休憩を開始しました");
      await fetchBreaks(today.id);
    } catch (e) {
      notifyError("休憩開始に失敗しました", e);
    } finally {
      if (isMountedRef.current) setSubmitting(false);
    }
  }, [today?.id, fetchBreaks, isMountedRef, notifyError, notifySuccess]);

  const onEndBreak = useCallback(async () => {
    if (!today?.id) {
      notifyError("当日の勤怠が取得できていません");
      return;
    }
    if (!activeBreak?.id) {
      notifyError("終了できる休憩が見つかりません");
      return;
    }

    setSubmitting(true);
    try {
      const body: { break_end_at: string } = {
        break_end_at: new Date().toISOString(),
      };

      await apiFetch(`/api/break-times/${activeBreak.id}/end`, {
        method: "PUT",
        body: body as any,
      });

      notifySuccess("休憩を終了しました");
      await fetchBreaks(today.id);
    } catch (e) {
      notifyError("休憩終了に失敗しました", e);
    } finally {
      if (isMountedRef.current) setSubmitting(false);
    }
  }, [
    today?.id,
    activeBreak?.id,
    fetchBreaks,
    isMountedRef,
    notifyError,
    notifySuccess,
  ]);

  const openDetail = useCallback((a: Attendance) => {
    setSelected(a);

    // 時間処理は utils/time.ts に集約
    setReqCheckIn(isoToLocalInput(a.check_in_at));
    setReqCheckOut(isoToLocalInput(a.check_out_at));

    setReqReason("");
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    setSelected(null);
    setReqCheckIn("");
    setReqCheckOut("");
    setReqReason("");
  }, []);

  const submitTimeRequest = useCallback(async () => {
    if (!selected?.id) {
      notifyError("対象の勤怠が選択されていません");
      return;
    }

    if (!reqCheckIn) {
      notifyError("出勤時刻（修正後）は必須です");
      return;
    }
    if (!reqReason.trim()) {
      notifyError("理由は必須です");
      return;
    }

    const payload: TimeRequestPayload = {
      requested_check_in_at: localInputToIso(reqCheckIn),
      requested_check_out_at: reqCheckOut ? localInputToIso(reqCheckOut) : null,
      reason: reqReason.trim(),
    };

    setRequestSubmitting(true);
    try {
      await apiFetch(`/api/attendances/${selected.id}/time-requests`, {
        method: "POST",
        body: payload as any,
      });

      notifySuccess("時刻修正申請を送信しました");
      await fetchList();
      closeDetail();
    } catch (e) {
      notifyError("申請に失敗しました", e);
    } finally {
      if (isMountedRef.current) setRequestSubmitting(false);
    }
  }, [
    selected?.id,
    reqCheckIn,
    reqCheckOut,
    reqReason,
    fetchList,
    closeDetail,
    isMountedRef,
    notifyError,
    notifySuccess,
  ]);

  return {
    // today
    today,
    breaks,
    activeBreak,
    todayLoading,
    fetchToday,

    // list
    list,
    listLoading,
    from,
    to,
    setFrom,
    setTo,
    fetchList,

    // actions
    submitting,
    onCheckIn,
    onCheckOut,
    onStartBreak,
    onEndBreak,

    // detail modal (time request)
    detailOpen,
    selected,
    reqCheckIn,
    reqCheckOut,
    reqReason,
    setReqCheckIn,
    setReqCheckOut,
    setReqReason,
    requestSubmitting,
    openDetail,
    closeDetail,
    submitTimeRequest,
  };
}
