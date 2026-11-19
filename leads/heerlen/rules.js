// Figure 4, board 6. The numbering is shared with the deposited move transcripts.
export const sites = [
  [28, 224, 'A1'],
  [180, 224, 'B1'],
  [332, 224, 'C1'],
  [28, 149, 'A2'],
  [332, 149, 'C2'],
  [332, 95, 'C3'],
  [332, 20, 'C4'],
  [28, 95, 'A3'],
  [28, 20, 'A4'],
  [180, 20, 'B4'],
];
export const edges = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [5, 6],
  [7, 8],
  [8, 9],
  [9, 6],
  [3, 7],
  [5, 4],
  [9, 1],
  [3, 1],
  [1, 4],
  [5, 9],
  [9, 7],
];
export const diagonals = [11, 12, 13, 14];
export const corner = [1, 3, 12];
const lines = [
  [0, 1, 2],
  [8, 9, 6],
  [0, 3, 7],
  [3, 7, 8],
  [2, 4, 5],
  [4, 5, 6],
];
const adjacent = sites.map((_, i) => edges.filter((e) => e.includes(i)).map(([a, b]) => (a === i ? b : a)));
const edgeIds = sites.map(() => []);
edges.forEach(([a, b], i) => {
  edgeIds[a][b] = i;
  edgeIds[b][a] = i;
});
export const games = {
  line: {
    title: 'Three in a row',
    sides: ['Red', 'Black'],
    intro:
      'Take turns placing three counters each. Then slide one counter along a line to an empty point. Three consecutive counters in a straight line win, even during placement.',
  },
  dogs: {
    title: 'Four dogs, two hares',
    sides: ['Dogs', 'Hares'],
    intro:
      'The four dogs move first. Slide one piece to a connected empty point. The dogs win when neither hare can move. The hares win if they can still move after 240 turns.',
  },
  hares: {
    title: 'Two hares, three dogs',
    sides: ['Hares', 'Dogs'],
    intro:
      'The two hares move first and try to stay mobile for 240 turns. The three dogs win by leaving both hares with no legal step. Pieces slide along a line and stay on the board.',
  },
};
export function newGame(kind) {
  const cells = Array(10).fill(0);
  const start =
    kind === 'dogs'
      ? [
          [0, 3, 7, 8],
          [4, 5],
        ]
      : kind === 'hares'
        ? [
            [0, 2],
            [8, 9, 6],
          ]
        : [[], []];
  start.forEach((positions, i) =>
    positions.forEach((site) => {
      cells[site] = i + 1;
    }),
  );
  return {
    kind,
    cells,
    turn: 1,
    ply: 0,
    winner: null,
    winLine: [],
    counts: Array(15).fill(0),
    last: null,
    skipped: 0,
  };
}
export function isPlacing(s) {
  return s.kind === 'line' && s.ply < 6;
}
function steps(cells, side) {
  const moves = [];
  cells.forEach((piece, i) => {
    if (piece === side) for (const j of adjacent[i]) if (!cells[j]) moves.push([i, j]);
  });
  return moves;
}
export function legalMoves(s) {
  if (s.winner !== null) return [];
  if (isPlacing(s)) return s.cells.flatMap((p, i) => (p ? [] : [[-1, i]]));
  return steps(s.cells, s.turn);
}
export function edgeIndex(a, b) {
  return edgeIds[a]?.[b];
}
export function advance(s, [from, to]) {
  const next = {
    ...s,
    cells: [...s.cells],
    counts: [...s.counts],
    ply: s.ply + 1,
    turn: 3 - s.turn,
    last: [from, to],
    skipped: 0,
  };
  if (from >= 0) {
    next.cells[from] = 0;
    next.counts[edgeIndex(from, to)]++;
  }
  next.cells[to] = s.turn;
  if (s.kind === 'line') {
    next.winLine = lines.find((line) => line.every((i) => next.cells[i] === s.turn)) || [];
    if (next.winLine.length) next.winner = s.turn;
    else if (next.ply >= 250) next.winner = 0;
  } else {
    const hare = s.kind === 'dogs' ? 2 : 1;
    if (!steps(next.cells, hare).length) next.winner = 3 - hare;
    else if (next.ply >= 240) next.winner = hare;
  }
  if (next.winner === null && !legalMoves(next).length) {
    next.skipped = next.turn;
    next.turn = s.turn;
    next.ply++;
    if (s.kind === 'line' && (next.ply >= 250 || !legalMoves(next).length)) next.winner = 0;
    if (s.kind !== 'line' && next.ply >= 240) next.winner = s.kind === 'dogs' ? 2 : 1;
  }
  return next;
}
function value(s, side) {
  if (s.kind === 'line') {
    let score = 0;
    for (const line of lines) {
      const mine = line.filter((i) => s.cells[i] === side).length;
      const theirs = line.filter((i) => s.cells[i] === 3 - side).length;
      if (!theirs) score += mine * mine;
      if (!mine) score -= theirs * theirs;
    }
    return score + 0.25 * (steps(s.cells, side).length - steps(s.cells, 3 - side).length);
  }
  const hare = s.kind === 'dogs' ? 2 : 1;
  const safe = steps(s.cells, hare);
  const escapes = new Set(safe.map((move) => move[1])).size;
  const trapped = s.cells.filter((p, i) => p === hare && adjacent[i].every((j) => s.cells[j])).length;
  return (side === hare ? 1 : -1) * (safe.length * 2 + escapes - trapped * 3);
}
function search(s, side, depth, alpha, beta) {
  if (s.winner !== null) return s.winner === 0 ? 0 : (s.winner === side ? 1 : -1) * (1000 + depth);
  if (depth === 0) return value(s, side);
  const maximizing = s.turn === side;
  let best = maximizing ? -Infinity : Infinity;
  for (const move of legalMoves(s)) {
    const score = search(advance(s, move), side, depth - 1, alpha, beta);
    if (maximizing) {
      best = Math.max(best, score);
      alpha = Math.max(alpha, best);
    } else {
      best = Math.min(best, score);
      beta = Math.min(beta, best);
    }
    if (alpha >= beta) break;
  }
  return best;
}
export function computerMove(s) {
  let best = -Infinity,
    choices = [];
  for (const move of legalMoves(s)) {
    const score = search(advance(s, move), s.turn, 3, -Infinity, Infinity);
    if (score > best) {
      best = score;
      choices = [move];
    } else if (score === best) choices.push(move);
  }
  return choices[Math.floor(Math.random() * choices.length)];
}
