import { compareCords, cordTables, lastStart, proposedStart, scoreText } from './cords.js';

const slider = document.getElementById('start-cord');
const disputed = document.getElementById('include-reading');
const back = document.getElementById('step-back');
const forward = document.getElementById('step-forward');

function display(start) {
  slider.value = String(start);
  const pairs = compareCords(start, disputed.checked);
  const range = `long cords ${start}–${start + pairs.length - 1}`;
  slider.setAttribute('aria-valuetext', range);
  document.getElementById('cord-tables').innerHTML = cordTables(pairs);
  document.getElementById('cord-score').innerHTML = `<strong>${scoreText(pairs)}</strong> · ${range}`;
  back.disabled = start === 1;
  forward.disabled = start === lastStart;
}

slider.addEventListener('input', () => display(slider.valueAsNumber));
disputed.addEventListener('change', () => display(slider.valueAsNumber));
back.addEventListener('click', () => display(slider.valueAsNumber - 1));
forward.addEventListener('click', () => display(slider.valueAsNumber + 1));
document.getElementById('show-match').addEventListener('click', () => display(proposedStart));
display(5);
document.getElementById('cord-controls').hidden = false;
