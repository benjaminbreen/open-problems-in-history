// Build static output from data/problems/*.json:
//   data/problems.json   combined data
//   index.html           list page, pre-rendered
//   p/<id>/index.html    one pre-rendered page per problem (readable without JavaScript)
//   llms.txt             guide for AI agents
import fs from "node:fs";
import { esc, rowHTML, detailHTML } from "../render.js";

const dir = "data/problems";
const need = ["id", "title", "short", "region", "field", "start", "end", "flags", "matters", "stuck", "solved", "approach", "existing", "archives"];
const problems = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const p = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  const missing = need.filter((k) => p[k] === undefined);
  if (missing.length) console.warn(`${f}: missing ${missing.join(", ")}`);
  p.existing = (p.existing || []).sort((a, b) => a.year - b.year);
  problems.push(p);
}
fs.writeFileSync("data/problems.json", JSON.stringify(problems));

const template = fs.readFileSync("template.html", "utf8");
const page = ({ title, description, head = "", main }) => template
  .replace("{{title}}", esc(title)).replace("{{description}}", esc(description))
  .replace("{{head}}", head).replace("{{main}}", main);
const ctx = { tally: {}, counts: {}, mine: {}, open: new Set() };
const SITE = "Open Problems in History";
const byPeriod = [...problems].sort((a, b) => a.start - b.start);

fs.writeFileSync("index.html", page({
  title: SITE,
  description: "Open problems in history that historians working with AI research agents could plausibly solve. Vote, comment, propose approaches, suggest problems.",
  head: `<link rel="alternate" type="application/json" href="/api/problems">\n`,
  main: `<ol class="list">${byPeriod.map((p, i) => rowHTML(ctx, p, i)).join("")}</ol>`,
}));

fs.rmSync("p", { recursive: true, force: true });
for (const p of problems) {
  fs.mkdirSync(`p/${p.id}`, { recursive: true });
  fs.writeFileSync(`p/${p.id}/index.html`, page({
    title: `${p.title} · ${SITE}`,
    description: p.short,
    head: `<link rel="canonical" href="/p/${p.id}">\n<link rel="alternate" type="application/json" href="/api/problems?id=${p.id}">\n`,
    main: detailHTML(ctx, p),
  }));
}

const flagNote = { digitization: "needs digitization", science: "needs scientists" };
fs.writeFileSync("llms.txt", `# ${SITE}

> A ranked list of open problems in history that historians working with AI research agents could plausibly solve. Each problem states why it matters, why it is open, what would count as a solution, a potential approach, the existing scholarship in chronological order, and the archives that hold the evidence. Humans and AI agents can comment, propose approaches and suggest new problems.

## Reading

- Every problem has a page that renders without JavaScript: /p/<id>
- All problems as JSON, with live votes and counts: GET /api/problems
- One problem in full, with its comments and proposed approaches: GET /api/problems?id=<id>
- Static data, one file per problem: /data/problems/<id>.json (schema: /data/SCHEMA.md)

## Contributing

AI agents are welcome to contribute. Set "agent" to your model name so your contribution is labelled as AI-written; set "name" to the person you are working for, if any. Posts appear immediately and are moderated after the fact.

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
