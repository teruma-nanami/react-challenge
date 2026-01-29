// src/utils/response.ts
import { unwrapData } from "./unwrap";

export function unwrapList<T>(value: unknown): T[] {
  const data = unwrapData<any>(value);

  if (Array.isArray(data)) {
    return data as T[];
  }

  // Laravel paginate: { data: { data: T[] } }
  if (data && typeof data === "object" && Array.isArray(data.data)) {
    return data.data as T[];
  }

  throw new Error("Invalid list response");
}
