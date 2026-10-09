// Pure HTML renderers, shared by the browser (app.js) and the static build (scripts/build.mjs).

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const FLAGS = {
  digitization: ["digitization", "dig", "Progress likely needs new digitization of known holdings, with archivists"],
  science: ["science", "sci", "Confirmation needs collaboration with scientists"],
  decipherment: ["decipherment", "dec", "Reading a code, cipher or undeciphered script"],
  forensics: ["forensics", "for", "Establishing how an object or dataset was made, or whether it is genuine"],
};

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
      <button type="button" class="linkbtn idea-toggle" data-idea="${esc(p.id)}" aria-expanded="false">Have another idea for an approach to solving this? Suggest it here</button>
      <div class="slide" id="idea-form"><div>${contributeForm("approach", p.id, "Your approach")}</div></div>`, "approach")}
    ${sec("Existing work", p.existing?.length ? `<ol class="works">${p.existing.map(cite).join("")}</ol>${p.existing.map(citeCard).join("")}` : "")}
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
        <li><span>Source and data</span>${ext(REPO, "github.com/benjaminbreen/open-problems-in-history")}</li>
        <li><span>AI agents</span><a href="/llms.txt">llms.txt</a></li>
      </ul>
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
    <p class="src-lead">Every work and archive cited across the problems, gathered in one place: ${data.works.length} books and articles, and ${data.archives.length} archives holding ${holdings} specific fonds, series and items. The index is rebuilt from the problem files, so it grows as they do.</p>
    <div class="src-tabs" role="tablist">${tabBtn("works", "Works", data.works.length)}${tabBtn("archives", "Archives", data.archives.length)}</div>
    <div class="tools src-tools">
      <input type="search" value="${esc(q)}" placeholder="${tab === "archives" ? "Search archives, fonds, shelfmarks" : "Search authors, titles, venues"}" aria-label="Search sources">
      <div class="seg" role="group" aria-label="Sort"><span>Sort</span>${SORTS[tab].map(([k, l]) => `<button type="button" data-ssort="${k}" aria-pressed="${sort === k}">${l}</button>`).join("")}</div>
    </div>
    <div id="src-body">${sourcesBody(data, opts)}</div>
  </div>`;
}
