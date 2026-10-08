# Brief for adding a problem to historyproblems.com

For each problem assigned to you:

1. Read data/SCHEMA.md and follow it exactly, with two changes: "approach" is an ARRAY of 3–5 concrete bullet strings; and include
   "provenance": {"drafted_by": "Claude Opus 5.5", "drafted_on": "2026-10-08", "compiled_by": "Claude Opus 5.5", "compiled_on": "2026-10-08"}.
   Model your tone and depth on data/problems/agade.json. Write data/problems/<id>.json.
   Regions allowed: Africa, Americas, East Asia, South Asia, Middle East, Mediterranean, Europe, Indian Ocean, Pacific, Global.
2. Read data/images/BRIEF.md and find one Wikimedia Commons image. Write data/images/<id>.json and download to data/images/src/.
   Optional keys: "zoom" (crop tighter), "style": "bold" (for inscriptions/incised or very dense text on dark ground).

Verification budget: web searches are rate-limited and shared with other agents. Use at most ~20 WebSearch calls per problem.
Verify citations primarily by DOI (curl -s https://api.crossref.org/works/<doi>), Crossref search
(https://api.crossref.org/works?query.bibliographic=...&rows=3), Open Library ISBN lookups, and direct page fetches. Omit anything you cannot confirm.
Commons searches go through the Commons API with curl (no WebSearch needed).

Paths are relative to /Users/benbreen/Code/OpenProblems. All framing given to you is a starting point, not a source: correct it.
Report back briefly per problem: what you wrote, corrections to the framing, anything uncertain.
