# Brief: recent work for a problem (data/recent/<id>.json)

"Recent work" is a dated log, 2016 to the present (October 2026), of anything that moved an open problem: not only publications. It appears on the problem page as a compact timeline strip that expands into a list. The curated canon stays in the problem's "existing" list; this log is broader and more current.

Read `data/problems/<id>.json` first for the question, its "existing" works and "archives". See `data/recent/khipu.json` for a finished example of tone, length and mix.

## Kinds (use exactly these slugs)
- `paper`: articles, preprints, books, chapters, dissertations, conference papers
- `data`: datasets, digitization of collections, databases, catalogues going online, corpus releases or new versions
- `field`: lab and field results: radiocarbon, dendrochronology, ancient DNA, isotopes, materials analysis, imaging, excavation finds, ice cores, surveys
- `tool`: software, code, models, notebooks, OCR/HTR models built for the material
- `event`: workshops, conferences, exhibitions, repatriations, acquisitions, community agreements
- `grant`: named funded projects aimed at the problem or its sources (ERC, NEH, AHRC, DFG, Mellon, NSF, Leverhulme, British Academy and the like); give funder, amount if public, and years in the note
- `prize`: money offered for solving the problem or part of it (decipherment prizes, open challenges), or cash awards given for work on it; give the amount in the title or note

## How many
Aim for 10–25 items, spread across years, in proportion to how active the question really is. Do not pad: a quiet problem with 7 solid items is better than 15 weak ones. Include work on all sides of a debate. Include 2016–2026 items already in "existing" (mark them `cited: true`). Look actively for non-paper kinds (digitization projects, aDNA and radiocarbon results, released datasets, GitHub code, conferences); include them when they exist.

## Verification (mandatory)
Every item must be confirmed to exist. Verify papers via Crossref (`curl -s "https://api.crossref.org/works/<doi>"`, or `https://api.crossref.org/works?query.bibliographic=...&rows=5`) and OpenAlex (`https://api.openalex.org/works?search=...&filter=from_publication_date:2016-01-01&per-page=50` is a good sweep; also try citing works of key "existing" items: `https://api.openalex.org/works?filter=cites:W...,from_publication_date:2016-01-01`). Verify repos via the GitHub API, datasets via DataCite/Zenodo, and other things by fetching the page. Get the month when you can. Omit anything you cannot confirm. Leave out unreviewed self-published "decipherment" claims (e.g. lone Zenodo or blog posts) unless they drew a documented scholarly response. WebSearch is rate-limited and shared with other agents: use at most ~10 WebSearch calls per problem and lean on the APIs via curl.

## advances
`advances: true` ONLY for items that genuinely change the state of the question: a decisive new dataset or find, a new matched source, a result other work now has to answer. Usually 0–3 per problem, never more than 4. Be stingy; the flag only means something if it is rare.

## File format
Write `data/recent/<id>.json`:

```json
{
  "compiled_by": "Claude Opus 5.5",
  "compiled_on": "2026-10-10",
  "items": [
    { "date": "YYYY-MM" (or "YYYY" if the month is truly unknown),
      "kind": "paper|data|field|tool|event|grant|prize",
      "title": "exact title of the work, release or event; a short factual headline for a field result",
      "who": "short: 'S. Hyland et al.', 'J. Smith and K. Lee', or an institution",
      "venue": "journal, publisher or platform, short (optional)",
      "url": "stable URL, DOI preferred",
      "note": "One plain scholarly sentence, max ~25 words, on what it contributed or claimed.",
      "advances": false,
      "cited": false }
  ]
}
```

Items sorted ascending by date. Prose: plain, precise, no hype, no "crucially/notably/groundbreaking", minimal em dashes, hedge where the record is uncertain. Do not edit any other file.

Report back briefly per problem: item count by kind, which items you marked `advances` and why, and anything uncertain or dropped.
