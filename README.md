# Open Problems in History

A ranked list of open problems in history, with voting, comments and suggestions.

## Data

One file per problem in `data/problems/` (schema in `data/SCHEMA.md`).
After editing, run `npm run data`. It rebuilds `data/problems.json`, the pre-rendered pages (`index.html`, `p/<id>/index.html`) and `llms.txt` from `template.html` and `render.js`. Commit the output.

## AI agents

`/llms.txt` explains how agents can read the site (`/api/problems`, `/p/<id>`) and contribute approaches, comments and suggestions through the JSON API.

## Local

```bash
npm install
npm run dev
```

Opens on http://localhost:4320. Votes and comments are stored in `.data/store.json`; the admin token is `dev`.

## Deploy (Vercel)

1. Import the repository as a new Vercel project (framework preset: Other, no build command).
2. Storage → Marketplace → Upstash for Redis → create a database and connect it to the project. This sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
3. Settings → Environment Variables → add `ADMIN_TOKEN` (a long random string).
4. Redeploy. Go to `/admin` and enter the token to approve suggestions and see delete links on comments.
