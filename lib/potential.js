// Each ballot has equal weight for each question it scored.
export const originalRoundId = "2026-11-19";
export const expandedRoundId = "2026-11-20";
export const currentRoundId = "2026-11-20-r2";
export const originalPacketPath = `/rating-passes/${originalRoundId}/packet.md`;
export const expandedPacketPath = `/rating-passes/${expandedRoundId}/research-potential.md`;
export const currentPacketPath = `/rating-passes/${expandedRoundId}/research-potential-r2.md`;
export const editions = {
  [originalRoundId]: { label: "November 19 · Original ballot", path: originalPacketPath },
  [expandedRoundId]: { label: "November 20 · First expanded ballot", path: expandedPacketPath },
  [currentRoundId]: { label: "November 20 · Revised ballot", path: currentPacketPath },
};

export const criteria = [
  { key: "chance_pct", label: "Chance of an answer", min: 0, max: 100, range: "0–100%" },
  { key: "historical_contribution", label: "Historical contribution", min: 1, max: 10, range: "1–10" },
  { key: "further_research", label: "Further research", min: 1, max: 10, range: "1–10" },
];

export function validJudgment(row) {
  return criteria.every(({ key, min, max }) => Number.isInteger(row?.[key]) && row[key] >= min && row[key] <= max);
}

export function rankBallots(ballots) {
  const results = Object.create(null);
  for (const ballot of ballots) {
    for (const [id, row] of Object.entries(ballot)) {
      const sum = results[id] ??= { count: 0, historical: 0, further: 0 };
      sum.count++;
      sum.historical += row.chance_pct * row.historical_contribution;
      sum.further += row.chance_pct * row.further_research;
    }
  }
  const rows = Object.values(results);
  for (const metric of ["historical", "further"]) {
    for (const row of rows) row[metric] /= 100 * row.count;
    rows.sort((a, b) => b[metric] - a[metric]);
    rows.forEach((row, i) => {
      const previous = rows[i - 1];
      row[metric + "_rank"] = previous?.[metric] === row[metric] ? previous[metric + "_rank"] : i + 1;
    });
  }
  return results;
}

export function humanPotential(approved, roundId = currentRoundId, unchangedIds = []) {
  const people = new Map();
  const eligible = new Set(unchangedIds);
  const ballots = approved.filter((r) => r.judgments && !r.agent && ((r.roundId ?? originalRoundId) === roundId ||
    (roundId === currentRoundId && r.roundId === expandedRoundId && eligible.size)))
    .sort((a, b) => a.t - b.t);
  for (const record of ballots) {
    const key = record.participant || record.rid;
    if (!people.has(key)) people.set(key, Object.create(null));
    const ballot = people.get(key);
    for (const [id, scores] of Object.entries(record.judgments)) {
      if (record.roundId !== expandedRoundId || roundId === expandedRoundId || eligible.has(id)) ballot[id] = scores;
    }
  }
  return rankBallots(people.values());
}

export function compareRank(ranks, metric, a, b) {
  const key = metric + "_rank";
  return (ranks?.[a.id]?.[key] ?? Infinity) - (ranks?.[b.id]?.[key] ?? Infinity) || a.id.localeCompare(b.id);
}
