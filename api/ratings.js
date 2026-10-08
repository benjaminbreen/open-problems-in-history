// Impact ratings: each rater scores problems 1–5 ("how much would a solution change historical understanding?").
// POST { name, affiliation, agent, scores: { <id>: 1-5 }, notes: { <id>: text }, website }   submit for review
// Admin only (x-admin-token header):
// GET                      { pending: [...], approved: [...] }
// PATCH { rid, action: "approve" | "reject" | "remove" }
import { db, parse, newId, limited, isAdmin, clean } from "../lib/store.js";
import { notify } from "../lib/notify.js";
import problems from "../data/problems.json" with { type: "json" };

const ids = new Set(problems.map((p) => p.id));

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "POST") {
    const { name, affiliation, agent, scores, notes, website } = req.body || {};
    if (website) return res.status(200).json({ ok: true, pending: true });
    const s = {};
    for (const [id, v] of Object.entries(scores || {})) if (ids.has(id) && [1, 2, 3, 4, 5].includes(v)) s[id] = v;
    if (Object.keys(s).length < 5) return res.status(400).json({ error: "please score at least five problems" });
    if (!clean(name, 80)) return res.status(400).json({ error: "name required" });
    if (await limited(req, "rate", 30, 3600)) return res.status(429).json({ error: "too many submissions" });
    const n = {};
    for (const [id, v] of Object.entries(notes || {})) if (ids.has(id) && clean(v, 1000)) n[id] = clean(v, 1000);
    const r = { rid: newId(), name: clean(name, 80), affiliation: clean(affiliation, 160), t: Date.now(), scores: s, notes: n };
    if (clean(agent, 80)) r.agent = clean(agent, 80);
    await db.hset("rpend", { [r.rid]: JSON.stringify(r) });
    await notify(`New impact rating from ${r.agent || r.name}`, `${Object.keys(s).length} problems scored${r.affiliation ? ` · ${r.affiliation}` : ""}`);
    return res.status(200).json({ ok: true, pending: true });
  }

  if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });

  if (req.method === "GET") {
    const list = async (k) => Object.values((await db.hgetall(k)) || {}).map(parse).sort((a, b) => b.t - a.t);
    const [pending, approved] = await Promise.all([list("rpend"), list("ratings")]);
    return res.status(200).json({ pending, approved });
  }

  if (req.method === "PATCH") {
    const { rid, action } = req.body || {};
    if (action === "remove") { await db.hdel("ratings", rid); return res.status(200).json({ ok: true }); }
    const raw = await db.hget("rpend", rid);
    if (!raw) return res.status(404).json({ error: "not found" });
    if (action === "approve") await db.hset("ratings", { [rid]: typeof raw === "string" ? raw : JSON.stringify(raw) });
    else if (action !== "reject") return res.status(400).json({ error: "bad action" });
    await db.hdel("rpend", rid);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
