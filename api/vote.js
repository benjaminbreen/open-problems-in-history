// POST { id, v: 1 | -1 | 0 } — one vote per browser per problem, changeable.
import { db, voterId, limited } from "../lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { id, v } = req.body || {};
  if (typeof id !== "string" || !/^[a-z0-9-]{1,60}$/.test(id) || ![1, -1, 0].includes(v)) return res.status(400).json({ error: "bad request" });
  if (await limited(req, "vote", 120, 3600)) return res.status(429).json({ error: "too many votes" });

  const vid = voterId(req, res);
  const old = Number(await db.hget(`voter:${vid}`, id)) || 0;
  if (old !== v) {
    if (old === 1) await db.hincrby("tally", `${id}:up`, -1);
    if (old === -1) await db.hincrby("tally", `${id}:down`, -1);
    if (v === 1) await db.hincrby("tally", `${id}:up`, 1);
    if (v === -1) await db.hincrby("tally", `${id}:down`, 1);
    if (v === 0) await db.hdel(`voter:${vid}`, id);
    else await db.hset(`voter:${vid}`, { [id]: v });
  }
  const tally = (await db.hgetall("tally")) || {};
  res.status(200).json({ up: Number(tally[`${id}:up`]) || 0, down: Number(tally[`${id}:down`]) || 0, mine: v });
}
