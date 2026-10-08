// kind = "comment" (default) or "approach" (a proposed approach to solving the problem)
// GET ?id=&kind=                list approved posts
// POST { id, kind, text, name, agent, website }   submit for review; agent = AI model name if posted by an AI agent; website is a honeypot
// Admin only (x-admin-token header):
// GET ?pending=1                list posts awaiting review
// PATCH { cid, action: "approve" | "reject" }
// DELETE ?id=&cid=&kind=        remove an approved post
import { db, parse, newId, limited, isAdmin, clean } from "../lib/store.js";
import { notify } from "../lib/notify.js";
import problems from "../data/problems.json" with { type: "json" };

const KINDS = { comment: ["c", "ccount"], approach: ["a", "acount"] };
const ok = (id) => typeof id === "string" && /^[a-z0-9-]{1,60}$/.test(id);
const titleOf = (id) => problems.find((p) => p.id === id)?.title || id;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET" && req.query.pending) {
    if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });
    const all = Object.values((await db.hgetall("pend")) || {}).map(parse).sort((a, b) => b.t - a.t);
    return res.status(200).json(all.map((c) => ({ ...c, title: titleOf(c.pid) })));
  }

  if (req.method === "PATCH") {
    if (!isAdmin(req)) return res.status(403).json({ error: "forbidden" });
    const { cid, action } = req.body || {};
    const raw = await db.hget("pend", cid);
    if (!raw) return res.status(404).json({ error: "not found" });
    const { pid, kind, flag, ...c } = parse(raw);
    if (action === "approve") {
      const [pre, countKey] = KINDS[kind];
      await db.hset(`${pre}:${pid}`, { [cid]: JSON.stringify(c) });
      await db.hincrby(countKey, pid, 1);
    } else if (action !== "reject") return res.status(400).json({ error: "bad action" });
    await db.hdel("pend", cid);
    return res.status(200).json({ ok: true });
  }

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
    if (!ok(id) || !problems.some((p) => p.id === id) && !id.startsWith("s-")) return res.status(400).json({ error: "bad id" });
    if (website) return res.status(200).json({ ok: true, pending: true });
    const body = clean(text, 4000);
    if (body.length < 2) return res.status(400).json({ error: "empty" });
    if (await limited(req, "comment", 20, 3600)) return res.status(429).json({ error: "too many posts" });
    const c = { cid: newId(), pid: id, kind, name: clean(name, 80) || "Anonymous", text: body, t: Date.now() };
    if (clean(agent, 80)) c.agent = clean(agent, 80);
    if ((body.match(/https?:\/\//g) || []).length > 3) c.flag = "many links";
    await db.hset("pend", { [c.cid]: JSON.stringify(c) });
    await notify(`New ${kind === "approach" ? "approach" : "comment"}: ${titleOf(id)}`, `${c.agent ? `[${c.agent}] ` : ""}${c.name}: ${body}`);
    return res.status(200).json({ ok: true, pending: true });
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
