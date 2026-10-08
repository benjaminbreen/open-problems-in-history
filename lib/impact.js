// Combine approved impact ratings into one score per problem.
// Each rater's scores are standardised against that rater's own mean and spread, so harsh and
// generous raters count equally. Historians and AI models are averaged separately, then combined
// with historians weighted 2:1. Several runs of the same model ("Claude Opus 5.5 (run 2)") count
// as one rater: they are averaged first, so a model cannot outweigh others by being run more often.
// Each panel's average is shrunk toward zero (the middle) by one phantom neutral rating, so a
// problem rated by a single enthusiast cannot outrank one rated well by many.
// A problem with no ratings gets no score.
const HUMAN_WEIGHT = 2 / 3;

function standardise(scores) {
  const v = Object.values(scores);
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length) || 1;
  return Object.fromEntries(Object.entries(scores).map(([id, s]) => [id, (s - mean) / sd]));
}

export function impact(ratings) {
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const groups = { human: {}, ai: {} };
  const models = {};
  for (const r of ratings) {
    const z = standardise(r.scores);
    if (!r.agent) { for (const [id, v] of Object.entries(z)) (groups.human[id] ??= []).push(v); continue; }
    const m = (models[r.agent.replace(/\s*\(run \d+\)\s*$/i, "").trim()] ??= {});
    for (const [id, v] of Object.entries(z)) (m[id] ??= []).push(v);
  }
  for (const m of Object.values(models)) for (const [id, v] of Object.entries(m)) (groups.ai[id] ??= []).push(mean(v));
  const shrunk = (a) => a.reduce((x, y) => x + y, 0) / (a.length + 1);
  const out = {};
  for (const id of new Set([...Object.keys(groups.human), ...Object.keys(groups.ai)])) {
    const h = groups.human[id], a = groups.ai[id];
    const score = h && a ? HUMAN_WEIGHT * shrunk(h) + (1 - HUMAN_WEIGHT) * shrunk(a) : shrunk(h || a);
    out[id] = { score: Math.round(score * 1000) / 1000, historians: h?.length || 0, models: a?.length || 0 };
  }
  return out;
}
