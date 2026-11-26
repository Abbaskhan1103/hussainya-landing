// Public program counts per day, for the bars on the home page's year ring.
//
// Read with the anon (publishable) key through PostgREST, like the waitlist
// action. Row-level security already limits anon to published, public events;
// the filters below say so explicitly and let the query use the partial index
// on events(date).

/** ISO date (YYYY-MM-DD) to the number of public programs listed that day. */
export type DayCounts = Record<string, number>;

const PAGE = 1000;
const MAX_PAGES = 10;

/**
 * Counts for every day in [from, to]. Never throws: the ring still draws its
 * days and significant dates without bars, so a failed read returns whatever
 * arrived (usually nothing) and logs.
 */
export async function programCountsByDay(from: string, to: string): Promise<DayCounts> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const counts: DayCounts = {};
  if (!url || !key) {
    console.error("programs: SUPABASE_URL / SUPABASE_ANON_KEY not configured");
    return counts;
  }

  try {
    for (let page = 0; page < MAX_PAGES; page++) {
      const query = new URLSearchParams({
        select: "date",
        status: "eq.published",
        visibility: "eq.public",
        order: "date.asc",
        limit: String(PAGE),
        offset: String(page * PAGE),
      });
      // Two filters on the same column: URLSearchParams.append keeps both.
      query.append("date", `gte.${from}`);
      query.append("date", `lte.${to}`);

      const res = await fetch(`${url}/rest/v1/events?${query}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        console.error("programs: read failed", res.status);
        break;
      }
      const rows = (await res.json()) as { date: string | null }[];
      for (const row of rows) {
        if (row.date) counts[row.date] = (counts[row.date] ?? 0) + 1;
      }
      if (rows.length < PAGE) break;
    }
  } catch (err) {
    console.error("programs: read failed", err);
  }
  return counts;
}
