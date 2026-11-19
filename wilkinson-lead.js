export const wilkinsonTitle = "A dictionary for Agent 13";
export const wilkinsonDescription = "A coded letter from Natchez tells us where to look for two words. Can their positions identify the dictionary James Wilkinson and his Spanish correspondents used?";

const exhibit = "/leads/wilkinson-dictionary";
const reader = "https://receptionreader.com/d/1231000200?from=1785&amp;to=1800";
const transcription = "https://github.com/c2huc2hu/wilkinson/blob/437b5fcb59318db743fd0385e9114ba43dec309c";
const scan = (leaf) => "https://oma-sivu.2.rahtiapp.fi/image/1231000200" + String(leaf).padStart(4, "0") + "0";

const printings = [
  { label: "Cipher", page: 163, column: "left", rows: "26, 28" },
  { label: "1774", page: 178, column: "left", rows: "21, 23", url: "https://oma-sivu.2.rahtiapp.fi/image/126310040001790" },
  { label: "1782", page: 158, column: "right", rows: "31, 33", url: "https://oma-sivu.2.rahtiapp.fi/image/149790040001860" },
  { label: "1783", page: 158, column: "right", rows: "31, 33", url: "https://books.google.com/books?id=jVxgAAAAcAAJ&amp;pg=PA158" },
  { label: "1785", page: 167, column: "right", rows: "3, 5", url: scan(206) },
  { label: "1786", page: 167, column: "right", rows: "3, 5", url: "https://books.google.com/books?id=RoJgAAAAcAAJ&amp;pg=PA167" },
];

function positionsHTML() {
  return printings.map(({ label, page, column, rows, url }) => `<div class="cipher-chart-row ${url ? "" : "cipher-target"}">
    ${url ? `<a href="${url}" aria-label="See the ${label} London printing, page ${page}">${label}</a>` : "<b>Cipher</b>"}
    <span class="cipher-track" aria-hidden="true"><i class="cipher-mark" style="--position:${(page - 155) * 4}%"></i></span>
    <span>p. ${page} · ${column} · ${rows}</span></div>`).join("");
}

const comparisons = [
  {
    id: "glory", label: "Glorious &amp; glory",
    expected: "Page 163, left column, entries 26 and 28",
    observed: "Page 167, right column, entries 3 and 5",
    image: "glory", width: 667, height: 281, leaf: 206, page: 167,
    alt: "Top of the right column of page 167. After Glorification and Glorify come Glorious, Gloriously, and Glory.",
    note: 'Count down from <i>Glorification</i>. The word in between is just what we hoped to find. The trouble is that the letter sends its reader four pages back, to the other column. The actual <a href="' + scan(202) + '">page 163</a> runs from <i>Gantlet</i> to <i>Gazetteer</i>.',
  },
  {
    id: "advance", label: "Advanced &amp; advantageous",
    expected: "Page 7, right column, entries 20 and 26",
    observed: "Advanced ends page 7. Advantageous is entry 6 on page 8, left.",
    image: "advantageous", width: 630, height: 325, leaf: 47, page: 8,
    alt: "Top of page 8. The left column begins with Advancement. Advantageous is its sixth entry.",
    note: '<i>Advanced</i> is the last headword on <a href="' + scan(46) + '">page 7</a>. Turn the page and count six entries. The words are the right distance apart, but they fall on opposite sides of a page turn. Renumbering the pages would still leave them there.',
  },
  {
    id: "water", label: "Water",
    expected: "Page 422, right column, entry 14",
    observed: "Page 429, left column, entry 11",
    image: "water", width: 630, height: 243, leaf: 468, page: 429,
    alt: "Detail of the left column of page 429. Water, a noun, follows Watchword. The verb Water appears on the line below its definition.",
    note: 'Near the end of the letter someone is to be sent “by land or by water.” That gives us a noun to look up. The 1785 printer put it just below <i>Watchword</i>. On <a href="' + scan(461) + '">page 422</a> both columns are still in U.',
  },
];

function plate(test, index) {
  return `<details class="cipher-test" name="cipher-tests"${index === 0 ? " open" : ""}>
    <summary>${test.label}</summary>
    <div class="cipher-comparison">
      <dl><dt>Where the letter points</dt><dd>${test.expected}</dd>
      <dt>London, 1785</dt><dd>${test.observed}</dd></dl>
      <figure><a href="${scan(test.leaf)}" aria-label="Open the full scan of page ${test.page}"><img src="${exhibit}/${test.image}.webp" width="${test.width}" height="${test.height}" alt="${test.alt}" loading="lazy"></a>
      <figcaption><a href="${scan(test.leaf)}">Entick, p. ${test.page} · full page ↗</a></figcaption></figure>
    </div><p class="cipher-note">${test.note}</p>
  </details>`;
}

export function wilkinsonHTML() {
  return `<article class="leads-page cipher-lead">
    <a class="back" href="/leads">← All leads</a>
    <header class="lead-hero">
      <p class="lead-label">Natchez, 1792 · Dictionary cipher</p>
      <h1 class="page-title">${wilkinsonTitle}</h1>
      <p class="lead-intro">Somewhere in an English dictionary, <i>glorious</i> is the twenty-sixth entry in the left column of page 163. Two entries down comes <i>glory</i>. Which book puts them there?</p>
    </header>

    <div class="cipher-reader">
      <fieldset class="cipher-views"><legend>Inside Entick’s dictionary</legend>
        <input type="radio" name="cipher-view" id="show-positions" checked><label for="show-positions">Compare printings</label>
        <input type="radio" name="cipher-view" id="show-reader"><label for="show-reader">Text-reuse map</label>
        <div class="cipher-view reader-view">
          <p>Each dot marks a passage that the 1785 dictionary shares with another book. Select a dot to see the two pages side by side.</p>
          <div class="cipher-map-window" tabindex="0" role="region" aria-label="Text-reuse map, scroll horizontally to see both books">
            <iframe src="${reader}" loading="lazy" title="Reception Reader’s interactive map of passages shared with Entick’s 1785 dictionary"></iframe>
          </div>
          <p class="cipher-credit"><a href="${reader}" target="_blank" rel="noopener">Open the full-size map ↗</a> · <a href="https://doi.org/10.5334/johd.101">Reception Reader, Rosson and colleagues</a> · <a href="${scan(3)}">1785 title page</a></p>
        </div>
        <div class="cipher-view positions-view">
          <p>Where do <i>glorious</i> and <i>glory</i> fall in five London printings? The line marks page 163. Select a year to read the two entries on the printed page.</p>
          <div class="cipher-chart" role="group" aria-label="Page, column and entries for glorious and glory">
            <div aria-hidden="true" class="cipher-chart-row cipher-axis"><span>London</span><span>p. 155 <i>180</i></span><span>Page · column · entries</span></div>
            ${positionsHTML()}
          </div>
        </div>
      </fieldset>
      <script>if (window.matchMedia("(min-width: 700px)").matches) document.getElementById("show-reader").checked = true;</script>
    </div>

    <section class="lead-evidence" aria-labelledby="cipher-heading">
      <h2 id="cipher-heading">Try the letter against the book</h2>
      <p>James Wilkinson, an American army officer in the pay of Spain, exchanged coded letters with Spanish officials in Louisiana. His correspondents needed two things on their desks. A table gave numbers for names and common words. For other words they could give an address in a dictionary. Two people with the same book could look up a word without ever writing it in the letter.</p>
      <p>Some of the letters survive with decipherments. In one dated March 20, 1792, at Natchez, the researchers’ transcription gives <code>163.[26]-</code> for <i>glorious</i>. The dash means the left column. Count down to the twenty-sixth headword. John Entick’s <i>New Spelling Dictionary</i>, a pocket book that generally fitted each definition on one line, makes a plausible candidate. Here is what happens when you try it.</p>
      <p class="cipher-credit"><a href="${transcription}/wordbanks/wordbank#L207-L208">Researchers’ word list</a> · <a href="https://aclanthology.org/2020.emnlp-main.471/">Chu, Valenti and Knight’s account of the cipher</a></p>
      <div class="cipher-tests">${comparisons.map(plate).join("")}</div>
    </section>

    <section class="lead-evidence" aria-labelledby="editions-heading">
      <h2 id="editions-heading">What a printer could change</h2>
      <p>In London in 1774, a reader could find <i>glorious</i> and <i>glory</i> in the left column, with <i>gloriously</i> between them. They sat at entries 21 and 23 on page 178. By 1782 the same three words appeared on page 158, on the right. The 1785 and 1786 printings agree on page 167, right down to the line. Even if we find the layout Wilkinson’s correspondents knew, the words alone may never tell us the year on their title page.</p>
      <p class="cipher-credit"><a href="https://oma-sivu.2.rahtiapp.fi/image/126310040001790">London 1774, p. 178</a> · <a href="https://oma-sivu.2.rahtiapp.fi/image/149790040001860">London 1782, p. 158</a> · <a href="https://books.google.com/books?id=RoJgAAAAcAAJ&amp;pg=PA167">London 1786, p. 167</a></p>
      <details class="lead-method"><summary>How did we search the other dictionaries?</summary>
        <p>We searched machine-readable text from 81 scans catalogued before 1792. Pages 7 and 163 are 156 pages apart in any complete copy, however many leaves of preface the binder put at the front. None of the scans yielded both pairs at that distance. Widening the search by two pages produced one tempting result. In John Marchant’s dictionary, <i>advantageous</i> helps define <i>conducible</i>, and <i>advanced</i> occurs in the definition of <i>confirmation</i>. Both hits are on a page headed CON. Old type also defeats text recognition, so a failed search can overlook a good candidate. Counting down the printed column is the decisive test.</p>
        <p class="cipher-credit"><a href="https://archive.org/details/bim_eighteenth-century_a-new-complete-english-d_marchant-john-gent_1760/page/n225/mode/1up">See the Marchant page, 1760</a></p>
      </details>
      <details class="lead-method"><summary>Were the words borrowed from another letter?</summary>
        <p>In an order of May 26, 1797, the Baron de Carondelet used five words also found in the Natchez letter. The published English translation has <i>glorious, glory, expect, brilliant, fortune</i>, in that order. In the researchers’ readings for the 1792 letter the five run in exactly the reverse order. They give us separate passages to investigate. The comparison rests on the transcription of manuscript pages 2880–2882. We have yet to check those pages in facsimile.</p>
        <p class="cipher-credit"><a href="https://dheller.org/Timeline-files/US-American-State-Papers/Miscellaneous-2/No-264-543.pdf#page=103">Carondelet to Thomas Power, enclosure 38, p. 103</a> · <a href="${transcription}/apply-wordbank#L235-L566">Readings in the order of the 1792 letter</a></p>
      </details>
    </section>

    <section class="lead-open">
      <h2>One page worth turning</h2>
      <p>The Huntington Library holds a copy of Entick which its catalogue dates to about 1784. It ends at page 470, well past all three places we need. We found the catalogue record but no public scan. A photograph of page 163 would answer the first question. If the two words land in the right places, turn to pages 7 and 422. If those match too, there are dozens of other known words to check before trying the book on a dispatch we still cannot read.</p>
      <p class="cipher-credit"><a href="https://www.huntington.org/collections/lib-480434">Huntington Library, rare book 480434</a> · <a href="/p/wilkinson-ciphers">The open problem of Wilkinson’s dispatches →</a></p>
    </section>
  </article>`;
}
