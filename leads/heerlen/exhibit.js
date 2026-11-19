import {
  sites,
  edges,
  diagonals,
  corner,
  games,
  newGame,
  isPlacing,
  legalMoves,
  advance,
  computerMove,
} from './rules.js';
import { samples, recordedMoves, trapOpening } from './archive.js';

const $ = (id) => document.getElementById(id);
const controls = (selector) => [...document.querySelectorAll(selector)];
const total = (values) => values.reduce((a, b) => a + b, 0);
const percent = (n, places = 2) => n.toFixed(places) + '%';
function percentages(counts) {
  const n = total(counts);
  return counts.map((v) => (n ? (100 * v) / n : 0));
}
function line(a, b, cls, attrs = '') {
  return `<line class="${cls}" x1="${sites[a][0]}" y1="${sites[a][1]}" x2="${sites[b][0]}" y2="${sites[b][1]}" ${attrs} />`;
}
function circle(i, r, cls) {
  return `<circle class="${cls}" cx="${sites[i][0]}" cy="${sites[i][1]}" r="${r}"/>`;
}
function draw(
  host,
  {
    shares = [],
    cells = [],
    last = null,
    win = [],
    wear = false,
    joints = true,
    description = 'Board with ten playing points.',
  } = {},
) {
  const rails = edges.map(([a, b]) => line(a, b, 'rail'));
  const hot = edges.flatMap(([a, b], i) =>
    (shares[i] || 0) > 0
      ? [
          line(
            a,
            b,
            'traffic',
            `stroke-width="${1 + Math.min(shares[i], 100) * 0.38}" opacity="${Math.min(0.95, 0.14 + shares[i] * 0.045)}"`,
          ),
        ]
      : [],
  );
  if (wear) hot.push(line(...edges[12], 'stone-line'));
  if (win.length) hot.push(line(win[0], win[2], 'win-line'));
  if (last && last[0] >= 0) hot.push(line(last[0], last[1], 'last-line'));
  const dots = joints ? sites.map((_, i) => circle(i, 3.4, 'joint')) : [];
  cells.forEach((side, i) => {
    if (side) {
      dots.push(circle(i, 10, side === 1 ? 'disc-one' : 'disc-two'));
      if (side === 2) dots.push(circle(i, 2.8, 'disc-dot'));
    }
  });
  host.innerHTML = `<svg class="hr-board" viewBox="0 0 360 244" role="img" aria-label="${description}">${[...rails, ...hot, ...dots].join('')}</svg>`;
}
function pressed(buttons, active) {
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === active)));
}

document.querySelector('.mode').addEventListener('click', () => {
  const mode = getComputedStyle(document.documentElement).colorScheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = mode;
  try {
    localStorage.setItem('op.theme', mode);
  } catch {}
});
const objectButtons = controls('[data-object]');
draw($('stone-drawing'), {
  wear: true,
  description: 'Preferred reconstruction. The lower-right diagonal marks the visibly worn area.',
});
objectButtons.forEach((button) =>
  button.addEventListener('click', () => {
    const photo = button.dataset.object === 'photo';
    pressed(objectButtons, button);
    $('stone-photo').hidden = !photo;
    $('stone-drawing').hidden = photo;
    $('stone-label').textContent = photo
      ? '21.2 cm across · modern pencil follows the cuts'
      : 'Board 6 · red marks the worn diagonal';
  }),
);

// Select the assignment before revealing either identity. Both maps use the same scale and orientation.
const traceOrder = Math.random() < 0.5 ? ['line', 'hares'] : ['hares', 'line'];
const traceHosts = [$('trace-a'), $('trace-b')];
traceOrder.forEach((kind, i) =>
  draw(traceHosts[i], {
    shares: percentages(samples[kind].counts),
    description: `Trace ${i ? 'B' : 'A'}. Three edges in its lower-right corner carry most of the traffic.`,
  }),
);
const guessButtons = controls('[data-guess]');
guessButtons.forEach((button) =>
  button.addEventListener('click', () => {
    const pick = Number(button.dataset.guess),
      correct = traceOrder.indexOf('line');
    const name = (i) => (i === 0 ? 'A' : 'B');
    guessButtons.forEach((b) => {
      b.disabled = true;
    });
    pressed(guessButtons, button);
    function share(kind) {
      const values = percentages(samples[kind].counts);
      return percent(total(corner.map((i) => values[i])), 1);
    }
    $('guess-answer').hidden = false;
    $('guess-answer').innerHTML =
      `<p><strong>${pick === correct ? 'You got it.' : 'A reasonable guess.'}</strong> Trace ${name(correct)} is three in a row. Its players spent ${share('line')} of their moves on the corner triangle. The dogs and hares in trace ${name(1 - correct)} spent ${share('hares')} there.</p><p>These two examples were chosen for their resemblance. The tracks alone give very little away.</p>`;
    traceOrder.forEach((kind, i) => {
      traceHosts[i].previousElementSibling.textContent = `Trace ${name(i)} · ${games[kind].title}`;
    });
  }),
);

// Each game retains its place while the reader compares alternatives.
const sessions = Object.fromEntries(Object.keys(games).map((kind) => [kind, [newGame(kind)]]));
function puzzleStart() {
  const position = trapOpening.reduce(advance, newGame('dogs'));
  return { ...position, counts: Array(edges.length).fill(0), last: null };
}
sessions.trap = [puzzleStart()];
let kind = 'trap',
  opponent = 'computer',
  selection = null,
  timer = null;
const gameHost = $('play-board'),
  inkLayer = document.createElement('div');
gameHost.append(inkLayer);
const buttons = sites.map(([x, y, label], i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'site-point';
  b.style.left = `${(x / 360) * 100}%`;
  b.style.top = `${(y / 244) * 100}%`;
  b.setAttribute('aria-label', label);
  b.innerHTML = '<span aria-hidden="true"></span>';
  b.addEventListener('click', () => playSite(i));
  gameHost.append(b);
  return b;
});
const session = () => sessions[kind];
const current = () => session()[session().length - 1];
const role = (side) => games[current().kind].sides[side - 1];
function humanTurn(s) {
  return kind === 'trap' ? session().length === 1 : opponent === 'local' || s.turn === 1;
}
function cancelBot() {
  if (timer !== null) clearTimeout(timer);
  timer = null;
}
function scheduleBot() {
  cancelBot();
  const s = current();
  if (kind === 'trap' || s.winner !== null || humanTurn(s)) return;
  timer = setTimeout(() => {
    timer = null;
    if (current() !== s || humanTurn(s)) return;
    const move = computerMove(s);
    if (move) commit(move);
  }, 340);
}
function commit(move) {
  session().push(advance(current(), move));
  selection = null;
  renderPlay();
  scheduleBot();
}
function playSite(i) {
  const s = current();
  if (s.winner !== null || !humanTurn(s)) return;
  const legal = legalMoves(s);
  const move = legal.find(([a, b]) => b === i && (isPlacing(s) || a === selection));
  if (move) {
    commit(move);
    return;
  }
  if (s.cells[i] === s.turn && legal.some(([a]) => a === i)) {
    selection = selection === i ? null : i;
    renderPlay();
  }
}
function renderPlay() {
  const s = current(),
    options = legalMoves(s),
    active = s.winner === null && humanTurn(s),
    placing = isPlacing(s),
    counts = s.counts;
  const puzzle = kind === 'trap';
  $('game-rules').textContent = puzzle
    ? 'You have one move. Slide a dog to close the last escape route for both hares. This position comes from turn 17 of an archived game. Choose a full game above the board to play from the beginning.'
    : games[kind].intro;
  $('opponent').disabled = puzzle;
  $('opponent').parentElement.hidden = puzzle;
  $('restart').textContent = puzzle ? 'Reset puzzle' : 'New game';
  $('full-game').hidden = !puzzle || s.winner === null;
  $('side-one').textContent = role(1) + (puzzle || opponent === 'computer' ? ' · you' : '');
  $('side-two').textContent = role(2) + (!puzzle && opponent === 'computer' ? ' · computer' : '');
  $('move-count').textContent = puzzle ? 'One-move puzzle' : `Turn ${s.ply + (s.winner === null ? 1 : 0)}`;
  draw(inkLayer, {
    shares: $('show-trail').checked ? percentages(counts) : [],
    last: s.last,
    win: s.winLine,
    joints: false,
    description: 'Game board. Use the named point buttons to place or slide a counter.',
  });
  buttons.forEach((b, i) => {
    const landing = active && options.some(([a, d]) => d === i && (placing || a === selection));
    const pick = active && s.cells[i] === s.turn && options.some(([a]) => a === i);
    b.dataset.piece = s.cells[i];
    b.dataset.legal = landing;
    b.dataset.selected = selection === i;
    b.setAttribute('aria-pressed', String(selection === i));
    b.setAttribute('aria-disabled', String(!landing && !pick));
    b.setAttribute(
      'aria-label',
      `${sites[i][2]}, ${s.cells[i] ? role(s.cells[i]) + ' counter' : 'empty'}${landing ? ', available destination' : ''}`,
    );
  });
  let message;
  if (puzzle) {
    if (s.winner === 1) message = 'You trapped both hares. That was the winning move in the recorded game.';
    else if (session().length > 1) message = 'A hare can still move. Undo your slide and try another route.';
    else
      message =
        selection === null
          ? 'Choose a red dog. The two ringed counters are the hares.'
          : 'Choose a ringed empty point for your dog.';
  } else if (s.winner === 0) message = 'Draw. The game reached its limit or neither side can move.';
  else if (s.winner !== null) {
    const who =
      opponent === 'computer'
        ? s.winner === 1
          ? 'You win'
          : 'Computer wins'
        : `${role(s.winner)} ${kind === 'line' ? 'wins' : 'win'}`;
    const why =
      kind === 'line'
        ? 'three counters in a line'
        : s.winner === (kind === 'dogs' ? 1 : 2)
          ? 'both hares are trapped'
          : 'the hares stayed mobile';
    message = `${who} — ${why}.`;
  } else if (!humanTurn(s)) message = `Computer is moving ${role(s.turn).toLowerCase()}.`;
  else {
    const prefix = opponent === 'computer' ? 'Your turn' : `${role(s.turn)} to play`;
    const action = placing
      ? `place counter ${Math.floor(s.ply / 2) + 1} of 3 on an empty dot.`
      : selection === null
        ? 'choose one of your counters.'
        : 'choose a ringed destination.';
    message = `${prefix} — ${action}`;
  }
  if (s.skipped && s.winner === null) message = `${role(s.skipped)} passed. ${message}`;
  $('turn-note').textContent = message;
  $('undo').disabled = session().length <= 1;
  const slides = total(counts);
  $('own-stats').textContent = slides
    ? `${slides} ${slides === 1 ? 'slide' : 'slides'} · ${percent((100 * total(corner.map((i) => counts[i]))) / slides, 0)} in the lower-right triangle`
    : puzzle
      ? 'Your slide will leave a trail.'
      : 'Only slides leave tracks.';
}
function selectGame(key) {
  cancelBot();
  kind = key;
  $('game-kind').value = key;
  selection = null;
  renderPlay();
  scheduleBot();
}
$('game-kind').addEventListener('change', (e) => selectGame(e.target.value));
$('full-game').addEventListener('click', () => selectGame('dogs'));
$('opponent').addEventListener('change', (e) => {
  cancelBot();
  opponent = e.target.value;
  selection = null;
  renderPlay();
  scheduleBot();
});
$('show-trail').addEventListener('change', renderPlay);
$('restart').addEventListener('click', () => {
  cancelBot();
  sessions[kind] = [kind === 'trap' ? puzzleStart() : newGame(kind)];
  selection = null;
  renderPlay();
});
$('undo').addEventListener('click', () => {
  cancelBot();
  const history = session();
  if (history.length > 1) history.pop();
  while (history.length > 1 && !humanTurn(current())) history.pop();
  selection = null;
  renderPlay();
  scheduleBot();
});
renderPlay();

// Seek by absolute turn. Each frame accumulates only vertex-to-vertex traversals.
const replay = [newGame('line')];
for (const move of recordedMoves) replay.push(advance(replay[replay.length - 1], move));
let turn = 0,
  playback = null;
function stopReplay() {
  if (playback !== null) clearInterval(playback);
  playback = null;
}
function renderReplay() {
  const s = replay[turn],
    move = s.last,
    n = total(s.counts);
  draw($('replay-board'), {
    cells: s.cells,
    shares: percentages(s.counts),
    last: move,
    description: `Recorded turn ${turn}. ${n} slides so far.`,
  });
  $('timeline').value = turn;
  $('replay-position').textContent = `Turn ${turn} / 250`;
  $('replay-step').disabled = turn === 250;
  $('replay-toggle').textContent =
    playback !== null ? 'Pause' : turn === 250 ? 'Replay again' : 'Play replay';
  let text = 'Empty board. Six placements come first.';
  if (move) {
    const who = turn % 2 ? 'Red' : 'Black';
    text =
      move[0] === -1
        ? `${who} placed a counter on ${sites[move[1]][2]}.`
        : `${who} slid ${sites[move[0]][2]} → ${sites[move[1]][2]}.`;
  }
  if (turn === 250)
    text =
      'Draw. Two edges carried 184 of the 244 slides in this game. All 1,000 games reached the move limit.';
  $('replay-description').textContent = text;
}
function seek(n) {
  turn = Math.max(0, Math.min(250, n));
  if (turn === 250) stopReplay();
  renderReplay();
}
$('timeline').addEventListener('input', (e) => {
  stopReplay();
  seek(Number(e.target.value));
});
$('replay-jump').addEventListener('click', () => {
  stopReplay();
  seek(80);
});
$('replay-step').addEventListener('click', () => {
  stopReplay();
  seek(turn + 1);
});
$('replay-toggle').addEventListener('click', () => {
  if (playback !== null) {
    stopReplay();
    renderReplay();
    return;
  }
  if (turn === 250) turn = 0;
  playback = setInterval(() => seek(turn + 1), 180);
  seek(turn + 1);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopReplay();
    renderReplay();
  }
});
renderReplay();

const fileButtons = controls('[data-file]');
function showFile(button) {
  pressed(fileButtons, button);
  const raw = button.dataset.file === 'raw';
  const values = raw ? percentages(samples.line.counts) : samples.line.adjusted;
  const max = Math.max(...diagonals.map((i) => values[i])),
    threshold = 200 / edges.length;
  draw($('file-board'), {
    shares: values,
    description: `Three-in-a-row ${raw ? 'original' : 'adjusted'} percentages. Busiest diagonal ${percent(max)}. Centre ${percent(values[10], 3)}.`,
  });
  $('read-pct').textContent = percent(max);
  $('meter').firstElementChild.style.width = `${(100 * max) / 35}%`;
  $('meter').setAttribute('aria-label', `Busiest diagonal ${percent(max)}. Required ${percent(threshold)}.`);
  $('read-result').textContent =
    max >= threshold ? 'Clears the diagonal test.' : 'Falls below the diagonal cutoff.';
  $('file-detail').textContent = raw
    ? 'The centre line carried just 228 of 244,000 slides (0.09%). Flipping the board would leave that line in place.'
    : 'Here the centre gets 1.11%. Flipping the same games cannot change its total. Which run or processing step accounts for the difference remains open.';
}
fileButtons.forEach((b) => b.addEventListener('click', () => showFile(b)));
showFile(fileButtons[0]);
