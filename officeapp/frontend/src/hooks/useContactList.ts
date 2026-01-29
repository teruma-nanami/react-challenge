// src/hooks/useContactList.ts
import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Contact } from "../types/contact";

/**
 * Contact 一覧取得用 hook
 * - API レスポンスの揺れをここで吸収
 * - Page / View には Contact[] だけを渡す
 */
export function useContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Laravel API のレスポンス揺れを吸収して Contact[] を取り出す
   */
  const extractContacts = (payload: unknown): Contact[] => {
    const p: any = payload;

    // 1) payload 自体が配列
    if (Array.isArray(p)) return p;

    // 2) { data: Contact[] }
    if (Array.isArray(p?.data)) return p.data;

    // 3) { data: { data: Contact[] } } (paginate)
    if (Array.isArray(p?.data?.data)) return p.data.data;

    // 4) 念のためさらに深いケース
    if (Array.isArray(p?.data?.data?.data)) return p.data.data.data;

    return [];
  };

  /**
   * 一覧取得
   */
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<unknown>("/api/contacts");
      const list = extractContacts(res);

      setContacts(list);
    } catch (e) {
      console.error(e);
      setError("お問い合わせ一覧の取得に失敗しました");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 削除
   */
  const deleteContact = async (id: number) => {
    const ok = confirm("削除しますか？");
    if (!ok) return;

    try {
      await apiFetch<void>(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      await fetchContacts();
    } catch (e) {
      console.error(e);
      setError("削除に失敗しました");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    deleteContact,
  };
}
