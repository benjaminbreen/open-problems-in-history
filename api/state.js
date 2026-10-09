// GET: vote tallies, comment counts, approved suggestions, impact scores.
// The same for every visitor, so Vercel's edge caches it; this visitor's own votes come from /api/mine.
import { db, parse } from "../lib/store.js";
import { impact, panel } from "../lib/impact.js";

export default async function handler(req, res) {
  const [tally, counts, sugg, ratings] = await Promise.all([
    db.hgetall("tally"), db.hgetall("ccount"), db.hgetall("sugg"), db.hgetall("ratings"),
  ]);
  const suggestions = Object.values(sugg || {}).map(parse)
    .filter((s) => s.status === "approved")
    .map(({ email, status, ...s }) => s);
  const rs = Object.values(ratings || {}).map(parse);
  res.setHeader("Cache-Control", "public, s-maxage=15, stale-while-revalidate=300");
  res.status(200).json({ tally: tally || {}, counts: counts || {}, suggestions, impact: impact(rs), panel: panel(rs) });
}
