// GET: this visitor's own votes. Visitors without a vote cookie have none, so skip the database.
import { db } from "../lib/store.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  const m = /(?:^|;\s*)vid=([a-f0-9]{24})/.exec(req.headers.cookie || "");
  res.status(200).json(m ? (await db.hgetall(`voter:${m[1]}`)) || {} : {});
}
