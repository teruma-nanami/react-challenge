// src/hooks/useTimeRequestList.ts

import { useCallback, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";

export type TimeRequest = {
  id: number;
  user_id: number;
  attendance_id: number;

  requested_check_in_at: string;
  requested_check_out_at: string | null;

  reason: string;
  status: string; // pending / approved / rejected など
  reject_reason: string | null;

  created_at: string;
  updated_at: string;
};

type Profile = {
  id: number;
  role?: string; // admin / staff
};

type UseTimeRequestListOptions = {
  onError?: (title: string, error?: unknown) => void;
};

/**
 * バックエンドの返却が揺れても、フロントの型(TimeRequest)に寄せて吸収する
 * - reject_reason が正
 * - rejected_reason で来た場合も reject_reason に寄せる（念のため）
 */
function normalizeTimeRequest(raw: unknown): TimeRequest | null {
  if (!raw || typeof raw !== "object") return null;

  const r = raw as any;

  const id = r.id;
  const user_id = r.user_id;
  const attendance_id = r.attendance_id;

  const requested_check_in_at = r.requested_check_in_at;
  const requested_check_out_at = r.requested_check_out_at;

  if (typeof id !== "number") return null;
  if (typeof user_id !== "number") return null;
  if (typeof attendance_id !== "number") return null;

  if (typeof requested_check_in_at !== "string") return null;
  if (
    !(
      requested_check_out_at === null ||
      typeof requested_check_out_at === "string"
    )
  )
    return null;

  const reason = typeof r.reason === "string" ? r.reason : "";

  const status = typeof r.status === "string" ? r.status : "pending";

  const reject_reason = (r.reject_reason ?? r.rejected_reason ?? null) as
    | string
    | null;

  const created_at = typeof r.created_at === "string" ? r.created_at : "";
  const updated_at = typeof r.updated_at === "string" ? r.updated_at : "";

  return {
    id,
    user_id,
    attendance_id,

    requested_check_in_at,
    requested_check_out_at,

    reason,
    status,
    reject_reason,

    created_at,
    updated_at,
  };
}

export function useTimeRequestList(options?: UseTimeRequestListOptions) {
  const onError = options?.onError;

  const [items, setItems] = useState<TimeRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const isAdmin = useMemo(() => profile?.role === "admin", [profile]);

  // detail modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<TimeRequest | null>(null);

  // reject input
  const [rejectReason, setRejectReason] = useState("");

  // actions
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const me = await apiFetch<Profile>("/api/profile", { method: "GET" });
      setProfile(me);
      return me;
    } catch {
      setProfile(null);
      return null;
    }
  }, []);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/time-requests", {
        method: "GET",
      });

      const arr = Array.isArray(raw) ? raw : [];
      const normalized = arr
        .map((x) => normalizeTimeRequest(x))
        .filter((x): x is TimeRequest => x !== null);

      setItems(normalized);
      return normalized;
    } catch (e) {
      onError?.("時刻修正申請一覧の取得に失敗しました", e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const openDetail = useCallback((r: TimeRequest) => {
    setSelected(r);
    setRejectReason(r.reject_reason ?? "");
    setDetailOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    setSelected(null);
    setRejectReason("");
  }, []);

  const approve = useCallback(async () => {
    if (!selected) return;

    if (!isAdmin) {
      onError?.("管理者のみ操作できます");
      return;
    }

    setActionLoading(true);
    try {
      await apiFetch(`/api/admin/time-requests/${selected.id}/approve`, {
        method: "POST",
      });

      await fetchList();
      closeDetail();
    } catch (e) {
      onError?.("承認に失敗しました", e);
      throw e;
    } finally {
      setActionLoading(false);
    }
  }, [selected, isAdmin, fetchList, closeDetail, onError]);

  const reject = useCallback(async () => {
    if (!selected) return;

    if (!isAdmin) {
      onError?.("管理者のみ操作できます");
      return;
    }

    if (!rejectReason.trim()) {
      onError?.("却下理由は必須です");
      return;
    }

    setActionLoading(true);
    try {
      await apiFetch(`/api/admin/time-requests/${selected.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reject_reason: rejectReason.trim() }),
      });

      await fetchList();
      closeDetail();
    } catch (e) {
      onError?.("却下に失敗しました", e);
      throw e;
    } finally {
      setActionLoading(false);
    }
  }, [selected, isAdmin, rejectReason, fetchList, closeDetail, onError]);

  return {
    // list
    items,
    loading,
    fetchList,

    // profile/admin
    profile,
    isAdmin,
    fetchProfile,

    // detail modal
    detailOpen,
    selected,
    openDetail,
    closeDetail,

    // reject input
    rejectReason,
    setRejectReason,

    // actions
    actionLoading,
    approve,
    reject,
  };
}
