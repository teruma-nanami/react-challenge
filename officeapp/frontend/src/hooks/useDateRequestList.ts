// src/hooks/useDateRequestList.ts

import { useCallback, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type {
  DateRequest,
  DateRequestSession,
  DateRequestStatus,
} from "../types/dateRequest";

type Profile = {
  id: number;
  role?: string; // admin / staff
};

type UseDateRequestListOptions = {
  onError?: (title: string, error?: unknown) => void;
};

/**
 * バックエンドの返却が揺れても、フロントの型(DateRequest)に寄せて吸収する
 * - rejected_reason が正
 * - reject_reason で来た場合も rejected_reason に寄せる
 * - session が無い場合は full 扱い（表示のための暫定）
 */
function normalizeDateRequest(raw: unknown): DateRequest | null {
  if (!raw || typeof raw !== "object") return null;

  const r = raw as any;

  const id = r.id;
  const user_id = r.user_id;
  const start_date = r.start_date;
  const end_date = r.end_date;

  if (typeof id !== "number") return null;
  if (typeof user_id !== "number") return null;
  if (typeof start_date !== "string") return null;
  if (typeof end_date !== "string") return null;

  const session = (r.session ?? "full") as DateRequestSession;
  const status = (r.status ?? "pending") as DateRequestStatus;

  const rejected_reason = (r.rejected_reason ?? r.reject_reason ?? null) as
    | string
    | null;

  const reason = typeof r.reason === "string" ? r.reason : "";

  const created_at = typeof r.created_at === "string" ? r.created_at : "";
  const updated_at = typeof r.updated_at === "string" ? r.updated_at : "";

  return {
    id,
    user_id,
    start_date,
    end_date,
    session,
    reason,
    status,
    rejected_reason,
    created_at,
    updated_at,
  };
}

export function useDateRequestList(options?: UseDateRequestListOptions) {
  const onError = options?.onError;

  const [items, setItems] = useState<DateRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // 管理者判定（/api/profile を利用）
  const [profile, setProfile] = useState<Profile | null>(null);
  const isAdmin = useMemo(() => profile?.role === "admin", [profile]);

  // 詳細モーダル
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<DateRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const me = await apiFetch<Profile>("/api/profile", { method: "GET" });
      setProfile(me);
      return me;
    } catch (e) {
      setProfile(null);
      return null;
    }
  }, []);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/date-requests", {
        method: "GET",
      });

      const arr = Array.isArray(raw) ? raw : [];
      const normalized = arr
        .map((x) => normalizeDateRequest(x))
        .filter((x): x is DateRequest => x !== null);

      setItems(normalized);
      return normalized;
    } catch (e) {
      onError?.("休日申請一覧の取得に失敗しました", e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [onError]);

  const openDetail = useCallback((r: DateRequest) => {
    setSelected(r);
    setRejectReason(r.rejected_reason ?? "");
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
      await apiFetch(`/api/admin/date-requests/${selected.id}/approve`, {
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
      await apiFetch(`/api/admin/date-requests/${selected.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejected_reason: rejectReason.trim() }),
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
