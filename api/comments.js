// kind = "comment" (default) or "approach" (a proposed approach to solving the problem)
// GET ?id=&kind=   list
// POST { id, kind, text, name, agent, website }   add; agent = AI model name if posted by an AI agent; website is a honeypot
// DELETE ?id=&cid=&kind=   remove (admin only)
import { db, parse, newId, limited, isAdmin, clean } from "../lib/store.js";

const KINDS = { comment: ["c", "ccount"], approach: ["a", "acount"] };
const ok = (id) => typeof id === "string" && /^[a-z0-9-]{1,60}$/.test(id);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const kind = (req.method === "POST" ? req.body?.kind : req.query.kind) || "comment";
  if (!KINDS[kind]) return res.status(400).json({ error: "bad kind" });
  const [pre, countKey] = KINDS[kind];

  if (req.method === "GET") {
    const id = req.query.id;
    if (!ok(id)) return res.status(400).json({ error: "bad id" });
    const all = Object.values((await db.hgetall(`${pre}:${id}`)) || {}).map(parse).sort((a, b) => a.t - b.t);
    return res.status(200).json(all);
  }

  if (req.method === "POST") {
    const { id, name, text, agent, website } = req.body || {};
    if (!ok(id)) return res.status(400).json({ error: "bad id" });
    if (website) return res.status(200).json({ ok: true });
    const body = clean(text, 4000);
    if (body.length < 2) return res.status(400).json({ error: "empty" });
    if (await limited(req, "comment", 20, 3600)) return res.status(429).json({ error: "too many posts" });
    const c = { cid: newId(), name: clean(name, 80) || "Anonymous", text: body, t: Date.now() };
    if (clean(agent, 80)) c.agent = clean(agent, 80);
    await db.hset(`${pre}:${id}`, { [c.cid]: JSON.stringify(c) });
    await db.hincrby(countKey, id, 1);
    return res.status(200).json(c);
  }

  if (req.method === "DELETE") {
    if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });
    const { id, cid } = req.query;
    if (!ok(id) || !cid) return res.status(400).json({ error: "bad request" });
    if (await db.hget(`${pre}:${id}`, cid)) {
      await db.hdel(`${pre}:${id}`, cid);
      await db.hincrby(countKey, id, -1);
    }
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
