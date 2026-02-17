// src/hooks/useDateRequest.ts

import { useCallback, useState } from "react";
import { apiFetch } from "../lib/api";
import type { DateRequest, DateRequestCreateInput } from "../types/dateRequest";
import {
  normalizeDateRequest,
  normalizeDateRequestList,
} from "../utils/normalizeDateRequest";

type UseDateRequestOptions = {
  onError?: (title: string, error?: unknown) => void;
};

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
      const normalized = normalizeDateRequestList(raw);
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
          body: JSON.stringify({ ...payload, reason: payload.reason.trim() }),
        });

        const created = normalizeDateRequest(createdRaw);
        if (!created) {
          const e = new Error("作成結果の形式が不正です");
          onError?.("作成に失敗しました", e);
          throw e;
        }

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
