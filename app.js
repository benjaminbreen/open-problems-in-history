const app = document.getElementById("app");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const store = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

let problems = [];
let state = { tally: {}, counts: {}, mine: {}, suggestions: [] };
const view = { q: "", sort: store.get("op.sort", "votes"), show: "all" };
const open = new Set();
const adminToken = () => store.get("op.admin", "");

const FLAGS = {
  digitization: ["digitization", "dig", "Progress likely needs new digitization of known holdings, with archivists"],
  science: ["science", "sci", "Confirmation needs collaboration with scientists"],
};

// ---------- data ----------
async function api(path, opts = {}) {
  const headers = { "Content-Type": "application/json" };
  if (adminToken()) headers["x-admin-token"] = adminToken();
  const r = await fetch(path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.status);
  return r.json();
}

const up = (id) => Number(state.tally[`${id}:up`]) || 0;
const down = (id) => Number(state.tally[`${id}:down`]) || 0;
const score = (id) => up(id) - down(id);
const ncom = (id) => Math.max(0, Number(state.counts[id]) || 0);

function all() {
  const sugg = state.suggestions.map((s) => ({ id: s.id, title: s.title, short: s.details?.split("\n")[0] || "", suggested: s, flags: [], region: "", field: "", start: null }));
  return problems.concat(sugg);
}

// ---------- formatting ----------
const yr = (y) => (y < 0 ? `${-y} BCE` : `${y}`);
function period(p) {
  if (p.start == null) return "";
  if (p.start === p.end) return yr(p.start);
  if (p.start < 0 && p.end < 0) return `${-p.start}–${-p.end} BCE`;
  if (p.start < 0) return `${-p.start} BCE–${p.end} CE`;
  return `${p.start}–${p.end}`;
}
const tags = (p) => (p.flags || []).map((f) => FLAGS[f] ? `<span class="tag ${FLAGS[f][1]}" title="${esc(FLAGS[f][2])}">${FLAGS[f][0]}</span>` : "").join("")
  + (p.suggested ? `<span class="tag">suggested</span>` : "");
const when = (t) => new Date(t).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

function voteBox(id) {
  const m = Number(state.mine[id]) || 0;
  return `<div class="vote" data-id="${esc(id)}">
    <button type="button" data-v="1" aria-pressed="${m === 1}" aria-label="Upvote">▲</button>
    <b title="${up(id)} up, ${down(id)} down">${score(id)}</b>
    <button type="button" data-v="-1" aria-pressed="${m === -1}" aria-label="Downvote">▼</button>
  </div>`;
}

// ---------- list ----------
const sorts = {
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
  app.innerHTML = `
    <div class="tools">
      <input type="search" id="q" placeholder="Search" value="${esc(view.q)}" aria-label="Search problems">
      ${seg("sort", "Sort", [["votes", "votes"], ["discussed", "comments"], ["period", "period"], ["region", "region"], ["field", "field"], ["title", "title"]])}
      ${seg("show", "Show", [["all", "all"], ["digitization", "digitization"], ["science", "science"]])}
      <span class="count" id="count"></span>
    </div>
    <ol class="list" id="list"></ol>`;
  const q = app.querySelector("#q");
  q.addEventListener("input", () => { view.q = q.value; renderRows(); });
  renderRows();
}

function renderRows() {
  const rows = filtered();
  app.querySelector("#count").textContent = `${rows.length} ${rows.length === 1 ? "problem" : "problems"}`;
  app.querySelector("#list").innerHTML = rows.length ? rows.map((p, i) => `
    <li class="row" id="r-${esc(p.id)}">
      <span class="rank">${i + 1}</span>
      ${voteBox(p.id)}
      <div class="body">
        <a class="ttl" href="#/p/${esc(p.id)}">${esc(p.title)}</a>
        ${p.short ? `<p class="short">${esc(p.short)}</p>` : ""}
        <div class="meta">
          ${[p.field, p.region, period(p)].filter(Boolean).map(esc).join(" · ")}
          ${tags(p)}
          <button type="button" class="linkbtn" data-comments="${esc(p.id)}" aria-expanded="${open.has(p.id)}">${commentLabel(p.id)}</button>
        </div>
        <div class="cbox" data-for="${esc(p.id)}"></div>
      </div>
    </li>`).join("") : `<li class="empty">No problems match.</li>`;
  for (const id of open) loadComments(id);
}

const commentLabel = (id) => {
  const n = ncom(id);
  const verb = open.has(id) ? "Hide" : n ? "Read" : "Add";
  return n ? `${verb} ${n} comment${n === 1 ? "" : "s"}` : open.has(id) ? "Hide comments" : "Add a comment";
};

// ---------- comments ----------
async function loadComments(id, el = app.querySelector(`.cbox[data-for="${CSS.escape(id)}"]`)) {
  if (!el) return;
  el.innerHTML = `<div class="comments"><p class="note">Loading…</p></div>`;
  let list = [];
  try { list = await api(`/api/comments?id=${encodeURIComponent(id)}`); } catch { el.innerHTML = `<div class="comments"><p class="note">Comments could not be loaded.</p></div>`; return; }
  state.counts[id] = list.length;
  const admin = !!adminToken();
  el.innerHTML = `<div class="comments">
    ${list.map((c) => `<div class="comment"><div class="who"><b>${esc(c.name)}</b> · ${when(c.t)}${admin ? ` <button type="button" class="linkbtn del" data-del="${esc(c.cid)}" data-pid="${esc(id)}">delete</button>` : ""}</div><p>${esc(c.text)}</p></div>`).join("")}
    <form class="cf" data-pid="${esc(id)}">
      <textarea name="text" required maxlength="4000" placeholder="Comment" aria-label="Comment"></textarea>
      <input type="text" name="name" maxlength="80" placeholder="Name (optional)" aria-label="Name" value="${esc(store.get("op.name", ""))}">
      <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit">Post</button>
    </form>
  </div>`;
  const btn = app.querySelector(`[data-comments="${CSS.escape(id)}"]`);
  if (btn) btn.textContent = commentLabel(id);
}

app.addEventListener("submit", async (e) => {
  const f = e.target;
  e.preventDefault();
  if (f.matches(".cf")) {
    const d = Object.fromEntries(new FormData(f));
    store.set("op.name", d.name || null);
    f.querySelector("button").disabled = true;
    try { await api("/api/comments", { method: "POST", body: { id: f.dataset.pid, ...d } }); }
    catch (err) { alert(`Could not post: ${err.message}`); f.querySelector("button").disabled = false; return; }
    loadComments(f.dataset.pid, f.closest(".cbox, #cbox"));
  }
  if (f.matches(".sf")) {
    const d = Object.fromEntries(new FormData(f));
    f.querySelector("button").disabled = true;
    try { await api("/api/suggest", { method: "POST", body: d }); }
    catch (err) { alert(`Could not send: ${err.message}`); f.querySelector("button").disabled = false; return; }
    f.outerHTML = `<p>Thank you. Your suggestion will appear once it has been reviewed.</p>`;
  }
  if (f.matches(".af")) {
    store.set("op.admin", new FormData(f).get("token") || null);
    renderAdmin();
  }
});

app.addEventListener("click", async (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.sort) { view.sort = t.dataset.sort; store.set("op.sort", view.sort); return renderList(); }
  if (t.dataset.show) { view.show = t.dataset.show; return renderList(); }
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
    if (!confirm("Delete this comment?")) return;
    try { await api(`/api/comments?id=${encodeURIComponent(t.dataset.pid)}&cid=${encodeURIComponent(t.dataset.del)}`, { method: "DELETE" }); }
    catch (err) { return alert(`Could not delete: ${err.message}`); }
    loadComments(t.dataset.pid, t.closest(".cbox, #cbox"));
  }
  if (t.dataset.status) {
    try { await api("/api/suggest", { method: "PATCH", body: { sid: t.dataset.sid, status: t.dataset.status } }); }
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
    if (from === 1) state.tally[`${id}:up`] = up(id) - 1;
    if (from === -1) state.tally[`${id}:down`] = down(id) - 1;
    if (to === 1) state.tally[`${id}:up`] = up(id) + 1;
    if (to === -1) state.tally[`${id}:down`] = down(id) + 1;
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
  for (const box of app.querySelectorAll(`.vote[data-id="${CSS.escape(id)}"]`)) box.outerHTML = voteBox(id);
}

// ---------- detail ----------
function cite(e) {
  const title = e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a>` : esc(e.title);
  return `<li><span class="yr">${esc(e.year)}</span><div>${esc(e.authors)}, <span class="t">${title}</span>${e.venue ? `, ${esc(e.venue.replace(/^In /, "in "))}` : ""}.${e.note ? `<span class="n">${esc(e.note)}</span>` : ""}</div></li>`;
}

function archive(a) {
  const dig = { full: "digitized", partial: "partly digitized", none: "not digitized" }[a.digitized] || "";
  const rep = a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.repository)}</a>` : esc(a.repository);
  return `<li><span class="rep">${rep}</span>${dig ? `<span class="tag">${dig}</span>` : ""}
    ${a.collection ? `<span class="col">${esc(a.collection)}</span>` : ""}${a.note ? `<span class="n">${esc(a.note)}</span>` : ""}</li>`;
}

function renderDetail(id) {
  const p = all().find((x) => x.id === id);
  if (!p) { app.innerHTML = `<a class="back" href="#/">← All problems</a><p class="empty">Not found.</p>`; return; }
  document.title = `${p.title} · Open Problems in History`;
  const sec = (h, body) => body ? `<section><h2>${h}</h2>${body}</section>` : "";
  const para = (s) => s ? String(s).split(/\n\n+/).map((x) => `<p>${esc(x)}</p>`).join("") : "";
  const s = p.suggested;
  app.innerHTML = `
    <a class="back" href="#/">← All problems</a>
    <div class="head">
      ${voteBox(p.id)}
      <div>
        <h1>${esc(p.title)}</h1>
        ${s ? "" : `<p class="short">${esc(p.short)}</p>`}
        <div class="meta">${[p.field, p.region, period(p)].filter(Boolean).map(esc).join(" · ")} ${tags(p)}</div>
      </div>
    </div>
    ${s ? sec("Suggestion", para(s.details) + `<p class="note">${esc(s.name || "Anonymous")} · ${when(s.t)}</p>`) : `
    ${sec("Why it matters", para(p.matters))}
    ${sec("Why it is open", para(p.stuck))}
    ${sec("What would count as a solution", para(p.solved))}
    ${sec("Approach", para(p.approach))}
    ${sec("Existing work", p.existing?.length ? `<ol class="works">${p.existing.map(cite).join("")}</ol>` : "")}
    ${sec("Archives and collections", p.archives?.length ? `<ul class="archives">${p.archives.map(archive).join("")}</ul>` : "")}`}
    <section><h2>Comments</h2><div id="cbox"></div></section>`;
  loadComments(p.id, app.querySelector("#cbox"));
}

// ---------- suggest ----------
function renderSuggest() {
  app.innerHTML = `
    <h1 class="page-title">Suggest a problem</h1>
    <form class="sf">
      <input type="text" name="title" required maxlength="200" placeholder="The problem, as a question" aria-label="Problem">
      <textarea name="details" maxlength="6000" rows="8" placeholder="Why it matters, why it is open, what would count as a solution, existing work, where the sources are" aria-label="Details"></textarea>
      <input type="text" name="name" maxlength="80" placeholder="Name (optional)" aria-label="Name">
      <input type="email" name="email" maxlength="160" placeholder="Email, not shown (optional)" aria-label="Email">
      <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit">Send</button>
    </form>`;
}

// ---------- admin ----------
async function renderAdmin() {
  if (!adminToken()) {
    app.innerHTML = `<h1 class="page-title">Admin</h1>
      <form class="af sf"><input type="text" name="token" placeholder="Token" aria-label="Token" autocomplete="off"><button class="btn" type="submit">Enter</button></form>`;
    return;
  }
  let list;
  try { list = await api("/api/suggest"); }
  catch { store.set("op.admin", null); app.innerHTML = `<h1 class="page-title">Admin</h1><p class="note">Token rejected.</p>`; setTimeout(renderAdmin, 1200); return; }
  const group = (st) => list.filter((s) => s.status === st);
  const item = (s) => `<div class="admin-item">
      <b>${esc(s.title)}</b>
      <p>${esc(s.details)}</p>
      <div class="note">${esc(s.name || "Anonymous")}${s.email ? ` · ${esc(s.email)}` : ""} · ${when(s.t)}</div>
      <div class="acts">${["approved", "rejected", "pending"].filter((x) => x !== s.status)
        .map((x) => `<button type="button" class="btn ghost" data-sid="${esc(s.id)}" data-status="${x}">${{ approved: "Approve", rejected: "Reject", pending: "Back to pending" }[x]}</button>`).join("")}</div>
    </div>`;
  app.innerHTML = `<h1 class="page-title">Admin</h1>
    <p class="note">Signed in. Delete links now appear on comments. <button type="button" class="linkbtn" data-logout>Sign out</button></p>
    ${["pending", "approved", "rejected"].map((st) => `<section><h2>${st} (${group(st).length})</h2>${group(st).map(item).join("") || `<p class="note">None.</p>`}</section>`).join("")}`;
}

// ---------- router ----------
function route() {
  const h = location.hash.replace(/^#/, "") || "/";
  document.title = "Open Problems in History";
  const nav = h.startsWith("/suggest") ? "suggest" : h === "/" ? "list" : "";
  for (const a of document.querySelectorAll("nav a")) a.toggleAttribute("aria-current", a.dataset.nav === nav);
  if (h.startsWith("/p/")) renderDetail(decodeURIComponent(h.slice(3)));
  else if (h === "/suggest") renderSuggest();
  else if (h === "/admin") renderAdmin();
  else renderList();
}

document.querySelector(".mode").addEventListener("click", () => {
  const dark = getComputedStyle(document.documentElement).colorScheme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  store.set("op.theme", document.documentElement.dataset.theme);
});

window.addEventListener("hashchange", () => { window.scrollTo(0, 0); route(); });

const [p, s] = await Promise.all([
  fetch("data/problems.json").then((r) => r.json()),
  api("/api/state").catch(() => state),
]);
problems = p;
state = s;
route();
