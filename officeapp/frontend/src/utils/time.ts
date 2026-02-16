// src/utils/time.ts

const TZ = "Asia/Tokyo";

/**
 * 文字列が "YYYY-MM-DD" 形式かどうか
 */
function isDateOnly(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * 末尾が Z / +09:00 / -05:30 のようなタイムゾーン付きかどうか
 */
function hasTimezoneSuffix(value: string): boolean {
  return /[zZ]$/.test(value) || /[+-]\d{2}:\d{2}$/.test(value);
}

/**
 * API等から来る日時文字列を Date が安全に読める形に正規化する
 * - "YYYY-MM-DD HH:mm:ss" → "YYYY-MM-DDTHH:mm:ss"
 * - タイムゾーンが無い場合は「UTC想定」として Z を付与（既存方針踏襲）
 * - 既に Z / オフセット付きならそのまま（壊さない）
 *
 * 返り値は Date に渡す前提の文字列
 */
export function normalizeIsoUtcLike(value: string): string {
  let v = value.trim();

  // "YYYY-MM-DD HH:mm:ss" / "YYYY-MM-DD HH:mm" を "T" 区切りにする
  // （既にTがあるなら触らない）
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(v) && !v.includes("T")) {
    v = v.replace(" ", "T");
  }

  // タイムゾーンが付いていないなら、UTC想定として Z を付与
  if (!hasTimezoneSuffix(v)) {
    v = `${v}Z`;
  }

  return v;
}

/**
 * Date を作る（失敗したら null）
 * - DATE だけは呼び出し側で弾く想定
 */
export function parseDateTime(value: string): Date | null {
  const iso = normalizeIsoUtcLike(value);
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/**
 * DATE型（YYYY-MM-DD）を日本向け表示にする
 * - もし ISO（YYYY-MM-DDT...Z）が来ても先頭10文字だけ使う
 * - 時刻は扱わない（UTC変換しない）
 */
export function formatYmd(value: string | null | undefined): string {
  if (!value) return "—";

  const head = value.slice(0, 10); // "YYYY-MM-DD"
  if (isDateOnly(head)) {
    return head.replaceAll("-", "/");
  }

  return String(value);
}

/**
 * UTC想定の日時文字列を JST 表示
 * - タイムゾーンが無い場合は UTC として扱う（Z付与）
 * - 既に Z / オフセット付きなら壊さない
 * - DATEだけなら formatYmd に倒す
 */
export function formatJst(value: string | null | undefined): string {
  if (!value) return "—";

  // DATE だけ来た場合は date表示に倒す
  if (isDateOnly(value)) {
    return formatYmd(value);
  }

  const d = parseDateTime(value);
  if (!d) return String(value);

  const fmt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
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

/**
 * datetime-local 用（入力表示向け）
 * ISO/UTC想定 -> "YYYY-MM-DDTHH:mm"
 *
 * 注意:
 * - datetime-local は「端末ローカルの解釈」をする入力です（TZ指定できません）
 * - 日本運用（端末TZがJST）なら実用上問題になりにくいですが、海外端末ではズレます
 */
export function isoToLocalInput(value: string | null | undefined): string {
  if (!value) return "";
  const d = parseDateTime(value);
  if (!d) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

/**
 * datetime-local（ローカル） -> ISO(UTC) string
 */
export function localInputToIso(localValue: string): string {
  const d = new Date(localValue);
  return d.toISOString();
}
