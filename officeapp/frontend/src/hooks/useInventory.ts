// src/hooks/useInventory.ts
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { InventoryItem } from "../types/item";

type AddInventoryParams = {
  sku: string;
  name: string;
  quantity: number;
  isActive: boolean;
};

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== modal control =====
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onOpenAddModal = () => setIsAddModalOpen(true);
  const onCloseAddModal = () => setIsAddModalOpen(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<{ data: InventoryItem[] }>("/api/items");
      setItems(res.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (params: AddInventoryParams) => {
    try {
      setSubmitting(true);
      setError(null);

      await apiFetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: params.sku || null,
          name: params.name,
          quantity: params.quantity,
          is_active: params.isActive,
        }),
      });

      await fetchItems();
      onCloseAddModal(); // ← 追加成功後に閉じる
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    items,
    loading,
    submitting,
    error,

    // modal
    isAddModalOpen,
    onOpenAddModal,
    onCloseAddModal,

    // actions
    addItem,
    refetch: fetchItems,
  };
}
