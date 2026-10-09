// Pure HTML renderers, shared by the browser (app.js) and the static build (scripts/build.mjs).

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const FLAGS = {
  digitization: ["digitization", "dig", "Progress likely needs new digitization of known holdings, with archivists"],
  science: ["science", "sci", "Confirmation needs collaboration with scientists"],
  decipherment: ["decipherment", "dec", "Reading a code, cipher or undeciphered script"],
  forensics: ["forensics", "for", "Establishing how an object or dataset was made, or whether it is genuine"],
};

// Specialities a problem may need, beyond historians. Each problem's "needs" lists { who: slug, ask }.
export const NEEDS = [
  {
    "slug": "archivists",
    "short": "archivists",
    "label": "archivists and librarians",
    "title": "Archivists and librarians",
    "covers": "cataloguing, digitization, locating records",
    "pitch": "Many of these problems are stalled not for lack of ideas but because the records that would settle them are uncatalogued, undigitized, or scattered across institutions. Archivists and librarians know where those records are, what condition they are in, and what it would take to make them searchable."
  },
  {
    "slug": "archaeologists",
    "label": "archaeologists",
    "title": "Archaeologists",
    "covers": "excavation, field survey, site databases, radiocarbon, isotopes and materials analysis",
    "pitch": "Several problems turn on sites that have never been securely identified, excavated or published in full, or on claims that radiocarbon dates, isotope signatures and materials analysis could test. Archaeologists and archaeological scientists can supply the field evidence, dating and laboratory results that documents alone cannot."
  },
  {
    "slug": "geneticists",
    "label": "geneticists",
    "title": "Geneticists",
    "covers": "ancient DNA of pathogens, people, plants and animals",
    "pitch": "Ancient DNA has already reshaped the history of plague and of human migration. These problems ask what sequencing pathogens, people, plants and animals could still settle, and where the samples are."
  },
  {
    "slug": "epidemiologists",
    "label": "epidemiologists",
    "title": "Epidemiologists",
    "covers": "disease transmission and mortality",
    "pitch": "Historical mortality estimates often rest on assumptions about how a disease spread and how deadly it was. Epidemiologists can test those assumptions against what is known of transmission, and say which figures are plausible."
  },
  {
    "slug": "demographers",
    "label": "demographers",
    "title": "Demographers",
    "covers": "population estimates and under-registration",
    "pitch": "Population figures for the past are reconstructed from tax registers, censuses and tribute lists that each counted different people in different ways. Demographers can model under-registration and test which estimates the records can actually support."
  },
  {
    "slug": "geoscientists",
    "label": "geoscientists",
    "title": "Geoscientists",
    "covers": "volcanology, ice cores, palaeoclimate, tsunami deposits, river courses",
    "pitch": "Ice cores, tsunami deposits, tree rings and shifting river courses record events that written sources describe only partly or not at all. These problems need geoscientists to match the physical record with the documentary one."
  },
  {
    "slug": "astronomers",
    "label": "astronomers",
    "title": "Astronomers",
    "covers": "ancient observations, dating by eclipses and conjunctions",
    "pitch": "Ancient observations of eclipses, conjunctions and stars can fix dates and test the honesty of old records, but only with careful modelling of what was visible, where and when."
  },
  {
    "slug": "statisticians",
    "short": "data scientists",
    "label": "statisticians and data scientists",
    "title": "Statisticians and data scientists",
    "covers": "modelling, estimating what is missing, image and text analysis",
    "pitch": "Many of these problems come down to estimating what is missing, separating signal from noise, or testing whether a pattern beats chance. Statisticians and data scientists can design those tests and make the reasoning explicit and repeatable."
  },
  {
    "slug": "computational-linguists",
    "label": "computational linguists",
    "title": "Computational linguists",
    "covers": "sign statistics, language models, stylometry",
    "pitch": "Undeciphered scripts and disputed texts can be approached through sign statistics, language models and stylometry. These problems need computational linguists who can set up tests that a proposed reading must pass."
  },
  {
    "slug": "philologists",
    "short": "philologists",
    "label": "philologists and epigraphers",
    "title": "Philologists and epigraphers",
    "covers": "historical languages, scripts and manuscripts: medieval Arabic and Persian, Classical Chinese, Sanskrit, Ge'ez, cuneiform, Meroitic and others",
    "pitch": "Much of the evidence lies in manuscripts, inscriptions and early printed texts whose languages, scripts and conventions take specialist training to read: medieval Arabic and Persian manuscripts, Classical Chinese, Sanskrit, Ge'ez, cuneiform, Meroitic and more. Philologists and epigraphers are needed to read, edit and check these sources, including whatever AI tools extract from them."
  },
  {
    "slug": "cryptographers",
    "label": "cryptographers",
    "title": "Cryptographers",
    "covers": "codes and ciphers",
    "pitch": "Some historical documents were written to be unreadable. Cryptographers can identify the system behind a code or cipher and test proposed solutions against the surviving text."
  },
  {
    "slug": "conservation-scientists",
    "label": "conservation scientists",
    "title": "Conservation scientists",
    "covers": "imaging and materials analysis of manuscripts, paintings and objects",
    "pitch": "Imaging and materials analysis can show how an object was made, when, and whether it is what it claims to be. Conservation scientists can say which techniques are feasible on fragile manuscripts, paintings and objects, and what they could reveal."
  },
  {
    "slug": "gis",
    "label": "GIS specialists",
    "title": "GIS specialists",
    "covers": "mapping historical places, routes and boundaries",
    "pitch": "Places named in historical sources often have to be located, mapped and linked to changing boundaries before anything else can be done. GIS specialists can build the spatial frameworks these problems depend on."
  },
  {
    "slug": "economists",
    "label": "economists",
    "title": "Economists",
    "covers": "historical money, prices and production",
    "pitch": "Historical money flows and production figures are reconstructed from partial and often inconsistent records. Economists can test whether the estimates are consistent with prices, trade and output elsewhere."
  }
];
for (const n of NEEDS) n.short ??= n.label;
export const NEED = Object.fromEntries(NEEDS.map((n) => [n.slug, n]));

const yr = (y) => (y < 0 ? `${-y} BCE` : `${y}`);
export function period(p) {
  if (p.start == null) return "";
  if (p.start === p.end) return yr(p.start);
  if (p.start < 0 && p.end < 0) return `${-p.start}–${-p.end} BCE`;
  if (p.start < 0) return `${-p.start} BCE–${p.end} CE`;
  return `${p.start}–${p.end}`;
}

export const tags = (p) => (p.flags || []).map((f) => FLAGS[f] ? `<a class="tag ${FLAGS[f][1]}" href="/?tag=${f}" title="${esc(FLAGS[f][2])}">${FLAGS[f][0]}</a>` : "").join("")
  + (p.suggested ? `<span class="tag">suggested</span>` : "");

export const when = (t) => new Date(t).toISOString().slice(0, 10);

// AI models get a robot mark; anything else renders as a plain name.
const BOT = `<svg class="bot" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.2v2.1" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="6" cy="1.2" r=".8" fill="currentColor"/><rect x="1.8" y="3.6" width="8.4" height="6.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="4.6" cy="6.8" r=".95" fill="currentColor"/><circle cx="7.4" cy="6.8" r=".95" fill="currentColor"/></svg>`;
export const agent = (name, did) => `<span class="agent" title="${esc(`AI model: ${name}. ${did}`)}">${BOT}${esc(name)}</span>`;

export function prov(verb, by, on, did) {
  if (!by) return "";
  return `<p class="prov">${verb} by ${agent(by, did)}, ${esc(on)}</p>`;
}

// Author line for comments and proposed approaches.
export function who(c) {
  const name = c.agent ? agent(c.agent, c.name && c.name !== "Anonymous" ? `Posted for ${c.name}.` : "Posted by an AI agent.") : `<b>${esc(c.name || "Anonymous")}</b>`;
  return `${name}${c.agent && c.name && c.name !== "Anonymous" ? ` <span>for ${esc(c.name)}</span>` : ""} · ${when(c.t)}`;
}

// ---------- votes ----------
export const up = (ctx, id) => Number(ctx.tally[`${id}:up`]) || 0;
export const down = (ctx, id) => Number(ctx.tally[`${id}:down`]) || 0;
export const score = (ctx, id) => up(ctx, id) - down(ctx, id);
export const ncom = (ctx, id) => Math.max(0, Number(ctx.counts[id]) || 0);

export function voteBox(ctx, id) {
  const m = Number(ctx.mine[id]) || 0;
  // Counts stay hidden until a problem has a few votes, so a new list doesn't read as a column of zeros.
  const shown = m !== 0 || up(ctx, id) + down(ctx, id) >= 3;
  return `<div class="vote" data-id="${esc(id)}">
    <button type="button" data-v="1" aria-pressed="${m === 1}" aria-label="Upvote">▲</button>
    ${shown ? `<b title="${up(ctx, id)} up, ${down(ctx, id)} down">${score(ctx, id)}</b>` : `<b class="few" title="Fewer than 3 votes so far"></b>`}
    <button type="button" data-v="-1" aria-pressed="${m === -1}" aria-label="Downvote">▼</button>
  </div>`;
}

// ---------- list ----------
export const commentLabel = (ctx, id) => `${ctx.open?.has(id) ? "−" : "+"} ${ncom(ctx, id) || "comment"}`;

export function rowHTML(ctx, p, i) {
  return `
    <li class="row" id="r-${esc(p.id)}">
      <span class="rank">${i + 1}</span>
      ${voteBox(ctx, p.id)}
      <div class="main">
        <a class="ttl" href="/p/${esc(p.id)}">${esc(p.title)}</a>
        ${p.short ? `<p class="short">${esc(p.short)}</p>` : ""}
        ${tags(p) ? `<div class="tags">${tags(p)}</div>` : ""}
        <div class="m">${[p.field, p.region, period(p)].filter(Boolean).map(esc).join(" · ")}</div>
      </div>
      <span class="c">${esc(p.field)}</span>
      <span class="c">${esc(p.region)}</span>
      <span class="c per">${esc(period(p))}</span>
      <span class="c com"><button type="button" class="linkbtn" data-comments="${esc(p.id)}" aria-expanded="${!!ctx.open?.has(p.id)}">${commentLabel(ctx, p.id)}</button></span>
      <div class="cbox" data-for="${esc(p.id)}"></div>
    </li>`;
}

// ---------- detail ----------
function cite(e, i) {
  const title = e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a>` : esc(e.title);
  const venue = e.venue ? `, ${esc(String(e.venue).replace(/^In /, "in "))}` : "";
  return `<li id="src-w${i}"><span class="yr">${esc(e.year)}</span><div>${esc(e.authors)}, <span class="t">${title}</span>${venue}.${e.note ? `<span class="n">${esc(e.note)}</span>` : ""}</div></li>`;
}

function archive(a, i, link = (x) => x) {
  const dig = DIG[a.digitized] || "";
  const hs = a.holdings || [];
  const list = hs.length ? `<button type="button" class="hold-toggle" aria-expanded="false" aria-controls="hold-${i}">Expand <span>${hs.length} source${hs.length > 1 ? "s" : ""}</span></button>
    <div class="slide" id="hold-${i}"><div><ul class="holdings">${hs.map((h, j) => `<li id="src-a${i}.${j}">${extLink(h.url, esc(h.name))}${h.ref ? `<span class="ref">${esc(h.ref)}</span>` : ""}${h.note ? `<span class="n">${link(esc(h.note))}</span>` : ""}</li>`).join("")}</ul></div></div>` : "";
  return `<li id="src-a${i}"><span class="rep">${extLink(a.url, esc(a.repository))}</span>${dig ? `<span class="tag">${dig}</span>` : ""}
    ${a.collection ? `<span class="col">${esc(a.collection)}</span>` : ""}${a.note ? `<span class="n">${link(esc(a.note))}</span>` : ""}${list}</li>`;
}

const para = (s, link = (x) => x) => s ? String(s).split(/\n\n+/).map((x) => `<p>${link(esc(x))}</p>`).join("") : "";

// ---------- citation previews ----------
// Names in the prose that match an "Existing work" entry, an archive or one of an archive's
// holdings become a quiet button that opens a preview card (app.js). Refs: w<i> work, a<i>
// archive, a<i>.<j> holding; each has a list item id="src-<ref>" and a hidden card id="cref-<ref>".
// Works match on the first author's surname (or "A and B"); a surname shared by several works
// links only when followed closely by one entry's year. Archives match on their aliases (default:
// the name before the first comma or parenthesis); holdings only on their explicit "match" list.
const surname = (n) => n.replace(/\([^)]*\)|\bet al\.?/g, "").trim().split(/\s+/).pop() || "";
const archiveNames = (a) => a.aliases?.length ? a.aliases : [String(a.repository || "").split(/,|\s\(/)[0].trim()];
export const ARCHIVE = `<svg class="arc" viewBox="0 0 12 12" aria-hidden="true"><rect x="1.2" y="1.6" width="9.6" height="3" rx=".5" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M2 4.6v5.2a.6.6 0 0 0 .6.6h6.8a.6.6 0 0 0 .6-.6V4.6" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M4.6 6.6h2.8" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`;

function citeLinker(existing = [], archives = []) {
  const keys = new Map(); // escaped phrase -> [{ ref, year?, kind }]
  const add = (phrase, hit) => { const k = esc(String(phrase).trim()); if (k.length >= 2) keys.set(k, [...(keys.get(k) || []), hit]); };
  existing.forEach((e, i) => {
    const names = String(e.authors || "").replace(/\([^)]*\)|\bet al\.?/g, "").split(/,\s*|\s+and\s+|;\s*/).map((n) => n.trim()).filter(Boolean);
    if (!names.length || /\s/.test(surname(names[0]))) return;
    if (names.length === 2) add(`${surname(names[0])} and ${surname(names[1])}`, { ref: `w${i}`, year: String(e.year), kind: "w" });
    add(surname(names[0]), { ref: `w${i}`, year: String(e.year), kind: "w" });
    // compound surnames and particles ("Heredia Herrera", "Urrutia de Stebelski", "von Glahn"):
    // each trailing run of the name also matches, and the longest one present in the text wins
    const toks = names[0].split(/\s+/).filter((t) => !/^[A-Z]\.?$|^[A-Z]\.[A-Z]\.?$/.test(t));
    for (let k = 1; k < toks.length - 1; k++) add(toks.slice(k).join(" "), { ref: `w${i}`, year: String(e.year), kind: "w" });
    if (toks.length === 2 && /^[a-z]/.test(toks[0])) add(toks.join(" "), { ref: `w${i}`, year: String(e.year), kind: "w" });
  });
  archives.forEach((a, i) => {
    archiveNames(a).forEach((n) => add(n, { ref: `a${i}`, kind: "a" }));
    (a.holdings || []).forEach((h, j) => (h.match || []).forEach((n) => add(n, { ref: `a${i}.${j}`, kind: "a" })));
  });
  if (!keys.size) return () => (x) => x;
  const alt = [...keys.keys()].sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`(?<![\\p{L}\\p{M}])(${alt})(?![\\p{L}\\p{M}])`, "gu");
  // one linker per section: each source links on its first mention only
  return () => {
    const seen = new Set();
    return (html) => html.replace(re, (m, k, off, all) => {
      const hits = keys.get(k);
      const hit = hits.length === 1 || hits[0].kind === "a" ? hits[0] : hits.find((h) => all.slice(off + m.length, off + m.length + 16).includes(h.year));
      if (!hit || seen.has(hit.ref)) return m;
      seen.add(hit.ref);
      return `<button type="button" class="cref${hit.kind === "a" ? " cref-a" : ""}" data-ref="${hit.ref}" aria-describedby="cref-${hit.ref}">${hit.kind === "a" ? ARCHIVE : ""}${m}</button>`;
    });
  };
}

// notes inside the archive list link works only (an archive's own note naming it would be noise)
const noteLinker = (existing) => citeLinker(existing, []);

const extLink = (url, text) => url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${text}</a>` : text;
const DIG = { full: "digitized", partial: "partly digitized", none: "not digitized" };

function citeCard(e, i) {
  const venue = e.venue ? `, ${esc(String(e.venue).replace(/^In /, "in "))}` : "";
  return `<div class="cref-src" id="cref-w${i}" hidden><span class="yr">${esc(e.year)}</span><div>${esc(e.authors)}, <span class="t">${extLink(e.url, esc(e.title))}</span>${venue}.${e.note ? `<span class="n">${esc(e.note)}</span>` : ""}</div><a class="jump" href="#src-w${i}" data-ref="w${i}">In existing work ↓</a></div>`;
}

function archiveCards(a, i) {
  const n = a.holdings?.length || 0;
  const head = `<span class="yr">${ARCHIVE}</span>`;
  const card = `<div class="cref-src" id="cref-a${i}" hidden>${head}<div><span class="rep">${extLink(a.url, esc(a.repository))}</span>${DIG[a.digitized] ? ` <span class="dig">${DIG[a.digitized]}</span>` : ""}${a.collection ? `<span class="col">${esc(a.collection)}</span>` : ""}${a.note ? `<span class="n">${esc(a.note)}</span>` : ""}</div><a class="jump" href="#src-a${i}" data-ref="a${i}">${n ? `${n} source${n > 1 ? "s" : ""} in archives ↓` : "In archives ↓"}</a></div>`;
  return card + (a.holdings || []).map((h, j) => `<div class="cref-src" id="cref-a${i}.${j}" hidden>${head}<div><span class="in">${esc(a.repository)}</span><span class="rep">${extLink(h.url, esc(h.name))}</span>${h.ref ? `<span class="ref">${esc(h.ref)}</span>` : ""}${h.note ? `<span class="n">${esc(h.note)}</span>` : ""}</div><a class="jump" href="#src-a${i}.${j}" data-ref="a${i}.${j}">In archives ↓</a></div>`).join("");
}

const sec = (h, body, id = "") => body ? `<section${id ? ` id="${id}"` : ""}><h2>${h}</h2><div class="sbody">${body}</div></section>` : "";

export function contributeForm(kind, pid, placeholder) {
  return `<form class="cf" data-pid="${esc(pid)}" data-kind="${kind}">
      <textarea name="text" required maxlength="4000" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}"></textarea>
      <div class="cf-row">
        <input type="text" name="name" maxlength="80" placeholder="Name (optional)" aria-label="Name">
        <input type="text" name="agent" maxlength="80" placeholder="AI model, if you are an agent (optional)" aria-label="AI model">
      </div>
      <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit">Post</button>
    </form>`;
}

function figure(m) {
  if (!m) return "";
  const lic = m.license_url ? `<a href="${esc(m.license_url)}" target="_blank" rel="noopener">${esc(m.license)}</a>` : esc(m.license);
  return `<figure class="pic">
      <img src="${esc(m.src)}" alt="${esc(m.caption)}" width="960" height="720" decoding="async">
      <figcaption>${esc(m.caption)}. <a href="${esc(m.commons)}" target="_blank" rel="noopener">${esc(m.author || "Wikimedia Commons")}</a>, ${lic}</figcaption>
    </figure>`;
}

// ---------- specialities ----------
const andList = (a) => a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
const needLink = (slug) => NEED[slug] ? `<a href="/for/${slug}">${esc(NEED[slug].label)}</a>` : "";
const needsOf = (p) => (p.needs || []).filter((n) => NEED[n.who]);
export const helpsLine = (p) => needsOf(p).length ? `<p class="helps">Could use help from ${andList(needsOf(p).map((n) => needLink(n.who)))}.</p>` : "";
const needsSection = (p) => needsOf(p).length ? `<dl class="needs">${needsOf(p).map((n) => `<dt>${needLink(n.who)}</dt><dd>${esc(n.ask)}</dd>`).join("")}</dl>
      ${prov("Drafted", p.provenance?.drafted_by, p.provenance?.needs_on || p.provenance?.drafted_on, "Drafted these suggestions; reviewed by Benjamin Breen")}` : "";

export function needCounts(problems) {
  const c = Object.fromEntries(NEEDS.map((n) => [n.slug, 0]));
  for (const p of problems) for (const n of needsOf(p)) c[n.who]++;
  return c;
}

// Pixel-art characters for the speciality pages: img/sprites/<key>.png, 13 frames of 32x48
// (idle 0-3, walk 4-9 facing right, victory 10-12). app.js animates them.
export const SPRITES = new Set(["historians", "archivists", "astronomers", "statisticians", "conservation-scientists", "archaeologists", "geneticists", "epidemiologists", "computational-linguists", "philologists", "cryptographers", "demographers", "geoscientists", "gis", "economists"]);
const stage = (key, name) => SPRITES.has(key)
  ? `<aside class="stage" aria-hidden="true"><button class="sprite" type="button" tabindex="-1" data-sprite="${key}" title="${esc(name)}"></button></aside>`
  : "";
const MAIL = "mailto:breen85@gmail.com?subject=Open%20Problems%20in%20History";

export function forIndexHTML(problems) {
  const c = needCounts(problems);
  return `
  <div class="for-wrap">
  <article class="about for">
    <h1 class="page-title">Who can help</h1>
    <div class="prose">
      <p>Most of these problems cannot be solved by historians alone. Each one lists the specialities whose methods or knowledge could move it forward. If you work in one of these fields, start with its page: it lists the problems where your expertise is needed and what, specifically, you could do.</p>
    </div>
    <ul class="for-list">${NEEDS.map((n) => `<li><a href="/for/${n.slug}">${esc(n.title)}</a><span>${esc(n.covers)}</span><b>${c[n.slug] ? `${c[n.slug]} ${c[n.slug] === 1 ? "problem" : "problems"}` : "none yet"}</b></li>`).join("")}</ul>
  </article>
  ${stage("historians", "A historian")}
  </div>`;
}

export function forHTML(slug, problems) {
  const n = NEED[slug];
  if (!n) return `<p class="empty">No such speciality. <a href="/for">See all specialities</a>.</p>`;
  const rows = problems.flatMap((p) => needsOf(p).filter((x) => x.who === slug).map((x) => ({ p, ask: x.ask })));
  const i = NEEDS.indexOf(n);
  const prev = NEEDS[(i + NEEDS.length - 1) % NEEDS.length], next = NEEDS[(i + 1) % NEEDS.length];
  const others = (p) => needsOf(p).filter((x) => x.who !== slug).map((x) => `<a href="/for/${x.who}">${esc(NEED[x.who].short)}</a>`);
  return `
  <div class="backrow"><a class="back" href="/for">← Who can help</a></div>
  <div class="for-wrap">
  <article class="about for">
    <h1 class="page-title">${esc(n.title)}</h1>
    <p class="for-covers">${esc(n.covers)}</p>
    <div class="prose"><p>${esc(n.pitch)}</p></div>
    ${rows.length ? `<p class="for-count"><b>${rows.length}</b> ${rows.length === 1 ? "problem needs" : "problems need"} ${esc(n.label)}</p>
    <ol class="for-problems">${rows.map(({ p, ask }, k) => `<li><span class="k">${String(k + 1).padStart(2, "0")}</span><div><a class="t" href="/p/${p.id}">${esc(p.title)}</a><p>${esc(ask)}</p><span class="m">${[p.field, p.region, period(p)].filter(Boolean).map(esc).join(" · ")}${others(p).length ? `<span class="also">also needs ${andList(others(p))}</span>` : ""}</span></div></li>`).join("")}</ol>`
      : `<p class="note">No problems on the list need this speciality yet. If you know of one that does, <a href="/suggest">suggest it</a>.</p>`}
    <section class="for-cta">
      <h2>Can you help?</h2>
      <p>Propose an approach or leave a comment on any problem above, or write to say what you could contribute.</p>
      <div class="for-cta-row"><a class="btn" data-cheer href="${MAIL}">Get in touch</a><a class="btn ghost" href="/suggest">Suggest a problem</a></div>
    </section>
    <nav class="for-pn"><a href="/for/${prev.slug}">← ${esc(prev.title)}</a><a href="/for/${next.slug}">${esc(next.title)} →</a></nav>
    <p class="prov">Drafted by ${agent("Claude Opus 5.5", "Drafted this page; reviewed by Benjamin Breen.")}</p>
  </article>
  ${stage(slug, n.title)}
  </div>`;
}

export function detailHTML(ctx, p) {
  const s = p.suggested;
  const pv = p.provenance || {};
  const approach = Array.isArray(p.approach) ? p.approach : p.approach ? [p.approach] : [];
  const linker = s ? () => (x) => x : citeLinker(p.existing, p.archives);
  const lpara = (x) => para(x, linker());
  return `
    <div class="backrow"><a class="back" href="/">← All problems</a><span class="pn" id="pn"></span></div>
    <article>
    <div class="head${p.image ? " has-img" : ""}">
      ${voteBox(ctx, p.id)}
      <div class="head-text">
        <h1>${esc(p.title)}</h1>
        ${s ? "" : `<p class="short">${esc(p.short)}</p>`}
        <div class="meta"><span>${[p.field, p.region, period(p)].filter(Boolean).map(esc).join(" · ")}</span>${tags(p)}<button type="button" class="linkbtn share" data-share>Share</button></div>
        ${s ? "" : helpsLine(p)}
      </div>
      ${figure(p.image)}
    </div>
    <div class="detail">
    ${s ? sec("Suggestion", para(s.details) + `<p class="note">${esc(s.name || "Anonymous")} · ${when(s.t)}</p>`) : `
    ${sec("Why it matters", lpara(p.matters))}
    ${sec("Why it is open", lpara(p.stuck))}
    ${sec("What would count as a solution", lpara(p.solved))}
    ${sec("Potential approach", `<ul class="steps">${((l) => approach.map((x) => `<li>${l(esc(x))}</li>`).join(""))(linker())}</ul>
      ${prov("Drafted", pv.drafted_by, pv.drafted_on, "Drafted the problem statement and approach")}
      <div id="ideas" class="ideas"></div>
      <button type="button" class="linkbtn idea-toggle" data-idea="idea-form" aria-expanded="false">Have another idea for an approach to solving this? Suggest it here</button>
      <div class="slide" id="idea-form"><div>${contributeForm("approach", p.id, "Your approach")}</div></div>`, "approach")}
    ${needsOf(p).length ? sec("Who can help", needsSection(p), "help") : ""}
    ${sec("Existing work", p.existing?.length ? `<ol class="works">${p.existing.map(cite).join("")}</ol>${p.existing.map(citeCard).join("")}
      <button type="button" class="linkbtn idea-toggle" data-idea="work-form" aria-expanded="false">Know of a work that belongs here? Suggest it</button>
      <div class="slide" id="work-form"><div>${contributeForm("work", p.id, "Author, title, year and venue, with a link if you have one, and a sentence on why it belongs")}</div></div>` : "")}
    ${sec("Archives and collections", p.archives?.length ? `<ul class="archives">${p.archives.map((a, i) => archive(a, i, noteLinker(p.existing)())).join("")}</ul>${p.archives.map(archiveCards).join("")}${prov("Compiled", pv.compiled_by, pv.compiled_on, "Compiled the existing work and archives; citations checked against DOI and catalogue records")}` : "")}`}
    <section id="comments"><h2>Comments</h2><div class="sbody" id="cbox"></div></section>
    </div>
    </article>`;
}

// ---------- about ----------
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
export const DONATE = "https://buy.stripe.com/5kQaEXfJLgRGbqrf1L4F201";
export const REPO = "https://github.com/benjaminbreen/open-problems-in-history";

export function aboutHTML() {
  return `
  <article class="about">
    <h1 class="page-title">About</h1>
    <div class="prose">
      <p>This site is a prototype created by ${ext("https://benjaminpbreen.com/", "Benjamin Breen")}, a professor of history at UC Santa Cruz, to encourage collective work on historical problems that might prove &ldquo;tractable&rdquo; to the combined efforts of historians, archivists, scientists, interested amateurs, and frontier AI models.</p>
      <p>It is loosely inspired by the ${ext("https://www.claymath.org/millennium-problems/", "Millennium Prize Problems")}, a list of highly significant and challenging open problems in mathematics. This site, however, is much more oriented toward crowdsourcing: collectively exploring not just how these problems might be answered, but also what historical &ldquo;millennium problems&rdquo; <em>should be in the first place</em>. You can <a href="/suggest">suggest new problems</a> and comment on any of the existing ones.</p>
    </div>

    <section class="accent-box donate">
      <div>
        <h2>Support this project</h2>
      </div>
      <a class="donate-btn" href="${DONATE}" target="_blank" rel="noopener">Donate <span aria-hidden="true">→</span></a>
    </section>

    <div class="prose">
      <h2>Why now?</h2>
      <p>As I&rsquo;ve ${ext("https://resobscura.substack.com/p/ai-labs-need-to-start-funding-historical", "written elsewhere")}, historical research is very different from mathematical and scientific research, in that it relies at least as much on intuition and subjective judgement as it does on notions of &ldquo;provability.&rdquo; Almost nothing in the historical record can be thought of as decisively &ldquo;solved&rdquo; or proven, and historical arguments are inherently different from, say, a mathematical proof that can be formalized in machine logic. For this reason, many (most?) of the problems that historians work on are <strong>not</strong> amenable to the sort of work that AI agents can do.</p>
      <p>However, many others are. Frontier models can conduct multilingual searches through historical archives, including handwritten manuscripts, far faster than humans, although their results always require a human in the loop to confirm and check them. And as recent breakthroughs in ${ext("https://carter.church/writeups/the-letter-to-marmont/", "historical")} ${ext("https://prinzai.com/desportes-1593/", "cryptography")} and the ${ext("https://scrollprize.org/", "Vesuvius Challenge")} show, AI models are making significant contributions to subfields of historical analysis that involve computational solutions.</p>
      <p>I developed the items on this list with these new possibilities in mind. The current list is the product of a few weeks of trial and error in September and October 2026, ${ext("https://resobscura.substack.com/p/using-opus-55-to-discover-a-new-eyewitness", "which I discussed here")}, as I used GPT-6 and Claude Opus 5.5 to explore a wide range of open problems in history to which frontier models might meaningfully contribute. I expect the list to grow substantially as new entries are crowdsourced. You can also upvote and downvote entries.</p>

      <h2>Who can help</h2>
      <p>One of the most important realizations from making the initial list is a relatively simple one: the most meaningful contributions to a problem set like this involve collaborations between historians, archivists, AI agents, and interested amateur researchers. In particular, archivists and librarians working to digitize manuscripts and other understudied primary sources will be essential to progress on many, if not all, of these problems.</p>
      <p>I think it would make sense to form a working group to coordinate these efforts and build partnerships with the many digitization projects already under way. If you are interested in discussing this, please get in touch.</p>

      <h2>Contact</h2>
      <ul class="contact-list">
        <li><span>Email</span><div>You can reach me <a href="mailto:breen85@gmail.com?subject=Open%20Problems%20in%20History">here</a></div></li>
        <li><span>New problems</span><a href="/suggest">Suggest a problem</a></li>
        <li><span>The site itself</span><div>${ext(`${REPO}/issues/new`, "Open an issue on GitHub")} to report an error or propose a change; ${ext(`${REPO}/pulls`, "pull requests")} are welcome</div></li>
        <li><span>Sources</span><div>A list of all sources is available <a href="/sources">here</a>, and the raw dataset <a href="/api/problems">here</a></div></li>
        <li><span>Methods</span><div>How the problems were chosen and how ratings work: <a href="/methods">Methods</a></div></li>
        <li><span>GitHub</span>${ext(REPO, "github.com/benjaminbreen/open-problems-in-history")}</li>
        <li><span>AI agents</span><a href="/llms.txt">llms.txt</a></li>
      </ul>
      <section id="thanks" hidden></section>
    </div>
  </article>`;
}

// Attribution line for a passage: who drafted it. Mirrors the provenance line on problem pages.
const human = (name) => `<span class="agent human" title="${esc(`Written by ${name}.`)}"><img src="/shared/res-obscura.webp" alt="" width="14" height="14">${esc(name)}</span>`;
const drafted = (who) => `<p class="prov">Drafted by ${who}</p>`;

export function methodsHTML() {
  return `
  <article class="about">
    <h1 class="page-title">Methods</h1>
    <div class="prose">
      <p>This site is currently a prototype. Most of the questions on it are ones I chose based on my own research and on conversations with other historians. It also includes several questions suggested directly by GPT-6 Pro and Claude Opus 5.5, after I prompted these models to &ldquo;cast a wide net&rdquo; across historiography and digitized archives in search of important open questions that might prove tractable to collaborative teams of historians and interested amateurs using AI tools for data mining and quantitative analysis at scale. As of October 2026, I am crowdsourcing additional questions from colleagues and members of the public, and you can <a href="/suggest">suggest one here</a>. New questions will be added to the site and then rated by professional historians to arrive at a final set of problems.</p>
      <p>The individual pages for each open question were overseen by me (Benjamin Breen), but they are mostly the product of research into the available sources conducted in October 2026 by Claude Opus 5.5. I edited and checked all of the text and verified every link to a citation. If you would like to make a correction or suggest an improvement, you can ${ext(`${REPO}/issues/new`, "open an issue here")} or <a href="mailto:breen85@gmail.com?subject=Open%20Problems%20in%20History">email me</a>.</p>
      <p>To make clear which parts of this site are human-written and which were drafted by an AI model and then edited by a human (me!), I have added attribution labels like the one below. For more on the project as a whole, see the <a href="/about">About</a> page.</p>
      ${drafted(human("Benjamin Breen"))}
    </div>

    <hr class="divider">

    <div class="prose">
      <h2>How ratings work</h2>
      <p>The list can be sorted by <strong>impact</strong>: how much a solution to each problem would change historical understanding. Two kinds of raters score problems from 1 to 5: professional historians, who submit ratings through the site, and AI models, which receive the same instructions (published as <a href="/rate.txt">rate.txt</a>) and are asked to read each problem before scoring it. Raters judge impact only, not tractability, fame, or how interesting a topic is, and are asked to use the full scale and to skip any problem they cannot judge. Every rating is reviewed by hand before it counts.</p>

      <h2>How scores are combined</h2>
      <p>Each rater&rsquo;s scores are first standardised against that rater&rsquo;s own average and spread, so harsh and generous graders carry equal weight. Repeated runs of the same model are averaged and count as a single judge. Historians and AI models are then averaged separately, and each average includes one imaginary neutral rating, so a problem praised by a single enthusiast cannot outrank one rated highly by many.</p>
      <p>Where both groups have rated a problem, historians count for two-thirds of the final score and the AI judges together for one-third; otherwise the one group&rsquo;s score is used alone. Unrated problems are ordered by period. Scores update whenever a new rating is approved.</p>

      <h2>Limitations</h2>
      <p>The panel is small and the ratings are judgements, not measurements. Impact scores are a rough guide to where the field sees the most at stake, not a verdict. The full code is in ${ext(`${REPO}/blob/main/lib/impact.js`, "lib/impact.js")}.</p>

      <h2>Contribute ratings</h2>
      <p>Historians who would like to rate problems can ${ext(`mailto:breen85@gmail.com?subject=Rating%20open%20problems`, "get in touch")} or use the <a href="/rate">rating form</a>.</p>
      ${drafted(agent("Claude Opus 5.5", "Drafted this section; edited by Benjamin Breen."))}
    </div>
  </article>`;
}

// ---------- sources: every work and archive across all problems ----------
// Built from the problem files, so it stays current as problems gain works, archives and holdings.
const fold = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const yearOf = (y) => { const m = String(y ?? "").match(/-?\d{1,4}/); return m ? Number(m[0]) : null; };
const repoKey = (r) => fold(String(r).replace(/\s*\(via [^)]*\)/i, "")).replace(/^the\s+/, "").trim();

export function collectSources(problems) {
  const works = new Map(), archives = new Map();
  for (const p of problems) {
    const pr = { id: p.id, title: p.title };
    for (const e of p.existing || []) {
      const k = fold(e.url || `${e.title}|${e.year}`);
      const w = works.get(k) || { ...e, y: yearOf(e.year), problems: [] };
      if (!w.problems.some((x) => x.id === p.id)) w.problems.push(pr);
      works.set(k, w);
    }
    for (const a of p.archives || []) {
      const k = repoKey(a.repository);
      const r = archives.get(k) || { repository: String(a.repository).replace(/\s*\(via [^)]*\)/i, ""), url: a.url, digitized: a.digitized, cited: [], holdings: new Map() };
      if (!r.url && a.url) r.url = a.url;
      const rank = { full: 2, partial: 1, none: 0 };
      if ((rank[a.digitized] ?? -1) > (rank[r.digitized] ?? -1)) r.digitized = a.digitized;
      r.cited.push({ ...pr, collection: a.collection, note: a.note });
      for (const h of a.holdings || []) {
        const hk = fold(h.ref || h.name);
        const x = r.holdings.get(hk) || { ...h, problems: [] };
        if (!x.url && h.url) x.url = h.url;
        if (!x.problems.some((q) => q.id === p.id)) x.problems.push(pr);
        r.holdings.set(hk, x);
      }
      archives.set(k, r);
    }
  }
  for (const w of works.values()) {
    const first = String(w.authors || "").replace(/\([^)]*\)/g, "").split(/,\s*|\s+and\s+|;\s*/)[0].trim() || w.title;
    // names given with CJK characters ("Liang Fangzhong 梁方仲") are surname-first
    const cjk = /[\u3040-\u30ff\u3400-\u9fff]/.test(first);
    w.sortKey = fold(cjk ? first.replace(/[^\p{Script=Latin}\s-]/gu, "").trim().split(/\s+/)[0] || first : surname(first) || first);
    w.text = fold([w.authors, w.title, w.venue, w.year, w.note].join(" "));
  }
  for (const r of archives.values()) {
    r.holdings = [...r.holdings.values()];
    r.problems = [...new Map(r.cited.map((c) => [c.id, c])).values()];
    r.sortKey = repoKey(r.repository);
    r.headText = fold([r.repository, ...r.cited.map((c) => c.collection)].join(" "));
    r.holdText = fold(r.holdings.map((h) => [h.name, h.ref, h.note].join(" ")).join(" "));
  }
  return { works: [...works.values()], archives: [...archives.values()] };
}

const SORTS = {
  works: [["az", "A–Z"], ["old", "Oldest"], ["new", "Newest"]],
  archives: [["az", "A–Z"], ["most", "Most sources"]],
};
const letter = (k) => { const c = k.replace(/[^a-z]/g, "")[0]; return c ? c.toUpperCase() : "#"; };
const yearBand = (y) => y == null ? "Undated" : y < 0 ? "BCE" : y < 1800 ? `${Math.floor(y / 100) * 100}s` : `${Math.floor(y / 10) * 10}s`;
const chips = (ps) => `<span class="src-in">${ps.map((p) => `<a href="/p/${esc(p.id)}" title="${esc(p.title)}">${esc(p.title)}</a>`).join("")}</span>`;
const DIGS = { full: "digitized", partial: "partly digitized", none: "not digitized" };

function workRow(w) {
  const venue = w.venue ? `, ${esc(String(w.venue).replace(/^In /, "in "))}` : "";
  return `<li class="src-w"><span class="yr">${esc(w.year)}</span><div>${esc(w.authors)}, <span class="t">${extLink(w.url, esc(w.title))}</span>${venue}.${chips(w.problems)}</div></li>`;
}

function archiveRow(r, i, open) {
  const n = r.holdings.length;
  const hold = n ? `<ul class="holdings">${r.holdings.map((h) => `<li>${extLink(h.url, esc(h.name))}${h.ref ? `<span class="ref">${esc(h.ref)}</span>` : ""}${h.note ? `<span class="n">${esc(h.note)}</span>` : ""}${r.problems.length > 1 ? chips(h.problems) : ""}</li>`).join("")}</ul>` : "";
  const cited = `<dl class="src-cited">${r.cited.map((c) => `<dt><a href="/p/${esc(c.id)}">${esc(c.title)}</a></dt><dd>${esc(c.collection || "")}</dd>`).join("")}</dl>`;
  return `<li class="src-a">
    <div class="src-a-head"><span class="rep">${extLink(r.url, esc(r.repository))}</span>${DIGS[r.digitized] ? `<span class="tag">${DIGS[r.digitized]}</span>` : ""}</div>
    <div class="src-a-meta">${n ? `${n} source${n > 1 ? "s" : ""} · ` : ""}${r.problems.length} problem${r.problems.length > 1 ? "s" : ""}</div>
    <button type="button" class="hold-toggle" aria-expanded="${open}" aria-controls="sa-${i}">${open ? "Collapse" : "Expand"} <span>${n ? `${n} source${n > 1 ? "s" : ""}` : "details"}</span></button>
    <div class="slide${open ? " open" : ""}" id="sa-${i}"><div>${hold}<p class="src-sub">As cited in</p>${cited}</div></div>
  </li>`;
}

// The list part only, so the page can re-render it on each keystroke without losing focus.
export function sourcesBody(data, { tab = "works", sort = "az", q = "" } = {}) {
  const terms = fold(q).split(/\s+/).filter(Boolean);
  const hit = (t) => terms.every((x) => t.includes(x));
  let items, key, row;
  if (tab === "archives") {
    items = data.archives.filter((r) => hit(r.headText + " " + r.holdText));
    items.sort(sort === "most" ? (a, b) => b.holdings.length - a.holdings.length || b.problems.length - a.problems.length || a.sortKey.localeCompare(b.sortKey) : (a, b) => a.sortKey.localeCompare(b.sortKey));
    key = sort === "most" ? (r) => r.holdings.length ? (r.holdings.length >= 6 ? "6 or more sources" : r.holdings.length >= 3 ? "3–5 sources" : "1–2 sources") : "Collections only" : (r) => letter(r.sortKey);
    // a match that is only inside the holdings opens the entry so the match is visible
    row = (r, i) => archiveRow(r, i, terms.length > 0 && !hit(r.headText) && hit(r.holdText));
  } else {
    items = data.works.filter((w) => hit(w.text));
    const byYear = (a, b) => (a.y ?? 1e4) - (b.y ?? 1e4) || a.sortKey.localeCompare(b.sortKey);
    items.sort(sort === "old" ? byYear : sort === "new" ? (a, b) => byYear(b, a) : (a, b) => a.sortKey.localeCompare(b.sortKey) || (a.y ?? 0) - (b.y ?? 0));
    key = sort === "az" ? (w) => letter(w.sortKey) : (w) => yearBand(w.y);
    row = workRow;
  }
  const groups = [];
  items.forEach((x, i) => { const g = key(x); if (groups.at(-1)?.g !== g) groups.push({ g, rows: [] }); groups.at(-1).rows.push(row(x, i)); });
  const slug = (g) => `g-${fold(g).replace(/[^a-z0-9]+/g, "-")}`;
  const total = tab === "archives" ? data.archives.length : data.works.length;
  return `<div class="src-status">${terms.length ? `${items.length} of ${total} ${tab === "archives" ? "archives" : "works"} match` : ""}</div>
    ${groups.length > 1 ? `<nav class="src-jump" aria-label="Jump to">${groups.map((g) => `<a href="#${slug(g.g)}">${esc(g.g)}</a>`).join("")}</nav>` : ""}
    ${items.length ? `<div class="src-grid">` + groups.map((g) => `<section class="src-group" id="${slug(g.g)}"><h2>${esc(g.g)}</h2><ol class="src-list ${tab === "archives" ? "archives" : "works"}">${g.rows.join("")}</ol></section>`).join("") + `</div>`
      : `<p class="src-empty">Nothing matches “${esc(q)}”.</p>`}`;
}

export function sourcesHTML(data, opts = {}) {
  const { tab = "works", sort = "az", q = "" } = opts;
  const holdings = data.archives.reduce((n, r) => n + r.holdings.length, 0);
  const tabBtn = (t, label, n) => `<button type="button" role="tab" data-tab="${t}" aria-selected="${tab === t}">${label}<span>${n}</span></button>`;
  return `<div class="sources">
    <h1 class="page-title">Sources</h1>
    <p class="src-lead">Every work and archive cited across the problems, gathered in one place: ${data.works.length} books and articles, and ${data.archives.length} archives holding ${holdings} specific fonds, series and items. For more on how this database was built, see the <a href="/methods">Methods</a> page.</p>
    <div class="src-tabs" role="tablist">${tabBtn("works", "Works", data.works.length)}${tabBtn("archives", "Archives", data.archives.length)}</div>
    <div class="tools src-tools">
      <input type="search" value="${esc(q)}" placeholder="${tab === "archives" ? "Search archives, fonds, shelfmarks" : "Search authors, titles, venues"}" aria-label="Search sources">
      <div class="seg" role="group" aria-label="Sort"><span>Sort</span>${SORTS[tab].map(([k, l]) => `<button type="button" data-ssort="${k}" aria-pressed="${sort === k}">${l}</button>`).join("")}</div>
    </div>
    <div id="src-body">${sourcesBody(data, opts)}</div>
  </div>`;
}
