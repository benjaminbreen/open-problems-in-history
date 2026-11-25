// Board 6 (NEJD, 10 intersections, 15 incised paths) — Four playable reconstructions.
export const SITES = [
  [28, 224, 'bottom left'],
  [180, 224, 'bottom hub'],
  [332, 224, 'bottom right'],
  [28, 149, 'lower left'],
  [332, 149, 'lower right'],
  [332, 95, 'upper right'],
  [332, 20, 'top right'],
  [28, 95, 'upper left'],
  [28, 20, 'top left'],
  [180, 20, 'top hub'],
];

// Coordinates on heerlen-stone.webp (692 x 474)
export const STONE_POINTS = [
  [132, 382],
  [350, 379],
  [585, 372],
  [130, 294],
  [585, 297],
  [586, 177],
  [585, 114],
  [130, 204],
  [130, 127],
  [353, 120],
];

export const EDGES = [
  [0, 1], // 0: bottom-left
  [1, 2], // 1: bottom-right
  [0, 3], // 2: lower-left side
  [2, 4], // 3: lower-right side
  [5, 6], // 4: upper-right side
  [7, 8], // 5: upper-left side
  [8, 9], // 6: top-left
  [9, 6], // 7: top-right
  [3, 7], // 8: mid-left side
  [5, 4], // 9: mid-right side
  [9, 1], // 10: vertical centre line
  [3, 1], // 11: bottom-left diagonal
  [1, 4], // 12: bottom-right diagonal (worn)
  [5, 9], // 13: top-right diagonal
  [9, 7], // 14: top-left diagonal
];

export const DIAGONALS = [11, 12, 13, 14];
export const WORN_DIAGONAL = 12;
export const CORNER_TRIANGLE = [1, 3, 12];
export const BOTTOM_TRIANGLES = [0, 1, 2, 3, 11, 12];
export const CENTRE_EDGE = 10;

// Row tiers from bottom (0) to top (3) for top-to-bottom no-retreat hunt
export const Y_TIER = [0, 0, 0, 1, 1, 2, 3, 2, 3, 3];

export const WIN_LINES = [
  [0, 1, 2],
  [8, 9, 6],
  [0, 3, 7],
  [3, 7, 8],
  [2, 4, 5],
  [4, 5, 6],
];

export const ADJ = SITES.map((_, i) =>
  EDGES.filter((e) => e.includes(i)).map(([a, b]) => (a === i ? b : a)),
);

const EDGE_MAP = SITES.map(() => ({}));
EDGES.forEach(([a, b], i) => {
  EDGE_MAP[a][b] = i;
  EDGE_MAP[b][a] = i;
});

export function edgeIndex(a, b) {
  return EDGE_MAP[a]?.[b] ?? -1;
}

export const GAMES = {
  hunt31: {
    id: 'hunt31',
    short: '3 Hounds vs. 1 Hare',
    title: 'Three hounds against one hare (no retreat)',
    tag: 'Strongest hunt reconstruction',
    sides: ['Hounds', 'Hare'],
    summary:
      'Three blue hounds start along the top edge and march downward—they can move sideways or down, never backward. The ivory hare can move along any line. The hounds win by cornering the hare; the hare wins by slipping above all three hounds.',
    canChooseSide: true,
  },
  line: {
    id: 'line',
    short: 'Roman 3-in-a-Row',
    title: 'Roman three-in-a-row (Terni Lapilli)',
    tag: 'Attested by Ovid',
    sides: ['Blue', 'Ivory'],
    summary:
      'Take turns placing three counters each on empty intersections, then slide one counter per turn along a cut. The first player to place three counters in a straight line along any outer edge wins.',
    canChooseSide: false,
  },
  latrunculi: {
    id: 'latrunculi',
    short: 'Little Soldiers',
    title: 'Little Soldiers (4-vs-4 Latrunculi)',
    tag: 'Capture game',
    sides: ['Blue', 'Ivory'],
    summary:
      'Take turns placing four counters each, then slide one step per turn. Sandwich an opponent’s counter between two of yours along any three-point straight edge to capture it. Reduce your opponent to one counter (or leave them with no move) to win.',
    canChooseSide: false,
  },
  hunt42: {
    id: 'hunt42',
    short: '4 Hounds vs. 2 Hares',
    title: 'Four hounds against two hares',
    tag: '2026 study',
    sides: ['Hounds', 'Hares'],
    summary:
      'Four blue hounds start on the left side and can slide in any direction. Two ivory hares start on the right. The hounds win when neither hare can move; the hares win if they survive 60 turns.',
    canChooseSide: true,
  },
};

export function newGame(kind) {
  const cells = Array(10).fill(0);
  if (kind === 'hunt31') {
    [8, 9, 6].forEach((v) => (cells[v] = 1));
    cells[1] = 2;
  } else if (kind === 'hunt42') {
    [0, 3, 7, 8].forEach((v) => (cells[v] = 1));
    [4, 5].forEach((v) => (cells[v] = 2));
  }
  return {
    kind,
    cells,
    turn: 1, // 1 = Blue (Hounds), 2 = Ivory (Hare)
    ply: 0,
    placed: 0,
    winner: null, // 0 = draw, 1 = Blue, 2 = Ivory
    winReason: '',
    winLine: [],
    capturedLast: [],
    counts: Array(15).fill(0),
    last: null,
  };
}

export function isPlacing(s) {
  if (s.kind === 'line') return s.placed < 6;
  if (s.kind === 'latrunculi') return s.placed < 8;
  return false;
}

function slideMoves(cells, side, noRetreatDown = false) {
  const out = [];
  for (let u = 0; u < 10; u++) {
    if (cells[u] !== side) continue;
    for (const w of ADJ[u]) {
      if (cells[w] !== 0) continue;
      if (noRetreatDown && Y_TIER[w] > Y_TIER[u]) continue;
      out.push([u, w]);
    }
  }
  return out;
}

export function legalMoves(s) {
  if (s.winner !== null) return [];
  if (isPlacing(s)) {
    const out = [];
    for (let i = 0; i < 10; i++) if (s.cells[i] === 0) out.push([-1, i]);
    return out;
  }
  if (s.kind === 'hunt31') {
    return slideMoves(s.cells, s.turn, s.turn === 1);
  }
  return slideMoves(s.cells, s.turn, false);
}

function applyCaptures(cells, mover, landed) {
  const opp = 3 - mover;
  const captured = [];
  for (const [a, b, c] of WIN_LINES) {
    if (
      (landed === a && cells[c] === mover && cells[b] === opp) ||
      (landed === c && cells[a] === mover && cells[b] === opp)
    ) {
      cells[b] = 0;
      captured.push(b);
    }
  }
  return captured;
}

export function advance(s, [from, to]) {
  const next = {
    ...s,
    cells: [...s.cells],
    counts: [...s.counts],
    ply: s.ply + 1,
    placed: from < 0 ? s.placed + 1 : s.placed,
    turn: 3 - s.turn,
    last: [from, to],
    winLine: [],
    capturedLast: [],
    winReason: '',
  };

  if (from >= 0) {
    next.cells[from] = 0;
    const e = edgeIndex(from, to);
    if (e >= 0) next.counts[e]++;
  }
  next.cells[to] = s.turn;

  if (s.kind === 'line') {
    const line = WIN_LINES.find((l) => l.every((i) => next.cells[i] === s.turn));
    if (line) {
      next.winner = s.turn;
      next.winLine = line;
      next.winReason = 'completed a row of three';
    } else if (next.ply >= 120) {
      next.winner = 0;
      next.winReason = 'reached the move limit without a row';
    } else if (!legalMoves(next).length) {
      // Pass if blocked
      next.turn = s.turn;
      if (!legalMoves(next).length) {
        next.winner = 0;
        next.winReason = 'neither side can move';
      }
    }
  } else if (s.kind === 'latrunculi') {
    if (from >= 0) {
      next.capturedLast = applyCaptures(next.cells, s.turn, to);
    }
    const opp = 3 - s.turn;
    const oppCount = next.cells.filter((c) => c === opp).length;
    if (!isPlacing(next) && oppCount <= 1) {
      next.winner = s.turn;
      next.winReason = 'captured all but one opposing counter';
    } else if (!isPlacing(next) && !legalMoves(next).length) {
      next.winner = s.turn;
      next.winReason = 'left the opponent with no legal move';
    } else if (next.ply >= 120) {
      next.winner = 0;
      next.winReason = 'ended in a draw at 120 turns';
    }
  } else if (s.kind === 'hunt31') {
    const hareMoves = slideMoves(next.cells, 2, false);
    if (!hareMoves.length) {
      next.winner = 1;
      next.winReason = 'trapped the hare with no escape';
    } else {
      const maxHoundY = Math.max(...next.cells.map((c, i) => (c === 1 ? Y_TIER[i] : -1)));
      const harePos = next.cells.indexOf(2);
      if (Y_TIER[harePos] > maxHoundY) {
        next.winner = 2;
        next.winReason = 'slipped past all three hounds';
      } else if (next.turn === 1 && !slideMoves(next.cells, 1, true).length) {
        next.winner = 2;
        next.winReason = 'left the hounds with no forward move';
      } else if (next.ply >= 100) {
        next.winner = 2;
        next.winReason = 'evaded capture for 100 turns';
      }
    }
  } else if (s.kind === 'hunt42') {
    const hareMoves = slideMoves(next.cells, 2, false);
    if (!hareMoves.length) {
      next.winner = 1;
      next.winReason = 'trapped both hares';
    } else if (next.ply >= 60) {
      next.winner = 2;
      next.winReason = 'kept a hare free for 60 turns';
    } else if (next.turn === 1 && !slideMoves(next.cells, 1, false).length) {
      next.turn = 2;
    }
  }

  return next;
}

// Fast heuristic evaluator for interactive AI (supports Casual & Strong modes)
function evaluate(s, side) {
  if (s.winner !== null) {
    if (s.winner === 0) return 0;
    return s.winner === side ? 1000 : -1000;
  }
  if (s.kind === 'line') {
    let sc = 0;
    for (const l of WIN_LINES) {
      const mine = l.filter((i) => s.cells[i] === side).length;
      const theirs = l.filter((i) => s.cells[i] === 3 - side).length;
      if (!theirs) sc += mine * mine * 4;
      if (!mine) sc -= theirs * theirs * 4;
    }
    sc += 0.4 * (slideMoves(s.cells, side).length - slideMoves(s.cells, 3 - side).length);
    return sc;
  }
  if (s.kind === 'latrunculi') {
    const mine = s.cells.filter((c) => c === side).length;
    const theirs = s.cells.filter((c) => c === 3 - side).length;
    let threats = 0;
    for (const [a, b, c] of WIN_LINES) {
      if (s.cells[b] === 3 - side && (s.cells[a] === side || s.cells[c] === side)) threats += 1.5;
      if (s.cells[b] === side && (s.cells[a] === 3 - side || s.cells[c] === 3 - side)) threats -= 1.5;
    }
    return (mine - theirs) * 35 + threats + 0.5 * (slideMoves(s.cells, side).length - slideMoves(s.cells, 3 - side).length);
  }
  if (s.kind === 'hunt31') {
    const harePos = s.cells.indexOf(2);
    const hareY = Y_TIER[harePos];
    const houndYs = s.cells.map((c, i) => (c === 1 ? Y_TIER[i] : -1)).filter((y) => y >= 0);
    const minHY = Math.min(...houndYs);
    const maxHY = Math.max(...houndYs);
    const hareMob = slideMoves(s.cells, 2, false).length;
    const houndMob = slideMoves(s.cells, 1, true).length;
    // Hounds want low hareY, low hareMob, and hounds advancing together above hare
    const hareScore = hareY * 14 + hareMob * 7 + (hareY >= minHY ? 12 : 0) - (maxHY - minHY) * 2 - houndMob * 1.2;
    return side === 2 ? hareScore : -hareScore;
  }
  // hunt42
  const hareMoves = slideMoves(s.cells, 2, false);
  const escapes = new Set(hareMoves.map((m) => m[1])).size;
  const trapped = s.cells.filter((c, i) => c === 2 && ADJ[i].every((j) => s.cells[j] !== 0)).length;
  const hareScore = hareMoves.length * 4 + escapes * 3 - trapped * 12;
  return side === 2 ? hareScore : -hareScore;
}

function search(s, side, depth, alpha, beta) {
  if (s.winner !== null) {
    if (s.winner === 0) return 0;
    return (s.winner === side ? 1 : -1) * (1000 + depth);
  }
  if (depth === 0) return evaluate(s, side);
  const maxing = s.turn === side;
  let best = maxing ? -Infinity : Infinity;
  const moves = legalMoves(s);
  for (const m of moves) {
    const sc = search(advance(s, m), side, depth - 1, alpha, beta);
    if (maxing) {
      if (sc > best) best = sc;
      if (best > alpha) alpha = best;
    } else {
      if (sc < best) best = sc;
      if (best < beta) beta = best;
    }
    if (alpha >= beta) break;
  }
  return best;
}

export function computerMove(s, strength = 'strong') {
  const moves = legalMoves(s);
  if (!moves.length) return null;
  const depth = strength === 'casual' ? 1 : isPlacing(s) ? 2 : 3;
  const scored = moves.map((m) => ({
    m,
    sc: search(advance(s, m), s.turn, depth, -Infinity, Infinity),
  }));
  scored.sort((a, b) => b.sc - a.sc);
  // Always take an immediate winning move
  if (scored[0].sc >= 900) return scored[0].m;
  const tol = strength === 'casual' ? 8.0 : 0.25;
  const pool = scored.filter((x) => x.sc >= scored[0].sc - tol);
  return pool[Math.floor(Math.random() * pool.length)].m;
}
