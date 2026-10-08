// Local server: static files plus /api/* handlers, mimicking Vercel's Node runtime.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
const port = Number(process.env.PORT) || 4320;
process.env.ADMIN_TOKEN ||= "dev";

http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname.startsWith("/api/")) {
    const file = path.resolve("api", u.pathname.slice(5) + ".js");
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    let raw = ""; for await (const c of req) raw += c;
    req.body = raw ? JSON.parse(raw) : {};
    req.query = Object.fromEntries(u.searchParams);
    res.status = (n) => { res.statusCode = n; return res; };
    res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
    const { default: h } = await import(file + "?t=" + Date.now());
    try { await h(req, res); } catch (e) { console.error(e); res.statusCode = 500; res.end(); }
    return;
  }
  const p = path.join(".", u.pathname === "/" ? "index.html" : u.pathname);
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404).end("not found"); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream", "Cache-Control": "no-store" }).end(data);
  });
}).listen(port, () => console.log(`http://localhost:${port}`));
