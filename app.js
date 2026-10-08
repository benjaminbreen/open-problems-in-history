import { esc, period, voteBox as vbox, rowHTML, detailHTML, aboutHTML, commentLabel as clabel, contributeForm, who, up as u, down as d, score as sc, ncom as nc } from "/render.js";

const app = document.getElementById("app");
const store = {
  get: (k, dflt) => { try { return localStorage.getItem(k) ?? dflt; } catch { return dflt; } },
  set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} },
};

let problems = [];
let state = { tally: {}, counts: {}, mine: {}, suggestions: [] };
const view = { q: "", sort: store.get("op.sort", "votes"), show: "all" };
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
  const col = (k, l) => `<button type="button" data-sort="${k}" aria-pressed="${view.sort === k}">${l}</button>`;
  app.innerHTML = `
    <div class="tools">
      <input type="search" id="q" placeholder="Search problems, authors, archives" value="${esc(view.q)}" aria-label="Search problems">
      ${seg("show", "Show", [["all", "all"], ["digitization", "digitization"], ["science", "science"]])}
      <span class="count" id="count"></span>
    </div>
    <div class="thead" role="group" aria-label="Sort">
      <span></span>${col("votes", "Votes")}${col("title", "Problem")}${col("field", "Field")}${col("region", "Region")}${col("period", "Period")}${col("discussed", "Comments")}
    </div>
    <ol class="list" id="list"></ol>`;
  const q = app.querySelector("#q");
  q.addEventListener("input", () => { view.q = q.value; renderRows(); });
  renderRows();
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
  try { list = await api(`/api/comments?id=${encodeURIComponent(id)}&kind=${kind}`); }
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
  if (f.matches(".sf")) {
    const data = Object.fromEntries(new FormData(f));
    f.querySelector("button").disabled = true;
    try { await api("/api/suggest", { method: "POST", body: data }); }
    catch (err) { alert(`Could not send: ${err.message}`); f.querySelector("button").disabled = false; return; }
    f.outerHTML = `<p>Thank you. Your suggestion will appear once it has been reviewed.</p>`;
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
  if (a && a.origin === location.origin && !a.target && !e.metaKey && !e.ctrlKey && !a.pathname.startsWith("/data") && !a.pathname.startsWith("/api")) {
    e.preventDefault(); return go(a.pathname);
  }
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.sort) { view.sort = t.dataset.sort; store.set("op.sort", view.sort); return renderList(); }
  if (t.dataset.show) { view.show = t.dataset.show; return renderList(); }
  if (t.dataset.idea) return toggleIdea();
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

// ---------- pages ----------
function renderDetail(id) {
  const p = all().find((x) => x.id === id);
  if (!p) { app.innerHTML = `<a class="back" href="/">← All problems</a><p class="empty">Not found.</p>`; return; }
  document.title = `${p.title} · Open Problems in History`;
  app.innerHTML = detailHTML(ctx(), p);
  loadComments(p.id, app.querySelector("#cbox"));
  if (!p.suggested) loadComments(p.id, app.querySelector("#ideas"), "approach");
}

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
  let list, posts;
  try { [list, posts] = await Promise.all([api("/api/suggest"), api("/api/comments?pending=1")]); }
  catch { store.set("op.admin", null); app.innerHTML = `<h1 class="page-title">Admin</h1><p class="note">Token rejected.</p>`; setTimeout(renderAdmin, 1200); return; }
  const group = (st) => list.filter((s) => s.status === st);
  const item = (s) => `<div class="admin-item">
      <b>${esc(s.title)}</b>
      <p>${esc(s.details)}</p>
      <div class="note">${esc(s.name || "Anonymous")}${s.agent ? ` · AI: ${esc(s.agent)}` : ""}${s.email ? ` · ${esc(s.email)}` : ""} · ${new Date(s.t).toISOString().slice(0, 10)}</div>
      <div class="acts">${["approved", "rejected", "pending"].filter((x) => x !== s.status)
        .map((x) => `<button type="button" class="btn ghost" data-sid="${esc(s.id)}" data-status="${x}">${{ approved: "Approve", rejected: "Reject", pending: "Back to pending" }[x]}</button>`).join("")}</div>
    </div>`;
  const post = (c) => `<div class="admin-item">
      <div class="note">${c.kind === "approach" ? "Approach" : "Comment"} on <a href="/p/${esc(c.pid)}">${esc(c.title)}</a>${c.flag ? ` · <b class="del">${esc(c.flag)}</b>` : ""}</div>
      <p>${esc(c.text)}</p>
      <div class="note">${esc(c.name)}${c.agent ? ` · AI: ${esc(c.agent)}` : ""} · ${new Date(c.t).toISOString().slice(0, 16).replace("T", " ")}</div>
      <div class="acts"><button type="button" class="btn" data-post="${esc(c.cid)}" data-action="approve">Approve</button><button type="button" class="btn ghost" data-post="${esc(c.cid)}" data-action="reject">Reject</button></div>
    </div>`;
  app.innerHTML = `<div class="admin"><h1 class="page-title">Admin</h1>
    <p class="note">Signed in. Delete links now appear on published comments and proposed approaches. <button type="button" class="linkbtn" data-logout>Sign out</button></p>
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
  else renderList();
}

function go(path) {
  if (path !== location.pathname) history.pushState(null, "", path);
  window.scrollTo(0, 0);
  route();
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("header a, footer a");
  if (a && a.origin === location.origin && !a.pathname.endsWith(".txt") && !e.metaKey && !e.ctrlKey) { e.preventDefault(); go(a.pathname); }
});
window.addEventListener("popstate", route);

document.querySelector(".mode").addEventListener("click", () => {
  const dark = getComputedStyle(document.documentElement).colorScheme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  store.set("op.theme", document.documentElement.dataset.theme);
});

// Old hash links (#/p/id) still work.
if (location.hash.startsWith("#/")) history.replaceState(null, "", location.hash.slice(1));

const [p, s] = await Promise.all([
  fetch("/data/problems.json").then((r) => r.json()),
  api("/api/state").catch(() => state),
]);
problems = p;
state = s;
route();
stats();
