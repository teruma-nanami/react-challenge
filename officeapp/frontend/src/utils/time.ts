// src/utils/time.ts

type NullableString = string | null | undefined;

/**
 * ISO文字列を必ず日本時間として表示する
 * UTC(Z付き)でも強制的にJSTに変換する
 */
export function formatJst(value: NullableString): string {
  if (!value) return "—";

  // Z付きISOを Date に変換
  const utcDate = new Date(value);
  if (Number.isNaN(utcDate.getTime())) return String(value);

  // JSTに変換（+9時間を明示）
  const jstTime = utcDate.getTime() + 9 * 60 * 60 * 1000;
  const jstDate = new Date(jstTime);

  return jstDate.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
