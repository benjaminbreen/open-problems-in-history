// POST accepts human judgments for this round or 1–5 scores for legacy clients.
// GET ?thanks=1             public: [{ name, affiliation }] of approved human raters who opted in, by surname
// Admin only (x-admin-token header):
// GET                      { pending: [...], approved: [...] }
// PATCH { rid, action: "approve" | "reject" | "remove" }
import { db, parse, newId, limited, isAdmin, clean, voterId } from "../lib/store.js";
import { notify } from "../lib/notify.js";
import problems from "../data/problems.json" with { type: "json" };

import { createHash } from "node:crypto";
import { criteria, validJudgment, originalRoundId, expandedRoundId, revisedRoundId, currentRoundId } from "../lib/potential.js";
import round from "../data/research-potential.json" with { type: "json" };

const questionsFor = new Map([
  [originalRoundId, round.originalQuestions],
  [expandedRoundId, round.expandedQuestions],
  [revisedRoundId, round.revisedQuestions],
  [currentRoundId, round.questions],
].map(([id, questions]) => [id, new Set(questions.map(q => q.id))]));
const ids = new Set(problems.map((p) => p.id));

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "POST") {
    const { name, affiliation, agent, credit, scores, judgments, notes, website, roundId = originalRoundId } = req.body || {};
    if (website) return res.status(200).json({ ok: true, pending: true });
    const entries = Object.entries(judgments ?? scores ?? {});
    const s = {};
    if (judgments !== undefined) {
      if (!questionsFor.has(roundId)) {
        return res.status(400).json({ error: "Unknown rating round. Reload the ballot and try again." });
      }
      if (!judgments || typeof judgments !== "object" || Array.isArray(judgments) || agent || !entries.length || entries.some(([id, row]) => !questionsFor.get(roundId).has(id) || !validJudgment(row))) {
        return res.status(400).json({ error: "Please give all three whole-number scores for each human judgment." });
      }
      for (const [id, row] of entries) s[id] = Object.fromEntries(criteria.map(({ key }) => [key, row[key]]));
    } else {
      for (const [id, v] of entries) if (ids.has(id) && [1, 2, 3, 4, 5].includes(v)) s[id] = v;
      if (Object.keys(s).length < 5) return res.status(400).json({ error: "please score at least five problems" });
    }
    if (!clean(name, 80)) return res.status(400).json({ error: "name required" });
    if (await limited(req, "rate", 30, 3600)) return res.status(429).json({ error: "too many submissions" });
    const n = {};
    for (const [id, v] of Object.entries(notes || {})) if ((judgments ? questionsFor.get(roundId) : ids).has(id) && clean(v, 1000)) n[id] = clean(v, 1000);
    const r = { rid: newId(), name: clean(name, 80), affiliation: clean(affiliation, 160), t: Date.now(), notes: n };
    if (judgments !== undefined) {
      r.judgments = s;
      r.roundId = roundId;
      r.participant = createHash("sha256").update(voterId(req, res) + "/" + r.name.toLowerCase()).digest("hex");
    } else r.scores = s;
    if (clean(agent, 80)) r.agent = clean(agent, 80);
    else if (credit) r.credit = true;
    await db.hset("rpend", { [r.rid]: JSON.stringify(r) });
    await notify(`New problem ratings from ${r.agent || r.name}`, `${Object.keys(s).length} problems scored${r.affiliation ? ` · ${r.affiliation}` : ""}`);
    return res.status(200).json({ ok: true, pending: true });
  }

  if (req.method === "GET" && req.query.thanks) {
    const seen = new Map();
    for (const r of Object.values((await db.hgetall("ratings")) || {}).map(parse)) {
      if (r.credit && !r.agent && !seen.has(r.name.toLowerCase())) seen.set(r.name.toLowerCase(), { name: r.name, affiliation: r.affiliation || "" });
    }
    const key = (n) => n.name.trim().split(/\s+/).pop().toLowerCase();
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    return res.status(200).json([...seen.values()].sort((a, b) => key(a).localeCompare(key(b)) || a.name.localeCompare(b.name)));
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
