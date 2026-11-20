// GET: vote tallies, comment counts, approved suggestions, impact scores.
// The same for every visitor, so Vercel's edge caches it; this visitor's own votes come from /api/mine.
import { db, parse } from "../lib/store.js";
import { impact, panel } from "../lib/impact.js";

import round from "../data/research-potential.json" with { type: "json" };
import { humanPotential } from "../lib/potential.js";

export default async function handler(req, res) {
  const [tally, counts, sugg, ratings] = await Promise.all([
    db.hgetall("tally"), db.hgetall("ccount"), db.hgetall("sugg"), db.hgetall("ratings"),
  ]);
  const suggestions = Object.values(sugg || {}).map(parse)
    .filter((s) => s.status === "approved")
    .map(({ email, status, ...s }) => s);
  const rs = Object.values(ratings || {}).map(parse);
  const legacy = rs.filter((r) => r.scores);
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate, s-maxage=15");
  res.status(200).json({ tally: tally || {}, counts: counts || {}, suggestions, human: humanPotential(rs, round.currentRoundId, round.unchangedIds), impact: impact(legacy), panel: panel(legacy) });
}
