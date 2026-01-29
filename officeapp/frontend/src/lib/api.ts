// src/lib/api.ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type ApiEnvelope<T> = {
  data: T;
  message: string;
};

/**
 * 🔑 Bearer token を外から注入するための関数
 */
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",

      // 🔑 ここが追加ポイント
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),

      ...(init?.headers ?? {}),
    },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    const body = isJson ? await res.json().catch(() => null) : await res.text();
    const message =
      (body &&
        typeof body === "object" &&
        "message" in body &&
        String((body as any).message)) ||
      (typeof body === "string" ? body : `Request failed: ${res.status}`);
    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const json = (isJson ? await res.json() : null) as ApiEnvelope<T> | T | null;

  if (json && typeof json === "object" && "data" in json) {
    return (json as ApiEnvelope<T>).data;
  }

  return json as T;
}

/**
 * paginate の unwrap（既存のままでOK）
 */
export type LaravelPaginator<T> = {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
};

export function unwrapList<T>(payload: unknown): {
  items: T[];
  paginator?: LaravelPaginator<T>;
} {
  if (Array.isArray(payload)) {
    return { items: payload as T[] };
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as any).data)
  ) {
    return {
      items: (payload as any).data as T[],
      paginator: payload as LaravelPaginator<T>,
    };
  }

  return { items: [] };
}
