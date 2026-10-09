// POST { id, v: 1 | -1 | 0 } — one vote per browser per problem, changeable.
import { db, voterId, limited } from "../lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { id, v } = req.body || {};
  if (typeof id !== "string" || !/^[a-z0-9-]{1,60}$/.test(id) || ![1, -1, 0].includes(v)) return res.status(400).json({ error: "bad request" });
  if (await limited(req, "vote", 120, 3600)) return res.status(429).json({ error: "too many votes" });

  const vid = voterId(req, res);
  const old = Number(await db.hget(`voter:${vid}`, id)) || 0;
  const [up, down] = await Promise.all([
    db.hincrby("tally", `${id}:up`, (v === 1) - (old === 1)),
    db.hincrby("tally", `${id}:down`, (v === -1) - (old === -1)),
    old === v ? null : v === 0 ? db.hdel(`voter:${vid}`, id) : db.hset(`voter:${vid}`, { [id]: v }),
  ]);
  res.status(200).json({ up: Number(up) || 0, down: Number(down) || 0, mine: v });
}
