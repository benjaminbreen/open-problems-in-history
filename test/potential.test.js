import assert from "node:assert/strict";
import test from "node:test";
import { currentRoundId, expandedRoundId, originalRoundId, humanPotential, rankBallots, validJudgment } from "../lib/potential.js";

const judgment = (chance_pct, historical_contribution, further_research) => ({
  chance_pct, historical_contribution, further_research,
});

test("average each judge’s products, preserve zero and share ranks for ties", () => {
  const first = { a: judgment(100, 1, 9), b: judgment(50, 5, 4), c: judgment(0, 10, 2) };
  const second = { a: judgment(50, 8, 2) };
  const ranks = rankBallots([first, second]);
  assert.deepEqual(ranks.a, { count: 2, historical: 2.5, further: 5, historical_rank: 1, further_rank: 1 });
  assert.equal(ranks.b.historical_rank, 1);
  assert.equal(ranks.b.further_rank, 2);
  assert.equal(ranks.c.historical_rank, 3);
  assert.equal(ranks.c.historical, 0);
});

test("keep the latest approved answer from each participant for each question", () => {
  const approved = [
    { roundId: currentRoundId, participant: "one", t: 5, judgments: { a: judgment(20, 5, 10) } },
    { roundId: currentRoundId, participant: "two", t: 2, judgments: { a: judgment(80, 5, 10) } },
    { roundId: currentRoundId, participant: "one", t: 1, judgments: { a: judgment(0, 4, 3), b: judgment(30, 5, 5) } },
    { participant: "one", t: 8, judgments: { a: judgment(100, 10, 1) } },
    { roundId: originalRoundId, participant: "two", t: 7, judgments: { a: judgment(50, 10, 1) } },
    { scores: { a: 5 } },
    { roundId: currentRoundId, agent: "model", judgments: { c: judgment(100, 10, 10) } },
  ];
  const ranks = humanPotential(approved);
  assert.deepEqual(Object.keys(ranks).sort(), ["a", "b"]);
  assert.equal(ranks.a.count, 2);
  assert.equal(ranks.a.historical, 2.5);
  assert.equal(ranks.b.count, 1);
  assert.equal(humanPotential(approved, originalRoundId).a.historical, 7.5);
});

test("require three in-range integers", () => {
  assert(validJudgment(judgment(0, 1, 10)));
  assert(!validJudgment(judgment(50, 7)));
  assert(!validJudgment(judgment("50", 7, 8)));
  assert(!validJudgment(judgment(50.5, 7, 8)));
  assert(!validJudgment(judgment(50, 11, 8)));
});

test("revised ballot retains judgments on identical briefs and keeps the old cases separate", () => {
  const old = judgment(20, 3, 4), fresh = judgment(80, 8, 7);
  const approved = [
    { participant: "one", t: 1, roundId: expandedRoundId, judgments: { same: old, sloane: old, pawpaw: old } },
    { participant: "two", t: 2, roundId: expandedRoundId, judgments: { same: old, sloane: old } },
    { participant: "one", t: 3, roundId: currentRoundId, judgments: { same: fresh, sloane: fresh } },
  ];
  const current = humanPotential(approved, currentRoundId, ["same"]);
  assert.equal(current.same.count, 2);
  assert.equal(current.same.historical, 3.5);
  assert.equal(current.sloane.count, 1);
  assert.equal(current.sloane.historical, 6.4);
  assert.equal(current.pawpaw, undefined);
  assert.equal(humanPotential(approved, expandedRoundId).pawpaw.count, 1);
});
