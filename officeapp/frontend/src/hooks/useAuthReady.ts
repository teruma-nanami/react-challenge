// src/hooks/useAuthReady.ts
import { useAuth0 } from "@auth0/auth0-react";

export function useAuthReady(): boolean {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return false;
  if (!isAuthenticated) return false;

  return true;
}
