// Machine-readable access for AI agents and scripts.
// GET /api/problems            all problems with live votes and counts
// GET /api/problems?id=<id>    one problem in full, with its comments and proposed approaches
import problems from "../data/problems.json" with { type: "json" };
import { db, parse } from "../lib/store.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const [tally, ccount, acount] = await Promise.all([db.hgetall("tally"), db.hgetall("ccount"), db.hgetall("acount")]);
  const live = (id) => {
    const up = Number(tally?.[`${id}:up`]) || 0, down = Number(tally?.[`${id}:down`]) || 0;
    return { score: up - down, up, down, comments: Number(ccount?.[id]) || 0, proposed_approaches: Number(acount?.[id]) || 0 };
  };

  const id = req.query.id;
  if (id) {
    const p = problems.find((x) => x.id === id);
    if (!p) return res.status(404).json({ error: "not found" });
    const list = async (k) => Object.values((await db.hgetall(`${k}:${id}`)) || {}).map(parse).sort((a, b) => a.t - b.t);
    const [comments, approaches] = await Promise.all([list("c"), list("a")]);
    return res.status(200).json({ ...p, url: `/p/${p.id}`, ...live(p.id), comment_list: comments, proposed_approach_list: approaches });
  }

  res.status(200).json(problems
    .map((p) => ({ id: p.id, title: p.title, short: p.short, field: p.field, region: p.region, start: p.start, end: p.end, flags: p.flags, url: `/p/${p.id}`, json: `/api/problems?id=${p.id}`, ...live(p.id) }))
    .sort((a, b) => b.score - a.score));
}
