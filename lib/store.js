// Storage: Upstash Redis in production, a JSON file under .data/ locally.
import { Redis } from "@upstash/redis";
import { createHash, randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

function fileStore() {
  const file = path.join(process.cwd(), ".data", "store.json");
  const load = () => { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return {}; } };
  const save = (d) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(d)); };
  const h = (d, k) => (d[k] ??= {});
  return {
    async hget(k, f) { return load()[k]?.[f] ?? null; },
    async hgetall(k) { const v = load()[k]; return v && Object.keys(v).length ? v : null; },
    async hset(k, obj) { const d = load(); Object.assign(h(d, k), obj); save(d); },
    async hdel(k, f) { const d = load(); delete h(d, k)[f]; save(d); },
    async hincrby(k, f, n) { const d = load(); const o = h(d, k); o[f] = (Number(o[f]) || 0) + n; save(d); return o[f]; },
    async incr(k) { const d = load(); d[k] = (Number(d[k]) || 0) + 1; save(d); return d[k]; },
    async expire() {},
  };
}

export const db = url && token ? new Redis({ url, token }) : fileStore();

// Values from Upstash come back parsed; from the file store as stored. Normalise.
export const parse = (v) => (typeof v === "string" ? JSON.parse(v) : v);

export const newId = () => randomBytes(6).toString("hex");

export function voterId(req, res) {
  const m = /(?:^|;\s*)vid=([a-f0-9]{24})/.exec(req.headers.cookie || "");
  if (m) return m[1];
  const id = randomBytes(12).toString("hex");
  res.setHeader("Set-Cookie", `vid=${id}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax; Secure`);
  return id;
}

function ipHash(req) {
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "";
  return createHash("sha256").update(ip + (process.env.ADMIN_TOKEN || "")).digest("hex").slice(0, 16);
}

// Fixed-window limit per IP and action.
export async function limited(req, action, max, seconds) {
  const k = `rl:${action}:${ipHash(req)}:${Math.floor(Date.now() / 1000 / seconds)}`;
  const n = await db.incr(k);
  if (n === 1) await db.expire(k, seconds);
  return n > max;
}

export const isAdmin = (req) => !!process.env.ADMIN_TOKEN && req.headers["x-admin-token"] === process.env.ADMIN_TOKEN;

export const clean = (s, max) => String(s ?? "").replace(/\s+\n/g, "\n").trim().slice(0, max);
