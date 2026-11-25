# Documentation Maintenance

Keep [`README.md`](../README.md) in sync whenever the site's content or structure changes.

## When to update `README.md`

- **Problem count changes** (adding, merging, or retiring a problem in `data/problems/`):
  - Update the count in the top badge, opening summary paragraph, and repository tree comment in `README.md`.
  - `npm run build` checks for drift between `data/problems/*.json` and the count cited in `README.md` and prints a warning if they diverge.
- **New top-level directories, build scripts, or API routes:**
  - Update the **Repository Architecture** tree and **Public API** table in `README.md`.
- **New judging rounds or rating methods:**
  - Update the `rating-passes/` entries in the repository tree if a new round directory is added.
- **Visual redesigns or major new sections:**
  - Refresh the screenshots in `docs/screenshots/` (`home.png`, `problem-detail.png`, `leads.png`, `who-can-help.png`) at `1280×800` in light mode so the README accurately reflects the live site.
- **About page edits (`src/render.js` → `aboutHTML`):**
  - Mirror any substantive updates to the project's scope or framing in the **About** section of `README.md`.

## Quick pre-commit checklist

```bash
npm run build   # rebuilds dist/ + combined JSONs and checks README problem count
npm test        # runs unit tests
```
