// GET: vote tallies, comment counts, this visitor's votes, approved suggestions, impact scores.
import { db, parse, voterId } from "../lib/store.js";
import { impact, panel } from "../lib/impact.js";

export default async function handler(req, res) {
  const vid = voterId(req, res);
  const [tally, counts, mine, sugg, ratings] = await Promise.all([
    db.hgetall("tally"), db.hgetall("ccount"), db.hgetall(`voter:${vid}`), db.hgetall("sugg"), db.hgetall("ratings"),
  ]);
  const suggestions = Object.values(sugg || {}).map(parse)
    .filter((s) => s.status === "approved")
    .map(({ email, status, ...s }) => s);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ tally: tally || {}, counts: counts || {}, mine: mine || {}, suggestions, ...(() => { const rs = Object.values(ratings || {}).map(parse); return { impact: impact(rs), panel: panel(rs) }; })() });
}
