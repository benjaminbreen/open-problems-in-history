import {
  SITES,
  STONE_POINTS,
  EDGES,
  DIAGONALS,
  WORN_DIAGONAL,
  CORNER_TRIANGLE,
  BOTTOM_TRIANGLES,
  CENTRE_EDGE,
  GAMES,
  newGame,
  isPlacing,
  legalMoves,
  advance,
  computerMove,
} from './rules.js';

const $ = (id) => document.getElementById(id);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Theme toggle (matches site app.js behavior even if standalone)
const modeBtn = document.querySelector('.mode');
if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    const cur = getComputedStyle(document.documentElement).colorScheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = cur;
    try {
      localStorage.setItem('op.theme', cur);
    } catch {}
  });
}

// Hero wear & 2.4 cm offset overlay toggle
const markBtn = $('hc-mark-wear');
const markSvg = $('hc-wear-overlay');
const photoNote = $('hc-photo-note');
if (markBtn && markSvg && photoNote) {
  markBtn.addEventListener('click', () => {
    const show = markSvg.hasAttribute('hidden');
    markSvg.toggleAttribute('hidden', !show);
    markBtn.setAttribute('aria-pressed', String(show));
    markBtn.textContent = show ? 'Hide worn corner' : 'Show the worn corner';
    photoNote.textContent = show
      ? 'The red band marks roughly where the study reports the smooth patch.'
      : '21.2 × 14.5 cm, about the size of a paperback.';
  });
}

// ---------------------------------------------------------------------------
// Playable Stone Studio (4 rulebooks + personal trail persistence)
// ---------------------------------------------------------------------------
const STORAGE_KEY = 'op.heerlen.c.trails';
function loadTotals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}
function saveTotals(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {}
}

let sessionTotals = loadTotals();
const histories = Object.fromEntries(Object.keys(GAMES).map((k) => [k, [newGame(k)]]));
let kind = 'hunt31';
let opponent = 'computer'; // 'computer' | 'local'
let strength = 'strong';   // 'casual' | 'strong'
let humanSide = 1;         // 1 (Blue / Hounds) | 2 (Ivory / Hare)
let selection = null;
let botTimer = null;
let showTrail = true;

const playWrap = $('hc-play-wrap');
const playArt = $('hc-play-art');

const currentState = () => histories[kind].at(-1);
const isHumanTurn = (s) => opponent === 'local' || s.turn === humanSide;

// Create accessible interactive hotspot buttons on the 10 stone intersections
const spotButtons = STONE_POINTS.map(([x, y], i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'hc-spot';
  b.style.left = `${(100 * x) / 692}%`;
  b.style.top = `${(100 * y) / 474}%`;
  b.addEventListener('click', () => {
    if (!dragged) handleSpotClick(i);
  });
  playWrap.appendChild(b);
  return b;
});

// Pointer drag support for sliding pieces smoothly
let drag = null;
let dragged = false;
playWrap.addEventListener('pointerdown', (e) => {
  const idx = spotButtons.indexOf(e.target);
  const s = currentState();
  dragged = false;
  if (idx < 0 || s.winner !== null || !isHumanTurn(s) || isPlacing(s) || s.cells[idx] !== s.turn) return;
  drag = { id: e.pointerId, from: idx, x: e.clientX, y: e.clientY };
  e.target.setPointerCapture(e.pointerId);
});

playWrap.addEventListener('pointermove', (e) => {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.x;
  const dy = e.clientY - drag.y;
  if (!dragged && Math.hypot(dx, dy) < 6) return;
  if (!dragged) {
    dragged = true;
    selection = drag.from;
    renderBoard();
  }
  const chip = playArt.querySelector(`[data-piece="${drag.from}"]`);
  const scale = 692 / playWrap.getBoundingClientRect().width;
  if (chip) chip.style.transform = `translate(${dx * scale}px, ${dy * scale}px)`;
});

function endDrag(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const from = drag.from;
  drag = null;
  if (!dragged) return;
  const destEl = document.elementFromPoint(e.clientX, e.clientY);
  const to = spotButtons.indexOf(destEl);
  const legal = legalMoves(currentState()).some(([a, b]) => a === from && b === to);
  if (e.type === 'pointerup' && legal) commitMove([from, to]);
  else renderBoard();
  setTimeout(() => {
    dragged = false;
  }, 0);
}
playWrap.addEventListener('pointerup', endDrag);
playWrap.addEventListener('pointercancel', endDrag);

function stopBot() {
  clearTimeout(botTimer);
  botTimer = null;
}

function maybeQueueBot() {
  stopBot();
  const s = currentState();
  if (s.winner !== null || isHumanTurn(s)) return;
  botTimer = setTimeout(() => {
    const live = currentState();
    if (live !== s || live.winner !== null || isHumanTurn(live)) return;
    const mv = computerMove(live, strength);
    if (mv) commitMove(mv);
  }, 420);
}

function recordSlide(edgeIdx) {
  if (edgeIdx < 0) return;
  if (!sessionTotals[kind]) sessionTotals[kind] = Array(15).fill(0);
  sessionTotals[kind][edgeIdx] = (sessionTotals[kind][edgeIdx] || 0) + 1;
  saveTotals(sessionTotals);
}

function commitMove(mv) {
  const prev = currentState();
  const next = advance(prev, mv);
  if (mv[0] >= 0) {
    const diffIdx = next.counts.findIndex((v, i) => v > prev.counts[i]);
    if (diffIdx >= 0) recordSlide(diffIdx);
  }
  histories[kind].push(next);
  selection = null;
  renderBoard(mv);
  maybeQueueBot();
}

function handleSpotClick(i) {
  const s = currentState();
  if (s.winner !== null || !isHumanTurn(s)) return;
  const moves = legalMoves(s);
  if (isPlacing(s)) {
    if (moves.some(([, to]) => to === i)) commitMove([-1, i]);
    return;
  }
  if (selection !== null && moves.some(([a, b]) => a === selection && b === i)) {
    commitMove([selection, i]);
    return;
  }
  if (moves.some(([a]) => a === i)) {
    selection = selection === i ? null : i;
    renderBoard();
  }
}

function pieceSVG(i, side, isSelected) {
  const [x, y] = STONE_POINTS[i];
  const blue = side === 1;
  return `<g transform="translate(${x} ${y})">
    ${isSelected ? '<circle r="27" fill="none" stroke="#c4321c" stroke-width="3" stroke-dasharray="6 4"/>' : ''}
    <g data-piece="${i}">
      <ellipse cx="2.5" cy="5" rx="21.5" ry="20" fill="#231912" opacity="0.48" filter="url(#hc-sh)"/>
      <circle cy="1.5" r="21.2" fill="${blue ? '#10303d' : '#85704a'}"/>
      <circle r="20.6" fill="url(#hc-${blue ? 'blue' : 'ivory'})" stroke="${blue ? '#123947' : '#8f7952'}" stroke-width="0.9"/>
      <circle r="14.5" fill="none" stroke="${blue ? '#bee2de' : '#968058'}" stroke-width="0.9" opacity="0.65"/>
      ${
        blue
          ? '<circle r="3.2" fill="#c0e4df" opacity="0.85"/>'
          : '<g fill="#85704d"><circle cx="-3.6" r="2"/><circle cx="3.6" r="2"/></g>'
      }
      <path d="M-14,-8 Q-9,-15 -2,-16.5" fill="none" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" opacity="0.72"/>
    </g>
  </g>`;
}

function statusMessage(s) {
  const g = GAMES[s.kind];
  const s1 = g.sides[0];
  const s2 = g.sides[1];
  if (s.winner === 0) return `Draw — ${s.winReason}.`;
  if (s.winner !== null) {
    const wName = s.winner === 1 ? s1 : s2;
    return `${wName} win — ${s.winReason}.`;
  }
  if (!isHumanTurn(s)) return `Computer (${s.turn === 1 ? s1 : s2}) is thinking…`;
  const who = opponent === 'computer' ? 'Your turn' : `${s.turn === 1 ? s1 : s2}’s turn`;
  if (isPlacing(s)) {
    const left = (s.kind === 'line' ? 6 : 8) - s.placed;
    return `${who}: place a ${s.turn === 1 ? 'blue' : 'ivory'} counter on any open intersection (${left} left to place).`;
  }
  if (s.capturedLast.length) {
    return `Captured! ${who}: select or drag a ${s.turn === 1 ? 'blue' : 'ivory'} counter.`;
  }
  if (selection !== null) {
    return `${who}: click a highlighted spot to slide there (or click the piece again to cancel).`;
  }
  return `${who}: select or drag a ${s.turn === 1 ? 'blue' : 'ivory'} counter.`;
}

function renderBoard(lastMove = null) {
  const s = currentState();
  const g = GAMES[kind];
  const moves = isHumanTurn(s) && s.winner === null ? legalMoves(s) : [];
  const landings = isPlacing(s)
    ? moves.map(([, b]) => b)
    : selection !== null
      ? moves.filter(([a]) => a === selection).map(([, b]) => b)
      : [];

  // Trail lines from current game
  const maxC = Math.max(1, ...s.counts);
  const trailMarkup = showTrail
    ? EDGES.map(([a, b], i) => {
        if (!s.counts[i]) return '';
        const [x1, y1] = STONE_POINTS[a];
        const [x2, y2] = STONE_POINTS[b];
        const w = 3 + 11 * Math.sqrt(s.counts[i] / maxC);
        const op = Math.min(0.85, 0.32 + 0.45 * (s.counts[i] / maxC));
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c4321c" stroke-width="${w.toFixed(1)}" stroke-linecap="round" opacity="${op.toFixed(2)}"/>`;
      }).join('')
    : '';

  const grooves = EDGES.map(([a, b]) => {
    const [x1, y1] = STONE_POINTS[a];
    const [x2, y2] = STONE_POINTS[b];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#231c15" stroke-width="2" opacity="0.28"/>`;
  }).join('');

  const winMarkup = s.winLine.length
    ? (() => {
        const [x1, y1] = STONE_POINTS[s.winLine[0]];
        const [x2, y2] = STONE_POINTS[s.winLine.at(-1)];
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c4321c" stroke-width="8" stroke-linecap="round" opacity="0.88"/>`;
      })()
    : '';

  const sockets = STONE_POINTS.map(([x, y], i) => {
    const isLand = landings.includes(i);
    return `<g transform="translate(${x} ${y})">
      <circle r="4.5" fill="#1c1712" opacity="0.65"/>
      ${
        isLand
          ? '<circle r="13.5" fill="#c4321c" fill-opacity="0.18" stroke="#c4321c" stroke-width="2.6" stroke-dasharray="4 3"/>'
          : ''
      }
    </g>`;
  }).join('');

  const pieces = s.cells.map((side, i) => (side ? pieceSVG(i, side, selection === i) : '')).join('');

  playArt.innerHTML = `<svg viewBox="0 0 692 474" aria-hidden="true">
    <defs>
      <radialGradient id="hc-blue" cx="32%" cy="26%" r="78%">
        <stop offset="0%" stop-color="#89cccf"/>
        <stop offset="28%" stop-color="#338899"/>
        <stop offset="70%" stop-color="#15576c"/>
        <stop offset="100%" stop-color="#072734"/>
      </radialGradient>
      <radialGradient id="hc-ivory" cx="32%" cy="26%" r="82%">
        <stop offset="0%" stop-color="#fffbef"/>
        <stop offset="38%" stop-color="#f5e3ba"/>
        <stop offset="78%" stop-color="#d2b780"/>
        <stop offset="100%" stop-color="#8a7248"/>
      </radialGradient>
      <filter id="hc-sh" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.6"/>
      </filter>
    </defs>
    <image href="/leads/heerlen-c/heerlen-stone.webp" width="692" height="474"/>
    ${grooves}
    ${trailMarkup}
    ${winMarkup}
    ${sockets}
    ${pieces}
  </svg>`;

  // Smooth slide animation when moving a counter
  if (lastMove && lastMove[0] >= 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const [a, b] = lastMove;
    const chip = playArt.querySelector(`[data-piece="${b}"]`);
    if (chip) {
      const dx = STONE_POINTS[a][0] - STONE_POINTS[b][0];
      const dy = STONE_POINTS[a][1] - STONE_POINTS[b][1];
      chip.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: 290, easing: 'cubic-bezier(0.22, 0.7, 0.3, 1)' },
      );
    }
  }

  // Update side panel & accessibility labels
  $('hc-rule-summary').textContent = g.summary;
  $('hc-side-one').textContent = `${g.sides[0]}${opponent === 'computer' && humanSide === 1 ? ' (you)' : ''}`;
  $('hc-side-two').textContent = `${g.sides[1]}${opponent === 'computer' && humanSide === 2 ? ' (you)' : ''}`;
  $('hc-side-wrap').hidden = !g.canChooseSide || opponent !== 'computer';
  $('hc-status').textContent = statusMessage(s);
  $('hc-undo').disabled = histories[kind].length < 2;

  spotButtons.forEach((btn, i) => {
    const canInteract =
      isHumanTurn(s) &&
      s.winner === null &&
      (landings.includes(i) || (!isPlacing(s) && moves.some(([a]) => a === i)));
    const stateDesc = s.cells[i] === 1 ? g.sides[0] : s.cells[i] === 2 ? g.sides[1] : 'empty';
    btn.setAttribute('aria-label', `${SITES[i][2]}, ${stateDesc}${landings.includes(i) ? ', move here' : ''}`);
    btn.setAttribute('aria-disabled', String(!canInteract));
  });

}

// Wire controls
const gameTabs = $$('[data-game]');
gameTabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    stopBot();
    kind = btn.dataset.game;
    if (!GAMES[kind].canChooseSide) humanSide = 1;
    $('hc-play-as').value = String(humanSide);
    selection = null;
    gameTabs.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    renderBoard();
    maybeQueueBot();
  });
});

$('hc-opponent').addEventListener('change', (e) => {
  opponent = e.target.value;
  selection = null;
  renderBoard();
  maybeQueueBot();
});

$('hc-play-as').addEventListener('change', (e) => {
  humanSide = Number(e.target.value);
  selection = null;
  renderBoard();
  maybeQueueBot();
});

$('hc-undo').addEventListener('click', () => {
  stopBot();
  const h = histories[kind];
  if (h.length > 1) h.pop();
  while (h.length > 1 && !isHumanTurn(currentState())) h.pop();
  selection = null;
  renderBoard();
});

$('hc-restart').addEventListener('click', () => {
  stopBot();
  histories[kind] = [newGame(kind)];
  selection = null;
  renderBoard();
  maybeQueueBot();
});

renderBoard();


// Chart: busiest diagonal vs middle line, per cent of all moves
const ROWS = [
  ['The study’s computer player', 'Four hounds, two hares', 15.1, 0.0],
  ['A flawless player', 'Same game', 10.9, 1.0],
  ['A careless player', 'Same game', 6.7, 5.5],
  ['A careless player', 'Three in a row', 6.2, 5.6],
  ['A careless player', 'Three hounds, one hare, no retreat', 6.3, 4.3],
];
$('hc-chart').innerHTML = ROWS.map(
  ([who, game, d, m]) => `<div class="hc-row">
    <div class="who">${who}<small>${game}</small></div>
    <div class="hc-bars">
      <div class="hc-bar hc-bar-d" style="width:${(d / 16) * 100}%"><em>${d.toFixed(1)}%</em></div>
      <div class="hc-bar hc-bar-m" style="width:${(m / 16) * 100}%"><em>${m.toFixed(1)}%</em></div>
    </div>
  </div>`,
).join('');
