// src/lib/api.ts
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type ApiEnvelope<T> = {
  data: T;
  message: string;
};

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // 401/422などもJSONで返る想定。ダメならテキストで拾う
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

  // 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const json = (isJson ? await res.json() : null) as ApiEnvelope<T> | T | null;

  // LaravelのApiController(ok/created)の形式なら unwrap
  if (json && typeof json === "object" && "data" in json) {
    return (json as ApiEnvelope<T>).data;
  }

  // 形式が違う場合はそのまま返す
  return json as T;
}

/**
 * paginateのときに `data.data` が配列になる問題を統一的に扱う
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
  // 1) 配列ならそのまま
  if (Array.isArray(payload)) {
    return { items: payload as T[] };
  }

  // 2) paginate形式なら payload.data が配列
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

  // 3) それ以外は空にして落とさない
  return { items: [] };
}
