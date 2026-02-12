// src/utils/time.ts

const TZ = "Asia/Tokyo";

/**
 * DATE型（YYYY-MM-DD）を日本向け表示にする
 * - もし ISO（YYYY-MM-DDT...Z）が来ても先頭10文字だけ使う
 * - 時刻は扱わない（UTCにしない）
 */
export function formatYmd(value: string | null | undefined): string {
  if (!value) return "—";

  // ISOや "YYYY-MM-DD 00:00:00" が来ても DATE 部分だけ取る
  const head = value.slice(0, 10); // "YYYY-MM-DD"
  if (/^\d{4}-\d{2}-\d{2}$/.test(head)) {
    return head.replaceAll("-", "/");
  }

  // 想定外はそのまま返す（デバッグしやすい）
  return value;
}

/**
 * UTC想定のISO文字列を JST で表示
 * - "Z" が付いてない場合は UTC として扱う（例: "2026-02-11 00:30:29"）
 * - DATEだけなら formatYmd に倒す
 */
export function formatJst(value: string | null | undefined): string {
  if (!value) return "—";

  // DATE だけ来た場合は date表示に倒す
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return formatYmd(value);
  }

  const iso = value.endsWith("Z") ? value : `${value}Z`;
  const d = new Date(iso);

  if (Number.isNaN(d.getTime())) return String(value);

  const fmt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = fmt.formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const y = get("year");
  const m = get("month");
  const day = get("day");
  const hh = get("hour");
  const mm = get("minute");
  const ss = get("second");

  return `${y}/${m}/${day} ${hh}:${mm}:${ss}`;
}
