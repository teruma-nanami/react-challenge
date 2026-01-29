// src/hooks/useProfile.ts
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { User } from "../types/user";
import { useAuthReady } from "./useAuthReady";

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const authReady = useAuthReady();

  useEffect(() => {
    if (!authReady) return;
    fetchProfile();
  }, [authReady]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await apiFetch<User>("/api/profile");

      setDisplayName(user.display_name ?? "");
      setEmail(user.email);
      setRole(user.role);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const submit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<User>("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: displayName || null,
          email,
          role,
        }),
      });

      await fetchProfile();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // data
    displayName,
    email,
    role,

    // setters
    setDisplayName,
    setEmail,
    setRole,

    // ui state
    loading,
    submitting,
    error,

    // actions
    submit,
  };
}
