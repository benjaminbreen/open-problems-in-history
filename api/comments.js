// GET ?id=   list comments for a problem
// POST { id, name, text, website }   add (website is a honeypot)
// DELETE ?id=&cid=   remove (admin only)
import { db, parse, newId, limited, isAdmin, clean } from "../lib/store.js";

const ok = (id) => typeof id === "string" && /^[a-z0-9-]{1,60}$/.test(id);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const id = req.query.id;
    if (!ok(id)) return res.status(400).json({ error: "bad id" });
    const all = Object.values((await db.hgetall(`c:${id}`)) || {}).map(parse).sort((a, b) => a.t - b.t);
    return res.status(200).json(all);
  }

  if (req.method === "POST") {
    const { id, name, text, website } = req.body || {};
    if (!ok(id)) return res.status(400).json({ error: "bad id" });
    if (website) return res.status(200).json({ ok: true });
    const body = clean(text, 4000);
    if (body.length < 2) return res.status(400).json({ error: "empty" });
    if (await limited(req, "comment", 10, 3600)) return res.status(429).json({ error: "too many comments" });
    const c = { cid: newId(), name: clean(name, 80) || "Anonymous", text: body, t: Date.now() };
    await db.hset(`c:${id}`, { [c.cid]: JSON.stringify(c) });
    await db.hincrby("ccount", id, 1);
    return res.status(200).json(c);
  }

  if (req.method === "DELETE") {
    if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });
    const { id, cid } = req.query;
    if (!ok(id) || !cid) return res.status(400).json({ error: "bad request" });
    if (await db.hget(`c:${id}`, cid)) {
      await db.hdel(`c:${id}`, cid);
      await db.hincrby("ccount", id, -1);
    }
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
