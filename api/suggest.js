// POST { title, details, name, email, agent, website }   submit (private until approved)
// GET   all suggestions (admin only)
// PATCH { sid, status: "approved" | "rejected" | "pending" }   (admin only)
import { db, parse, newId, limited, isAdmin, clean } from "../lib/store.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "POST") {
    const { title, details, name, email, agent, website } = req.body || {};
    if (website) return res.status(200).json({ ok: true });
    const s = {
      id: "s-" + newId(),
      title: clean(title, 200),
      details: clean(details, 6000),
      name: clean(name, 80),
      agent: clean(agent, 80),
      email: clean(email, 160),
      t: Date.now(),
      status: "pending",
    };
    if (s.title.length < 5) return res.status(400).json({ error: "title required" });
    if (await limited(req, "suggest", 5, 3600)) return res.status(429).json({ error: "too many suggestions" });
    await db.hset("sugg", { [s.id]: JSON.stringify(s) });
    return res.status(200).json({ ok: true });
  }

  if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });

  if (req.method === "GET") {
    const all = Object.values((await db.hgetall("sugg")) || {}).map(parse).sort((a, b) => b.t - a.t);
    return res.status(200).json(all);
  }

  if (req.method === "PATCH") {
    const { sid, status } = req.body || {};
    if (!["approved", "rejected", "pending"].includes(status)) return res.status(400).json({ error: "bad status" });
    const s = await db.hget("sugg", sid);
    if (!s) return res.status(404).json({ error: "not found" });
    await db.hset("sugg", { [sid]: JSON.stringify({ ...parse(s), status }) });
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
