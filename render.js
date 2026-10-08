// Pure HTML renderers, shared by the browser (app.js) and the static build (scripts/build.mjs).

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const FLAGS = {
  digitization: ["digitization", "dig", "Progress likely needs new digitization of known holdings, with archivists"],
  science: ["science", "sci", "Confirmation needs collaboration with scientists"],
};

const yr = (y) => (y < 0 ? `${-y} BCE` : `${y}`);
export function period(p) {
  if (p.start == null) return "";
  if (p.start === p.end) return yr(p.start);
  if (p.start < 0 && p.end < 0) return `${-p.start}–${-p.end} BCE`;
  if (p.start < 0) return `${-p.start} BCE–${p.end} CE`;
  return `${p.start}–${p.end}`;
}

export const tags = (p) => (p.flags || []).map((f) => FLAGS[f] ? `<span class="tag ${FLAGS[f][1]}" title="${esc(FLAGS[f][2])}">${FLAGS[f][0]}</span>` : "").join("")
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
  return `<div class="vote" data-id="${esc(id)}">
    <button type="button" data-v="1" aria-pressed="${m === 1}" aria-label="Upvote">▲</button>
    <b title="${up(ctx, id)} up, ${down(ctx, id)} down">${score(ctx, id)}</b>
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
function cite(e) {
  const title = e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a>` : esc(e.title);
  const venue = e.venue ? `, ${esc(String(e.venue).replace(/^In /, "in "))}` : "";
  return `<li><span class="yr">${esc(e.year)}</span><div>${esc(e.authors)}, <span class="t">${title}</span>${venue}.${e.note ? `<span class="n">${esc(e.note)}</span>` : ""}</div></li>`;
}

function archive(a) {
  const dig = { full: "digitized", partial: "partly digitized", none: "not digitized" }[a.digitized] || "";
  const rep = a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.repository)}</a>` : esc(a.repository);
  return `<li><span class="rep">${rep}</span>${dig ? `<span class="tag">${dig}</span>` : ""}
    ${a.collection ? `<span class="col">${esc(a.collection)}</span>` : ""}${a.note ? `<span class="n">${esc(a.note)}</span>` : ""}</li>`;
}

const para = (s) => s ? String(s).split(/\n\n+/).map((x) => `<p>${esc(x)}</p>`).join("") : "";
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
      <img src="${esc(m.src)}" alt="${esc(m.caption)}" width="960" height="720">
      <figcaption>${esc(m.caption)}. <a href="${esc(m.commons)}" target="_blank" rel="noopener">${esc(m.author || "Wikimedia Commons")}</a>, ${lic}</figcaption>
    </figure>`;
}

export function detailHTML(ctx, p) {
  const s = p.suggested;
  const pv = p.provenance || {};
  const approach = Array.isArray(p.approach) ? p.approach : p.approach ? [p.approach] : [];
  return `
    <a class="back" href="/">← All problems</a>
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
    ${sec("Why it matters", para(p.matters))}
    ${sec("Why it is open", para(p.stuck))}
    ${sec("What would count as a solution", para(p.solved))}
    ${sec("Potential approach", `<ul class="steps">${approach.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      ${prov("Drafted", pv.drafted_by, pv.drafted_on, "Drafted the problem statement and approach")}
      <div id="ideas" class="ideas"></div>
      <button type="button" class="linkbtn idea-toggle" data-idea="${esc(p.id)}" aria-expanded="false">Have another idea for an approach to solving this? Suggest it here</button>
      <div class="slide" id="idea-form"><div>${contributeForm("approach", p.id, "Your approach")}</div></div>`, "approach")}
    ${sec("Existing work", p.existing?.length ? `<ol class="works">${p.existing.map(cite).join("")}</ol>` : "")}
    ${sec("Archives and collections", p.archives?.length ? `<ul class="archives">${p.archives.map(archive).join("")}</ul>${prov("Compiled", pv.compiled_by, pv.compiled_on, "Compiled the existing work and archives; citations checked against DOI and catalogue records")}` : "")}`}
    <section id="comments"><h2>Comments</h2><div class="sbody" id="cbox"></div></section>
    </div>
    </article>`;
}
