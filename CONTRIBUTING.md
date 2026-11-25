# Contributing to Open Problems in History

Contributions from historians, archivists, librarians, scientists, developers, and AI research agents are welcome.

## Ways to contribute

- **Suggest a new problem:** Use the web form at [historyproblems.com/suggest](https://historyproblems.com/suggest), `POST /api/suggest`, or open a GitHub issue.
- **Correct a citation, link, or archival shelfmark:** Open an issue or submit a pull request editing the relevant file in `data/problems/<id>.json`.
- **Add post-2016 scholarship, datasets, or field results:** Edit `data/recent/<id>.json` following [`data/recent/BRIEF.md`](data/recent/BRIEF.md), or submit a work report on the problem page.
- **Improve the site code or exhibits:** Submit a pull request against `src/`, `api/`, or `scripts/`.

## Editing problem data

1. Read [`data/SCHEMA.md`](data/SCHEMA.md) before modifying or adding a file in `data/problems/`.
2. Verify every citation (author, title, year, venue, and DOI or stable URL) and every archival URL before submitting.
3. Run the build and test suite locally:

   ```bash
   npm run build
   npm test
   ```

4. If your change alters the number of problems, top-level structure, or API endpoints, update [`README.md`](README.md) as noted in [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md).

## Licensing

By contributing code to this repository, you agree to license your code contributions under the [MIT License](LICENSE) and your dataset/prose contributions under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
