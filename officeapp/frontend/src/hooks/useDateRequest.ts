// src/hooks/useDateRequest.ts

import { useCallback, useState } from "react";
import { apiFetch } from "../lib/api";
import type { DateRequest, DateRequestCreateInput } from "../types/dateRequest";

type UseDateRequestOptions = {
  onError?: (title: string, error?: unknown) => void;
};

/**
 * バックエンドの返却が揺れても、フロントの型(DateRequest)に寄せて吸収する
 * - rejected_reason が正
 * - reject_reason で来た場合も rejected_reason に寄せる
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

  // session/status が欠けても最低限動くように既定値を入れる（表示崩れ防止）
  const session = (r.session ?? "full") as DateRequest["session"];
  const status = (r.status ?? "pending") as DateRequest["status"];

  const reason = typeof r.reason === "string" ? r.reason : "";

  const rejected_reason = (r.rejected_reason ?? r.reject_reason ?? null) as
    | string
    | null;

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

export function useDateRequest(options?: UseDateRequestOptions) {
  const onError = options?.onError;

  const [items, setItems] = useState<DateRequest[]>([]);
  const [listLoading, setListLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const fetchList = useCallback(async () => {
    setListLoading(true);
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
      setListLoading(false);
    }
  }, [onError]);

  const create = useCallback(
    async (payload: DateRequestCreateInput) => {
      // 最低限のバリデーション（ページ側でもやる前提で、二重に安全策）
      if (!payload.reason?.trim()) {
        const e = new Error("理由は必須です");
        onError?.("作成に失敗しました", e);
        throw e;
      }

      setCreateLoading(true);
      try {
        const createdRaw = await apiFetch<unknown>("/api/date-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            reason: payload.reason.trim(),
          }),
        });

        const created = normalizeDateRequest(createdRaw);
        if (!created) {
          const e = new Error("作成結果の形式が不正です");
          onError?.("作成に失敗しました", e);
          throw e;
        }

        // 体感を良くするため先頭に追加（必要なら後で fetchList() に切替でもOK）
        setItems((prev) => [created, ...prev]);

        return created;
      } catch (e) {
        onError?.("作成に失敗しました", e);
        throw e;
      } finally {
        setCreateLoading(false);
      }
    },
    [onError],
  );

  return {
    items,

    listLoading,
    fetchList,

    createLoading,
    create,
  };
}
