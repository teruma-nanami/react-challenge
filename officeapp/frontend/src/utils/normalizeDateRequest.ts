// src/utils/normalizeDateRequest.ts

import type { DateRequest } from "../types/dateRequest";

/**
 * バックエンドの返却が揺れても DateRequest に寄せる
 * - rejected_reason が正
 * - reject_reason で来た場合も rejected_reason に寄せる
 * - session/status が欠ける場合は表示崩れ防止の既定値を入れる
 */
export function normalizeDateRequest(raw: unknown): DateRequest | null {
  if (!raw || typeof raw !== "object") return null;

  const r = raw as any;

  const id = r.id;
  const user_id = r.user_id;
  const start_date = r.start_date;
  const end_date = r.end_date;

  if (typeof id !== "number") return null;
  if (typeof user_id !== "number") return null;
  if (typeof start_date !== "string") return null;
  if (typeof end_date !== "string") return null;

  // session/status が欠けても最低限動くように既定値を入れる（表示崩れ防止）
  const session = (r.session ?? "full") as DateRequest["session"];
  const status = (r.status ?? "pending") as DateRequest["status"];

  const reason = typeof r.reason === "string" ? r.reason : "";

  const rejected_reason = (r.rejected_reason ?? r.reject_reason ?? null) as
    | string
    | null;

  const created_at = typeof r.created_at === "string" ? r.created_at : "";
  const updated_at = typeof r.updated_at === "string" ? r.updated_at : "";

  return {
    id,
    user_id,
    start_date,
    end_date,
    session,
    reason,
    status,
    rejected_reason,
    created_at,
    updated_at,
  };
}

/**
 * 一覧正規化（事故防止）
 * - 配列以外は空配列
 * - 要素ごとに normalize をかけて null を落とす
 */
export function normalizeDateRequestList(payload: unknown): DateRequest[] {
  if (!Array.isArray(payload)) return [];
  return payload
    .map((x) => normalizeDateRequest(x))
    .filter((x): x is DateRequest => x !== null);
}
