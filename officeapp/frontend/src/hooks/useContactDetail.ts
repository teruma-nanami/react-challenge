import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { unwrapData } from "../utils/unwrap";
import type { Contact, ContactCategory, ContactStatus } from "../types/contact";

/**
 * unwrap 後の値が Contact として最低限成立しているか
 */
function isValidContact(value: unknown): value is Contact {
  if (!value || typeof value !== "object") return false;

  const c = value as Contact;
  return typeof c.id === "number" && typeof c.status === "string";
}

export function useContactDetail(id: string | undefined) {
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const applyContactToForm = (c: Contact) => {
    setName(c.name);
    setEmail(c.email);
    setSubject(c.subject);
    setCategory(c.category as ContactCategory);
    setMessage(c.message);
    setStatus(c.status as ContactStatus);
    setInternalNote(c.internal_note ?? "");
  };

  const fetchContact = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<unknown>(`/api/contacts/${id}`);
      const data = unwrapData<unknown>(res);

      if (!isValidContact(data)) {
        throw new Error("API response does not contain contact data.");
      }

      setContact(data);
      applyContactToForm(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setContact(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateContact = async () => {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const res = await apiFetch<unknown>(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          category,
          message,
          status,
          internal_note: internalNote,
        }),
      });

      const data = unwrapData<unknown>(res);

      if (!isValidContact(data)) {
        throw new Error("API response does not contain updated contact data.");
      }

      setContact(data);
      applyContactToForm(data);
      setSuccess("更新しました");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

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
