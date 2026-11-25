// Exhibit 1: night-by-place grid · Exhibit 2: synchronized clock, Paulian's sky, line-of-sight cross-section
const SVG_NS = "http://www.w3.org/2000/svg";
const NIGHT_IDS = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

// Rows run from nearest the 1770 magnetic pole (top) to farthest (bottom).
const PLACES = [
  { id: "trondhjem", name: "Trondhjem", region: "Norway", mlat: "+66°" },
  { id: "brunflo", name: "Brunflo", region: "Sweden", mlat: "+65°" },
  { id: "norrbarke", name: "Norrbärke", region: "Sweden", mlat: "+62°" },
  { id: "stockholm", name: "Stockholm", region: "Sweden", mlat: "+61°" },
  { id: "spb", name: "St. Petersburg", region: "Russia", mlat: "+59°" },
  { id: "lund", name: "Lund", region: "Sweden", mlat: "+58°" },
  { id: "lubeck", name: "Lübeck", region: "Germany", mlat: "+57°" },
  { id: "london", name: "London", region: "Britain", mlat: "+56°" },
  { id: "berlin", name: "Berlin", region: "Prussia", mlat: "+55°" },
  { id: "montmorency", name: "Montmorency", region: "near Paris", mlat: "+53°" },
  { id: "denain", name: "Denainvilliers", region: "France", mlat: "+53°" },
  { id: "cambridge", name: "Cambridge", region: "Massachusetts", mlat: "+52°" },
  { id: "bohringen", name: "Böhringen", region: "Germany", mlat: "+52°" },
  { id: "gurzelen", name: "Gurzelen", region: "Switzerland", mlat: "+50°" },
  { id: "vienna", name: "Vienna", region: "Austria", mlat: "+50°" },
  { id: "nimes", name: "Nîmes", region: "southern France", mlat: "+48°" },
  { id: "cererols", name: "Cererols", region: "Catalonia", mlat: "+47°" },
  { id: "beijing", name: "Beijing", region: "Father Amiot", mlat: "+30°" },
  { id: "eastasia", name: "China & Japan", region: "~110 records", mlat: "+19–30°" },
  { id: "timor", name: "HMS Endeavour", region: "off Timor", mlat: "−21°" },
  { id: "mauritius", name: "Mauritius", region: "Le Gentil", mlat: "−24°" },
];
const BY_ID = Object.fromEntries(PLACES.map((p) => [p.id, p]));

const fill = (from, to, kind, note) => Object.fromEntries(NIGHT_IDS.filter((n) => +n >= from && +n <= to).map((n) => [n, [kind, note]]));

// [kind, short note] per place per night. Blank = no record.
const CELLS = {
  trondhjem: {
    9: ["cloud", "Drifting clouds"], 10: ["clear", "Clear and windy; no aurora"], 11: ["new", "Northern lights, clear and calm"],
    12: ["cloud", "Overcast and rain"], ...fill(13, 16, "cloud", "Drifting clouds"), 17: ["new", "Northern lights, clear and calm"],
    18: ["new", "Northern lights again"], 19: ["cloud", "Overcast and rain"], 20: ["cloud", "Overcast"],
  },
  brunflo: { 19: ["new", "Aurora in the evening"] },
  norrbarke: { 10: ["new", "High aurora before dawn on the 11th"] },
  stockholm: { 20: ["new", "Weak aurora all evening"] },
  spb: fill(12, 20, "cloudm", "A month of cloud and rain (2 clear days); no aurora"),
  lund: { 20: ["new", "Faint aurora at 8:30 PM"] },
  lubeck: { 17: ["known", "Aurora"] },
  london: {
    15: ["clear", "“Very fine warm day”; no aurora"], 16: ["clear", "Clear; no aurora"], 17: ["cloud", "“Very hot and gloomy”"],
    18: ["clear", "“An exceeding bright, hot day”; no aurora"], 19: ["cloud", "Stormy"],
  },
  berlin: { 9: ["known", "Aurora"], 17: ["known", "Aurora"] },
  montmorency: { 17: ["known", "Aurora; compass needle restless all day"] },
  denain: {
    9: ["cloud", "Partly cloudy"], 10: ["cloud", "Partly cloudy"], 11: ["cloud", "Overcast"], 12: ["cloud", "Rain"], 13: ["cloud", "Changeable"],
    14: ["clear", "Clear; no aurora"], 16: ["clear", "Clear; no aurora"], 17: ["clear", "Clear; no aurora logged, though one was seen near Paris"],
    18: ["clear", "Clear; no aurora"], 19: ["cloud", "Cloudy"], 20: ["cloud", "Cloudy"],
  },
  cambridge: { 9: ["known", "Aurora"], 10: ["known", "Aurora (the entry NASA misdates to Sept 16)"], 16: ["bug", "NASA lists an aurora here: a misprint for Sept 10"] },
  bohringen: { 17: ["known", "Aurora"], 20: ["known", "Aurora"] },
  gurzelen: { 17: ["known", "“A small northern light”"] },
  vienna: { 17: ["known", "“A very strong northern light” at 9 PM"] },
  nimes: { 17: ["new", "Red aurora beneath Capella, 7–9 PM"] },
  cererols: { 17: ["cand", "Undated “blood-colored rays”; this night is a guess"] },
  beijing: { 17: ["known", "Aurora from 9 PM to 3 AM"] },
  eastasia: {
    10: ["asia1", "Storm begins: a few sightings"], 11: ["asia1", "A few sightings"], 12: ["asia1", "A few sightings"], 13: ["asia1", "A few sightings"],
    14: ["asia2", "Many sightings"], 15: ["asia2", "Many sightings"], 16: ["asia3", "Major surge"], 17: ["asia4", "Peak: 74 of the ~110 records"],
    18: ["asia3", "Strong"], 19: ["asia2", "Final night"],
  },
  timor: { 16: ["known", "Red southern lights seen from the ship"] },
  mauritius: fill(9, 20, "none", "No aurora recorded all month"),
};

const KIND_LABEL = {
  new: "Aurora, newly found", known: "Aurora, already known", cand: "Possible aurora, date uncertain",
  clear: "Clear sky, no aurora", cloud: "Cloud or rain", cloudm: "Mostly cloud and rain", none: "No aurora recorded",
  bug: "Date error in NASA catalog", asia1: "Aurora", asia2: "Aurora", asia3: "Aurora", asia4: "Aurora",
};

const NIGHTS = {
  "9": {
    title: "September 9 — An early aurora in Berlin and New England",
    summary: "A day before the East Asian sightings begin, auroras appeared over Berlin and over Cambridge, Massachusetts. Trondhjem was under drifting cloud.",
    records: [
      { st: "berlin", kind: "known", badge: "Already known · NASA catalog", note: "Nicolaus von Béguelin recorded an aurora borealis in Berlin." },
      { st: "cambridge", kind: "known", badge: "Already known · Lovering 1867", note: "John Winthrop logged “1770 Sept. 9. Evening. Aurora Borealis.”" },
      { st: "trondhjem", kind: "cloud", badge: "Cloudy · Berlin 1784", note: "Driveskyer og stille (drifting clouds and calm); no aurora logged." },
    ],
  },
  "10": {
    title: "September 10 — The storm begins in East Asia; New England and Sweden",
    summary: "The first East Asian sightings appear. John Winthrop saw a second aurora in Cambridge, Massachusetts (the entry NASA’s catalog later misdated to Sept 16), and Norrbärke in Sweden saw a high aurora before dawn.",
    records: [
      { st: "cambridge", kind: "known", badge: "Corrected date", note: "Winthrop entry 158: “1770 Sept. 10. Evening. Aurora Borealis.” Misprinted as Sept 16 in Lovering (1868) and in NASA’s file ane720t.txt." },
      { st: "norrbarke", kind: "new", badge: "Newly found · Rubenson 1879", note: "Recorded as “10 m.”, which in Rubenson’s noon-to-noon astronomical day means the early morning of Sept 11: “élevée” (high aurora)." },
      { st: "trondhjem", kind: "clear", badge: "Clear, no aurora · Berlin 1784", note: "Klart og vindigt (clear and windy) at night, with no aurora recorded." },
      { st: "eastasia", kind: "known", badge: "Storm begins", note: "The first scattered East Asian reports." },
    ],
  },
  "11": {
    title: "September 11 — Norway sees the aurora",
    summary: "NASA’s catalog has no Western sightings between Sept 11 and Sept 16. Johan Daniel Berlin’s daily log from Trondhjem breaks that silence: northern lights on a clear, calm night, while north-central France was overcast.",
    records: [
      { st: "trondhjem", kind: "new", badge: "Newly found · Berlin 1784", note: "Night column: “Nordlys, klart og stille” (northern lights, clear and calm). The first European sighting found for Sept 11." },
      { st: "denain", kind: "cloud", badge: "Overcast · Duhamel 1774", note: "Couvert (overcast) at Denainvilliers, France." },
      { st: "eastasia", kind: "known", badge: "East Asia", note: "Scattered sightings continue in China and Japan." },
    ],
  },
  "12": {
    title: "September 12 — Rain in Norway and Russia",
    summary: "Rain closed over Trondhjem and France turned wet. In St. Petersburg, Euler’s weather log shows a month of almost constant cloud: only 2 clear days between Sept 12 and Oct 11.",
    records: [
      { st: "trondhjem", kind: "cloud", badge: "Rain · Berlin 1784", note: "Tykt, Regn og stille (overcast, rain and calm)." },
      { st: "spb", kind: "cloud", badge: "Cloudy month · Euler 1770", note: "Sept 12–Oct 11 (Sept 1–30 in Russia’s Julian calendar): 2 clear days, 5 foggy, 10 rainy, no auroras." },
      { st: "eastasia", kind: "known", badge: "East Asia", note: "Scattered sightings continue." },
    ],
  },
  "13": {
    title: "September 13 — Cloud over northern Europe",
    summary: "Drifting cloud over Trondhjem, changeable weather in France, and no Western sightings.",
    records: [
      { st: "trondhjem", kind: "cloud", badge: "Cloudy · Berlin 1784", note: "Driveskyer og stille (drifting clouds and calm)." },
      { st: "spb", kind: "cloud", badge: "Cloudy month · Euler 1770", note: "St. Petersburg was clouded out for most of the month." },
      { st: "eastasia", kind: "known", badge: "East Asia", note: "East Asian red-sky reports continue." },
    ],
  },
  "14": {
    title: "September 14 — Clear skies in France, no aurora",
    summary: "Henri-Louis Duhamel du Monceau recorded fine weather at Denainvilliers and no aurora. He did note auroras in the same column when he saw them (for example on 27 January 1770).",
    records: [
      { st: "denain", kind: "clear", badge: "Clear, no aurora · Duhamel 1774", note: "Beau temps (fine weather); no aurora logged." },
      { st: "trondhjem", kind: "cloud", badge: "Cloudy · Berlin 1784", note: "Driveskyer og stille (drifting clouds)." },
      { st: "eastasia", kind: "known", badge: "East Asia", note: "East Asian sightings grow." },
    ],
  },
  "15": {
    title: "September 15 — Clear skies in London, no aurora",
    summary: "The weather diary in the Gentleman’s Magazine called it a “very fine warm day” in London, and no aurora was reported anywhere in Britain, while sightings in East Asia kept building.",
    records: [
      { st: "london", kind: "clear", badge: "Clear, no aurora · Gentleman’s Magazine", note: "“Very fine warm day”; no aurora reported anywhere in Britain." },
      { st: "trondhjem", kind: "cloud", badge: "Cloudy · Berlin 1784", note: "Driveskyer og stille (drifting clouds)." },
      { st: "eastasia", kind: "known", badge: "East Asia", note: "Reports rising across Japan and China." },
    ],
  },
  "16": {
    title: "September 16 — Southern lights off Timor; clear and dark in Europe",
    summary: "A major surge: Cook’s crew on HMS Endeavour off Timor saw red southern lights while East Asia saw red northern lights the same night. Clear skies in London and Denainvilliers showed nothing. NASA’s catalog lists a Cambridge, Massachusetts aurora on this night, but it is a misprint for Sept 10.",
    records: [
      { st: "timor", kind: "known", badge: "Southern lights", note: "Joseph Banks and Sydney Parkinson aboard HMS Endeavour logged a vivid red southern sky." },
      { st: "eastasia", kind: "known", badge: "Major surge", note: "Widespread red auroras across China and Japan." },
      { st: "london", kind: "clear", badge: "Clear, no aurora · Gentleman’s Magazine", note: "Clear; no aurora reported in Britain." },
      { st: "denain", kind: "clear", badge: "Clear, no aurora · Duhamel 1774", note: "Beau temps (fine weather); no aurora logged." },
      { st: "cambridge", kind: "bug", badge: "Date error in NASA catalog", note: "NASA’s ane720t.txt (line 667) lists 1770-09-16 at Cambridge, MA, copied from Lovering’s 1868 misprint of Winthrop’s Sept 10 entry." },
      { st: "mauritius", kind: "none", badge: "No aurora recorded · Le Gentil", note: "The astronomer Guillaume Le Gentil, living on Mauritius, recorded no aurora in September." },
    ],
  },
  "17": {
    title: "September 17 — The peak night, and a fading storm by Europe’s evening",
    summary: "East Asia had its strongest night (74 of about 110 East Asian records), and Father Amiot watched the aurora in Beijing from 9 PM to 3 AM. Those hours were daytime in France, where Louis Cotte saw his compass needle jumping. When night reached Europe, an aurora was seen at ten places from Trondhjem down to Nîmes, but Paulian’s sighting under the star Capella shows it was already much weaker and farther north than in Asia.",
    records: [
      { st: "nimes", kind: "new", badge: "Newly found · Paulian 1773", note: "The reddest part lay directly beneath Capella at 8:30 PM, and it was gone by 9 PM. See Exhibit 2." },
      { st: "trondhjem", kind: "new", badge: "Newly found · Berlin 1784", note: "“Nordlys. Klart og stille.” Missing from Fritz’s 1873 list and NASA’s catalog." },
      { st: "montmorency", kind: "known", badge: "Aurora + restless compass", note: "Louis Cotte saw his compass needle swing by 15 and 20 arcminutes all day and predicted that evening’s aurora." },
      { st: "beijing", kind: "known", badge: "9 PM–3 AM Beijing time", note: "Father Amiot recorded “lames & jets de lumière” (sheets and jets of light) through the night. In Europe that was early afternoon to evening." },
      { st: "eastasia", kind: "known", badge: "Peak night", note: "74 of about 110 East Asian records fall on this night, reaching as far south as Lake Dongting in central China." },
      { st: "vienna", kind: "known", badge: "Newspaper report", note: "Amsterdamsche Courant (2 Oct 1770): “een zeer sterk Noorderlicht” (a very strong northern light) at 9 PM." },
      { st: "gurzelen", kind: "known", badge: "Diary · Wolf 1855", note: "Pastor J. J. Sprüngli: “September 17: Ein kleines Nordlicht” (a small northern light)." },
      { st: "berlin", kind: "known", badge: "Central Europe", note: "Also seen at Lübeck, Böhringen, Paris, and in Burgundy." },
      { st: "cererols", kind: "cand", badge: "Undated · Aragonès 2010", note: "A Catalan farmer’s chronicle notes “blood-colored rays” some time after Lexell’s Comet (seen from Aug 3). No day is given." },
      { st: "london", kind: "cloud", badge: "Overcast · Gentleman’s Magazine", note: "“Very hot and gloomy”, which explains why Britain saw nothing." },
      { st: "denain", kind: "clear", badge: "Clear, none logged · Duhamel", note: "Beau temps, yet no aurora logged, though one was seen near Paris. Duhamel’s blank column is weaker evidence than it looks." },
    ],
  },
  "18": {
    title: "September 18 — Norway lit up; clear Britain and France stayed dark",
    summary: "East Asia was still active, and Trondhjem had a second clear night with northern lights, the first European sighting found for Sept 18. Farther south, clear skies over London and Denainvilliers showed nothing.",
    records: [
      { st: "trondhjem", kind: "new", badge: "Newly found · Berlin 1784", note: "“idem” (= Nordlys. Klart og stille). The first European sighting found for Sept 18." },
      { st: "london", kind: "clear", badge: "Clear, no aurora · Gentleman’s Magazine", note: "“An exceeding bright, hot day”; no aurora reported in Britain." },
      { st: "denain", kind: "clear", badge: "Clear, no aurora · Duhamel 1774", note: "Beau temps (fine weather); no aurora logged." },
      { st: "eastasia", kind: "known", badge: "Still strong", note: "Strong red displays continued in Japan and China. (The Dutch post at Dejima, Japan, wrote “nothing to note.”)" },
    ],
  },
  "19": {
    title: "September 19 — East Asia’s last night; an aurora in central Sweden",
    summary: "East Asia logged its last night of the storm. Rain returned to Trondhjem, while Brunflo in central Sweden saw an aurora in the evening.",
    records: [
      { st: "brunflo", kind: "new", badge: "Newly found · Rubenson 1879", note: "Evening aurora at Brunflo, Jämtland (reported in Inrikes Tidningar, 1771, no. 76). Missing from Fritz and NASA’s catalog." },
      { st: "trondhjem", kind: "cloud", badge: "Rain · Berlin 1784", note: "Tykt, Regn og stille (overcast, rain and calm)." },
      { st: "eastasia", kind: "known", badge: "Final night", note: "The last night of the East Asian sequence." },
    ],
  },
  "20": {
    title: "September 20 — A weak last aurora in Sweden and Germany",
    summary: "After East Asia went quiet, a weak aurora was seen at Stockholm, Lund, and Böhringen, while Trondhjem stayed overcast.",
    records: [
      { st: "stockholm", kind: "new", badge: "Newly found · Rubenson 1879", note: "“Toute la soirée … peu forte”: all evening, not strong (Stockholm Observatory manuscript). Missing from Fritz and NASA’s catalog." },
      { st: "lund", kind: "new", badge: "Newly found · Rubenson 1879", note: "8:30 PM: “faible” (faint). The scanned text misreads the time as “3,30”. Missing from Fritz and NASA’s catalog." },
      { st: "bohringen", kind: "known", badge: "Already known · NASA catalog", note: "Listed in NASA’s temp01.txt under 1770-09-20 BOERINGEN." },
      { st: "trondhjem", kind: "cloud", badge: "Overcast · Berlin 1784", note: "Tykt og stille (overcast and calm)." },
    ],
  },
  "all": {
    title: "All twelve nights at a glance",
    summary: "Eight newly found sightings in Norway, Sweden, and southern France fill in Europe’s side of the storm. Clear but dark skies in Britain and France show that the storm did not reach Europe evenly, and Paulian’s sighting under Capella shows how far north the aurora had pulled back by Europe’s evening on Sept 17.",
    records: [
      { st: "trondhjem", kind: "new", badge: "3 newly found nights", note: "Berlin’s table gives the sky every night of the month, with northern lights on Sept 11, 17, and 18." },
      { st: "nimes", kind: "new", badge: "Newly found · Sept 17", note: "Paulian’s sighting under Capella shows where the red glow sat over Europe that evening." },
      { st: "stockholm", kind: "new", badge: "4 newly found Swedish sightings", note: "Rubenson (1879): Norrbärke (Sept 10–11), Brunflo (19), Lund (20), Stockholm (20), all missing from Fritz and NASA’s catalog." },
      { st: "cambridge", kind: "bug", badge: "NASA date error corrected", note: "Winthrop saw auroras on Sept 9 and 10, not Sept 16." },
      { st: "london", kind: "clear", badge: "Clear skies, no aurora", note: "London (Sept 15, 16, 18) and Denainvilliers (Sept 14, 16, 18) were clear, with no aurora." },
      { st: "timor", kind: "known", badge: "Already known", note: "About 110 East Asian records (Sept 10–19), plus HMS Endeavour off Timor on Sept 16." },
      { st: "mauritius", kind: "none", badge: "No aurora recorded", note: "Le Gentil on Mauritius and the Dutch East India Company’s archives across Asia and the Cape logged no aurora in September 1770." },
      { st: "spb", kind: "cloud", badge: "Cloudy month", note: "Only 2 clear days between Sept 12 and Oct 11 (Euler 1770)." },
    ],
  },
};

const NIGHT_TAGS = {
  "9": "early", "10": "onset", "11": "Norway", "12": "", "13": "", "14": "", "15": "", "16": "Timor", "17": "peak", "18": "Norway", "19": "", "20": "tail",
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function initStormExplorer() {
  const grid = document.getElementById("storm-grid");
  const allBtn = document.getElementById("storm-all-btn");
  const titleEl = document.getElementById("readout-date");
  const summaryEl = document.getElementById("readout-summary");
  const listEl = document.getElementById("readout-list");
  if (!grid || !titleEl) return;

  const head = `<thead><tr><th scope="col" class="sg-corner">Place</th><th scope="col" class="sg-mlat-h">Magnetic<br>latitude</th>${NIGHT_IDS.map((n) => `
    <th scope="col" class="sg-col" data-night="${n}"><button type="button" class="sg-night" data-night="${n}" aria-pressed="false"><span class="sg-day">${n}</span><span class="sg-tag">${NIGHT_TAGS[n]}</span></button></th>`).join("")}</tr></thead>`;

  const body = PLACES.map((p) => {
    const cells = NIGHT_IDS.map((n) => {
      const c = CELLS[p.id]?.[n];
      if (!c) return `<td class="sg-cell" data-night="${n}"></td>`;
      const [kind, note] = c;
      const label = `${p.name}, Sept ${n}: ${note}`;
      return `<td class="sg-cell" data-night="${n}"><button type="button" class="sg-mark sg-${kind}" data-night="${n}" title="${esc(label)}" aria-label="${esc(label)}"></button></td>`;
    }).join("");
    const gap = p.id === "beijing" ? " sg-gap" : "";
    return `<tr class="sg-row${gap}"><th scope="row"><span class="sg-place">${p.name}</span><span class="sg-region">${p.region}</span></th><td class="sg-mlat">${p.mlat}</td>${cells}</tr>`;
  }).join("");

  grid.innerHTML = `<caption class="sr-only">What observers recorded at each place on each night, 9–20 September 1770</caption>${head}<tbody>${body}</tbody>`;

  function renderNight(key) {
    const data = NIGHTS[key] || NIGHTS["17"];
    grid.querySelectorAll("[data-night]").forEach((el) => el.classList.toggle("is-sel", el.dataset.night === key));
    grid.querySelectorAll(".sg-night").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.night === key)));
    allBtn?.setAttribute("aria-pressed", String(key === "all"));
    allBtn?.classList.toggle("is-active", key === "all");
    titleEl.textContent = data.title;
    summaryEl.textContent = data.summary;
    listEl.innerHTML = data.records.map((rec) => {
      const st = BY_ID[rec.st];
      const name = st ? `${st.name}${st.region && !/records|Amiot|Le Gentil/.test(st.region) ? `, ${st.region}` : ""}` : rec.st;
      return `<li class="st-card st-${rec.kind}">
        <strong>${esc(name)}</strong>
        <span>${esc(rec.badge)}</span>
        <p>${esc(rec.note)}</p>
      </li>`;
    }).join("");
  }

  grid.addEventListener("click", (e) => {
    const el = e.target.closest("button[data-night]");
    if (el) renderNight(el.dataset.night);
  });
  allBtn?.addEventListener("click", () => renderNight("all"));
  renderNight("17");
}

/* ---------- Exhibit 2a: one day, four clocks ---------- */
function initClock() {
  const svg = document.getElementById("utc-svg");
  if (!svg) return;
  const X0 = 150, X1 = 684, W = X1 - X0;
  const x = (h) => X0 + (h / 24) * W;
  // Night = local sunset to sunrise on 17–18 Sept 1770, in UTC.
  const rows = [
    { who: "Beijing", sub: "Father Amiot", night: [[0, 5.9], [10.35, 24]], bars: [{ from: 13.25, to: 19.25, cls: "ub-asia", label: "aurora 9 PM–3 AM" }] },
    { who: "Montmorency", sub: "Louis Cotte", night: [[0, 5.5], [18.0, 24]], bars: [{ from: 5.5, to: 18.0, cls: "ub-needle", label: "compass restless all day" }] },
    { who: "Vienna", sub: "newspaper", night: [[0, 4.6], [17.05, 24]], points: [{ at: 19.9, label: "“very strong” at 9 PM" }] },
    { who: "Nîmes", sub: "Aimé-Henri Paulian", night: [[0, 5.4], [17.85, 24]], bars: [{ from: 18.62, to: 20.62, cls: "ub-eu", label: "aurora, 7–9 PM" }], star: 20.12 },
  ];
  const ROW_H = 46, TOP = 14;
  let out = "";
  rows.forEach((r, i) => {
    const y = TOP + i * ROW_H;
    out += `<text class="u-who" x="0" y="${y + 15}">${r.who}</text><text class="u-sub" x="0" y="${y + 29}">${r.sub}</text>`;
    out += `<rect class="u-day" x="${X0}" y="${y + 4}" width="${W}" height="26"/>`;
    for (const [a, b] of r.night) out += `<rect class="u-night" x="${x(a)}" y="${y + 4}" width="${x(b) - x(a)}" height="26"/>`;
    for (const b of r.bars || []) {
      out += `<rect class="${b.cls}" x="${x(b.from)}" y="${y + 10}" width="${x(b.to) - x(b.from)}" height="14" rx="2"/>`;
      const anchorEnd = b.to > 20;
      const lx = anchorEnd ? x(b.from) - 6 : x(b.from) + 6;
      out += `<text class="u-bar-lbl${anchorEnd ? " u-end" : " u-in"}" x="${lx}" y="${y + 21}">${b.label}</text>`;
    }
    for (const p of r.points || []) {
      out += `<circle class="u-pt" cx="${x(p.at)}" cy="${y + 17}" r="5"/>`;
      out += `<text class="u-bar-lbl u-end" x="${x(p.at) - 9}" y="${y + 21}">${p.label}</text>`;
    }
    if (r.star) out += `<text class="u-star" x="${x(r.star)}" y="${y + 22}" text-anchor="middle">★</text>`;
  });
  const yb = TOP + rows.length * ROW_H;
  for (let h = 0; h <= 24; h += 3) {
    out += `<line class="u-tick" x1="${x(h)}" y1="${TOP + 2}" x2="${x(h)}" y2="${yb + 2}"/>`;
    out += `<text class="u-tick-lbl" x="${x(h)}" y="${yb + 16}" text-anchor="middle">${String(h).padStart(2, "0")}:00</text>`;
  }
  out += `<text class="u-axis" x="${X0 + W / 2}" y="${yb + 34}" text-anchor="middle">Universal Time (UTC) on 17 September 1770</text>`;
  out += `<line class="u-now" x1="${x(20.12)}" y1="${TOP - 6}" x2="${x(20.12)}" y2="${yb + 2}"/>`;
  svg.setAttribute("viewBox", `0 0 712 ${yb + 42}`);
  svg.innerHTML = out;
}

/* ---------- Exhibit 2b: Paulian's view of the NNE sky ---------- */
// Alt/az over Nîmes (43.84°N) when Capella stood at 9.2°, az 31.7°: J2000 positions precessed to 1770.7.
const SKY_STARS = [
  { n: "Capella", alt: 9.2, az: 31.7, mag: 0.1, label: true },
  { n: "Menkalinan", alt: 4.7, az: 25.5, mag: 1.9 },
  { n: "ε Aur", alt: 8.7, az: 35.1, mag: 3.0 },
  { n: "η Aur", alt: 6.1, az: 35.8, mag: 3.2 },
  { n: "ζ Aur", alt: 6.3, az: 36.6, mag: 3.7 },
  { n: "ι Aur", alt: 0.3, az: 41.8, mag: 2.7 },
  { n: "Mirfak", alt: 24.1, az: 44.2, mag: 1.8, label: true },
  { n: "Algol", alt: 20.3, az: 53.4, mag: 2.1, label: true },
  { n: "Pleiades", alt: 2.5, az: 59.4, mag: 1.6, label: true },
  { n: "Polaris", alt: 44.5, az: 2.5, mag: 2.0, label: true },
];

function initSky() {
  const svg = document.getElementById("sky-svg");
  if (!svg) return;
  const AZ0 = -12, AZ1 = 72, W = 560, H0 = 345, K = W / (AZ1 - AZ0);
  const sx = (az) => (az - AZ0) * K;
  const sy = (alt) => H0 - alt * K;
  const H = H0 + 34;
  const cx = sx(31.7);
  let out = `<defs>
    <linearGradient id="sky-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1020"/><stop offset="1" stop-color="#1b2238"/></linearGradient>
    <radialGradient id="sky-glow" cx="${cx}" cy="${sy(5)}" r="${sx(30) - sx(0)}" gradientUnits="userSpaceOnUse" gradientTransform="translate(${cx} ${sy(5)}) scale(1.35 .62) translate(${-cx} ${-sy(5)})">
      <stop offset="0" stop-color="#e0413a" stop-opacity=".72"/><stop offset=".45" stop-color="#b3262b" stop-opacity=".38"/><stop offset="1" stop-color="#7a1622" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sky-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff6b5a" stop-opacity=".34"/><stop offset="1" stop-color="#ff6b5a" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#sky-bg)"/>
  <rect x="0" y="0" width="${W}" height="${H0}" fill="url(#sky-glow)"/>`;
  [12, 18, 24, 29, 33, 38, 43, 49].forEach((az, i) => {
    const w = 10 + (i % 3) * 5, top = 14 + (i % 4) * 4;
    out += `<rect x="${sx(az) - w / 2}" y="${sy(top)}" width="${w}" height="${H0 - sy(top)}" fill="url(#sky-ray)"/>`;
  });
  // Auriga's "Kids" and Capella–Menkalinan line
  const S = Object.fromEntries(SKY_STARS.map((s) => [s.n, s]));
  const line = (a, b) => `<line class="sky-line" x1="${sx(S[a].az)}" y1="${sy(S[a].alt)}" x2="${sx(S[b].az)}" y2="${sy(S[b].alt)}"/>`;
  out += line("Capella", "Menkalinan") + line("Capella", "ε Aur") + line("ε Aur", "ζ Aur") + line("ζ Aur", "η Aur") + line("η Aur", "Capella") + line("Capella", "ι Aur") + line("Mirfak", "Algol");
  for (const s of SKY_STARS) {
    const r = Math.max(1.1, 4.2 - s.mag * 0.85);
    out += `<circle class="sky-star${s.n === "Capella" ? " sky-capella" : ""}" cx="${sx(s.az)}" cy="${sy(s.alt)}" r="${s.n === "Pleiades" ? 1.6 : r}"/>`;
    if (s.label) out += `<text class="sky-lbl${s.n === "Capella" ? " sky-lbl-cap" : ""}" x="${sx(s.az) + 8}" y="${sy(s.alt) - 6}">${s.n}</text>`;
  }
  out += `<text class="sky-note" x="${sx(31.7)}" y="${sy(15.5)}" text-anchor="middle">Auriga</text>`;
  // Ground
  out += `<path class="sky-ground" d="M0 ${H0} L${W} ${H0} L${W} ${H} L0 ${H} Z"/>`;
  out += `<path class="sky-hill" d="M0 ${H0 + 1} C 60 ${H0 - 9}, 120 ${H0 - 4}, 170 ${H0 - 1} S 300 ${H0 - 7}, 360 ${H0 - 2} S 480 ${H0 - 6}, ${W} ${H0 - 1} L ${W} ${H0 + 2} L 0 ${H0 + 2} Z"/>`;
  [[0, "N"], [22.5, "NNE"], [45, "NE"], [67.5, "ENE"]].forEach(([az, l]) => {
    out += `<text class="sky-dir" x="${sx(az)}" y="${H0 + 22}" text-anchor="middle">${l}</text>`;
  });
  [10, 20, 30, 40, 50].forEach((a) => {
    out += `<text class="sky-alt" x="${W - 6}" y="${sy(a) + 3}" text-anchor="end">${a}°</text><line class="sky-alt-line" x1="${W - 30}" y1="${sy(a)}" x2="${W - 2}" y2="${sy(a)}"/>`;
  });
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = out;
}

/* ---------- Exhibit 2c: line of sight, drawn to scale ---------- */
function initCapellaGeometry() {
  const svg = document.getElementById("capella-svg");
  const inputs = document.querySelectorAll('input[name="em-height"]');
  const mlatEl = document.getElementById("cap-mlat");
  const geoEl = document.getElementById("cap-geo");
  const gapEl = document.getElementById("cap-gap");
  if (!svg || !inputs.length) return;

  const MODELS = {
    "250": { mlat: "+53.9°", geo: "51.3°N, 11.9°E, over central Germany, about 1,000 km from Nîmes", gap: "20°–25°" },
    "400": { mlat: "+56.0°", geo: "54.1°N, 15.6°E, over the southern Baltic coast, about 1,400 km from Nîmes", gap: "22°–27°" },
    "500": { mlat: "+57.0°", geo: "55.5°N, 17.9°E, over the southern Baltic, about 1,600 km from Nîmes", gap: "23°–28°" },
  };

  const R_KM = 6371, ELEV = 9.2 * Math.PI / 180;
  const W = 560, Hh = 250, R = 1607, CX = 280, TOPY = 214, CY = TOPY + R, S = R / R_KM;
  const A_OBS = -7.5 * Math.PI / 180;
  const pt = (a, r) => [CX + r * Math.sin(a), CY - r * Math.cos(a)];
  const arc = (r, a0, a1) => {
    let d = "";
    for (let i = 0; i <= 60; i++) {
      const a = a0 + (a1 - a0) * (i / 60);
      const [px, py] = pt(a, r);
      d += `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)} `;
    }
    return d;
  };

  function update(hKey) {
    const h = +hKey;
    const m = MODELS[hKey];
    // Angle at Earth's centre between observer and the point under the glow (law of sines)
    const theta = Math.PI / 2 - ELEV - Math.asin((R_KM * Math.cos(ELEV)) / (R_KM + h));
    const rL = R + h * S;
    const [ox, oy] = pt(A_OBS, R);
    const [gx, gy] = pt(A_OBS + theta, rL);
    const [fx, fy] = pt(A_OBS + theta, R);
    // extend the sightline past the layer toward Capella
    const dx = gx - ox, dy = gy - oy, len = Math.hypot(dx, dy);
    const ex = ox + (dx / len) * (len + 90), ey = oy + (dy / len) * (len + 90);
    const tx = Math.cos(A_OBS), ty = Math.sin(A_OBS);
    const km = Math.round((theta * R_KM) / 100) * 100;
    const earth = arc(R, -11 * Math.PI / 180, 11 * Math.PI / 180);
    svg.innerHTML = `
      <path class="cap-earth" d="${earth} L ${W} ${Hh} L 0 ${Hh} Z"/>
      <path class="cap-shell-band" d="${arc(rL + 9, -11 * Math.PI / 180, 11 * Math.PI / 180)}"/>
      <path class="cap-shell" d="${arc(rL, -11 * Math.PI / 180, 11 * Math.PI / 180)}"/>
      <text class="cap-lbl-muted" x="14" y="${(pt(-10.4 * Math.PI / 180, rL)[1] + 24).toFixed(1)}">red glow layer, ${h} km up</text>
      <line class="cap-horizon" x1="${ox}" y1="${oy}" x2="${ox + tx * 210}" y2="${oy + ty * 210}"/>
      <line class="cap-ray" x1="${ox}" y1="${oy}" x2="${ex}" y2="${ey}"/>
      <ellipse class="cap-glow" cx="${gx}" cy="${gy}" rx="26" ry="9" transform="rotate(${(theta + A_OBS) * 180 / Math.PI} ${gx} ${gy})"/>
      <line class="cap-drop" x1="${gx}" y1="${gy}" x2="${fx}" y2="${fy}"/>
      <circle class="cap-obs" cx="${ox}" cy="${oy}" r="4.5"/>
      <text class="cap-lbl" x="${ox}" y="${oy + 20}" text-anchor="middle">Nîmes</text>
      <circle class="cap-foot" cx="${fx}" cy="${fy}" r="5"/>
      <text class="cap-lbl cap-lbl-strong" x="${fx}" y="${fy + 20}" text-anchor="middle">aurora overhead here</text>
      <text class="cap-lbl-muted" x="${(ox + fx) / 2}" y="${Hh - 8}" text-anchor="middle">← about ${km.toLocaleString("en")} km →</text>
      <text class="cap-star" x="${ex - 4}" y="${ey - 8}">★ Capella, 9.2° above the horizon</text>`;
    mlatEl.textContent = `${m.mlat} magnetic latitude`;
    geoEl.textContent = m.geo;
    gapEl.textContent = `${m.gap} closer to the pole`;
  }

  for (const inp of inputs) inp.addEventListener("change", () => { if (inp.checked) update(inp.value); });
  update("400");
}

initStormExplorer();
initClock();
initSky();
initCapellaGeometry();
