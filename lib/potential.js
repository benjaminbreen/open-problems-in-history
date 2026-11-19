// Each ballot has equal weight for each question it scored.
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

export function humanPotential(approved) {
  const people = new Map();
  const ballots = approved.filter((r) => r.judgments && !r.agent).sort((a, b) => a.t - b.t);
  for (const record of ballots) {
    const key = record.participant || record.rid;
    if (!people.has(key)) people.set(key, Object.create(null));
    Object.assign(people.get(key), record.judgments);
  }
  return rankBallots(people.values());
}

export function compareRank(ranks, metric, a, b) {
  const key = metric + "_rank";
  return (ranks?.[a.id]?.[key] ?? Infinity) - (ranks?.[b.id]?.[key] ?? Infinity) || a.id.localeCompare(b.id);
}
