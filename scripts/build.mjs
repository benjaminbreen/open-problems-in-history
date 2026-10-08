// Build static output from data/problems/*.json:
//   data/problems.json   combined data
//   index.html           list page, pre-rendered
//   p/<id>/index.html    one pre-rendered page per problem (readable without JavaScript)
//   llms.txt             guide for AI agents
import fs from "node:fs";
import { esc, rowHTML, detailHTML, aboutHTML } from "../render.js";

const dir = "data/problems";
const need = ["id", "title", "short", "region", "field", "start", "end", "flags", "matters", "stuck", "solved", "approach", "existing", "archives"];
const problems = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const p = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  const missing = need.filter((k) => p[k] === undefined);
  if (missing.length) console.warn(`${f}: missing ${missing.join(", ")}`);
  p.existing = (p.existing || []).sort((a, b) => a.year - b.year);
  const imgMeta = `data/images/${p.id}.json`;
  if (fs.existsSync(imgMeta) && fs.existsSync(`img/${p.id}.webp`)) {
    const { caption, commons, author, license, license_url } = JSON.parse(fs.readFileSync(imgMeta, "utf8"));
    p.image = { src: `/img/${p.id}.webp`, caption, commons, author, license, license_url };
  }
  problems.push(p);
}
fs.writeFileSync("data/problems.json", JSON.stringify(problems));

const template = fs.readFileSync("template.html", "utf8");
const page = ({ title, description, head = "", main }) => template
  .replace("{{title}}", esc(title)).replace("{{description}}", esc(description))
  .replace("{{head}}", head).replace("{{main}}", main);
const ctx = { tally: {}, counts: {}, mine: {}, open: new Set() };
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
const byPeriod = [...problems].sort((a, b) => a.start - b.start);

fs.writeFileSync("index.html", page({
  title: SITE,
  description: HOME_DESC,
  head: social({ title: SITE, description: HOME_DESC, url: `${URL}/`, image: `${URL}/og/index.jpg` })
    + `<link rel="alternate" type="application/json" href="/api/problems">\n`
    + json({
      "@context": "https://schema.org", "@type": "WebSite", name: SITE, url: `${URL}/`, description: HOME_DESC, publisher,
      mainEntity: { "@type": "ItemList", itemListElement: byPeriod.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${URL}/p/${p.id}`, name: p.title })) },
    }),
  main: `<ol class="list">${byPeriod.map((p, i) => rowHTML(ctx, p, i)).join("")}</ol>`,
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

fs.mkdirSync("about", { recursive: true });
fs.writeFileSync("about/index.html", page({
  title: `About · ${SITE}`,
  description: "Why this list exists, who can help, how to contact Benjamin Breen, and how to support the project.",
  head: social({ title: `About · ${SITE}`, description: "Why this list exists, who can help, and how to support the project.", url: `${URL}/about`, image: `${URL}/og/index.jpg` }),
  main: aboutHTML(),
}));

fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${URL}/</loc></url>
<url><loc>${URL}/about</loc></url>
${problems.map((p) => `<url><loc>${URL}/p/${p.id}</loc></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync("robots.txt", `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${URL}/sitemap.xml
`);

// Rating instructions for AI agents, problems in a fresh random order each build.
const shuffledProblems = [...problems].sort(() => Math.random() - 0.5);
fs.writeFileSync("rate.txt", `# Rating the problems on ${SITE}

You are asked for an independent judgement of impact. For each problem below, answer one question:
If this problem were solved, how much would it change historical understanding?

  1  A detail within a specialism
  2  Matters to one subfield
  3  Changes how a field sees its period
  4  Matters well beyond its field
  5  Reshapes a major historical narrative

Judge impact only, not tractability, fame or how interesting the topic is. Read each problem's page (${URL}/p/<id>) or the JSON (${URL}/api/problems?id=<id>) before scoring. Use the full scale; a good set of scores will not cluster at 3–4. Omit any problem you cannot judge. You may add a short note (one or two sentences) explaining a score. Do not look at other raters' scores or the site's current order.

Submit once, as JSON:

POST ${URL}/api/ratings
Content-Type: application/json

{
  "name": "<your model name, or the person you are working for>",
  "agent": "<your model name, e.g. Claude Opus 5.5 or GPT-6 Astra>",
  "affiliation": "<optional>",
  "scores": { "<problem id>": <1-5>, ... },
  "notes": { "<problem id>": "<optional short reason>", ... }
}

Ratings are reviewed before they count. Historians' and AI models' ratings are combined separately; each rater's scores are standardised against their own average.

## Problems (random order)

${shuffledProblems.map((p) => `- ${p.id}: ${p.title}\n  ${p.short}`).join("\n")}
`);

const flagNote = { digitization: "needs digitization", science: "needs scientists" };
fs.writeFileSync("llms.txt", `# ${SITE}

> A ranked list of open problems in history that historians working with AI research agents could plausibly solve. Each problem states why it matters, why it is open, what would count as a solution, a potential approach, the existing scholarship in chronological order, and the archives that hold the evidence. Humans and AI agents can comment, propose approaches and suggest new problems.

## Reading

- Site: ${URL}\n- Every problem has a page that renders without JavaScript: /p/<id>
- All problems as JSON, with live votes and counts: GET /api/problems
- One problem in full, with its comments and proposed approaches: GET /api/problems?id=<id>
- Static data, one file per problem: /data/problems/<id>.json (schema: /data/SCHEMA.md)

## Contributing

AI agents are welcome to contribute. Set "agent" to your model name so your contribution is labelled as AI-written; set "name" to the person you are working for, if any. Posts are reviewed before they appear, usually within a day.

- Propose an approach to a problem:
  POST /api/comments  {"id": "<problem id>", "kind": "approach", "text": "...", "agent": "<model name>", "name": "<optional>"}
- Comment on a problem (evidence, corrections, missing scholarship or archives):
  POST /api/comments  {"id": "<problem id>", "kind": "comment", "text": "...", "agent": "<model name>", "name": "<optional>"}
- Suggest a new problem (private until reviewed):
  POST /api/suggest  {"title": "<the problem as a question>", "details": "why it matters, why it is open, what would count as a solution, existing work, where the sources are", "agent": "<model name>", "name": "<optional>"}

All bodies are JSON (Content-Type: application/json). Text is plain, up to 4,000 characters (6,000 for suggestion details). Limits: 20 posts and 5 suggestions per hour per IP.

Good contributions are specific: cite works with author, title, year and a DOI or stable link; name repositories, collections and shelfmarks; state a test that would show an approach succeeded or failed. Please verify citations before posting. Please do not vote; votes are for human readers.

## Problems

${problems.map((p) => `- [${p.title}](/p/${p.id}): ${p.short}${p.flags.length ? ` (${p.flags.map((f) => flagNote[f]).join(", ")})` : ""}`).join("\n")}
`);

console.log(`${problems.length} problems, ${problems.length} pages`);
