// Build static output from data/problems/*.json:
//   data/problems.json   combined data
//   index.html           list page, pre-rendered
//   p/<id>/index.html    one pre-rendered page per problem (readable without JavaScript)
//   llms.txt             guide for AI agents
import fs from "node:fs";
import crypto from "node:crypto";
import { rankBallots, validJudgment, compareRank, editions, originalPacketPath, currentPacketPath, expandedRoundId, currentRoundId, originalRoundId } from "../lib/potential.js";
import { esc, rowHTML, detailHTML, aboutHTML, methodsHTML, colophonHTML, forHTML, forIndexHTML, NEEDS, collectSources, sourcesHTML, period, REPO } from "../render.js";

import { leadStubs, stubHTML } from "../lead-stubs.js";
import { archiveLeads } from "../archive-leads.js";
import { cautionaryTales } from "../cautionary-tales.js";
import { dodoTitle, dodoDescription, dodoHTML } from "../dodo-lead.js";
import { superstormTitle, superstormDescription, superstormHTML } from "../superstorm-lead.js";
import { makassarSmallpoxTitle, makassarSmallpoxDescription, makassarSmallpoxHTML } from "../makassar-smallpox-lead.js";
import { phantomTitle, phantomDescription, phantomHTML } from "../phantom-disasters-lead.js";
import { ceresTitle, ceresDescription, ceresHTML } from "../ceres-1893-lead.js";
import { grantDescription, grantHTML, grantTitle, langleyDescription, langleyHTML, langleyTitle, leadsDescription, leadsHTML } from "../leads-render.js";
import { wilkinsonDescription, wilkinsonHTML, wilkinsonTitle } from "../wilkinson-lead.js";
import { wilkinsonBDescription, wilkinsonBHTML, wilkinsonBTitle } from "../wilkinson-lead-b.js";

const dir = "data/problems";
const need = ["id", "title", "short", "region", "field", "start", "end", "flags", "matters", "stuck", "solved", "approach", "existing", "archives"];
const problems = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const p = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  const missing = need.filter((k) => p[k] === undefined);
  if (missing.length) console.warn(`${f}: missing ${missing.join(", ")}`);
  p.existing = (p.existing || []).sort((a, b) => a.year - b.year);
  const recent = `data/recent/${p.id}.json`;
  if (fs.existsSync(recent)) {
    const r = JSON.parse(fs.readFileSync(recent, "utf8"));
    p.recent = Array.isArray(r) ? { items: r } : r;
  }
  const imgMeta = `data/images/${p.id}.json`;
  if (fs.existsSync(imgMeta) && fs.existsSync(`img/${p.id}.webp`)) {
    const { caption, commons, author, license, license_url } = JSON.parse(fs.readFileSync(imgMeta, "utf8"));
    p.image = { src: `/img/${p.id}.webp`, caption, commons, author, license, license_url };
  }
  problems.push(p);
}
const byId = new Map(problems.map((p) => [p.id, p]));
const leadTitles = new Map([...[...archiveLeads, ...leadStubs].map(lead => [lead.slug, lead.title]), ["ceres-1893", ceresTitle], ["phantom-disasters", phantomTitle], ["makassar-smallpox", makassarSmallpoxTitle], ["1770-superstorm", superstormTitle], ["dodo-journal", dodoTitle], ["grant-cylinder", grantTitle], ["wilkinson-dictionary", wilkinsonTitle], ["langley-kite", langleyTitle]]);
for (const p of problems) {
  const links = [
    ...(p.leads || []).map((id) => ({ href: `/leads/${id}`, label: leadTitles.get(id) })),
    ...(p.related || []).map((id) => ({ href: `/p/${id}`, label: byId.get(id)?.title })),
  ];
  if (links.some((link) => !link.label)) throw new Error(`Unknown related page for ${p.id}`);
  if (links.length) p.links = links;
}
fs.writeFileSync("data/problems.json", JSON.stringify(problems));

// The Markdown sent to judges is also the source of the human ballot.
const originalPacket = fs.readFileSync("." + originalPacketPath, "utf8");
const originalQuestions = Array.from(originalPacket.matchAll(/^\d+\. \*\*(.+?)\*\* \(`([\w-]+)`\) *\r?\n +(.+)$/gm),
  ([, title, id, evidence]) => ({ id, title, evidence: evidence.trim() }));
const packetIds = new Set(originalQuestions.map(({ id }) => id));
const originalTitles = new Map(originalQuestions.map(({ id, title }) => [id, title]));
function expandedPacket(path, titles) {
  const packet = fs.readFileSync("." + path, "utf8");
  const [instructions, ...entries] = packet.trimEnd().split(/^### /m);
  const questions = entries.map((entry, i) => {
    const [heading, evidence, investigation, citations, ...extra] = entry.trim().split("\n\n");
    const match = /^(\d+)\. (.+?) \(`([\w-]+)`\)$/.exec(heading);
    if (!match || Number(match[1]) !== i + 1 || (titles && titles.get(match[3]) !== match[2]) || extra.length ||
        !evidence || !investigation?.startsWith("**One way to investigate.** ") || !citations?.startsWith("**Sources** ")) {
      throw new Error(`Invalid question in ${path} at position ${i + 1}`);
    }
    const sources = citations.slice("**Sources** ".length).split(" · ").map((link) => {
      const source = /^\[([^\]]+)\]\(<(https?:\/\/[^>\s]+)>\)$/.exec(link);
      if (!source) throw new Error(`Invalid source for ${match[3]}: ${link}`);
      return { label: source[1], url: source[2] };
    });
    const method = investigation.slice("**One way to investigate.** ".length).trim();
    if (!method || sources.length < 1) throw new Error(`Incomplete brief for ${match[3]}`);
    return { id: match[3], title: match[2], evidence, method, sources };
  });
  const count = Number(/^Round `[\w-]+` · (\d+) questions$/m.exec(instructions)?.[1]);
  if (questions.length !== count || (titles && count !== titles.size) || new Set(questions.map(q => q.id)).size !== count)
    throw new Error(`Question IDs do not match ${path}`);
  return { packet, instructions, questions };
}
const { packet, instructions, questions } = expandedPacket(currentPacketPath, new Map(problems.map(p => [p.id, p.title])));
function matchingBriefs(earlier) {
  const byId = new Map(earlier.map(q => [q.id, q]));
  return questions.filter(q => JSON.stringify(q) === JSON.stringify(byId.get(q.id))).map(q => q.id);
}
const archivedQuestions = { originalQuestions };
const archivedInstructions = {};
const unchangedIdsByRound = {};
for (const [id, edition] of Object.entries(editions)) {
  if (id === originalRoundId || id === currentRoundId) continue;
  const earlier = expandedPacket(edition.path, id === expandedRoundId ? originalTitles : undefined);
  archivedQuestions[edition.key] = earlier.questions;
  archivedInstructions[id] = { guide: readGuide(earlier.instructions), rubric: readRubric(earlier.instructions) };
  unchangedIdsByRound[id] = matchingBriefs(earlier.questions);
}
// Archived ballots retain the original prompts, even after an article moves.
const redirects = JSON.parse(fs.readFileSync("vercel.json", "utf8")).redirects;
const readingLinks = Object.fromEntries(redirects.filter(rule => rule.source.startsWith("/p/"))
  .map(rule => [rule.source.slice(3), rule.destination.split("#")[0]]));
function readRubric(instructions) {
  const scores = Array.from(instructions.matchAll(/^\d+\. \*\*(.+?)\.\*\* (.+)$/gm),
    ([, label, description]) => ({ label, description }));
  if (scores.length !== 3) throw new Error("Expected three scoring criteria");
  return scores;
}
const rubric = readRubric(instructions);
const originalRubric = readRubric(originalPacket);
function readGuide(instructions) {
  const guide = instructions.split("Give three judgments for each question.")[0].trim().split("\n\n").slice(2);
  if (guide.length !== 2) throw new Error("Expected the investigation scope and brief instructions");
  return guide;
}
const guide = readGuide(instructions);
const scoringNote = instructions.split("\n\n").find(paragraph => paragraph.startsWith("Both contribution scores "));
if (!scoringNote) throw new Error("Expected the scoring explanation in the current packet");
fs.writeFileSync("rate.txt", packet);
const models = { claude: "Claude Opus 5.5", gemini: "Gemini 4 Hydrogen", gpt: "GPT-6", "gpt-6.2-astra-high": "GPT-6.2 Astra" };
const ballots = Object.entries(models).map(([model, label]) => {
  const source = `/rating-passes/${originalRoundId}/${model}.json`;
  const { ratings, reasoning_effort } = JSON.parse(fs.readFileSync("." + source, "utf8"));
  const rows = Object.fromEntries(ratings.map((r) => [r.id, r]));
  if (ratings.length !== packetIds.size || originalQuestions.some(({ id }) => !validJudgment(rows[id]) || !rows[id].reason?.trim())) {
    throw new Error(`Incomplete or invalid ballot from ${model}`);
  }
  return { label, source, reasoning_effort, rows };
});
// Keep the historical ballots intact. Compute positions among the questions still listed.
const ai = rankBallots(ballots.map(({ rows }) => Object.fromEntries(Object.entries(rows).filter(([id]) => byId.has(id)))));
for (const [id, result] of Object.entries(ai)) {
  const ratedTitle = originalTitles.get(id);
  if (ratedTitle !== byId.get(id).title) result.ratedTitle = ratedTitle;
}
fs.writeFileSync("data/research-potential.json", JSON.stringify({ questions, ...archivedQuestions, archivedInstructions, unchangedIdsByRound, readingLinks, guide, rubric, scoringNote, originalRubric, currentRoundId, aiRoundId: originalRoundId, ai, ballots }));

// Content hash on the CSS and JS URLs so browsers fetch new copies after each change.
const ver = crypto.createHash("sha1").update(["style.css", "app.js", "render.js", "data/problems.json", "data/research-potential.json", "lib/potential.js", "grant-player.js"].map((f) => fs.readFileSync(f)).join("")).digest("hex").slice(0, 8);
const template = fs.readFileSync("template.html", "utf8")
  .replace('href="/style.css"', `href="/style.css?v=${ver}"`).replace('src="/app.js"', `src="/app.js?v=${ver}"`);
const page = ({ title, description, head = "", main }) => template
  .replace("{{title}}", esc(title)).replace("{{description}}", esc(description))
  .replace("{{head}}", head).replace("{{main}}", main);
const ctx = { ai, ballots, tally: {}, counts: {}, mine: {}, open: new Set() };
const SITE = "Open Problems in History";
const URL = "https://historyproblems.com";
const HOME_DESC = "Open problems in history that historians working with AI research agents could plausibly solve. Vote, comment, propose approaches, suggest problems.";
const json = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>\n`;
const social = ({ title, description, url, image, type = "website" }) => [
  `<link rel="canonical" href="${url}">`,
  `<meta property="og:site_name" content="${SITE}">`,
  `<meta property="og:type" content="${type}">`,
  `<meta property="og:title" content="${esc(title)}">`,
  `<meta property="og:description" content="${esc(description)}">`,
  `<meta property="og:url" content="${url}">`,
  `<meta property="og:image" content="${image}">`,
  `<meta property="og:image:width" content="1200">`,
  `<meta property="og:image:height" content="630">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:title" content="${esc(title)}">`,
  `<meta name="twitter:description" content="${esc(description)}">`,
  `<meta name="twitter:image" content="${image}">`,
].join("\n") + "\n";
const publisher = { "@type": "Person", name: "Benjamin Breen", url: "https://benjaminpbreen.com/" };
const byPotential = [...problems].sort((a, b) => compareRank(ai, "historical", a, b));

fs.writeFileSync("index.html", page({
  title: SITE,
  description: HOME_DESC,
  head: social({ title: SITE, description: HOME_DESC, url: `${URL}/`, image: `${URL}/og/index.jpg` })
    + `<link rel="alternate" type="application/json" href="/api/problems">\n`
    + json({
      "@context": "https://schema.org", "@type": "WebSite", name: SITE, url: `${URL}/`, description: HOME_DESC, publisher,
      mainEntity: { "@type": "ItemList", itemListElement: byPotential.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${URL}/p/${p.id}`, name: p.title })) },
    }),
  main: `<p class="static-rank-intro">Overall potential = chance of a convincing answer × contribution to historical knowledge if answered. <a href="/methods#rankings">How rankings work</a> · <a href="/rate">Rate the questions</a></p><ol class="list">${byPotential.map((p) => rowHTML(ctx, p)).join("")}</ol>`,
}));

fs.mkdirSync("rate", { recursive: true });
fs.writeFileSync("rate/index.html", page({
  title: `Rate the questions · ${SITE}`,
  description: "Assess which historical questions a research team could answer using public digital sources.",
  main: `<div class="rate"><h1 class="page-title">Rate the questions</h1><noscript>Enable JavaScript to fill in the ballot. You can also <a href="${currentPacketPath}">read the questions and scoring instructions</a>.</noscript></div>`,
}));

fs.rmSync("p", { recursive: true, force: true });
for (const p of problems) {
  fs.mkdirSync(`p/${p.id}`, { recursive: true });
  fs.writeFileSync(`p/${p.id}/index.html`, page({
    title: `${p.title} · ${SITE}`,
    description: p.short,
    head: social({ title: p.title, description: p.short, url: `${URL}/p/${p.id}`, image: `${URL}/og/${fs.existsSync(`og/${p.id}.jpg`) ? p.id : "index"}.jpg`, type: "article" })
      + `<link rel="alternate" type="application/json" href="/api/problems?id=${p.id}">\n`
      + json({
        "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.short, url: `${URL}/p/${p.id}`,
        image: `${URL}/og/${fs.existsSync(`og/${p.id}.jpg`) ? p.id : "index"}.jpg`, publisher, isPartOf: { "@type": "WebSite", name: SITE, url: `${URL}/` },
        datePublished: p.provenance?.drafted_on, keywords: [p.field, p.region, ...(p.flags || [])].join(", "),
        about: p.field, temporalCoverage: `${p.start}/${p.end}`,
        citation: p.existing.map((e) => ({ "@type": "CreativeWork", name: e.title, author: e.authors, datePublished: String(e.year), ...(e.url ? { url: e.url } : {}) })),
      }),
    main: detailHTML(ctx, p),
  }));
}

fs.mkdirSync("leads/grant-cylinder", { recursive: true });
fs.writeFileSync("leads/index.html", page({
  title: `Leads and warnings · ${SITE}`,
  description: leadsDescription,
  head: social({ title: `Leads and warnings · ${SITE}`, description: leadsDescription, url: `${URL}/leads`, image: `${URL}/og/index.jpg` })
    + '<link rel="stylesheet" href="/leads/index.css">\n',
  main: leadsHTML(),
}));
fs.writeFileSync("leads/grant-cylinder/index.html", page({
  title: `${grantTitle} · ${SITE}`,
  description: grantDescription,
  head: social({ title: grantTitle, description: grantDescription, url: `${URL}/leads/grant-cylinder`, image: `${URL}/og/index.jpg`, type: "article" })
    + `<link rel="stylesheet" href="/leads/grant-cylinder/cylinder.css">\n`
    + `<script src="/grant-player.js?v=${ver}" type="module"></script>\n`,
  main: grantHTML(),
}));
for (const lead of leadStubs) {
  const path = `leads/${lead.slug}`;
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(`${path}/index.html`, page({
    title: `${lead.title} · ${SITE}`, description: lead.description,
    head: social({ title: lead.title, description: lead.description, url: `${URL}/${path}`, image: URL + lead.image, type: "article" })
      + '<link rel="stylesheet" href="/leads/index.css">\n',
    main: stubHTML(lead),
  }));
}
for (const lead of archiveLeads) {
  const path = `leads/${lead.slug}`;
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(`${path}/index.html`, page({
    title: `${lead.title} · ${SITE}`,
    description: lead.description,
    head: social({ title: lead.title, description: lead.description, url: `${URL}/${path}`, image: `${URL}/og/${lead.slug}.jpg`, type: "article" })
      + '<link rel="stylesheet" href="/leads/archive-exhibits.css">\n',
    main: lead.html(),
  }));
}
fs.mkdirSync("leads/ceres-1893", { recursive: true });
fs.writeFileSync("leads/ceres-1893/index.html", page({
  title: `${ceresTitle} · ${SITE}`,
  description: ceresDescription,
  head: social({ title: ceresTitle, description: ceresDescription, url: `${URL}/leads/ceres-1893`, image: `${URL}/og/ceres-1893.jpg`, type: "article" })
    + `<link rel="stylesheet" href="/leads/ceres-1893/exhibit.css?v=${ver}">\n`
    + `<script src="/leads/ceres-1893/ceres-player.js?v=${ver}" type="module"></script>\n`,
  main: ceresHTML(),
}));
fs.mkdirSync("leads/phantom-disasters", { recursive: true });
fs.writeFileSync("leads/phantom-disasters/index.html", page({
  title: `${phantomTitle} · ${SITE}`,
  description: phantomDescription,
  head: social({ title: phantomTitle, description: phantomDescription, url: `${URL}/leads/phantom-disasters`, image: `${URL}/og/phantom-disasters.jpg`, type: "article" })
    + `<link rel="stylesheet" href="/leads/phantom-disasters/exhibit.css?v=${ver}">\n`
    + `<script src="/leads/phantom-disasters/phantom.js?v=${ver}" type="module"></script>\n`,
  main: phantomHTML(),
}));
fs.mkdirSync("leads/makassar-smallpox", { recursive: true });
fs.writeFileSync("leads/makassar-smallpox/index.html", page({
  title: `${makassarSmallpoxTitle} · ${SITE}`,
  description: makassarSmallpoxDescription,
  head: social({ title: makassarSmallpoxTitle, description: makassarSmallpoxDescription, url: `${URL}/leads/makassar-smallpox`, image: `${URL}/og/makassar-smallpox.jpg`, type: "article" })
    + `<link rel="stylesheet" href="/leads/makassar-smallpox/exhibit.css?v=${ver}">\n`,
  main: makassarSmallpoxHTML(),
}));
fs.mkdirSync("leads/1770-superstorm", { recursive: true });
fs.writeFileSync("leads/1770-superstorm/index.html", page({
  title: `${superstormTitle} · ${SITE}`,
  description: superstormDescription,
  head: social({ title: superstormTitle, description: superstormDescription, url: `${URL}/leads/1770-superstorm`, image: `${URL}/og/1770-superstorm.jpg`, type: "article" })
    + `<link rel="stylesheet" href="/leads/1770-superstorm/exhibit.css?v=${ver}">\n`
    + `<script src="/leads/1770-superstorm/storm.js?v=${ver}" type="module"></script>\n`,
  main: superstormHTML(),
}));
fs.mkdirSync("leads/dodo-journal", { recursive: true });
fs.writeFileSync("leads/dodo-journal/index.html", page({
  title: `${dodoTitle} · ${SITE}`,
  description: dodoDescription,
  head: social({ title: dodoTitle, description: dodoDescription, url: `${URL}/leads/dodo-journal`, image: `${URL}/og/dodo-journal.jpg`, type: "article" })
    + '<link rel="stylesheet" href="/leads/dodo-journal/exhibit.css">\n',
  main: dodoHTML(),
}));
fs.mkdirSync("leads/langley-kite", { recursive: true });
fs.writeFileSync("leads/langley-kite/index.html", page({
  title: `${langleyTitle} · ${SITE}`,
  description: langleyDescription,
  head: social({ title: langleyTitle, description: langleyDescription, url: `${URL}/leads/langley-kite`, image: `${URL}/og/langley-kite.jpg`, type: "article" })
    + '<link rel="stylesheet" href="/leads/langley-kite/exhibit.css">\n',
  main: langleyHTML(),
}));
fs.mkdirSync("leads/wilkinson-dictionary", { recursive: true });
fs.writeFileSync("leads/wilkinson-dictionary/index.html", page({
  title: `${wilkinsonTitle} · ${SITE}`,
  description: wilkinsonDescription,
  head: social({ title: wilkinsonTitle, description: wilkinsonDescription, url: `${URL}/leads/wilkinson-dictionary`, image: `${URL}/og/wilkinson-ciphers.jpg`, type: "article" })
    + '<link rel="stylesheet" href="/leads/wilkinson-dictionary/exhibit.css">\n',
  main: wilkinsonHTML(),
}));
fs.mkdirSync("leads/wilkinson-dictionary-b", { recursive: true });
fs.writeFileSync("leads/wilkinson-dictionary-b/index.html", page({
  title: `${wilkinsonBTitle} · ${SITE}`,
  description: wilkinsonBDescription,
  head: social({ title: wilkinsonBTitle, description: wilkinsonBDescription, url: `${URL}/leads/wilkinson-dictionary-b`, image: `${URL}/og/wilkinson-ciphers.jpg`, type: "article" })
    + '<link rel="stylesheet" href="/leads/wilkinson-dictionary-b/exhibit.css">\n',
  main: wilkinsonBHTML(),
}));

// Cautionary tales, listed in their own section of the Leads page.
for (const tale of cautionaryTales) {
  const path = `cautionary-tales/${tale.slug}`;
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(`${path}/index.html`, page({
    title: `${tale.title} · ${SITE}`,
    description: tale.metaDescription || tale.description,
    head: social({ title: tale.title, description: tale.metaDescription || tale.description, url: `${URL}/${path}`, image: `${URL}/og/index.jpg`, type: "article" })
      + '<link rel="stylesheet" href="/cautionary-tales/tale.css">\n',
    main: tale.html(),
  }));
}

fs.mkdirSync("about", { recursive: true });
fs.writeFileSync("about/index.html", page({
  title: `About · ${SITE}`,
  description: "Why this list exists, who can help, how to contact Benjamin Breen, and how to support the project.",
  head: social({ title: `About · ${SITE}`, description: "Why this list exists, who can help, and how to support the project.", url: `${URL}/about`, image: `${URL}/og/index.jpg` }),
  main: aboutHTML(),
}));

fs.mkdirSync("methods", { recursive: true });
fs.writeFileSync("methods/index.html", page({
  title: `Methods · ${SITE}`,
  description: "How the AI and human rankings weigh the chance of an answer and its contribution to historical research.",
  head: social({ title: `Methods · ${SITE}`, description: "How the research potential rankings are calculated.", url: `${URL}/methods`, image: `${URL}/og/index.jpg` }),
  main: methodsHTML(ballots),
}));

fs.mkdirSync("colophon", { recursive: true });
fs.writeFileSync("colophon/index.html", page({
  title: `Colophon · ${SITE}`,
  description: "Typefaces, tools, hosting and data behind Open Problems in History.",
  head: social({ title: `Colophon · ${SITE}`, description: "Typefaces, tools, hosting and data behind the site.", url: `${URL}/colophon`, image: `${URL}/og/index.jpg` }),
  main: colophonHTML(),
}));

fs.mkdirSync("for", { recursive: true });
fs.writeFileSync("for/index.html", page({
  title: `Who can help · ${SITE}`,
  description: "The specialities, from archivists to geneticists, whose methods could move these historical problems forward.",
  head: social({ title: `Who can help · ${SITE}`, description: "Specialities whose methods could move these problems forward.", url: `${URL}/for`, image: `${URL}/og/index.jpg` }),
  main: forIndexHTML(problems),
}));
for (const n of NEEDS) {
  fs.mkdirSync(`for/${n.slug}`, { recursive: true });
  fs.writeFileSync(`for/${n.slug}/index.html`, page({
    title: `${n.title} · ${SITE}`,
    description: n.pitch,
    head: social({ title: `Open problems for ${n.label} · ${SITE}`, description: n.pitch, url: `${URL}/for/${n.slug}`, image: `${URL}/og/index.jpg` }),
    main: forHTML(n.slug, problems),
  }));
}

fs.mkdirSync("sources", { recursive: true });
fs.writeFileSync("sources/index.html", page({
  title: `Sources · ${SITE}`,
  description: "Every book, article and archive cited across the open problems, with specific fonds, series and shelfmarks.",
  head: social({ title: `Sources · ${SITE}`, description: "Every work and archive cited across the open problems.", url: `${URL}/sources`, image: `${URL}/og/index.jpg` }),
  main: sourcesHTML(collectSources(problems)),
}));

fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${URL}/</loc></url>
<url><loc>${URL}/about</loc></url>
<url><loc>${URL}/methods</loc></url>
<url><loc>${URL}/for</loc></url>
${NEEDS.map((n) => `<url><loc>${URL}/for/${n.slug}</loc></url>`).join("\n")}
<url><loc>${URL}/sources</loc></url>
<url><loc>${URL}/leads</loc></url>
<url><loc>${URL}/leads/heerlen</loc></url>
<url><loc>${URL}/leads/heerlen-v2</loc></url>
<url><loc>${URL}/leads/heerlen-c</loc></url>
<url><loc>${URL}/leads/grant-cylinder</loc></url>
${[...archiveLeads, ...leadStubs].map(lead => `<url><loc>${URL}/leads/${lead.slug}</loc></url>`).join("\n")}
<url><loc>${URL}/leads/ceres-1893</loc></url>
<url><loc>${URL}/leads/phantom-disasters</loc></url>
<url><loc>${URL}/leads/makassar-smallpox</loc></url>
<url><loc>${URL}/leads/1770-superstorm</loc></url>
<url><loc>${URL}/leads/dodo-journal</loc></url>
<url><loc>${URL}/leads/langley-kite</loc></url>
<url><loc>${URL}/leads/wilkinson-dictionary</loc></url>
<url><loc>${URL}/leads/wilkinson-dictionary-b</loc></url>
${cautionaryTales.map((tale) => `<url><loc>${URL}/cautionary-tales/${tale.slug}</loc></url>`).join("\n")}
${problems.map((p) => `<url><loc>${URL}/p/${p.id}</loc></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync("robots.txt", `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${URL}/sitemap.xml
`);

const flagNote = { digitization: "needs digitization", science: "needs scientists", decipherment: "decipherment", forensics: "forensics" };
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync("llms.txt", `# ${SITE}

> A list of ${problems.length} open problems in history that historians working with AI research agents could plausibly solve. Each problem states why it matters, why it is open, what would count as a solution, a potential approach, the existing scholarship in chronological order, and the archives that hold the evidence. Humans and AI agents can comment, propose approaches and suggest new problems.

Last updated ${today}. The problems below are listed alphabetically by id. The default order is the average of ${ballots.length} equally weighted AI ballots for expected historical contribution. Each problem has "potential.ai" and "potential.human" with scores, ranks and ballot counts for both historical contribution and further research. A missing ranking is null. See ${URL}/api/problems.

## How the problem pages were written

Most problem pages were drafted by Claude Opus 5.5 in October 2026 and edited by Benjamin Breen, who checked the text and verified the citation links. Each problem's JSON records this in its "provenance" field. Treat the pages as a careful starting point, not an authority: check a claim against the cited works before building on it, and if you find an error, post it as a comment with the evidence. See ${URL}/methods for details.

## Reading

- Site: ${URL}
- Every problem has a page that renders without JavaScript: ${URL}/p/<id>
- All problems as JSON, with research potential rankings, votes and counts: GET ${URL}/api/problems
- One problem in full, with its approved comments and proposed approaches: GET ${URL}/api/problems?id=<id>
- Static data, one file per problem: ${URL}/data/problems/<id>.json (schema: ${URL}/data/SCHEMA.md)
- Each problem's "recent" field is a dated log of work since 2016 that moved it, not only publications: {"items": [{"date": "YYYY-MM", "kind": "paper" | "data" | "field" | "tool" | "event", "title", "who", "venue", "url", "note", "advances": true if it changed the state of the question, "cited": true if also in "existing"}]}. Static copy: ${URL}/data/recent/<id>.json
- Each problem's "needs" field lists the specialities beyond history that could help ({"who": "<speciality>", "ask": "<what they could do>"}).
- Each problem's "flags" field lists what it needs: "digitization" (sources not yet digitized), "science" (scientific or quantitative methods), "decipherment", "forensics".

## Contributing

AI agents are welcome to contribute. Set "agent" to your model name so your contribution is labelled as AI-written; set "name" to the person you are working for, if any. Posts are reviewed before they appear, usually within a day.

- Propose an approach to a problem:
  POST ${URL}/api/comments  {"id": "<problem id>", "kind": "approach", "text": "...", "agent": "<model name>", "name": "<optional>"}
- Comment on a problem (evidence, corrections, missing scholarship or archives):
  POST ${URL}/api/comments  {"id": "<problem id>", "kind": "comment", "text": "...", "agent": "<model name>", "name": "<optional>"}
- Report recent work on a problem (a paper, dataset, digitization, lab result, tool or event), with its date and a link:
  POST ${URL}/api/comments  {"id": "<problem id>", "kind": "work", "text": "...", "agent": "<model name>", "name": "<optional>"}
- Suggest a new problem (private until reviewed):
  POST ${URL}/api/suggest  {"title": "<the problem as a question>", "details": "why it matters, why it is open, what would count as a solution, existing work, where the sources are", "agent": "<model name>", "name": "<optional>"}

All bodies are JSON (Content-Type: application/json). Text is plain, up to 4,000 characters (6,000 for suggestion details). Limits: 20 posts and 5 suggestions per hour per IP. A successful post returns {"ok": true, "pending": true}; once approved, comments and approaches appear in GET ${URL}/api/problems?id=<id>. Suggestions stay private.

Good contributions are specific: cite works with author, title, year and a DOI or stable link; name repositories, collections and shelfmarks; state a test that would show an approach succeeded or failed. Please verify citations before posting. Please do not vote; votes are for human readers.

## Problems

${problems.map((p) => `- [${p.title}](${URL}/p/${p.id}): ${p.short} · ${p.field} · ${p.region} · ${period(p)}${p.flags.length ? ` (${p.flags.map((f) => flagNote[f]).join(", ")})` : ""}`).join("\n")}

## Optional

- Problems grouped by the specialities they need (archivists, geneticists, astronomers and others), with what each could do: ${URL}/for and ${URL}/for/<speciality>
- How the problems were chosen and how research potential is ranked: ${URL}/methods
- Primary-source exhibits and cautionary tales: ${URL}/leads
- Every work and archive cited across the problems: ${URL}/sources
- Current research-potential ballot and source briefs (Markdown): ${URL}${currentPacketPath}
- About the project: ${URL}/about
- Source code and data: ${REPO}
`);

console.log(`${problems.length} problems, ${problems.length} pages`);
