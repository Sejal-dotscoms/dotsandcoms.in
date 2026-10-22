const IST = "Asia/Kolkata";

function ymdParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

/** Calendar date in IST as yyyy-MM-dd. Date-only API strings are sliced, not parsed. */
export function toIstYmd(dateVal) {
  if (!dateVal) return "";
  if (typeof dateVal === "string" && /^\d{4}-\d{2}-\d{2}/.test(dateVal)) {
    return dateVal.slice(0, 10);
  }
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if (Number.isNaN(d.getTime())) return "";
  return ymdParts(d, IST);
}

export function istTodayYmd() {
  return ymdParts(new Date(), IST);
}

export function formatIstDate(dateVal, options = {}) {
  const ymd = toIstYmd(dateVal);
  if (!ymd) return "";
  const [year, month, day] = ymd.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-IN", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  });
}

export function formatIstDateShort(dateVal) {
  return formatIstDate(dateVal, { day: "numeric", month: "short", year: "numeric" });
}
