// src/hooks/useInventoryDetail.ts
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";

import type { InventoryItem } from "../types/item";
import type { InventoryTransaction } from "../types/transaction";
import type { LaravelPagination } from "../types/pagination";

type TxType = "in" | "out";

export function useInventoryDetail(itemId: number) {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 入出庫フォーム
  const [txType, setTxType] = useState<TxType>("in");
  const [txQuantity, setTxQuantity] = useState(1);
  const [txNote, setTxNote] = useState("");

  const isActive = useMemo(() => {
    if (!item) return false;
    return item.is_active === true || item.is_active === 1;
  }, [item]);

  const fetchItem = async () => {
    if (!Number.isFinite(itemId)) return;

    const res = await apiFetch<InventoryItem>(`/api/items/${itemId}`);
    setItem(res);
  };

  const fetchTransactions = async () => {
    const res =
      await apiFetch<LaravelPagination<InventoryTransaction>>(
        "/api/transactions",
      );

    const list = Array.isArray(res.data) ? res.data : [];
    const filtered = list.filter((t) => t.inventory_item_id === itemId);

    setTransactions(filtered);
  };

  const fetchAll = async () => {
    if (!Number.isFinite(itemId)) {
      setItem(null);
      setTransactions([]);
      setLoading(false);
      setError("IDが不正です");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await Promise.all([fetchItem(), fetchTransactions()]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setItem(null);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  const createTransaction = async () => {
    if (!item) return;
    if (txQuantity <= 0) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<InventoryTransaction>("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inventory_item_id: item.id,
          type: txType,
          quantity: txQuantity,
          note: txNote.trim() ? txNote : null,
        }),
      });

      setTxQuantity(1);
      setTxNote("");

      await Promise.all([fetchItem(), fetchTransactions()]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async () => {
    if (!item) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<InventoryItem>(`/api/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          sku: item.sku,
          is_active: !isActive,
        }),
      });

      await fetchItem();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteItem = async () => {
    if (!item) return;

    const ok = window.confirm(
      "本当にこのアイテムを削除しますか？（復元できません）",
    );
    if (!ok) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<void>(`/api/items/${item.id}`, {
        method: "DELETE",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // data
    item,
    transactions,
    isActive,

    // ui state
    loading,
    submitting,
    error,

    // tx form
    txType,
    txQuantity,
    txNote,

    // setters
    setTxType,
    setTxQuantity,
    setTxNote,

    // actions
    createTransaction,
    toggleActive,
    deleteItem,
  };
}
