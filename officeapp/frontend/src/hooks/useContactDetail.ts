import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import { unwrapData } from "../utils/unwrap";
import type { Contact, ContactCategory, ContactStatus } from "../types/contact";

/**
 * unwrap 後の値が Contact として最低限成立しているか
 * - 実務では最低限の必須項目を確認しておく（壊れたレスポンスを弾く）
 */
function isValidContact(value: unknown): value is Contact {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;

  const status = c.status;
  const category = c.category;

  return (
    typeof c.id === "number" &&
    typeof c.name === "string" &&
    typeof c.email === "string" &&
    typeof c.subject === "string" &&
    typeof c.message === "string" &&
    (status === "new" || status === "in_progress" || status === "closed") &&
    (category === "bug" || category === "request" || category === "other")
  );
}

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

export function useContactDetail(id: string | undefined) {
  const isMountedRef = useIsMountedRef();

  const hasValidId = useMemo(() => {
    if (!id) return false;
    // ルートが数値ID前提ならこれで弾ける（前提が違うなら削除可）
    const n = Number(id);
    return Number.isFinite(n) && n > 0;
  }, [id]);

  const [contact, setContact] = useState<Contact | null>(null);

  // ===== form state =====
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<ContactCategory>("other");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus>("new");
  const [internalNote, setInternalNote] = useState("");

  // ===== ui state =====
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const applyContactToForm = useCallback((c: Contact) => {
    setName(c.name);
    setEmail(c.email);
    setSubject(c.subject);
    setCategory(c.category);
    setMessage(c.message);
    setStatus(c.status);
    setInternalNote(c.internal_note ?? "");
  }, []);

  const fetchContact = useCallback(async () => {
    if (!hasValidId || !id) {
      if (!isMountedRef.current) return;
      setLoading(false);
      setContact(null);
      setError("不正なURLです（IDが取得できません）。");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch<unknown>(`/api/contacts/${id}`, {
        method: "GET",
      });
      const data = unwrapData<unknown>(res);

      if (!isValidContact(data)) {
        throw new Error("API response does not contain contact data.");
      }

      if (!isMountedRef.current) return;
      setContact(data);
      applyContactToForm(data);
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err instanceof Error ? err.message : "Unknown error");
      setContact(null);
    } finally {
      if (!isMountedRef.current) return;
      setLoading(false);
    }
  }, [applyContactToForm, hasValidId, id, isMountedRef]);

  useEffect(() => {
    void fetchContact();
  }, [fetchContact]);

  const updateContact = useCallback(async () => {
    if (!hasValidId || !id) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await apiFetch<unknown>(`/api/contacts/${id}`, {
        method: "PUT",
        body: {
          name,
          email,
          subject,
          category,
          message,
          status,
          internal_note: internalNote,
        } as any,
      });

      const data = unwrapData<unknown>(res);

      if (!isValidContact(data)) {
        throw new Error("API response does not contain updated contact data.");
      }

      if (!isMountedRef.current) return;
      setContact(data);
      applyContactToForm(data);
      setSuccess("更新しました");

      // 成功メッセージは数秒で消す（実務でよくあるUX）
      window.setTimeout(() => {
        if (isMountedRef.current) setSuccess(null);
      }, 2500);
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      if (!isMountedRef.current) return;
      setSaving(false);
    }
  }, [
    applyContactToForm,
    category,
    email,
    hasValidId,
    id,
    internalNote,
    isMountedRef,
    message,
    name,
    status,
    subject,
  ]);

  return {
    contact,

    // form state
    name,
    email,
    subject,
    category,
    message,
    status,
    internalNote,

    setStatus,
    setInternalNote,

    // ui state
    loading,
    saving,
    error,
    success,

    updateContact,
  };
}
