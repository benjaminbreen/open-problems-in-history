# Problem record schema (one JSON file per problem: data/problems/<id>.json)

{
  "id": "kebab-case id (given)",
  "title": "The problem as a question, max ~90 characters",
  "short": "One sentence, max 30 words, shown in the compact list",
  "region": one of "Africa" | "Americas" | "East Asia" | "South Asia" | "Middle East" | "Mediterranean" | "Europe" | "Indian Ocean" | "Global",
  "field": one of "Demography" | "Economy" | "Science & knowledge" | "Languages & scripts" | "Texts & authorship" | "Chronology" | "Material & visual" | "Places" | "Disease",
  "start": integer year (BCE as negative), "end": integer year — the period the problem concerns,
  "flags": array, possibly empty, of "digitization" (progress likely needs new digitization of known, located holdings and collaboration with archivists) and/or "science" (confirmation needs collaboration with scientists: excavation, ancient DNA, radiocarbon, dendrochronology, materials analysis, imaging),
  "matters": "2–4 sentences: what other arguments depend on the answer",
  "stuck": "2–4 sentences: why it has stayed open",
  "solved": "1–3 sentences: what would count as a solution, stated as a test that can be checked",
  "approach": "2–4 sentences: how historians working with AI research agents could proceed; if flagged, name the specific digitization or scientific collaboration needed",
  "existing": [ { "year": 1936, "authors": "R. A. Fisher", "title": "Has Mendel's work been rediscovered?", "venue": "Annals of Science 1 (2): 115–137", "url": "https://doi.org/10.1080/00033793600200111", "note": "One sentence on what this work contributed or claimed." } ],
  "archives": [ { "repository": "Name of archive/library/museum, city", "collection": "Specific fonds, series, shelfmarks or collection names", "url": "https://...", "digitized": "full" | "partial" | "none", "note": "One sentence on what is there and access conditions.", "aliases": ["Names used for it in the prose, e.g. Archivo General de Indias", "AGI"], "holdings": [ { "name": "Specific fonds, series or item", "ref": "Reference code or shelfmark, e.g. ES.41091.AGI//LIMA", "url": "https://deep link to its catalogue or digitized record", "note": "One sentence on what it holds for this problem.", "match": ["Exact phrases in the prose that should link to this holding"] } ] } ]
}

Rules
- "existing": 8–15 items in ascending chronological order, from the founding work to the most recent (include 2018–2026 work where it exists). Primary scholarship: books, articles, datasets, major projects. Include both sides of a debate.
- Every citation must be confirmed to exist by web search before inclusion (author, title, year, venue). Prefer DOI URLs; otherwise a stable publisher, JSTOR, or library URL. If you cannot confirm an item, leave it out. Do not invent page ranges; omit them if unsure.
- "archives": 3–8 entries naming the specific repositories and collections that hold the evidence, with links to catalogues or digitized collections; verify each URL loads (WebFetch) or use the institution's catalogue home page.
- "aliases" (optional): exact phrases that should link to the archive wherever the prose mentions it. Without them, the repository name up to the first comma or parenthesis is used. Matching is case-sensitive.
- "holdings" (optional, 2–8 per archive): the specific fonds, series and items a researcher should open first. Prefer deep catalogue links (PARES, ArchivesSpace, digitized-item viewers) over institution home pages; omit "url" rather than guess. "match" links a holding only through the phrases listed, so ambiguous words like city names belong under the archive's "aliases" instead.
- Prose: plain, precise, scholarly. No hype, no rhetorical questions, no "crucially/notably/fascinating", minimal em dashes. State contested figures as ranges with attribution. Hedge where the record is uncertain.
- Correct any factual error in the framing you were given; framing is a starting point, not a source.
