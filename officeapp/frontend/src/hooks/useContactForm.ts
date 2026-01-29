// src/hooks/useContactForm.ts
import { useState } from "react";
import type { ContactCategory } from "../types/contact";
import { apiFetch } from "../lib/api";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  category: ContactCategory;
  message: string;
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    category: "other",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async () => {
    // UX 用の最低限バリデーション
    if (
      !values.name.trim() ||
      !values.email.trim() ||
      !values.subject.trim() ||
      !values.message.trim()
    ) {
      setError("未入力の項目があります");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await apiFetch<void>("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      setValues({
        name: "",
        email: "",
        subject: "",
        category: "other",
        message: "",
      });

      setSuccess("送信しました。ありがとうございました。");
    } catch (e) {
      console.error(e);
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    submitting,
    success,
    error,
    onChange,
    submit,
  };
}
