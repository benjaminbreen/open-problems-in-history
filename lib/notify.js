// Optional push notification via ntfy.sh. Set NTFY_TOPIC to a long random string and
// subscribe to that topic in the ntfy app. Does nothing if NTFY_TOPIC is unset.
export async function notify(title, body) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  try {
    await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: { Title: title.replace(/[^\x20-\x7e]/g, "?").slice(0, 120), Click: "https://historyproblems.com/admin" },
      body: body.slice(0, 500),
    });
  } catch {}
}
