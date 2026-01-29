// src/utils/unwrap.ts

/**
 * Laravel の API レスポンス
 * { data: T, message: string }
 * または生の T を安全に unwrap する
 */
export function unwrapData<T>(value: unknown): T {
  if (value && typeof value === "object" && "data" in (value as any)) {
    return (value as any).data as T;
  }

  return value as T;
}
