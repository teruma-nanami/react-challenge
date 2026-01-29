import { getAuth0Client } from "@auth0/auth0-react";

/**
 * apiFetch 用に Bearer Token を取得する
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    const auth0 = getAuth0Client?.();
    if (!auth0) return null;

    return await auth0.getAccessTokenSilently();
  } catch {
    return null;
  }
}
