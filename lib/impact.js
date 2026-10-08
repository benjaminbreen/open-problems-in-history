// Combine approved impact ratings into one score per problem.
// Each rater's scores are standardised against that rater's own mean and spread, so harsh and
// generous raters count equally. Historians and AI models are averaged separately, then combined
// with historians weighted 2:1. A problem with no ratings gets no score.
const HUMAN_WEIGHT = 2 / 3;

function standardise(scores) {
  const v = Object.values(scores);
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length) || 1;
  return Object.fromEntries(Object.entries(scores).map(([id, s]) => [id, (s - mean) / sd]));
}

export function impact(ratings) {
  const groups = { human: {}, ai: {} };
  for (const r of ratings) {
    const g = r.agent ? groups.ai : groups.human;
    for (const [id, z] of Object.entries(standardise(r.scores))) (g[id] ??= []).push(z);
  }
  const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
  const out = {};
  for (const id of new Set([...Object.keys(groups.human), ...Object.keys(groups.ai)])) {
    const h = groups.human[id], a = groups.ai[id];
    const score = h && a ? HUMAN_WEIGHT * mean(h) + (1 - HUMAN_WEIGHT) * mean(a) : mean(h || a);
    out[id] = { score: Math.round(score * 1000) / 1000, historians: h?.length || 0, models: a?.length || 0 };
  }
  return out;
}
