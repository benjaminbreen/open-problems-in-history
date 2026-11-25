// KH0456 / UR218, principal pendants in order. Khipu Field Guide workbook,
// checked against the total and the aligned values reported in OKR v2.1.0.
const longer = [
  160, 236, 110, 140, 134, 130, 620, 470, 528, 932, 474, 319, 453, 492,
  663, 252, 654, 423, 433, 275, 20, 34, 10, 20, 26, 10, 22, 26, 10, 32,
  45, 32, 22, 36, 14, 22, 35, 20, 22, 36, 14, 22, 22, 20, 26, 24, 20,
  14, 12, 14, 25, 24, 20, 16, 15, 20, 22, 23, 20, 15, 14, 16,
];
// AS118 pp. 791–793, principal pendants 2–15. Strings preserve only
// securely legible hundreds digits. A broken cord cannot score a match.
const shorter = [620, 470, 528, 935, 474, 319, 453, 492, '6??', null, null, '4??', null, 275];
export const lastStart = longer.length - shorter.length + 1;
export const proposedStart = 7;

export function compareCords(start, includeDisputed) {
  return shorter.map((shortValue, i) => {
    const longNumber = start + i;
    const longValue = longer[longNumber - 1];
    let result;
    if (typeof shortValue !== 'number') result = 'Broken';
    else if (i === 2 && !includeDisputed) result = 'Set aside';
    else result = shortValue === longValue ? 'Match' : 'Different';
    return { shortNumber: 2 + i, shortValue, longNumber, longValue, result };
  });
}

export function scoreText(pairs) {
  const checked = pairs.filter(p => p.result === 'Match' || p.result === 'Different');
  return `${checked.filter(p => p.result === 'Match').length} of ${checked.length} numbers match`;
}

export function cordTables(pairs) {
  return [pairs.slice(0, 7), pairs.slice(7)].map(group => {
    const first = group[0], last = group[group.length - 1];
    return `<table class="cord-table"><caption>Short cords ${first.shortNumber}–${last.shortNumber} with long cords ${first.longNumber}–${last.longNumber}</caption>
      <thead><tr><th scope="col"><span aria-hidden="true">Cord #</span><span class="exhibit-sr">Cord on short khipu</span></th>${group.map(p => `<th scope="col">${p.shortNumber}</th>`).join('')}</tr></thead>
      <tbody><tr><th scope="row">Short</th>${group.map(p => `<td>${p.shortValue ?? '??'}</td>`).join('')}</tr>
      <tr><th scope="row">Long</th>${group.map(p => `<td>${p.longValue}${p.longNumber === 9 ? '<sup aria-label="disputed">*</sup>' : ''}</td>`).join('')}</tr>
      <tr><th scope="row">Result</th>${group.map(p => `<td class="cord-result" data-state="${p.result}"><span aria-hidden="true">${{'Match':'✓', 'Different':'≠', 'Broken':'?', 'Set aside':'—'}[p.result]}</span><span class="exhibit-sr">${p.result}</span></td>`).join('')}</tr></tbody></table>`;
  }).join('');
}

export function cordReader() {
  const pairs = compareCords(proposedStart, false);
  return `<section id="exhibit" class="source-exhibit cord-reader" aria-labelledby="alignment-title">
    <h2 id="alignment-title">Line up the cords</h2>
    <p>Keep the short khipu still and move the long one beneath it. Look for a run of numbers that agree. Each column compares one cord from each object.</p>
    <div id="cord-controls" hidden>
      <label for="start-cord">Starting cord on the long khipu</label>
      <div class="cord-track"><button type="button" id="step-back" aria-label="Move back one cord">−</button><input type="range" id="start-cord" min="1" max="${lastStart}" value="${proposedStart}"><button type="button" id="step-forward" aria-label="Move forward one cord">+</button></div>
      <div class="cord-actions"><button type="button" id="show-match">Show the proposed match</button><label><input type="checkbox" id="include-reading"> Include the disputed comparison</label></div>
    </div>
    <p id="cord-score" role="status" aria-live="polite" aria-atomic="true"><strong>${scoreText(pairs)}</strong> · long cords 7–20</p>
    <div id="cord-tables">${cordTables(pairs)}</div>
    <p class="cord-key">✓ Match &nbsp; ≠ Different &nbsp; ? Broken &nbsp; — Set aside</p>
    <p class="exhibit-small">A question mark stands for a lost digit or reading. An asterisk marks long cord 9. The modern record gives it 528, the older table gives it 0. The score skips short cord 4 at every setting. In the proposed match, that is the cord facing the disputed 528.</p>
    <noscript><p>The tables show the proposed match. Including the modern reading of 528 gives eight matches out of nine.</p></noscript>
    </section><script type="module" src="/leads/pachacamac-khipus/reader.js"></script>`;
}
