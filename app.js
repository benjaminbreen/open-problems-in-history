import { compareRank, criteria, humanPotential, validJudgment, originalRoundId, expandedRoundId, currentRoundId, editions } from "/lib/potential.js";
import { FLAGS, esc, period, voteBox as vbox, rowHTML, detailHTML, aboutHTML, methodsHTML, colophonHTML, forHTML, SPRITES, forIndexHTML, needCounts, NEED, collectSources, sourcesHTML, sourcesBody, commentLabel as clabel, contributeForm, who, up as u, down as d, score as sc, ncom as nc } from "/render.js";

const app = document.getElementById("app");
const store = {
  get: (k, dflt) => { try { return localStorage.getItem(k) ?? dflt; } catch { return dflt; } },
  set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

let problems = [];
let state = { tally: {}, counts: {}, mine: {}, suggestions: [], human: {} };
let round;
const view = { q: "", sort: store.get("op.sort3", "ai"), metric: "historical", show: "all" };

// The list's filter and search live in the URL (/?tag=decipherment&q=plague) so a filtered view can be linked.
function readURL() {
  const s = new URLSearchParams(location.search);
  view.show = FLAGS[s.get("tag")] ? s.get("tag") : "all";
  view.q = s.get("q") || "";
}
function writeURL() {
  const s = new URLSearchParams();
  if (view.show !== "all") s.set("tag", view.show);
  if (view.q.trim()) s.set("q", view.q.trim());
  const url = "/" + (s.size ? `?${s}` : "");
  if (url !== location.pathname + location.search) history.replaceState(null, "", url);
}
const open = new Set();
const adminToken = () => store.get("op.admin", "");
const ctx = () => ({ ...state, ai: round.ai, ballots: round.ballots, metric: view.metric, open });

const up = (id) => u(state, id);
const score = (id) => sc(state, id);
const ncom = (id) => nc(state, id);
const voteBox = (id) => vbox(ctx(), id);
const commentLabel = (id) => clabel(ctx(), id);

// ---------- data ----------
async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (adminToken()) headers["x-admin-token"] = adminToken();
  const r = await fetch(path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.status);
  return r.json();
}

// The build stamps app.js with a content hash that covers the data too; pass it on so a
// cached problems.json from before a deploy is never used with newer page code.
const DATA_V = (() => { const v = new URL(import.meta.url).searchParams.get("v"); return v ? `?v=${v}` : ""; })();

function all() {
  const sugg = state.suggestions.map((s) => ({ id: s.id, title: s.title, short: s.details?.split("\n")[0] || "", suggested: s, flags: [], region: "", field: "", start: null }));
  return problems.concat(sugg);
}

// ---------- list ----------
const sorts = {
  ai: (a, b) => compareRank(round.ai, view.metric, a, b),
  human: (a, b) => state.human?.[a.id] || state.human?.[b.id]
    ? compareRank(state.human, view.metric, a, b) : compareRank(round.ai, view.metric, a, b),
  votes: (a, b) => score(b.id) - score(a.id) || up(b.id) - up(a.id) || (a.start ?? 1e9) - (b.start ?? 1e9),
  discussed: (a, b) => ncom(b.id) - ncom(a.id) || score(b.id) - score(a.id),
  period: (a, b) => (a.start ?? 1e9) - (b.start ?? 1e9) || a.title.localeCompare(b.title),
  region: (a, b) => (a.region || "~").localeCompare(b.region || "~") || (a.start ?? 1e9) - (b.start ?? 1e9),
  field: (a, b) => (a.field || "~").localeCompare(b.field || "~") || a.title.localeCompare(b.title),
  title: (a, b) => a.title.localeCompare(b.title),
};

function haystack(p) {
  return [p.title, p.short, p.region, p.field, period(p), ...(p.flags || []),
    ...(p.existing || []).map((e) => `${e.authors} ${e.title}`), ...(p.archives || []).map((a) => `${a.repository} ${a.collection}`)]
    .join(" ").toLowerCase();
}

function filtered() {
  const words = view.q.toLowerCase().split(/\s+/).filter(Boolean);
  return all()
    .filter((p) => view.show === "all" || (p.flags || []).includes(view.show))
    .filter((p) => !words.length || words.every((w) => (p._h ??= haystack(p)).includes(w)))
    .sort(sorts[view.sort] || sorts.ai);
}

function seg(name, label, options) {
  return `<div class="seg" role="group" aria-label="${label}"><span>${label}</span>${options
    .map(([v, l]) => `<button type="button" data-${name}="${v}" aria-pressed="${view[name] === v}">${l}</button>`).join("")}</div>`;
}

function renderList() {
  const outcome = view.metric === "historical" ? "contribution to historical knowledge" : "value for further research";
  const tips = {
    ai: `Each of the ${round.ballots.length} AI judges estimated the chance of a convincing answer and its ${outcome} if answered. We multiply each judge’s two values, then average the scores with equal weight. Select an AI rank to see each judge’s scores.`,
    human: `The same calculation, averaged over people who rated this question using the expanded November 20 packet. A dash means there are no approved human ratings yet.`,
    votes: "Readers' upvotes minus downvotes. One vote per browser per problem.",
    title: "Alphabetical by question.",
    field: "Grouped by field of history.",
    region: "Grouped by region.",
    period: "Ordered by the earliest date the problem concerns.",
    discussed: "Ordered by number of published comments.",
  };
  const col = (k, label) => `<button type="button" data-sort="${k}" aria-label="${label}" aria-pressed="${view.sort === k}" data-tip="${esc(tips[k])}" aria-description="${esc(tips[k])}">${label}</button>`;
  app.innerHTML = `
    <div class="tools">
      <input type="search" id="q" placeholder="Search problems, authors, archives" value="${esc(view.q)}" aria-label="Search problems">
      ${seg("show", "Show", [["all", "all"], ["digitization", "digitization"], ["science", "science"], ["decipherment", "decipherment"], ["forensics", "forensics"]])}
      <span class="count" id="count"></span>
    </div>
    <div class="ranking-tools">
      ${seg("metric", "Rank by", [["historical", "Overall potential"], ["further", "Further research"]])}
      <details class="ranking-help"><summary>How rankings work</summary><div><p>${esc(tips.ai)}</p><p>${esc(tips.human)}</p><a href="/methods#rankings">Read the full method</a></div></details>
      <a href="/rate">Rate the questions</a>
      <p class="ranking-formula">Chance of a convincing answer × ${outcome} if answered</p>
    </div>
    <div class="thead" role="group" aria-label="Sort">
      ${col("ai", "AI rank")}${col("human", "Human rank")}${col("votes", "Votes")}${col("title", "Problem")}${col("field", "Field")}${col("region", "Region")}${col("period", "Period")}${col("discussed", "Comments")}
    </div>
    <ol class="list" id="list"></ol>`;
  const q = app.querySelector("#q");
  q.addEventListener("input", () => { view.q = q.value; writeURL(); renderRows(); });
  renderRows();
}

function renderRows() {
  const rows = filtered();
  app.querySelector("#count").textContent = `${rows.length} ${rows.length === 1 ? "problem" : "problems"}`;
  app.querySelector("#list").innerHTML = rows.length ? rows.map((p) => rowHTML(ctx(), p)).join("") : `<li class="empty">No problems match.</li>`;
  for (const id of open) loadComments(id);
}

// ---------- comments and proposed approaches ----------
async function loadComments(id, el = app.querySelector(`.cbox[data-for="${CSS.escape(id)}"]`), kind = "comment") {
  if (!el) return;
  let list = [];
  try { list = await api(`/api/comments?id=${encodeURIComponent(id)}&kind=${kind}${adminToken() ? "&fresh=1" : ""}`); }
  catch { el.innerHTML = `<p class="note">Could not be loaded.</p>`; return; }
  const admin = !!adminToken();
  const items = list.map((c) => `<div class="comment"><div class="who">${who(c)}${admin ? ` <button type="button" class="linkbtn del" data-del="${esc(c.cid)}" data-pid="${esc(id)}" data-kind="${kind}">delete</button>` : ""}</div><p>${esc(c.text)}</p></div>`).join("");
  if (kind === "approach") {
    el.innerHTML = list.length ? `<h3>Proposed by readers</h3>${items}` : "";
    return;
  }
  state.counts[id] = list.length;
  stats();
  el.innerHTML = `<div class="comments">${items}${contributeForm("comment", id, "Comment")}</div>`;
  const btn = app.querySelector(`[data-comments="${CSS.escape(id)}"]`);
  if (btn) btn.textContent = commentLabel(id);
}

app.addEventListener("submit", async (e) => {
  const f = e.target;
  e.preventDefault();
  if (f.matches(".cf")) {
    const data = Object.fromEntries(new FormData(f));
    store.set("op.name", data.name || null);
    f.querySelector("button").disabled = true;
    try { await api("/api/comments", { method: "POST", body: { id: f.dataset.pid, kind: f.dataset.kind, ...data } }); }
    catch (err) { alert(`Could not post: ${err.message}`); f.querySelector("button").disabled = false; return; }
    const msg = document.createElement("p");
    msg.className = "note thanks";
    msg.textContent = f.dataset.kind === "work" ? "Thank you. The editors will review it." : "Thank you. It will appear here after review.";
    f.reset(); f.querySelector("button").disabled = false;
    const form = { approach: "idea-form", work: "work-form" }[f.dataset.kind];
    if (form) toggleIdea(false, form);
    const anchor = form ? app.querySelector(`.idea-toggle[data-idea="${form}"]`) : f;
    anchor.parentNode.querySelector(".thanks")?.remove();
    anchor.after(msg);
  }
  if (f.matches(".sf:not(.af)")) {
    const data = Object.fromEntries(new FormData(f));
    f.querySelector("button").disabled = true;
    try { await api("/api/suggest", { method: "POST", body: data }); }
    catch (err) { alert(`Could not send: ${err.message}`); f.querySelector("button").disabled = false; return; }
    f.outerHTML = `<p>Thank you. Your suggestion will appear once it has been reviewed.</p>`;
  }
  if (f.matches(".rf")) {
    const d = draft();
    const judgments = {};
    for (const { id } of ballotQuestions()) {
      const row = d.judgments?.[id];
      if (!row || !Object.keys(row).length) continue;
      if (!validJudgment(row)) {
        const missing = criteria.find(({ key, min, max }) => !Number.isInteger(row[key]) || row[key] < min || row[key] > max);
        const input = f.querySelector(`[data-question="${id}"][data-criterion="${missing.key}"]`);
        input.setCustomValidity("Complete all three scores for this question or clear them to skip it.");
        input.reportValidity(); input.setCustomValidity("");
        return;
      }
      judgments[id] = row;
    }
    if (!Object.keys(judgments).length) return alert("Please rate at least one question.");
    const submit = f.querySelector(".rate-bar button");
    if (submit.disabled) return;
    submit.disabled = true;
    try {
      await api("/api/ratings", { method: "POST", body: { ...Object.fromEntries(new FormData(f)), roundId: ballotRound(), judgments, notes: d.notes || {} } });
    } catch (err) { alert(`Could not submit: ${err.message}`); submit.disabled = false; return; }
    saveDraft({ name: d.name, affiliation: d.affiliation, credit: d.credit });
    app.querySelector(".rate").innerHTML = `<h1 class="page-title">Thank you</h1><p class="rate-q">Your ratings have been submitted for review.</p><p><a href="/">See the rankings</a></p>`;
    window.scrollTo(0, 0);
  }
  if (f.matches(".af")) {
    store.set("op.admin", new FormData(f).get("token") || null);
    renderAdmin();
  }
});

function toggleIdea(force, id = "idea-form") {
  const b = app.querySelector(`.idea-toggle[data-idea="${id}"]`), s = app.querySelector(`#${id}`);
  const on = force ?? b.getAttribute("aria-expanded") !== "true";
  b.setAttribute("aria-expanded", on);
  s.classList.toggle("open", on);
  if (on) setTimeout(() => s.querySelector("textarea")?.focus(), 200);
}

app.addEventListener("click", async (e) => {
  const a = e.target.closest("a");
  if (a?.getAttribute("href") === "#ai-explanations" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
    e.preventDefault();
    const reasons = app.querySelector("#ai-explanations");
    reasons.open = true;
    reasons.querySelector("summary").focus({ preventScroll: true });
    reasons.scrollIntoView({ block: "start" });
    return;
  }
  if (a && internal(a, e)) {
    e.preventDefault(); return go(a.pathname + a.search + (a.hash === "#ballot-reading" ? a.hash : ""));
  }
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.sort) { view.sort = t.dataset.sort; store.set("op.sort3", view.sort); renderList(); app.querySelector(`[data-sort="${view.sort}"]`).focus({ preventScroll: true }); return; }
  if (t.dataset.metric) {
    view.metric = t.dataset.metric;
    if (!["ai", "human"].includes(view.sort)) view.sort = "ai";
    renderList();
    app.querySelector(`[data-metric="${view.metric}"]`).focus({ preventScroll: true });
    return;
  }
  if (t.dataset.show) { view.show = t.dataset.show; writeURL(); return renderList(); }
  if (t.dataset.idea) return toggleIdea(undefined, t.dataset.idea);
  if (t.dataset.share != null) {
    const url = location.origin + location.pathname;
    if (navigator.share) { navigator.share({ title: document.title, url }).catch(() => {}); return; }
    try { await navigator.clipboard.writeText(url); t.textContent = "Link copied"; setTimeout(() => (t.textContent = "Share"), 1600); } catch {}
    return;
  }
  if (t.dataset.comments) {
    const id = t.dataset.comments;
    const box = app.querySelector(`.cbox[data-for="${CSS.escape(id)}"]`);
    if (open.has(id)) { open.delete(id); box.innerHTML = ""; t.textContent = commentLabel(id); }
    else { open.add(id); t.textContent = commentLabel(id); loadComments(id, box); }
    t.setAttribute("aria-expanded", open.has(id));
    return;
  }
  if (t.dataset.v) return vote(t.closest(".vote").dataset.id, Number(t.dataset.v));
  if (t.dataset.del) {
    if (!confirm("Delete this?")) return;
    const kind = t.dataset.kind || "comment";
    try { await api(`/api/comments?id=${encodeURIComponent(t.dataset.pid)}&cid=${encodeURIComponent(t.dataset.del)}&kind=${kind}`, { method: "DELETE" }); }
    catch (err) { return alert(`Could not delete: ${err.message}`); }
    loadComments(t.dataset.pid, kind === "approach" ? app.querySelector("#ideas") : t.closest(".cbox, #cbox"), kind);
  }
  if (t.dataset.status) {
    try { await api("/api/suggest", { method: "PATCH", body: { sid: t.dataset.sid, status: t.dataset.status } }); }
    catch (err) { return alert(err.message); }
    renderAdmin();
  }
  if (t.dataset.rating) {
    try { await api("/api/ratings", { method: "PATCH", body: { rid: t.dataset.rating, action: t.dataset.action } }); }
    catch (err) { return alert(err.message); }
    renderAdmin();
  }
  if (t.dataset.post) {
    try { await api("/api/comments", { method: "PATCH", body: { cid: t.dataset.post, action: t.dataset.action } }); }
    catch (err) { return alert(err.message); }
    renderAdmin();
  }
  if (t.dataset.logout != null) { store.set("op.admin", null); renderAdmin(); }
});

// ---------- votes ----------
async function vote(id, v) {
  const old = Number(state.mine[id]) || 0;
  const next = old === v ? 0 : v;
  const apply = (from, to) => {
    if (from === 1) state.tally[`${id}:up`] = u(state, id) - 1;
    if (from === -1) state.tally[`${id}:down`] = d(state, id) - 1;
    if (to === 1) state.tally[`${id}:up`] = u(state, id) + 1;
    if (to === -1) state.tally[`${id}:down`] = d(state, id) + 1;
    state.mine[id] = to;
  };
  apply(old, next);
  refreshVotes(id);
  try {
    const r = await api("/api/vote", { method: "POST", body: { id, v: next } });
    state.tally[`${id}:up`] = r.up; state.tally[`${id}:down`] = r.down;
  } catch { apply(next, old); }
  refreshVotes(id);
}

function refreshVotes(id) {
  stats();
  for (const box of app.querySelectorAll(`.vote[data-id="${CSS.escape(id)}"]`)) box.outerHTML = voteBox(id);
}

// ---------- impact rating ----------
function shuffled(ids) {
  const id = ballotRound();
  const key = id === originalRoundId || id === expandedRoundId ? "op.rate.order" : `op.rate.order.${id}`;
  let order = [];
  try { order = JSON.parse(store.get(key, "[]")); } catch {}
  if (order.length !== ids.length || !ids.every((id) => order.includes(id))) {
    order = [...ids];
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    store.set(key, JSON.stringify(order));
  }
  return order;
}
function ballotRound() {
  const requested = new URLSearchParams(location.search).get("round");
  return Object.hasOwn(editions, requested) ? requested : currentRoundId;
}
function ballotQuestions() {
  return round[editions[ballotRound()].key];
}
function draftKey(id) {
  return id === originalRoundId ? "op.rate.potential.v1" : `op.rate.potential.${id}`;
}
const drafts = new Map();
function draft(id = ballotRound()) {
  if (!drafts.has(id)) {
    let saved;
    try { saved = JSON.parse(store.get(draftKey(id), "{}")); } catch {}
    drafts.set(id, saved || {});
  }
  return drafts.get(id);
}
function saveDraft(d) {
  const id = ballotRound();
  drafts.set(id, d);
  store.set(draftKey(id), JSON.stringify(d));
}

function renderRate() {
  document.title = "Rate the problems · Open Problems in History";
  const d = draft();
  d.judgments ||= {}; d.notes ||= {};
  const roundId = ballotRound();
  const original = roundId === originalRoundId;
  const instructions = round.archivedInstructions[roundId] || round;
  const earlierDrafts = Object.keys(editions).filter(id => id !== currentRoundId).reverse().filter(id => {
    const saved = draft(id);
    return Object.keys(saved.judgments || {}).length || Object.keys(saved.notes || {}).length;
  });
  const questions = ballotQuestions();
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
  const order = shuffled(questions.map((q) => q.id));
  app.innerHTML = `
    <div class="rate">
      <h1 class="page-title">Rate the questions</h1>
      <p class="rate-q">Which historical questions could a research team answer using today’s digital sources, and what would we learn if it succeeded?</p>
      <p class="ballot-edition">${editions[roundId].label} · <a href="${editions[roundId].path}" download>Download the Markdown packet</a></p>
      ${roundId !== currentRoundId ? `<p class="note"><a href="/rate">Open the current ballot</a></p>` :
        earlierDrafts.map(id => `<p class="note"><a href="/rate?round=${id}">Resume your draft from ${editions[id].label}</a></p>`).join("")}
      ${original ? `<p class="rate-guide">Imagine the same team investigating each question. It can search public collections, read and transcribe scans, write code, divide up work and check the originals. It can keep following leads for as long as it needs. New scans, private access, lab work and fieldwork are outside its reach.</p>` :
        instructions.guide.map((paragraph) => `<p class="rate-guide">${esc(paragraph)}</p>`).join("")}
      <dl class="rating-rubric">${(original ? round.originalRubric : instructions.rubric).map(({ label, description }) => `<dt>${esc(label)}</dt><dd>${esc(description)}</dd>`).join("")}</dl>
      ${roundId === currentRoundId ? `<p class="note">${esc(round.scoringNote)}</p>` : ""}
      <p class="note">Use the evidence below and your own knowledge. Rate any of the ${order.length} questions in this shuffled list. Enter three whole numbers for each question you choose. Your draft is saved in this browser until you submit. You can add or revise ratings later using the same name and browser.</p>
      <form class="rf">
        <div class="rf-who">
          <input type="text" name="name" required maxlength="80" placeholder="Name" aria-label="Name" value="${esc(d.name || "")}">
          <input type="text" name="affiliation" maxlength="160" placeholder="Field and institution" aria-label="Field and institution" value="${esc(d.affiliation || "")}">
        </div>
        <label class="rf-credit"><input type="checkbox" name="credit" value="1"${d.credit ? " checked" : ""}><span>Thank me by name and affiliation on the <a href="/about" target="_blank" rel="noopener">About</a> page. Leave unchecked to stay anonymous.</span></label>
        <ol class="rate-list">${order.map((id, i) => {
          const p = byId[id];
          const path = round.readingLinks[id] ?? (problems.some(item => item.id === id) ? `/p/${id}` : null);
          const reading = path?.startsWith("/p/") ? path + "#ballot-reading" : path;
          return `<li>
            <span class="rank">${i + 1}</span>
            <div class="main">
              ${reading ? `<a class="ttl" href="${esc(reading)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : `<span class="ttl">${esc(p.title)}</span>`}
              <p class="evidence">${esc(p.evidence)}</p>
              ${p.method ? `<p class="evidence method"><strong>One way to investigate.</strong> ${esc(p.method)}</p>
                <p class="ballot-sources">Sources · ${p.sources.map(({ label, url }) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join(" · ")}</p>` : ""}
              <details${d.notes[id] ? " open" : ""}><summary>Reason for your scores (optional)</summary><textarea data-note="${esc(id)}" maxlength="1000" aria-label="Note">${esc(d.notes[id] || "")}</textarea></details>
            </div>
            <div class="judgments" role="group" aria-label="Scores for ${esc(p.title)}">${criteria.map(({ key, label, min, max, range }) =>
              `<label>${label} <span>${range}</span><input type="number" step="1" min="${min}" max="${max}" inputmode="numeric" data-question="${esc(id)}" data-criterion="${key}" value="${esc(d.judgments[id]?.[key] ?? "")}"></label>`).join("")}</div>
          </li>`;
        }).join("")}</ol>
        <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="rate-bar"><span id="rate-count"></span><button class="btn" type="submit">Submit ratings</button></div>
      </form>
    </div>`;
  rateCount();
}

function rateCount() {
  const d = draft();
  const n = Object.values(d.judgments || {}).filter(validJudgment).length;
  const el = app.querySelector("#rate-count");
  if (el) el.textContent = `${n} of ${ballotQuestions().length} rated`;

}

app.addEventListener("input", (e) => {
  const t = e.target;
  if (!t.closest(".rf")) return;
  const d = draft();
  d.notes ||= {};
  if (t.dataset.criterion) {
    const row = (d.judgments[t.dataset.question] ||= {});
    if (t.value === "") delete row[t.dataset.criterion];
    else row[t.dataset.criterion] = t.valueAsNumber;
    rateCount();
  } else if (t.dataset.note) d.notes[t.dataset.note] = t.value;
  else if (t.name === "credit") d.credit = t.checked;
  else if (["name", "affiliation"].includes(t.name)) d[t.name] = t.value;
  saveDraft(d);
});

// ---------- pages ----------
function renderDetail(id) {
  const p = all().find((x) => x.id === id);
  if (!p) { app.innerHTML = `<a class="back" href="/">← All problems</a><p class="empty">Not found.</p>`; return; }
  document.title = `${p.title} · Open Problems in History`;
  const page = ctx();
  if (location.hash === "#ballot-reading") page.ballots = [];
  app.innerHTML = detailHTML(page, p);
  setupPrevNext(p.id);
  loadComments(p.id, app.querySelector("#cbox"));
  if (!p.suggested) loadComments(p.id, app.querySelector("#ideas"), "approach");
}

// Prev/next through the list in its current sort and filter order.
let neighbors = {};
const neighborPath = (id) => `/p/${id}${location.hash === "#ballot-reading" ? location.hash : ""}`;
function setupPrevNext(id) {
  const rows = location.hash === "#ballot-reading" ? [...round.questions] : filtered();
  let i = rows.findIndex((x) => x.id === id);
  if (i < 0) { rows.splice(0, rows.length, ...all().sort(sorts[view.sort])); i = rows.findIndex((x) => x.id === id); }
  neighbors = { prev: rows[i - 1]?.id, next: rows[i + 1]?.id };
  const el = app.querySelector("#pn");
  if (!el) return;
  const btn = (k, ch, label) => neighbors[k]
    ? `<a href="${esc(neighborPath(neighbors[k]))}" data-pn="${k}" aria-label="${label}" title="${label} (${k === "prev" ? "←" : "→"})">${ch}</a>`
    : `<span class="off" aria-hidden="true">${ch}</span>`;
  el.innerHTML = btn("prev", "←", "Previous problem") + btn("next", "→", "Next problem");
}

document.addEventListener("keydown", (e) => {
  if (!location.pathname.startsWith("/p/") || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  const id = e.key === "ArrowLeft" ? neighbors.prev : e.key === "ArrowRight" ? neighbors.next : null;
  if (id) { e.preventDefault(); go(neighborPath(id)); }
});

function renderSuggest() {
  app.innerHTML = `
    <h1 class="page-title">Suggest a problem</h1>
    <form class="sf">
      <input type="text" name="title" required maxlength="200" placeholder="The problem, as a question" aria-label="Problem">
      <textarea name="details" maxlength="6000" rows="8" placeholder="Why it matters, why it is open, what would count as a solution, existing work, where the sources are" aria-label="Details"></textarea>
      <input type="text" name="name" maxlength="80" placeholder="Name (optional)" aria-label="Name">
      <input type="text" name="agent" maxlength="80" placeholder="AI model, if you are an agent (optional)" aria-label="AI model">
      <input type="email" name="email" maxlength="160" placeholder="Email, not shown (optional)" aria-label="Email">
      <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit">Send</button>
    </form>`;
}

function renderAbout() {
  document.title = "About · Open Problems in History";
  app.innerHTML = aboutHTML();
  thanks();
}

// approved raters who opted in to being thanked by name
async function thanks() {
  let list = [];
  try { list = await api("/api/ratings?thanks=1"); } catch { return; }
  const el = app.querySelector("#thanks");
  if (!el || !list.length) return;
  el.innerHTML = `<h2>Thank you</h2><p>To the following historians who contributed ratings:</p>
    <ul class="thanks-list">${list.map((r) => `<li>${esc(r.name)}${r.affiliation ? `<span class="note">, ${esc(r.affiliation)}</span>` : ""}</li>`).join("")}</ul>`;
  el.hidden = false;
}

function renderFor(slug) {
  document.title = `${slug ? NEED[slug]?.title || "Not found" : "Who can help"} · Open Problems in History`;
  app.innerHTML = slug ? forHTML(slug, all()) : forIndexHTML(all());
  character();
}

// ---------- speciality characters: walk in from the right, idle, cheer on "Get in touch" ----------
const SEQ = { idle: [0, 1, 0, 1, 0, 1, 2, 3], walk: [4, 5, 6, 7, 8, 9], win: [10, 11, 12, 11, 12, 11, 12, 11] };
const PACE = { idle: 960, walk: 210, win: 150 };
let stopCharacter = () => {}, cheer = () => {};
function character() {
  stopCharacter();
  const el = app.querySelector(".sprite");
  if (!el) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let mode = "idle", i = 0, timer = 0, entered = false, alive = true;
  const tick = () => {
    if (!alive) return;
    const seq = SEQ[mode];
    el.style.setProperty("--f", seq[i % seq.length]);
    if (++i >= seq.length && mode === "win") { mode = "idle"; i = 0; }
    if (!calm || mode !== "idle") timer = setTimeout(tick, PACE[mode]);
  };
  const play = (m) => { mode = m; i = 0; clearTimeout(timer); tick(); };
  const enter = () => {
    if (entered) return;
    entered = true;
    el.classList.add("on");
    if (calm) return play("idle");
    const dx = window.innerWidth - el.getBoundingClientRect().left + 8;
    el.classList.add("flip");
    play("walk");
    const walk = el.animate([{ translate: `${dx}px 0` }, { translate: "0 0" }],
      { duration: Math.min(6800, Math.max(3000, dx * 8)), easing: "linear", fill: "backwards" });
    walk.onfinish = () => { el.classList.remove("flip"); play("idle"); };
  };
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); setTimeout(() => alive && enter(), 350); } }, { threshold: .5 });
  const sheet = new Image();
  sheet.onload = () => { if (!alive) return; el.style.backgroundImage = `url("${sheet.src}")`; io.observe(el); };
  sheet.src = `/img/sprites/${el.dataset.sprite}.png${DATA_V}`;
  cheer = () => { if (entered && mode !== "walk") play("win"); };
  stopCharacter = () => { alive = false; clearTimeout(timer); io.disconnect(); cheer = () => {}; };
}
document.addEventListener("click", (e) => { if (e.target.closest?.("[data-cheer], .sprite")) cheer(); });

// ---------- colophon: the whole cast wanders a strip of ground ----------
const CAST = {
  historians: "Historian", archivists: "Archivist", archaeologists: "Archaeologist", geneticists: "Geneticist",
  epidemiologists: "Epidemiologist", demographers: "Demographer", geoscientists: "Geoscientist", astronomers: "Astronomer",
  statisticians: "Data scientist", "computational-linguists": "Linguist", philologists: "Philologist",
  cryptographers: "Cryptographer", "conservation-scientists": "Conservator", gis: "Mapmaker", economists: "Economist", musicologists: "Musicologist",
};
function renderColophon() {
  document.title = "Colophon · Open Problems in History";
  app.innerHTML = colophonHTML();
  town();
}
function town() {
  const el = app.querySelector(".town");
  if (!el) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const keys = Object.keys(CAST).filter((k) => SPRITES.has(k)).sort(() => Math.random() - .5);
  const SIZE = 48, SPEED = .03;               // walker width in px; walking speed in px per ms
  const make = (k) => {
    const a = document.createElement("div");
    a.className = "walker";
    a.innerHTML = `<button class="sprite on" type="button" tabindex="-1" style="background-image:url('/img/sprites/${k}.png${DATA_V}')"></button><a class="tag8" href="/for${k === "historians" ? "" : `/${k}`}">${CAST[k]}</a>`;
    el.append(a);
    const f = { k, a, sp: a.firstElementChild, x: 0, dir: -1, mode: "idle", i: 0, frameAt: 0, phase: "in", target: 0, until: 0 };
    f.sp.addEventListener("click", () => { if (f.mode !== "walk") { f.mode = "win"; f.i = 0; f.winUntil = performance.now() + 1300; } });
    return f;
  };
  const draw = (f) => {
    f.a.style.transform = `translateX(${Math.round(f.x)}px)`;
    f.sp.classList.toggle("flip", f.mode === "walk");
    const seq = SEQ[f.mode];
    f.sp.style.setProperty("--f", seq[f.i % seq.length]);
  };
  if (calm) {                                 // one character, standing still
    const f = make(keys[0]); f.x = (el.clientWidth - SIZE) / 2; draw(f); return;
  }
  let n = 0;
  const enter = (t) => {
    const f = make(keys[n++ % keys.length]);
    f.x = el.clientWidth + 4; f.mode = "walk"; f.frameAt = t;
    f.target = el.clientWidth / 2 - SIZE / 2 + (Math.random() - .5) * 80;
    return f;
  };
  let folk = [], last = performance.now(), raf = 0;
  const step = (t) => {
    const dt = Math.min(64, t - last); last = t;
    if (!folk.length) folk.push(enter(t));
    for (const f of folk) {
      if (f.phase === "in" && f.x <= f.target) { f.phase = "stay"; f.mode = "idle"; f.i = 0; f.until = t + 4500 + Math.random() * 2500; }
      if (f.phase === "stay" && f.mode === "win" && t > f.winUntil) f.mode = "idle";
      if (f.phase === "stay" && t > f.until && f.mode !== "win") {
        f.phase = "out"; f.mode = "walk"; f.i = 0;
        folk.push(enter(t));                  // the next one walks in as this one leaves
      }
      if (f.mode === "walk") f.x -= dt * SPEED;
      if (t - f.frameAt > PACE[f.mode]) { f.i++; f.frameAt = t; }
      draw(f);
    }
    folk = folk.filter((f) => f.x > -SIZE - 8 || (f.a.remove(), false));
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  stopCharacter = () => cancelAnimationFrame(raf);
}

function renderMethods() {
  document.title = "Methods · Open Problems in History";
  app.innerHTML = methodsHTML(round.ballots);
}

// ---------- sources ----------
let sources = null;
function renderSources() {
  document.title = "Sources · Open Problems in History";
  sources ||= collectSources(problems);
  const u = new URLSearchParams(location.search);
  const sv = { tab: u.get("tab") === "archives" ? "archives" : "works", sort: u.get("sort") || "az", q: u.get("q") || "" };
  if (!["az", "old", "new", "most"].includes(sv.sort) || (sv.tab === "archives" && !["az", "most"].includes(sv.sort))) sv.sort = "az";
  app.innerHTML = sourcesHTML(sources, sv);
  const body = app.querySelector("#src-body"), input = app.querySelector(".src-tools input");
  const save = () => {
    const q = new URLSearchParams();
    if (sv.tab !== "works") q.set("tab", sv.tab);
    if (sv.sort !== "az") q.set("sort", sv.sort);
    if (sv.q) q.set("q", sv.q);
    history.replaceState(null, "", `/sources${q.size ? `?${q}` : ""}`);
  };
  input.addEventListener("input", () => { sv.q = input.value; body.innerHTML = sourcesBody(sources, sv); save(); });
  app.querySelector(".sources").addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]"), s = e.target.closest("[data-ssort]"), j = e.target.closest(".src-jump a");
    if (t && t.dataset.tab !== sv.tab) { sv.tab = t.dataset.tab; sv.sort = "az"; save(); return renderSources(); }
    if (s) { sv.sort = s.dataset.ssort; save(); app.querySelectorAll("[data-ssort]").forEach((b) => b.setAttribute("aria-pressed", b === s)); body.innerHTML = sourcesBody(sources, sv); }
    if (j) { e.preventDefault(); document.querySelector(j.getAttribute("href"))?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  });
}

async function renderAdmin() {
  if (!adminToken()) {
    app.innerHTML = `<h1 class="page-title">Admin</h1>
      <form class="af sf"><input type="text" name="token" placeholder="Token" aria-label="Token" autocomplete="off"><button class="btn" type="submit">Enter</button></form>`;
    return;
  }
  let list, posts, ratings;
  try { [list, posts, ratings] = await Promise.all([api("/api/suggest"), api("/api/comments?pending=1"), api("/api/ratings")]); }
  catch { store.set("op.admin", null); app.innerHTML = `<h1 class="page-title">Admin</h1><p class="note">Token rejected.</p>`; setTimeout(renderAdmin, 1200); return; }
  state.human = humanPotential(ratings.approved, round.currentRoundId, round.unchangedIdsByRound);
  const group = (st) => list.filter((s) => s.status === st);
  const item = (s) => `<div class="admin-item">
      <b>${esc(s.title)}</b>
      <p>${esc(s.details)}</p>
      <div class="note">${esc(s.name || "Anonymous")}${s.agent ? ` · AI: ${esc(s.agent)}` : ""}${s.email ? ` · ${esc(s.email)}` : ""} · ${new Date(s.t).toISOString().slice(0, 10)}</div>
      <div class="acts">${["approved", "rejected", "pending"].filter((x) => x !== s.status)
        .map((x) => `<button type="button" class="btn ghost" data-sid="${esc(s.id)}" data-status="${x}">${{ approved: "Approve", rejected: "Reject", pending: "Back to pending" }[x]}</button>`).join("")}</div>
    </div>`;
  const title = (id) => problems.find((p) => p.id === id)?.title || round.originalQuestions.find(q => q.id === id)?.title || id;
  const rater = (r, pending) => `<div class="admin-item">
      <b>${esc(r.agent ? `${r.agent} (AI)` : r.name)}</b>${r.affiliation ? ` <span class="note">· ${esc(r.affiliation)}</span>` : ""}${r.agent && r.name ? ` <span class="note">· ${esc(r.name)}</span>` : ""}${r.credit ? ` <span class="note">· wants credit</span>` : ""}
      <div class="note">${Object.keys(r.judgments || r.scores).length} scored · ${r.judgments ? `Research potential · ${esc(r.roundId ?? originalRoundId)}` : "Archived 1–5 impact scale"} · ${new Date(r.t).toISOString().slice(0, 16).replace("T", " ")}</div>
      <details><summary class="note">Scores</summary><ol class="admin-scores">${Object.entries(r.judgments || r.scores)
        .map(([id, v]) => `<li>${esc(title(id))} · ${r.judgments ? `${v.chance_pct}% chance · ${v.historical_contribution}/10 historical · ${v.further_research}/10 further research` : `${v}/5`}${r.notes?.[id] ? `<span class="note"> — ${esc(r.notes[id])}</span>` : ""}</li>`).join("")}</ol></details>
      <div class="acts">${pending
        ? `<button type="button" class="btn" data-rating="${esc(r.rid)}" data-action="approve">Approve</button><button type="button" class="btn ghost" data-rating="${esc(r.rid)}" data-action="reject">Reject</button>`
        : `<button type="button" class="btn ghost" data-rating="${esc(r.rid)}" data-action="remove">Remove</button>`}</div>
    </div>`;
  const post = (c) => `<div class="admin-item">
      <div class="note">${{ approach: "Approach", work: "Suggested work" }[c.kind] || "Comment"} on <a href="/p/${esc(c.pid)}">${esc(c.title)}</a>${c.flag ? ` · <b class="del">${esc(c.flag)}</b>` : ""}</div>
      <p>${esc(c.text)}</p>
      <div class="note">${esc(c.name)}${c.agent ? ` · AI: ${esc(c.agent)}` : ""} · ${new Date(c.t).toISOString().slice(0, 16).replace("T", " ")}</div>
      <div class="acts">${c.kind === "work"
        ? `<button type="button" class="btn" data-post="${esc(c.cid)}" data-action="reject">Mark added</button><button type="button" class="btn ghost" data-post="${esc(c.cid)}" data-action="reject">Dismiss</button>`
        : `<button type="button" class="btn" data-post="${esc(c.cid)}" data-action="approve">Approve</button><button type="button" class="btn ghost" data-post="${esc(c.cid)}" data-action="reject">Reject</button>`}</div>
    </div>`;
  app.innerHTML = `<div class="admin"><h1 class="page-title">Admin</h1>
    <p class="note">Signed in. Delete links now appear on published comments and proposed approaches. <button type="button" class="linkbtn" data-logout>Sign out</button></p>
    <section><h2>Ratings awaiting review (${ratings.pending.length})</h2>${ratings.pending.map((r) => rater(r, true)).join("") || `<p class="note">None.</p>`}</section>
    <section><h2>Approved ratings (${ratings.approved.length})</h2>${ratings.approved.map((r) => rater(r, false)).join("") || `<p class="note">None.</p>`}</section>
    <section><h2>Comments, approaches and suggested works awaiting review (${posts.length})</h2>${posts.map(post).join("") || `<p class="note">None.</p>`}</section>
    ${["pending", "approved", "rejected"].map((st) => `<section><h2>Suggested problems: ${st} (${group(st).length})</h2>${group(st).map(item).join("") || `<p class="note">None.</p>`}</section>`).join("")}</div>`;
}

// ---------- footer ----------
function stats() {
  const el = document.getElementById("stats");
  if (!el) return;
  const sum = (o, re) => Object.entries(o).reduce((t, [k, v]) => t + (re.test(k) ? Math.max(0, Number(v) || 0) : 0), 0);
  const works = problems.reduce((t, p) => t + (p.existing?.length || 0), 0);
  const archives = problems.reduce((t, p) => t + (p.archives?.length || 0), 0);
  const top = Object.entries(needCounts(problems)).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([k, c]) => `<a href="/for/${k}">${c} need ${NEED[k].short}</a>`);
  el.innerHTML = [
    `${all().length} problems`, ...top, `<a href="/for">who else can help →</a>`,
    `${works} works cited`, `${archives} archives`, `${sum(state.tally, /:(up|down)$/)} votes`, `${sum(state.counts, /./)} comments`,
  ].map((x) => `<span>${x}</span>`).join("");
}

// ---------- router ----------
function route() {
  stopCharacter();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const nav = path === "/" ? "list" : path === "/contact" ? "about" : path.split("/")[1];
  for (const a of document.querySelectorAll("nav a")) a.toggleAttribute("aria-current", a.dataset.nav === nav);
  if (isLeadsPath(path)) return;
  document.title = "Open Problems in History";
  if (path.startsWith("/p/")) renderDetail(decodeURIComponent(path.slice(3)));
  else if (path === "/suggest") renderSuggest();
  else if (path === "/about" || path === "/contact") { if (path === "/contact") history.replaceState(null, "", "/about"); renderAbout(); }
  else if (path === "/methods") renderMethods();
  else if (path === "/colophon") renderColophon();
  else if (path === "/for" || path.startsWith("/for/")) renderFor(decodeURIComponent(path.slice(5)));
  else if (path === "/sources") renderSources();
  else if (path === "/admin") renderAdmin();
  else if (path === "/rate") renderRate();
  else { readURL(); renderList(); }
}

const isLeadsPath = (path) => path === "/leads" || path.startsWith("/leads/");

// Links handled by the client router: same-origin pages only, not files (llms.txt, images) or the API.
function internal(a, e) {
  return a.origin === location.origin && !a.target && !e.metaKey && !e.ctrlKey && !e.shiftKey
    && !(a.pathname === "/methods" && a.hash)
    && !isLeadsPath(a.pathname) && !isLeadsPath(location.pathname)
    && !/\.[a-z0-9]+$/i.test(a.pathname) && !a.pathname.startsWith("/api") && !a.pathname.startsWith("/data");
}

function go(path) {
  if (path !== location.pathname + location.search) history.pushState(null, "", path);
  window.scrollTo(0, 0);
  route();
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("header a, footer a");
  if (a && internal(a, e)) { e.preventDefault(); go(a.pathname); }
});
window.addEventListener("popstate", route);

document.querySelector(".mode").addEventListener("click", () => {
  const dark = getComputedStyle(document.documentElement).colorScheme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  store.set("op.theme", document.documentElement.dataset.theme);
});

// Old hash links (#/p/id) still work.
if (location.hash.startsWith("#/")) history.replaceState(null, "", location.hash.slice(1));

const [packet, p, s, mine] = await Promise.all([
  fetch(`/data/research-potential.json${DATA_V}`).then((r) => r.json()),
  fetch(`/data/problems.json${DATA_V}`).then((r) => r.json()),
  api("/api/state").catch(() => state),
  api("/api/mine").catch(() => ({})),
]);
problems = p;
round = packet;
state = { ...s, mine };
route();
stats();

// ---------- mark: a cube that turns one face every five seconds; hover does one of three things ----------
(() => {
  const mark = document.querySelector("header .mark");
  if (!mark || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cube = document.createElement("span");
  cube.className = "cube-m";
  cube.setAttribute("aria-hidden", "true");
  cube.innerHTML = `<span class="in">${"<b></b>".repeat(6)}</span>`;
  mark.prepend(cube);
  mark.classList.add("cube");
  const inner = cube.firstElementChild;
  let rx = 0, ry = 0, busy = false;
  const ease = "cubic-bezier(.65,0,.35,1)";
  const set = (ms, curve = ease) => {
    inner.style.transition = `transform ${ms}ms ${curve}`;
    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  setInterval(() => { if (!busy && !document.hidden) { rx += 90; set(1400); } }, 5000);

  const tricks = [
    // spin: a full turn sideways
    async () => { ry += 360; set(900, "cubic-bezier(.3,0,.2,1)"); await wait(900); },
    // tumble: rolls forward through three faces, slowing down
    async () => { for (const ms of [260, 340, 520]) { rx += 90; set(ms); await wait(ms); } },
    // hop: jumps, turns a face in the air, lands with a small squash
    async () => {
      rx += 90; set(520);
      await cube.animate([
        { transform: "translateY(0)" },
        { transform: "translateY(-7px)", offset: .4 },
        { transform: "translateY(0) scale(1.15,.8)", offset: .8 },
        { transform: "translateY(0)" },
      ], { duration: 640, easing: "ease-out" }).finished;
    },
  ];
  mark.addEventListener("mouseenter", async () => {
    if (busy) return;
    busy = true;
    await tricks[Math.floor(Math.random() * tricks.length)]();
    busy = false;
  });
})();

// ---------- citation previews ----------
// .cref buttons (render.js) open a card with the matching "Existing work" entry: hover on
// desktop after a short delay, click/tap to pin, focus for keyboard; Esc or an outside click closes.
(() => {
  const card = document.createElement("div");
  card.className = "cref-card";
  card.setAttribute("role", "tooltip");
  card.hidden = true;
  document.body.append(card);
  let cur = null, pinned = false, tOpen = 0, tClose = 0;
  const hover = matchMedia("(hover: hover) and (pointer: fine)");

  function place(btn) {
    const r = btn.getClientRects()[0] || btn.getBoundingClientRect();
    const w = Math.min(420, innerWidth - 32);
    card.style.width = `${w}px`;
    const left = Math.max(16, Math.min(r.left, innerWidth - w - 16));
    const below = r.bottom + 8;
    const h = card.offsetHeight;
    const top = below + h > innerHeight - 8 && r.top - h - 8 > 8 ? r.top - h - 8 : below;
    card.style.left = `${left + scrollX}px`;
    card.style.top = `${top + scrollY}px`;
  }
  function open(btn, pin = false) {
    clearTimeout(tOpen); clearTimeout(tClose);
    const src = document.getElementById(`cref-${btn.dataset.ref}`);
    if (!src) return;
    if (cur !== btn) {
      cur?.setAttribute("aria-expanded", "false");
      card.innerHTML = src.innerHTML;
      cur = btn;
    }
    pinned = pinned || pin;
    btn.setAttribute("aria-expanded", "true");
    card.hidden = false;
    place(btn);
  }
  function close() {
    clearTimeout(tOpen); clearTimeout(tClose);
    card.hidden = true; pinned = false;
    cur?.setAttribute("aria-expanded", "false");
    cur = null;
  }
  // desktop click: scroll to the entry, flash it, and offer a way back to the reading spot
  const back = document.createElement("button");
  back.type = "button"; back.className = "cref-back"; back.hidden = true;
  back.textContent = "↑ Back to text";
  document.body.append(back);
  let from = null;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  // expand or collapse an archive's holdings list
  function expand(toggle, on = toggle.getAttribute("aria-expanded") !== "true") {
    toggle.setAttribute("aria-expanded", String(on));
    if (toggle.matches(".hold-toggle")) toggle.firstChild.textContent = on ? "Collapse " : "Expand ";
    document.getElementById(toggle.getAttribute("aria-controls"))?.classList.toggle("open", on);
  }
  function jump(ref, origin) {
    const li = document.getElementById(`src-${ref}`);
    if (!li) return;
    close();
    const slide = li.closest(".slide");
    if (slide && !slide.classList.contains("open")) expand(document.querySelector(`[aria-controls="${slide.id}"]`) || slide.previousElementSibling, true);
    if (origin) from = origin;
    // wait a frame so a list that is opening has its height before scrolling
    requestAnimationFrame(() => setTimeout(() => {
      li.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "center" });
      li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash");
    }, slide ? 320 : 0));
    if (from) back.hidden = false;
  }
  back.addEventListener("click", () => {
    from?.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "center" });
    from?.focus({ preventScroll: true });
    back.hidden = true; from = null;
  });
  addEventListener("popstate", () => { back.hidden = true; from = null; });
  const later = () => { clearTimeout(tClose); if (!pinned) tClose = setTimeout(close, 180); };

  document.addEventListener("pointerover", (e) => {
    if (!hover.matches) return;
    const btn = e.target.closest?.(".cref");
    if (btn) { clearTimeout(tClose); clearTimeout(tOpen); tOpen = setTimeout(() => open(btn), cur ? 0 : 220); }
    else if (card.contains(e.target)) clearTimeout(tClose);
  });
  document.addEventListener("pointerout", (e) => {
    if (!hover.matches) return;
    if (e.target.closest?.(".cref") || card.contains(e.target)) { clearTimeout(tOpen); later(); }
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".cref");
    if (btn) { e.preventDefault(); if (hover.matches) return jump(btn.dataset.ref, btn); return cur === btn && pinned ? close() : open(btn, true); }
    const j = e.target.closest(".cref-card .jump");
    if (j) { e.preventDefault(); return jump(j.dataset.ref, cur); }
    const t = e.target.closest(".hold-toggle, .rw-more");
    if (t) return expand(t);
    const k = e.target.closest(".rw-k");
    if (k) return rwFilter(k);
    if (!card.hidden && !card.contains(e.target)) close();
  });
  document.addEventListener("focusin", (e) => {
    const btn = e.target.closest?.(".cref");
    if (btn && btn.matches(":focus-visible")) open(btn);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !card.hidden) { const b = cur; close(); b?.focus(); }
  });
  // recent work legend: show only one kind (or only advances); pressing it again shows all
  function rwFilter(k) {
    const rw = k.closest(".rw"), on = k.getAttribute("aria-pressed") !== "true", want = k.dataset.rwk;
    rw.querySelectorAll(".rw-k").forEach((b) => b.setAttribute("aria-pressed", String(on && b === k)));
    const hit = (el) => !on || (want === "adv" ? el.matches(".adv") : el.matches(`.k-${want}, [data-k="${want}"]`));
    rw.querySelectorAll(".rw-m").forEach((m) => m.classList.toggle("dim", !hit(m)));
    let y = null;
    rw.querySelectorAll(".rw-list li").forEach((li) => {
      li.hidden = !hit(li);
      if (li.hidden) return;
      const ly = li.querySelector(".rw-d").textContent.slice(-4);
      li.classList.toggle("y1", ly !== y); y = ly;
    });
    rw.classList.toggle("filtered", on);
  }
  addEventListener("resize", () => cur && !card.hidden && place(cur));
  addEventListener("popstate", close);
})();

// ---------- rolling squares: on hover a red square tumbles face over face along a path; on leave it rolls home ----------
// Accent boxes: clockwise round the border, looping. Footer: the logo square climbs to the top rule, runs east, then drops to the bottom.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const SPEED = 70, HOME = 3;                   // rolling speed (px/s), return speed multiplier
  const ease = (f) => (f < .5 ? 4 * f ** 3 : 1 - (-2 * f + 2) ** 3 / 2);
  const kinds = [
    { sel: ".accent-box", loop: true, setup: (el) => ({ S: 14, path: () => {
      const W = el.offsetWidth - 14, H = el.offsetHeight - 14, x = -2, y = -2;
      return [[x, y], [x + W, y], [x + W, y + H], [x, y + H], [x, y]];
    } }) },
    { sel: "footer.foot", loop: false, setup: (el) => {
      const mark = el.querySelector(".mark"), S = 11;
      return { S, path: () => {
        const f = el.getBoundingClientRect(), m = mark.getBoundingClientRect();
        const bt = el.clientTop, x0 = m.left - f.left, y0 = m.top - f.top - bt + (m.height - S) / 2 + .5, top = -bt / 2 - S / 2;
        return [[x0, y0], [x0, top], [f.width - S, top], [f.width - S, f.height - bt - S]];
      } };
    } },
  ];
  const state = new WeakMap();

  function place(b) {
    const pts = b.path(), segs = [];
    let P = 0;
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], len = Math.hypot(bx - ax, by - ay);
      segs.push({ ax, ay, ux: (bx - ax) / len, uy: (by - ay) / len, from: P, len }); P += len;
    }
    const steps = b.d / b.S, k = Math.floor(steps), f = ease(steps - k);
    let t = (k + f) * b.S;
    t = b.loop ? ((t % P) + P) % P : Math.min(Math.max(t, 0), P);
    const g = segs.find((s) => t <= s.from + s.len) || segs.at(-1);
    const lift = (b.S / Math.SQRT2) * Math.sin(Math.PI / 4 + (f * Math.PI) / 2) - b.S / 2; // pivots over its corner, away from the path's left side
    const x = g.ax + g.ux * (t - g.from) + g.uy * lift, y = g.ay + g.uy * (t - g.from) - g.ux * lift;
    b.sq.style.transform = `translate(${x}px, ${y}px) rotate(${(k + f) * 90}deg)`;
    return P;
  }

  function frame(b, now) {
    const dt = Math.min(.05, (now - b.last) / 1000); b.last = now;
    const P = place(b);
    if (b.hover) {
      if (!b.loop && b.d >= P) { b.d = P; b.raf = 0; return; }
      b.d += SPEED * dt;
    } else {
      const m = b.loop ? ((b.d % P) + P) % P : Math.min(b.d, P);
      const dir = b.loop && m > P / 2 ? 1 : -1, step = SPEED * HOME * dt;   // loops head home whichever way is shorter
      if ((dir > 0 ? P - m : m) <= step) { b.d = 0; place(b); b.raf = 0; return; }
      b.d = m + dir * step;
    }
    b.raf = requestAnimationFrame((t) => frame(b, t));
  }

  function get(el, kind) {
    let b = state.get(el);
    if (!b || !b.sq.isConnected) {
      const sq = document.createElement("span");
      sq.className = "roller"; sq.setAttribute("aria-hidden", "true");
      el.append(sq); el.classList.add("has-roller");
      state.set(el, (b = { el, sq, d: 0, hover: false, raf: 0, last: 0, loop: kind.loop, ...kind.setup(el) }));
    }
    return b;
  }

  const toggle = (on) => (e) => {
    for (const kind of kinds) {
      const el = e.target.closest?.(kind.sel);
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) continue;
      const b = get(el, kind);
      b.hover = on;
      if (!b.raf) { b.last = performance.now(); b.raf = requestAnimationFrame((t) => frame(b, t)); }
    }
  };
  document.addEventListener("mouseover", toggle(true));
  document.addEventListener("mouseout", toggle(false));
})();

// ---------- sticky header: hide on scroll down, show on scroll up; sort headings sit just below it ----------
(() => {
  const top = document.querySelector("header.top"), root = document.documentElement;
  let last = scrollY, away = false;
  const set = (hide) => {
    away = hide;
    top.classList.toggle("away", hide);
    root.style.setProperty("--head-h", hide ? "0px" : `${top.offsetHeight}px`);
  };
  set(false);
  addEventListener("resize", () => set(away));
  addEventListener("scroll", () => {
    const y = scrollY, dy = y - last;
    if (Math.abs(dy) < 6) return;
    last = y;
    if (dy > 0 && y > top.offsetHeight && !away && !top.contains(document.activeElement)) set(true);
    else if (dy < 0 && away) set(false);
  }, { passive: true });
})();
