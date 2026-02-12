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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPlainObject(v: any) {
  return v !== null && typeof v === "object" && v.constructor === Object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFetchInit = Omit<RequestInit, "body" | "headers"> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  init?: ApiFetchInit,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers ?? {}),
  };

  // ★ token がある時だけ Authorization を付ける（ここでthrowしない）
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // body の整形（object/arrayならJSON化してContent-Typeを付与）
  let body: BodyInit | undefined = undefined;

  if (init?.body !== undefined && init?.body !== null) {
    const b = init.body;

    if (b instanceof FormData) {
      body = b;
    } else if (typeof b === "string") {
      body = b;
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    } else if (isPlainObject(b) || Array.isArray(b)) {
      body = JSON.stringify(b);
      headers["Content-Type"] = "application/json";
    } else {
      body = String(b);
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "text/plain";
      }
    }
  }

  const res = await fetch(url, {
    ...init,
    body,
    headers,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    // Laravelのvalidationエラーを読みやすく出す
    let message = `Request failed: ${res.status}`;

    try {
      const parsed = isJson ? await res.json() : null;

      if (parsed && typeof parsed === "object") {
        if (
          "message" in parsed &&
          typeof (parsed as any).message === "string"
        ) {
          message = String((parsed as any).message);
        }

        if ("errors" in parsed && typeof (parsed as any).errors === "object") {
          const lines: string[] = [];
          for (const [field, msgs] of Object.entries<any>(
            (parsed as any).errors,
          )) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              lines.push(`${field}: ${msgs.join(", ")}`);
            }
          }
          if (lines.length > 0) {
            message = `${message}\n${lines.join("\n")}`;
          }
        }
      } else if (!isJson) {
        const text = await res.text();
        if (text) message = text;
      }
    } catch {
      // ignore
    }

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
