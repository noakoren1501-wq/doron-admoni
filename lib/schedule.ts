import { THEATRE_FALLBACK_URL, type Performance, type Show } from "@/data/shows";

const TIME_ZONE = "Asia/Jerusalem";

const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const HEBREW_DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export type ResolvedPerformance = {
  id: string;
  /** "09.10" */
  dateLabel: string;
  /** "יום שישי" */
  dayLabel: string;
  time: string;
  venue: string;
  city: string;
  href: string;
};

export type MonthGroup = {
  key: string;
  month: string;
  year: number;
  performances: ResolvedPerformance[];
};

export type ResolvedShow = {
  slug: string;
  title: string;
  tagline: string;
  synopsis: string[];
  synopsisSource: string;
  officialUrl: string;
  upcomingCount: number;
  months: MonthGroup[];
};

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

/** Offset (in minutes) of Israel time from UTC at a given instant. */
function israelOffsetMinutes(at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** Exact start instant of a performance (date + time are Israel local time). */
export function performanceStart({ date, time }: Pick<Performance, "date" | "time">) {
  const { year, month, day } = parseDate(date);
  const [hour, minute] = time.split(":").map(Number);
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute);
  const offset = israelOffsetMinutes(new Date(naiveUtc));
  return naiveUtc - offset * 60000;
}

export function isUpcoming(performance: Performance, now: Date = new Date()) {
  return performanceStart(performance) > now.getTime();
}

function resolveTicketUrl(performance: Performance, show: Show) {
  return performance.ticketUrl || show.officialUrl || THEATRE_FALLBACK_URL;
}

function resolvePerformance(performance: Performance, show: Show): ResolvedPerformance {
  const { year, month, day } = parseDate(performance.date);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    id: `${show.slug}-${performance.date}-${performance.time}`,
    dateLabel: `${pad(day)}.${pad(month)}`,
    dayLabel: `יום ${HEBREW_DAYS[weekday]}`,
    time: performance.time,
    venue: performance.venue,
    city: performance.city,
    href: resolveTicketUrl(performance, show),
  };
}

/**
 * Groups a show's upcoming performances by month.
 * Months are sorted chronologically and so are the performances inside each month.
 */
export function groupByMonth(show: Show, now: Date = new Date()): MonthGroup[] {
  const upcoming = show.dates
    .filter((p) => isUpcoming(p, now))
    .sort((a, b) => performanceStart(a) - performanceStart(b));

  const groups = new Map<string, MonthGroup>();

  for (const performance of upcoming) {
    const key = performance.date.slice(0, 7);
    const { year, month } = parseDate(performance.date);

    let group = groups.get(key);
    if (!group) {
      group = { key, month: HEBREW_MONTHS[month - 1], year, performances: [] };
      groups.set(key, group);
    }
    group.performances.push(resolvePerformance(performance, show));
  }

  return [...groups.values()].sort((a, b) => a.key.localeCompare(b.key));
}

export function resolveShows(shows: Show[], now: Date = new Date()): ResolvedShow[] {
  return shows.map((show) => {
    const months = groupByMonth(show, now);
    return {
      slug: show.slug,
      title: show.title,
      tagline: show.tagline,
      synopsis: show.synopsis,
      synopsisSource: show.synopsisSource,
      officialUrl: show.officialUrl,
      upcomingCount: months.reduce((sum, m) => sum + m.performances.length, 0),
      months,
    };
  });
}
