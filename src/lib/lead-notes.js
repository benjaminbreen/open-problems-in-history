// The notes follow the article in reading order. On wide screens each note
// shares a grid row with the passage that cites it.
export function notedPassages(passages) {
  const notes = [];
  const contents = passages.map(({ id, body, note, wide = false }, index) => {
    const row = index + 1;
    let reference = "";
    if (note) {
      const number = notes.length + 1;
      reference = `<sup class="lead-noteref"><a id="ref-${id}" href="#note-${id}" role="doc-noteref" aria-label="Footnote ${number}">${number}</a></sup>`;
      notes.push(`<li id="note-${id}" tabindex="-1" style="--note-row: ${row}">
        <a class="lead-note-number" href="#ref-${id}" aria-label="Return to reference ${number}">${number}</a>
        <div>${note}</div>
      </li>`);
    }
    return `<div class="lead-passage${wide ? " lead-passage-wide" : ""}" style="--note-row: ${row}">${body(reference)}</div>`;
  });
  return `<div class="lead-noted">${contents.join("\n")}
    <section class="lead-notes" role="doc-endnotes" aria-labelledby="source-notes">
      <h2 id="source-notes">Notes and sources</h2>
      <ol>${notes.join("\n")}</ol>
    </section>
  </div><script type="module" src="/leads/notes.js"></script>`;
}
