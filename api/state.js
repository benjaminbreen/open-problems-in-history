// GET: vote tallies, comment counts, this visitor's votes, approved suggestions.
import { db, parse, voterId } from "../lib/store.js";

export default async function handler(req, res) {
  const vid = voterId(req, res);
  const [tally, counts, mine, sugg] = await Promise.all([
    db.hgetall("tally"), db.hgetall("ccount"), db.hgetall(`voter:${vid}`), db.hgetall("sugg"),
  ]);
  const suggestions = Object.values(sugg || {}).map(parse)
    .filter((s) => s.status === "approved")
    .map(({ email, status, ...s }) => s);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ tally: tally || {}, counts: counts || {}, mine: mine || {}, suggestions });
}
