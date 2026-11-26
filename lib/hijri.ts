// The Hijri year as the home page opener draws it.
//
// Month names, significant dates and their labels mirror the app
// (src/lib/prayer/hijriDate.ts in the main repo). Keep the two in step: a date
// that is marked here but not in the app, or the other way round, reads as a
// mistake to anyone who uses both.

export const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
] as const;

// Short enough to sit along the ring.
export const HIJRI_MONTHS_SHORT = [
  "Muharram",
  "Safar",
  "Rabi' I",
  "Rabi' II",
  "Jumada I",
  "Jumada II",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
] as const;

export const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
] as const;

// The ring is a schematic year: twelve months alternating 30 and 29 days. Real
// months vary by a day with the moon, so a date shown on the ring can sit one
// day from where the calendar finally puts it.
export const MONTH_LENGTHS = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29] as const;
export const YEAR_DAYS = 354;
export const MONTH_START: readonly number[] = MONTH_LENGTHS.map((_, i) =>
  MONTH_LENGTHS.slice(0, i).reduce<number>((sum, n) => sum + n, 0),
);

export type SignificanceKind = "shahadat" | "wiladat" | "eid";

export interface SignificantDay {
  month: number;
  day: number;
  kind: SignificanceKind;
  label: string;
}

export const SIGNIFICANT_DAYS: readonly SignificantDay[] = [
  { month: 1, day: 1, kind: "shahadat", label: "Islamic New Year" },
  { month: 1, day: 10, kind: "shahadat", label: "Ashura, the martyrdom of Imam Husayn (AS)" },
  { month: 2, day: 20, kind: "shahadat", label: "Arba'een" },
  { month: 2, day: 28, kind: "shahadat", label: "Martyrdom of Prophet Muhammad (PBUH)" },
  { month: 2, day: 29, kind: "shahadat", label: "Martyrdom of Imam Ali al-Hadi (AS)" },
  { month: 3, day: 8, kind: "shahadat", label: "Martyrdom of Imam Hasan al-Askari (AS)" },
  {
    month: 3,
    day: 17,
    kind: "wiladat",
    label: "Birth of Prophet Muhammad (PBUH) and Imam Ja'far al-Sadiq (AS)",
  },
  { month: 4, day: 10, kind: "wiladat", label: "Birth of Imam Hasan al-Askari (AS)" },
  { month: 6, day: 3, kind: "shahadat", label: "Martyrdom of Sayyida Fatima al-Zahra (AS)" },
  { month: 6, day: 13, kind: "shahadat", label: "Death of Umm al-Banin (AS)" },
  {
    month: 7,
    day: 1,
    kind: "wiladat",
    label: "First of Rajab, the birth of Imam Muhammad al-Baqir (AS)",
  },
  { month: 7, day: 3, kind: "shahadat", label: "Martyrdom of Imam Ali al-Hadi (AS)" },
  { month: 7, day: 13, kind: "wiladat", label: "Birth of Imam Ali ibn Abi Talib (AS)" },
  { month: 7, day: 27, kind: "wiladat", label: "Mab'ath, the start of the Prophet's mission" },
  { month: 8, day: 3, kind: "wiladat", label: "Birth of Imam Husayn ibn Ali (AS)" },
  { month: 8, day: 4, kind: "wiladat", label: "Birth of Abbas ibn Ali (AS)" },
  { month: 8, day: 5, kind: "wiladat", label: "Birth of Imam Zain al-Abidin (AS)" },
  { month: 8, day: 15, kind: "wiladat", label: "Birth of Imam al-Mahdi (AJ)" },
  { month: 9, day: 19, kind: "shahadat", label: "Imam Ali (AS) struck by the sword" },
  { month: 9, day: 21, kind: "shahadat", label: "Martyrdom of Imam Ali ibn Abi Talib (AS)" },
  { month: 10, day: 1, kind: "eid", label: "Eid al-Fitr" },
  { month: 10, day: 25, kind: "shahadat", label: "Martyrdom of Imam Ja'far al-Sadiq (AS)" },
  { month: 11, day: 11, kind: "wiladat", label: "Birth of Imam Ali al-Rida (AS)" },
  { month: 12, day: 10, kind: "eid", label: "Eid al-Adha" },
  { month: 12, day: 18, kind: "eid", label: "Eid al-Ghadir" },
];

/** Position of a Hijri day on the 354-day ring, 0 for 1 Muharram. */
export function ringIndex(month: number, day: number): number {
  return MONTH_START[month - 1] + Math.min(day, MONTH_LENGTHS[month - 1]) - 1;
}

/** The [month, day] at a ring position. */
export function fromRingIndex(index: number): [number, number] {
  let m = 0;
  while (m < 11 && index >= MONTH_START[m + 1]) m++;
  return [m + 1, index - MONTH_START[m] + 1];
}

export const SIGNIFICANT_BY_INDEX: ReadonlyMap<number, SignificantDay> = new Map(
  SIGNIFICANT_DAYS.map((d) => [ringIndex(d.month, d.day), d]),
);

export interface HijriDay {
  year: number;
  month: number;
  day: number;
}

/**
 * Today's Hijri date in a timezone, from the Umm al-Qura calendar: the same
 * source the app's web code reads, without the per-city moon-sighting offset
 * an admin can apply there.
 */
export function hijriDate(date: Date, timeZone: string): HijriDay {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      timeZone,
    }).formatToParts(date);
    const read = (type: string) =>
      parseInt(parts.find((p) => p.type === type)?.value ?? "", 10);
    const year = read("year");
    const month = read("month");
    const day = read("day");
    if (year > 1400 && month >= 1 && month <= 12 && day >= 1 && day <= 30) {
      return { year, month, day: Math.min(day, MONTH_LENGTHS[month - 1]) };
    }
  } catch {
    // A runtime without the Islamic calendar falls through to the anchor below.
  }
  // 26 November 2026 was 16 Jumada al-Thani 1448. Counting on from a known day
  // keeps the ring roughly right where Intl cannot say.
  const anchor = Date.UTC(2026, 10, 26);
  const days = Math.floor((date.getTime() - anchor) / 86_400_000);
  const position = ringIndex(6, 16) + days;
  const index = ((position % YEAR_DAYS) + YEAR_DAYS) % YEAR_DAYS;
  const [month, day] = fromRingIndex(index);
  return { year: 1448 + Math.floor(position / YEAR_DAYS), month, day };
}
