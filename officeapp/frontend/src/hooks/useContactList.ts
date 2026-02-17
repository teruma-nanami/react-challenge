// src/hooks/useContactList.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Contact } from "../types/contact";

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

function isValidContact(value: unknown): value is Contact {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return typeof c.id === "number" && typeof c.status === "string";
}

/**
 * Laravel API のレスポンス揺れを吸収して配列を取り出す
 */
function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const p = payload as any;

  if (Array.isArray(p?.data)) return p.data;
  if (Array.isArray(p?.data?.data)) return p.data.data;
  if (Array.isArray(p?.data?.data?.data)) return p.data.data.data;

  return [];
}

export function useContactList() {
  const isMountedRef = useIsMountedRef();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      if (!isMountedRef.current) return;
      setLoading(true);
      setError(null);

      const res = await apiFetch<unknown>("/api/contacts", { method: "GET" });
      const rawList = extractArray(res);
      const list = rawList.filter(isValidContact);

      if (!isMountedRef.current) return;
      setContacts(list);
    } catch (_e) {
      if (!isMountedRef.current) return;
      setError("お問い合わせ一覧の取得に失敗しました");
      setContacts([]);
    } finally {
      if (!isMountedRef.current) return;
      setLoading(false);
    }
  }, [isMountedRef]);

  const deleteContact = useCallback(
    async (id: number) => {
      try {
        setError(null);

        await apiFetch<void>(`/api/contacts/${id}`, {
          method: "DELETE",
        });

        await fetchContacts();
      } catch (_e) {
        if (!isMountedRef.current) return;
        setError("削除に失敗しました");
      }
    },
    [fetchContacts, isMountedRef],
  );

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    deleteContact,
  };
}
