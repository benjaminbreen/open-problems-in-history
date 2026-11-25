import { edges, corner, games, newGame, isPlacing, legalMoves, advance, computerMove } from './rules.js';
import { samples, recordedMoves } from './archive.js';

const byId = (id) => document.getElementById(id);
const all = (selector) => Array.from(document.querySelectorAll(selector));
const sum = (list) => list.reduce((a, b) => a + b, 0);
const stonePhoto = document.querySelector('.object-view img').src;
const names = [
  'bottom left',
  'bottom middle',
  'bottom right',
  'lower left side',
  'lower right side',
  'upper right side',
  'top right',
  'upper left side',
  'top left',
  'top middle',
];
// Locations on the museum photograph. Nearby cuts that meet separately on the stone
// are joined to one playable point in the researchers' preferred reconstruction.
const stonePoints = [
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
const view = { x: 69, y: 52, width: 572, height: 375 };

function setPressed(buttons, current) {
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === current)));
}
document.querySelector('.mode').addEventListener('click', () => {
  const mode = getComputedStyle(document.documentElement).colorScheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = mode;
  try {
    localStorage.setItem('op.theme', mode);
  } catch {}
});
byId('mark-wear').addEventListener('click', (e) => {
  const show = byId('wear-mark').hasAttribute('hidden');
  byId('wear-mark').toggleAttribute('hidden', !show);
  e.currentTarget.textContent = show ? 'Hide the annotation' : 'Show the worn area';
  e.currentTarget.setAttribute('aria-pressed', String(show));
  byId('photo-note').textContent = show
    ? 'The shaded strip marks the approximate position of the smooth patch beside the diagonal.'
    : 'The dark lines are modern pencil marks following the ancient cuts.';
});

function segment(points, [a, b], cls, attrs = '') {
  return `<line class="${cls}" x1="${points[a][0]}" y1="${points[a][1]}" x2="${points[b][0]}" y2="${points[b][1]}" ${attrs}/>`;
}
function at(points, i) {
  return `translate(${points[i][0]} ${points[i][1]})`;
}
function pieceDefs(id) {
  return `<defs>
  <radialGradient id="${id}-blue" cx="30%" cy="23%" r="83%"><stop stop-color="#81c3c6"/><stop offset=".24" stop-color="#3a909f"/><stop offset=".63" stop-color="#176077"/><stop offset=".89" stop-color="#154253"/><stop offset="1" stop-color="#082b39"/></radialGradient>
  <radialGradient id="${id}-ivory" cx="30%" cy="23%" r="88%"><stop stop-color="#fff9e6"/><stop offset=".36" stop-color="#f6e5bc"/><stop offset=".77" stop-color="#d4ba83"/><stop offset="1" stop-color="#8d754c"/></radialGradient>
  <filter id="${id}-shadow" x="-70%" y="-70%" width="250%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter>
  </defs>`;
}
function piece(points, i, side, id, radius) {
  const blue = side === 1;
  return `<g transform="${at(points, i)}"><g data-stone="${i}"><g transform="scale(${radius / 20})">
  <ellipse cx="2.1" cy="4.4" rx="20" ry="18.8" fill="#33291c" opacity=".55" filter="url(#${id}-shadow)"/>
  <circle cy="1.3" r="19.8" fill="${blue ? '#173644' : '#8a754c'}"/>
  <circle r="19.4" fill="url(#${id}-${blue ? 'blue' : 'ivory'})" stroke="${blue ? '#183d4a' : '#947f58'}" stroke-width=".7"/>
  <circle r="14.3" fill="none" stroke="${blue ? '#c0e0d9' : '#9c865b'}" stroke-width=".85" opacity=".64"/>
  ${blue ? '<circle r="3.2" fill="#badbd7" opacity=".84"/>' : '<g fill="#8d7959"><circle cx="-3.4" r="1.9"/><circle cx="3.4" r="1.9"/></g>'}
  <path d="M-14,-8 Q-10,-15 -3,-16" fill="none" stroke="#fff" stroke-linecap="round" opacity=".7" stroke-width="1.6"/></g></g></g>`;
}
function finishArrow(from, to) {
  const [x, y] = stonePoints[from],
    [u, v] = stonePoints[to],
    angle = (Math.atan2(v - y, u - x) * 180) / Math.PI;
  const length = Math.hypot(u - x, v - y);
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M27 0 H${length - 23} m-10 -7 10 7 -10 7" stroke="#fff8e1" stroke-width="6.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 0 H${length - 23} m-10 -7 10 7 -10 7" stroke="#23566a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
function drawStone(
  host,
  state,
  { selected = null, landings = [], guide = false, lastSlide = null, trails = false, example = false } = {},
) {
  const id = host.id;
  const paths = edges.map((e) => segment(stonePoints, e, 'groove')).join('');
  const most = Math.max(1, ...state.counts);
  const ink = trails
    ? edges
        .map((e, i) =>
          state.counts[i]
            ? segment(stonePoints, e, 'travel', `stroke-width="${2 + 9 * Math.sqrt(state.counts[i] / most)}"`)
            : '',
        )
        .join('')
    : '';
  const spots = stonePoints
    .map(
      ([x, y], i) =>
        `<g transform="translate(${x} ${y})"><circle class="socket" r="4.6"/>${landings.includes(i) ? '<circle class="landing" r="12"/>' : ''}</g>`,
    )
    .join('');
  const emphasis =
    selected === null
      ? ''
      : `<g transform="${at(stonePoints, selected)}"><circle class="selected-ring" r="24.5"/></g>`;
  let win = '';
  if (state.winLine.length)
    win = segment(stonePoints, [state.winLine[0], state.winLine.at(-1)], 'winning-line');
  const moved = lastSlide && lastSlide[0] >= 0 ? segment(stonePoints, lastSlide, 'last-path') : '';
  host.innerHTML = `<svg viewBox="${view.x} ${view.y} ${view.width} ${view.height}" aria-hidden="true">${pieceDefs(id)}
    <image href="${stonePhoto}" width="692" height="474" class="board-photo"/>
    <g class="incisions">${paths}</g>${ink}${moved}${win}${spots}${guide ? finishArrow(1, 4) : ''}${emphasis}
    ${state.cells.map((s, i) => (s ? piece(stonePoints, i, s, id, 20.6) : '')).join('')}</svg>`;
  if (lastSlide && lastSlide[0] >= 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const [a, b] = lastSlide,
      chip = host.querySelector(`[data-stone="${b}"]`);
    chip?.animate(
      [
        {
          transform: `translate(${stonePoints[a][0] - stonePoints[b][0]}px,${stonePoints[a][1] - stonePoints[b][1]}px)`,
        },
        { transform: 'translate(0,0)' },
      ],
      { duration: example ? 610 : 330, easing: 'cubic-bezier(.2,.65,.3,1)' },
    );
  }
}

// Both positions can be reached from the normal opening without a previous win.
const lessons = {
  dogs: {
    title: 'How do you trap a hare?',
    opening: [
      [0, 1],
      [5, 6],
      [7, 9],
      [4, 5],
    ],
    rules: [
      'You have four blue pieces, the “dogs.” Your opponent has two ivory pieces, the “hares.” The names come from a later game. We don’t know what Roman players called their pieces.',
      'On each turn, one piece slides along a cut to the next empty spot. You win if neither hare has anywhere left to go.',
    ],
    task: 'The hares are together on the right. Slide the blue dog at the bottom to close their last way out.',
    result:
      'Both hares are trapped. One has a dog directly below it. The other routes out are already occupied.',
  },
  line: {
    title: 'How do you make a row of three?',
    opening: [
      [-1, 6],
      [-1, 0],
      [-1, 5],
      [-1, 7],
      [-1, 1],
      [-1, 9],
    ],
    rules: [
      'This time each player has three pieces. You take turns putting them on the board, then slide one piece per turn. The first player to get three of their own pieces on three neighboring spots in a straight line wins.',
      'Look at the right side. The two pieces there are now yours. Your third blue piece is at the bottom.',
    ],
    task: 'Slide that third blue piece along the same diagonal you used to trap the hares. This time it will complete your row.',
    result:
      'Your three blue pieces form a row down the right side. The winning piece slid over exactly the same bit of stone as the dog.',
  },
};
const lessonStates = Object.fromEntries(
  Object.entries(lessons).map(([key, data]) => [key, data.opening.reduce(advance, newGame(key))]),
);
const sessions = Object.fromEntries(Object.keys(games).map((key) => [key, [newGame(key)]]));
let mode = 'lesson',
  kind = 'dogs',
  lesson = 'dogs',
  opponent = 'computer',
  selection = 1,
  solved = false,
  timer = null;
const current = () => (mode === 'lesson' ? lessonStates[lesson] : sessions[kind].at(-1));
const humanTurn = (s) => opponent === 'local' || s.turn === 1;
const lessonButtons = all('[data-lesson]');
const playBoard = byId('play-board'),
  art = byId('play-art');
const buttons = stonePoints.map(([x, y], i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'spot';
  b.style.left = `${(100 * (x - view.x)) / view.width}%`;
  b.style.top = `${(100 * (y - view.y)) / view.height}%`;
  b.addEventListener('click', () => {
    if (!dragged) choose(i);
  });
  playBoard.append(b);
  return b;
});
let pointer = null,
  dragged = false;
playBoard.addEventListener('pointerdown', (e) => {
  const i = buttons.indexOf(e.target),
    s = current();
  dragged = false;
  if (i < 0 || s.winner !== null || s.cells[i] !== s.turn || !isHuman() || (mode === 'lesson' && i !== 1))
    return;
  pointer = { id: e.pointerId, i, x: e.clientX, y: e.clientY, button: e.target };
  e.target.setPointerCapture(e.pointerId);
});
playBoard.addEventListener('pointermove', (e) => {
  if (!pointer || pointer.id !== e.pointerId) return;
  const dx = e.clientX - pointer.x,
    dy = e.clientY - pointer.y;
  if (!dragged && Math.hypot(dx, dy) < 6) return;
  if (!dragged) {
    dragged = true;
    selection = pointer.i;
    render();
  }
  const chip = art.querySelector(`[data-stone="${pointer.i}"]`),
    scale = view.width / playBoard.getBoundingClientRect().width;
  if (chip) chip.style.transform = `translate(${dx * scale}px,${dy * scale}px)`;
});
function release(e) {
  if (!pointer || e.pointerId !== pointer.id) return;
  const src = pointer.i;
  pointer = null;
  if (!dragged) return;
  const dest = buttons.indexOf(document.elementFromPoint(e.clientX, e.clientY));
  if (e.type === 'pointerup' && dest !== src && allowed(src, dest)) makeMove([src, dest]);
  else render();
  setTimeout(() => {
    dragged = false;
  }, 0);
}
playBoard.addEventListener('pointerup', release);
playBoard.addEventListener('pointercancel', release);
function isHuman() {
  return mode === 'lesson' ? !solved : humanTurn(current());
}
function allowed(a, b) {
  if (mode === 'lesson') return !solved && a === 1 && b === 4;
  return legalMoves(current()).some(([src, dest]) => src === a && dest === b);
}
function stopBot() {
  clearTimeout(timer);
  timer = null;
}
function queueBot() {
  stopBot();
  const state = current();
  if (mode !== 'full' || state.winner !== null || humanTurn(state)) return;
  timer = setTimeout(() => {
    if (current() === state && !humanTurn(state)) {
      const move = computerMove(state);
      if (move) makeMove(move);
    }
  }, 500);
}
function makeMove(move) {
  if (mode === 'lesson') {
    if (solved || !allowed(...move)) return;
    solved = true;
  } else sessions[kind].push(advance(current(), move));
  selection = null;
  render(move);
  queueBot();
}
function choose(i) {
  const state = current();
  if (!isHuman() || state.winner !== null) return;
  if (mode === 'lesson') {
    if (i === 4) makeMove([1, 4]);
    return;
  }
  const from = isPlacing(state) ? -1 : selection;
  if (from !== null && allowed(from, i)) {
    makeMove([from, i]);
    return;
  }
  if (legalMoves(state).some(([a]) => a === i)) {
    selection = i === selection ? null : i;
    render();
  }
}
function fullStatus(s) {
  if (s.winner === 0) return 'Draw. Neither player made a row before the game ended.';
  if (s.winner !== null) {
    const why =
      kind === 'line'
        ? 'made a row of three'
        : s.winner === (kind === 'dogs' ? 1 : 2)
          ? 'trapped both hares'
          : 'kept a hare free for 240 turns';
    return `${s.winner === 1 ? 'Blue' : 'Ivory'} ${why} and wins.`;
  }
  if (!humanTurn(s)) return 'The computer is choosing a move.';
  const who = opponent === 'computer' ? 'Your' : s.turn === 1 ? 'Blue’s' : 'Ivory’s';
  return isPlacing(s)
    ? `${who} turn. Put a ${s.turn === 1 ? 'blue' : 'ivory'} piece on an empty spot.`
    : selection === null
      ? `${who} turn. Select or drag a ${s.turn === 1 ? 'blue' : 'ivory'} piece.`
      : 'Choose a highlighted spot to slide there.';
}
function render(lastSlide = null) {
  const guided = mode === 'lesson',
    data = lessons[lesson];
  const state = guided && solved ? advance(lessonStates[lesson], [1, 4]) : current();
  const active = isHuman() && state.winner === null;
  const moves = active ? (guided ? [[1, 4]] : legalMoves(state)) : [];
  const landings = moves.filter(([a]) => a === selection || a === -1).map(([, b]) => b);
  byId('lesson-tabs').hidden = !guided;
  byId('full-controls').hidden = guided;
  byId('lesson-title').textContent = guided ? data.title : games[kind].title;
  const paras = guided ? data.rules : [games[kind].intro];
  byId('game-rules').replaceChildren(
    ...paras.map((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      return p;
    }),
  );
  byId('assignment').hidden = !guided;
  byId('assignment').textContent = data.task;
  byId('side-one').textContent = guided
    ? lesson === 'dogs'
      ? 'Your dogs'
      : 'Your pieces'
    : (kind === 'line' ? 'Blue' : games[kind].sides[0]) + (opponent === 'computer' ? ' · you' : '');
  byId('side-two').textContent = guided
    ? lesson === 'dogs'
      ? 'Hares'
      : 'Opponent'
    : (kind === 'line' ? 'Ivory' : games[kind].sides[1]) + (opponent === 'computer' ? ' · computer' : '');
  byId('turn-note').textContent = guided
    ? solved
      ? data.result
      : 'The blue piece is selected. Tap the outlined spot or drag the piece there.'
    : fullStatus(state);
  byId('lesson-action').hidden = !guided || (solved && lesson === 'line');
  byId('lesson-action').textContent = solved ? 'Try making a row →' : 'Show me the move';
  byId('to-counts').hidden = !guided || lesson !== 'line' || !solved;
  byId('undo').hidden = guided;
  byId('undo').disabled = guided || sessions[kind].length < 2;
  byId('restart').hidden = guided && !solved;
  byId('restart').textContent = guided ? 'Repeat this move' : 'Start again';
  byId('change-mode').textContent = guided ? 'Play a full game' : 'Return to the two examples';
  byId('trail-option').hidden = guided;
  drawStone(art, state, {
    selected: selection,
    landings,
    guide: guided && !solved,
    lastSlide,
    trails: !guided && byId('show-trail').checked,
    example: guided,
  });
  buttons.forEach((b, i) => {
    const can = active && (landings.includes(i) || moves.some(([a]) => a === i));
    b.setAttribute(
      'aria-label',
      `${names[i]}, ${state.cells[i] === 1 ? 'blue piece' : state.cells[i] === 2 ? 'ivory piece' : 'empty spot'}${landings.includes(i) ? ', slide here' : ''}`,
    );
    b.setAttribute('aria-disabled', String(!can));
    b.setAttribute('aria-pressed', String(selection === i));
  });
}
function startLesson(key) {
  stopBot();
  mode = 'lesson';
  lesson = key;
  solved = false;
  selection = 1;
  setPressed(
    lessonButtons,
    lessonButtons.find((b) => b.dataset.lesson === key),
  );
  render();
}
lessonButtons.forEach((b) => b.addEventListener('click', () => startLesson(b.dataset.lesson)));
byId('lesson-action').addEventListener('click', () => (solved ? startLesson('line') : makeMove([1, 4])));
byId('change-mode').addEventListener('click', () => {
  if (mode === 'full') {
    startLesson(lesson);
    return;
  }
  mode = 'full';
  kind = lesson;
  byId('game-kind').value = kind;
  selection = null;
  render();
  queueBot();
});
byId('game-kind').addEventListener('change', (e) => {
  kind = e.target.value;
  selection = null;
  render();
  queueBot();
});
byId('opponent').addEventListener('change', (e) => {
  opponent = e.target.value;
  selection = null;
  render();
  queueBot();
});
byId('restart').addEventListener('click', () => {
  if (mode === 'lesson') {
    startLesson(lesson);
    return;
  }
  stopBot();
  sessions[kind] = [newGame(kind)];
  selection = null;
  render();
});
byId('undo').addEventListener('click', () => {
  stopBot();
  const history = sessions[kind];
  if (history.length > 1) history.pop();
  while (history.length > 1 && !humanTurn(current())) history.pop();
  selection = null;
  render();
  queueBot();
});
byId('show-trail').addEventListener('change', () => render());
render();

const regions = {
  corner: {
    ids: corner,
    caption:
      'All three sides of the lower-right triangle are selected. A thicker path means more slides in that game.',
  },
  diagonal: {
    ids: [12],
    caption:
      'Only the diagonal beside the worn patch is selected. Count how often pieces took this one route, in either direction.',
  },
  middle: {
    ids: [10],
    caption:
      'The middle line runs straight across the board from top to bottom. Both sets of computer players rarely used it.',
  },
};
function updateMaps(key) {
  const region = regions[key];
  for (const kind of ['hares', 'line']) {
    const counts = samples[kind].counts,
      n = sum(counts),
      shares = counts.map((v) => v / n),
      selected = sum(region.ids.map((i) => counts[i]));
    const outline = edges.map((e) => segment(stonePoints, e, 'map-base')).join('');
    const paths = edges
      .map((e, i) =>
        segment(
          stonePoints,
          e,
          region.ids.includes(i) ? 'map-highlight' : 'map-other',
          `stroke-width="${1.3 + shares[i] * 58}"`,
        ),
      )
      .join('');
    const joints = stonePoints
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" class="map-dot"/>`)
      .join('');
    const pct = ((100 * selected) / n).toFixed(1);
    byId('map-' + kind).innerHTML =
      `<svg viewBox="63 47 579 380" role="img" aria-label="${pct}% of slides on the selected paths"><image href="${stonePhoto}" width="692" height="474" class="map-photo"/>${key === 'corner' ? '<path class="corner-wash" d="M350 379 L585 372 L585 297 Z"/>' : ''}${outline}${paths}${joints}</svg>`;
    byId('count-' + kind).innerHTML =
      `<strong>${pct}%</strong><span>${selected.toLocaleString('en-US')} of ${n.toLocaleString('en-US')} slides</span>`;
  }
  byId('compare-caption').textContent = region.caption;
}
const regionButtons = all('[data-region]');
regionButtons.forEach((b) =>
  b.addEventListener('click', () => {
    setPressed(regionButtons, b);
    updateMaps(b.dataset.region);
  }),
);
updateMaps('corner');

const replay = [newGame('line')];
recordedMoves.forEach((m) => replay.push(advance(replay.at(-1), m)));
let turn = 80,
  interval = null;
function stopClip() {
  clearInterval(interval);
  interval = null;
  byId('replay-four').textContent = 'Watch the four turns';
}
function showTurn(n, animate = false) {
  turn = n;
  const s = replay[n];
  drawStone(byId('replay-board'), s, { trails: true, lastSlide: animate ? s.last : null });
  byId('timeline').value = n;
  byId('replay-position').textContent = `Turn ${n} of 250`;
  byId('replay-step').disabled = n === 250;
  let message = 'The players start with an empty board.';
  if (s.last) {
    const [a, b] = s.last,
      who = n % 2 ? 'Blue' : 'Ivory';
    message =
      a < 0
        ? `${who} places a piece at the ${names[b]}.`
        : `${who} slides from the ${names[a]} to the ${names[b]}.`;
  }
  if (n === 80) message = 'At turn 80, take a look at the pieces on the right.';
  if (n === 84) message = 'Four turns later, every piece is back where it was on turn 80.';
  if (n === 250) message = 'The program stopped here. Neither player had made a row of three.';
  byId('replay-description').textContent = message;
}
byId('replay-four').addEventListener('click', () => {
  if (interval !== null) {
    stopClip();
    return;
  }
  showTurn(80);
  byId('replay-four').textContent = 'Pause';
  interval = setInterval(() => {
    showTurn(turn + 1, true);
    if (turn === 84) stopClip();
  }, 810);
});
byId('timeline').addEventListener('input', (e) => {
  stopClip();
  showTurn(Number(e.target.value));
});
byId('replay-step').addEventListener('click', () => {
  stopClip();
  if (turn < 250) showTurn(turn + 1, true);
});
byId('replay').addEventListener('toggle', () => {
  if (!byId('replay').open) stopClip();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopClip();
});
showTurn(80);
