// src/hooks/useDateRequestList.ts

import { useCallback, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type {
  DateRequest,
  DateRequestSession,
  DateRequestStatus,
} from "../types/dateRequest";
import {
  normalizeDateRequest,
  normalizeDateRequestList,
} from "../utils/normalizeDateRequest";

type Profile = {
  id: number;
  role?: string; // admin / staff
};

type UseDateRequestListOptions = {
  onError?: (title: string, error?: unknown) => void;
};

export function useDateRequestList(options?: UseDateRequestListOptions) {
  const onError = options?.onError;

  const [items, setItems] = useState<DateRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // profile/admin
  const [profile, setProfile] = useState<Profile | null>(null);
  const isAdmin = useMemo(() => profile?.role === "admin", [profile]);

  // modal
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
      // 管理画面なので、失敗を完全に握りつぶすのはやめる
      onError?.("プロフィール取得に失敗しました", e);
      setProfile(null);
      return null;
    }
  }, [onError]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/date-requests", {
        method: "GET",
      });

      const arr = Array.isArray(raw) ? raw : [];
      const normalized = normalizeDateRequestList(arr);

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

  const approve = useCallback(
    async (id: number) => {
      if (actionLoading) return;

      if (!isAdmin) {
        const e = new Error("管理者のみ操作できます");
        onError?.("管理者のみ操作できます", e);
        throw e;
      }

      setActionLoading(true);
      try {
        await apiFetch(`/api/admin/date-requests/${id}/approve`, {
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
    },
    [actionLoading, isAdmin, fetchList, closeDetail, onError],
  );

  const reject = useCallback(
    async (id: number, reason: string) => {
      if (actionLoading) return;

      if (!isAdmin) {
        const e = new Error("管理者のみ操作できます");
        onError?.("管理者のみ操作できます", e);
        throw e;
      }

      if (!reason.trim()) {
        const e = new Error("却下理由は必須です");
        onError?.("却下理由は必須です", e);
        throw e;
      }

      setActionLoading(true);
      try {
        await apiFetch(`/api/admin/date-requests/${id}/reject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rejected_reason: reason.trim() }),
        });

        await fetchList();
        closeDetail();
      } catch (e) {
        onError?.("却下に失敗しました", e);
        throw e;
      } finally {
        setActionLoading(false);
      }
    },
    [actionLoading, isAdmin, fetchList, closeDetail, onError],
  );

  // 互換のために、selectedベースの関数も残す（page側の修正を最小にしたいなら）
  const approveSelected = useCallback(async () => {
    if (!selected) {
      const e = new Error("対象が選択されていません");
      onError?.("対象が選択されていません", e);
      throw e;
    }
    await approve(selected.id);
  }, [selected, approve, onError]);

  const rejectSelected = useCallback(async () => {
    if (!selected) {
      const e = new Error("対象が選択されていません");
      onError?.("対象が選択されていません", e);
      throw e;
    }
    await reject(selected.id, rejectReason);
  }, [selected, reject, rejectReason, onError]);

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
    approve: approveSelected,
    reject: rejectSelected,
  };
}
