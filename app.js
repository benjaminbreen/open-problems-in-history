import { FLAGS, esc, period, voteBox as vbox, rowHTML, detailHTML, aboutHTML, commentLabel as clabel, contributeForm, who, up as u, down as d, score as sc, ncom as nc } from "/render.js";

const app = document.getElementById("app");
const store = {
  get: (k, dflt) => { try { return localStorage.getItem(k) ?? dflt; } catch { return dflt; } },
  set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

let problems = [];
let state = { tally: {}, counts: {}, mine: {}, suggestions: [], impact: {} };
const imp = (id) => state.impact?.[id]?.score ?? -99;
const view = { q: "", sort: store.get("op.sort2", "impact"), show: "all" };

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
const ctx = () => ({ ...state, open });

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

function all() {
  const sugg = state.suggestions.map((s) => ({ id: s.id, title: s.title, short: s.details?.split("\n")[0] || "", suggested: s, flags: [], region: "", field: "", start: null }));
  return problems.concat(sugg);
}

// ---------- list ----------
const sorts = {
  impact: (a, b) => imp(b.id) - imp(a.id) || score(b.id) - score(a.id) || (a.start ?? 1e9) - (b.start ?? 1e9),
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
    .sort(sorts[view.sort]);
}

function seg(name, label, options) {
  return `<div class="seg" role="group" aria-label="${label}"><span>${label}</span>${options
    .map(([v, l]) => `<button type="button" data-${name}="${v}" aria-pressed="${view[name] === v}">${l}</button>`).join("")}</div>`;
}

function renderList() {
  const col = (k, l) => `<button type="button" data-sort="${k}" aria-pressed="${view.sort === k}" data-tip="${esc(tips[k])}" aria-description="${esc(tips[k])}">${l}</button>`;
  const tips = {
    impact: impactTip(),
    votes: "Readers' upvotes minus downvotes. One vote per browser per problem.",
    title: "Alphabetical by question.",
    field: "Grouped by field of history.",
    region: "Grouped by region.",
    period: "Ordered by the earliest date the problem concerns.",
    discussed: "Ordered by number of published comments.",
  };
  app.innerHTML = `
    <div class="tools">
      <input type="search" id="q" placeholder="Search problems, authors, archives" value="${esc(view.q)}" aria-label="Search problems">
      ${seg("show", "Show", [["all", "all"], ["digitization", "digitization"], ["science", "science"], ["decipherment", "decipherment"], ["forensics", "forensics"]])}
      <span class="count" id="count"></span>
    </div>
    <div class="thead" role="group" aria-label="Sort">
      ${col("impact", "Impact")}${col("votes", "Votes")}${col("title", "Problem")}${col("field", "Field")}${col("region", "Region")}${col("period", "Period")}${col("discussed", "Comments")}
    </div>
    <ol class="list" id="list"></ol>`;
  const q = app.querySelector("#q");
  q.addEventListener("input", () => { view.q = q.value; writeURL(); renderRows(); });
  renderRows();
}

function impactTip() {
  const { historians = 0, models = {} } = state.panel || {};
  const n = (k, one, many) => `${k} ${k === 1 ? one : many}`;
  const ai = Object.entries(models).map(([m, k]) => `${n(k, "rating", "ratings")} from ${m}`);
  if (!historians && !ai.length) return "How much a solution would change historical understanding, rated 1–5 by historians and AI models. No ratings yet, so problems are ordered by period.";
  const who = [historians ? n(historians, "professional historian", "professional historians") : "", ai.length ? `AI judges (${ai.join(", ")})` : ""].filter(Boolean).join(" and ");
  return `How much a solution would change historical understanding, rated 1–5 by ${who}. Each rater's scores are standardised against their own average. Historians count for two-thirds of the ranking and the AI judges together for one-third; repeated runs of one model count as a single judge. Problems with few ratings are pulled toward the middle.`;
}

function renderRows() {
  const rows = filtered();
  app.querySelector("#count").textContent = `${rows.length} ${rows.length === 1 ? "problem" : "problems"}`;
  app.querySelector("#list").innerHTML = rows.length ? rows.map((p, i) => rowHTML(ctx(), p, i)).join("") : `<li class="empty">No problems match.</li>`;
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
    msg.textContent = "Thank you. It will appear here after review.";
    f.reset(); f.querySelector("button").disabled = false;
    if (f.dataset.kind === "approach") toggleIdea(false);
    const anchor = f.dataset.kind === "approach" ? app.querySelector(".idea-toggle") : f;
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
    const data = Object.fromEntries(new FormData(f));
    const scores = Object.fromEntries(Object.entries(d.scores || {}).filter(([, v]) => v > 0));
    if (Object.keys(scores).length < 5) return alert("Please score at least five problems.");
    f.querySelector(".rate-bar button").disabled = true;
    try { await api("/api/ratings", { method: "POST", body: { ...data, scores, notes: d.notes || {} } }); }
    catch (err) { alert(`Could not submit: ${err.message}`); f.querySelector(".rate-bar button").disabled = false; return; }
    store.set("op.rate.draft", null);
    app.querySelector(".rate").innerHTML = `<h1 class="page-title">Thank you</h1><p class="rate-q">Your ratings have been received.</p>`;
    window.scrollTo(0, 0);
  }
  if (f.matches(".af")) {
    store.set("op.admin", new FormData(f).get("token") || null);
    renderAdmin();
  }
});

function toggleIdea(force) {
  const b = app.querySelector(".idea-toggle"), s = app.querySelector("#idea-form");
  const on = force ?? b.getAttribute("aria-expanded") !== "true";
  b.setAttribute("aria-expanded", on);
  s.classList.toggle("open", on);
  if (on) setTimeout(() => s.querySelector("textarea")?.focus(), 200);
}

app.addEventListener("click", async (e) => {
  const a = e.target.closest("a");
  if (a && internal(a, e)) {
    e.preventDefault(); return go(a.pathname + a.search);
  }
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.sort) { view.sort = t.dataset.sort; store.set("op.sort2", view.sort); return renderList(); }
  if (t.dataset.show) { view.show = t.dataset.show; writeURL(); return renderList(); }
  if (t.dataset.idea) return toggleIdea();
  if (t.dataset.rate) {
    const d = draft(); d.scores ||= {};
    d.scores[t.dataset.rate] = Number(t.dataset.val);
    saveDraft(d);
    for (const b of t.parentNode.children) b.setAttribute("aria-pressed", b === t);
    return rateCount();
  }
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
  let order = [];
  try { order = JSON.parse(store.get("op.rate.order", "[]")); } catch {}
  if (order.length !== ids.length || !ids.every((id) => order.includes(id))) {
    order = [...ids];
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    store.set("op.rate.order", JSON.stringify(order));
  }
  return order;
}
const draft = () => { try { return JSON.parse(store.get("op.rate.draft", "{}")); } catch { return {}; } };
const saveDraft = (d) => store.set("op.rate.draft", JSON.stringify(d));

function renderRate() {
  document.title = "Rate the problems · Open Problems in History";
  const d = draft();
  d.scores ||= {}; d.notes ||= {};
  const byId = Object.fromEntries(problems.map((p) => [p.id, p]));
  const order = shuffled(problems.map((p) => p.id));
  const btn = (id, v, label) => `<button type="button" data-rate="${esc(id)}" data-val="${v}" aria-pressed="${d.scores[id] === v}">${label}</button>`;
  app.innerHTML = `
    <div class="rate">
      <h1 class="page-title">Rate the problems</h1>
      <p class="rate-q">If this problem were solved, how much would it change historical understanding?</p>
      <ol class="scale"><li><b>1</b> A detail within a specialism</li><li><b>2</b> Matters to one subfield</li><li><b>3</b> Changes how a field sees its period</li><li><b>4</b> Matters well beyond its field</li><li><b>5</b> Reshapes a major historical narrative</li></ol>
      <p class="note">Problems appear in a random order. Score as many as you like (at least five); mark &ldquo;—&rdquo; or skip anything outside your expertise. Your answers are saved in this browser until you submit.</p>
      <form class="rf">
        <div class="rf-who">
          <input type="text" name="name" required maxlength="80" placeholder="Name" aria-label="Name" value="${esc(d.name || "")}">
          <input type="text" name="affiliation" maxlength="160" placeholder="Field and institution" aria-label="Field and institution" value="${esc(d.affiliation || "")}">
          <input type="text" name="agent" maxlength="80" placeholder="AI model, if you are an agent" aria-label="AI model" value="${esc(d.agent || "")}">
        </div>
        <ol class="rate-list">${order.map((id, i) => {
          const p = byId[id];
          return `<li>
            <span class="rank">${i + 1}</span>
            <div class="main">
              <a class="ttl" href="/p/${esc(id)}" target="_blank" rel="noopener">${esc(p.title)}</a>
              <p class="short">${esc(p.short)}</p>
              <details${d.notes[id] ? " open" : ""}><summary>Note</summary><textarea data-note="${esc(id)}" maxlength="1000" aria-label="Note">${esc(d.notes[id] || "")}</textarea></details>
            </div>
            <div class="pick" role="group" aria-label="Impact">${[1, 2, 3, 4, 5].map((v) => btn(id, v, v)).join("")}${btn(id, 0, "—")}</div>
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
  const n = Object.values(d.scores || {}).filter((v) => v > 0).length;
  const seen = Object.keys(d.scores || {}).length;
  const el = app.querySelector("#rate-count");
  if (el) el.textContent = `${n} scored · ${problems.length - seen} left`;
}

app.addEventListener("input", (e) => {
  const t = e.target;
  if (!t.closest(".rf")) return;
  const d = draft();
  d.notes ||= {};
  if (t.dataset.note) d.notes[t.dataset.note] = t.value;
  else if (["name", "affiliation", "agent"].includes(t.name)) d[t.name] = t.value;
  saveDraft(d);
});

// ---------- pages ----------
function renderDetail(id) {
  const p = all().find((x) => x.id === id);
  if (!p) { app.innerHTML = `<a class="back" href="/">← All problems</a><p class="empty">Not found.</p>`; return; }
  document.title = `${p.title} · Open Problems in History`;
  app.innerHTML = detailHTML(ctx(), p);
  setupPrevNext(p.id);
  loadComments(p.id, app.querySelector("#cbox"));
  if (!p.suggested) loadComments(p.id, app.querySelector("#ideas"), "approach");
}

// Prev/next through the list in its current sort and filter order.
let neighbors = {};
function setupPrevNext(id) {
  const rows = filtered();
  let i = rows.findIndex((x) => x.id === id);
  if (i < 0) { rows.splice(0, rows.length, ...all().sort(sorts[view.sort])); i = rows.findIndex((x) => x.id === id); }
  neighbors = { prev: rows[i - 1]?.id, next: rows[i + 1]?.id };
  const el = app.querySelector("#pn");
  if (!el) return;
  const btn = (k, ch, label) => neighbors[k]
    ? `<a href="/p/${esc(neighbors[k])}" data-pn="${k}" aria-label="${label}" title="${label} (${k === "prev" ? "←" : "→"})">${ch}</a>`
    : `<span class="off" aria-hidden="true">${ch}</span>`;
  el.innerHTML = btn("prev", "←", "Previous problem") + btn("next", "→", "Next problem");
}

document.addEventListener("keydown", (e) => {
  if (!location.pathname.startsWith("/p/") || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  const id = e.key === "ArrowLeft" ? neighbors.prev : e.key === "ArrowRight" ? neighbors.next : null;
  if (id) { e.preventDefault(); go(`/p/${id}`); }
});
app.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-pn]");
  if (a) { e.preventDefault(); go(a.pathname); }
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
  const group = (st) => list.filter((s) => s.status === st);
  const item = (s) => `<div class="admin-item">
      <b>${esc(s.title)}</b>
      <p>${esc(s.details)}</p>
      <div class="note">${esc(s.name || "Anonymous")}${s.agent ? ` · AI: ${esc(s.agent)}` : ""}${s.email ? ` · ${esc(s.email)}` : ""} · ${new Date(s.t).toISOString().slice(0, 10)}</div>
      <div class="acts">${["approved", "rejected", "pending"].filter((x) => x !== s.status)
        .map((x) => `<button type="button" class="btn ghost" data-sid="${esc(s.id)}" data-status="${x}">${{ approved: "Approve", rejected: "Reject", pending: "Back to pending" }[x]}</button>`).join("")}</div>
    </div>`;
  const title = (id) => problems.find((p) => p.id === id)?.title || id;
  const rater = (r, pending) => `<div class="admin-item">
      <b>${esc(r.agent ? `${r.agent} (AI)` : r.name)}</b>${r.affiliation ? ` <span class="note">· ${esc(r.affiliation)}</span>` : ""}${r.agent && r.name ? ` <span class="note">· ${esc(r.name)}</span>` : ""}
      <div class="note">${Object.keys(r.scores).length} scored · ${new Date(r.t).toISOString().slice(0, 16).replace("T", " ")}</div>
      <details><summary class="note">Scores</summary><ol class="admin-scores">${Object.entries(r.scores).sort((a, b) => b[1] - a[1])
        .map(([id, v]) => `<li><b>${v}</b> ${esc(title(id))}${r.notes?.[id] ? `<span class="note"> — ${esc(r.notes[id])}</span>` : ""}</li>`).join("")}</ol></details>
      <div class="acts">${pending
        ? `<button type="button" class="btn" data-rating="${esc(r.rid)}" data-action="approve">Approve</button><button type="button" class="btn ghost" data-rating="${esc(r.rid)}" data-action="reject">Reject</button>`
        : `<button type="button" class="btn ghost" data-rating="${esc(r.rid)}" data-action="remove">Remove</button>`}</div>
    </div>`;
  const post = (c) => `<div class="admin-item">
      <div class="note">${c.kind === "approach" ? "Approach" : "Comment"} on <a href="/p/${esc(c.pid)}">${esc(c.title)}</a>${c.flag ? ` · <b class="del">${esc(c.flag)}</b>` : ""}</div>
      <p>${esc(c.text)}</p>
      <div class="note">${esc(c.name)}${c.agent ? ` · AI: ${esc(c.agent)}` : ""} · ${new Date(c.t).toISOString().slice(0, 16).replace("T", " ")}</div>
      <div class="acts"><button type="button" class="btn" data-post="${esc(c.cid)}" data-action="approve">Approve</button><button type="button" class="btn ghost" data-post="${esc(c.cid)}" data-action="reject">Reject</button></div>
    </div>`;
  app.innerHTML = `<div class="admin"><h1 class="page-title">Admin</h1>
    <p class="note">Signed in. Delete links now appear on published comments and proposed approaches. <button type="button" class="linkbtn" data-logout>Sign out</button></p>
    <section><h2>Impact ratings awaiting review (${ratings.pending.length})</h2>${ratings.pending.map((r) => rater(r, true)).join("") || `<p class="note">None.</p>`}</section>
    <section><h2>Impact ratings in use (${ratings.approved.length})</h2>${ratings.approved.map((r) => rater(r, false)).join("") || `<p class="note">None.</p>`}</section>
    <section><h2>Comments and approaches awaiting review (${posts.length})</h2>${posts.map(post).join("") || `<p class="note">None.</p>`}</section>
    ${["pending", "approved", "rejected"].map((st) => `<section><h2>Suggested problems: ${st} (${group(st).length})</h2>${group(st).map(item).join("") || `<p class="note">None.</p>`}</section>`).join("")}</div>`;
}

// ---------- footer ----------
function stats() {
  const el = document.getElementById("stats");
  if (!el) return;
  const n = (f) => problems.filter((p) => p.flags?.includes(f)).length;
  const sum = (o, re) => Object.entries(o).reduce((t, [k, v]) => t + (re.test(k) ? Math.max(0, Number(v) || 0) : 0), 0);
  const works = problems.reduce((t, p) => t + (p.existing?.length || 0), 0);
  const archives = problems.reduce((t, p) => t + (p.archives?.length || 0), 0);
  el.innerHTML = [
    `${all().length} problems`, `${n("digitization")} need digitization`, `${n("science")} need scientists`,
    `${works} works cited`, `${archives} archives`, `${sum(state.tally, /:(up|down)$/)} votes`, `${sum(state.counts, /./)} comments`,
  ].map((x) => `<span>${x}</span>`).join("");
}

// ---------- router ----------
function route() {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  document.title = "Open Problems in History";
  const nav = path === "/" ? "list" : path === "/contact" ? "about" : path.slice(1);
  for (const a of document.querySelectorAll("nav a")) a.toggleAttribute("aria-current", a.dataset.nav === nav);
  if (path.startsWith("/p/")) renderDetail(decodeURIComponent(path.slice(3)));
  else if (path === "/suggest") renderSuggest();
  else if (path === "/about" || path === "/contact") { if (path === "/contact") history.replaceState(null, "", "/about"); renderAbout(); }
  else if (path === "/admin") renderAdmin();
  else if (path === "/rate") renderRate();
  else { readURL(); renderList(); }
}

// Links handled by the client router: same-origin pages only, not files (llms.txt, images) or the API.
function internal(a, e) {
  return a.origin === location.origin && !a.target && !e.metaKey && !e.ctrlKey && !e.shiftKey
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

const [p, s, mine] = await Promise.all([
  fetch("/data/problems.json").then((r) => r.json()),
  api("/api/state").catch(() => state),
  api("/api/mine").catch(() => ({})),
]);
problems = p;
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
