import { leadByline } from "../../render.js";

export const wilkinsonTitle = "A dictionary for Agent 13";
export const wilkinsonDescription = "James Wilkinson was a U.S. Army officer who spied for Spain. A letter from 1792 gives us a way to look for the dictionary that he and Spanish officials used to hide words in their mail.";

const exhibit = "/leads/wilkinson-dictionary";
const reader = "https://receptionreader.com/d/1231000200?from=1785&amp;to=1800";
const transcription = "https://github.com/c2huc2hu/wilkinson/blob/437b5fcb59318db743fd0385e9114ba43dec309c";
const scan = (leaf) => "https://oma-sivu.2.rahtiapp.fi/image/1231000200" + String(leaf).padStart(4, "0") + "0";
const portrait = "https://collections.britishart.yale.edu/catalog/tms:19619";
const jayLetter = "https://oll-resources.s3.us-east-2.amazonaws.com/oll3/store/titles/2328/Jay_1530-02_EBk_v6.0.pdf#page=44";

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
    <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="/leads/wilkinson-dictionary-b">Read version B</a><a class="methodology-jump" href="#methodology">Methodology ↓</a></div>
    <header class="lead-hero">
      <p class="lead-label">The Mississippi River, 1792 · Espionage</p>
      <h1 class="page-title">${wilkinsonTitle}</h1>
      <div class="cipher-opening">
        <p class="lead-intro">In 1792 <a href="https://en.wikipedia.org/wiki/James_Wilkinson">James Wilkinson</a> was a U.S. Army officer and a paid spy for Spain. His Spanish contacts called him Agent 13. Kentucky farmers shipped their crops down the Mississippi River to New Orleans, a port Spain controlled. Wilkinson had even proposed <a href="https://www.nps.gov/sara/learn/historyculture/james-wilkinson.htm">bringing Kentucky itself under Spanish protection</a>.</p>
        <figure class="cipher-portrait">
          <a href="${portrait}" aria-label="View James Sharples’s portrait of Wilkinson at Yale"><img src="${exhibit}/wilkinson-sharples.webp" width="420" height="564" alt="Wilkinson with white hair, a blue officer’s coat and a silver epaulette."></a>
          <figcaption>General James Wilkinson. Undated pastel by James Sharples. <a href="${portrait}">Yale Center for British Art</a>.</figcaption>
        </figure>
        <p class="lead-intro">One letter in this secret correspondence came from <a href="https://www.nps.gov/articles/natchez.htm">Natchez</a>, then a Spanish-ruled town upriver from New Orleans in what is now Mississippi. To hide a word from anyone who might open the mail, the writer gave its place in a dictionary. A reader with the same edition could turn to page 163, count down to the 26th entry in the left column, and read <i>glorious</i>.</p>
        <p class="lead-intro">We know some of the words because someone wrote them in above the numbers. Other letters still have gaps. Could <a href="${scan(3)}">John Entick’s pocket dictionary</a> be the book that would let us fill them in?</p>
      </div>
    </header>
    ${leadByline([["Claude Opus 5.5", "Researched the dictionary printings and drafted this lead; reviewed by Benjamin Breen."]])}

    <div class="cipher-reader">
      <fieldset class="cipher-views"><legend>Inside Entick’s dictionary</legend>
        <input type="radio" name="cipher-view" id="show-positions" checked><label for="show-positions">Compare printings</label>
        <input type="radio" name="cipher-view" id="show-reader"><label for="show-reader">Explore the 1785 book</label>
        <div class="cipher-view reader-view">
          <p>Open Entick’s dictionary as a reader in 1785 would have seen it. Each dot marks a passage that also appears in another book. Select a dot to see the two pages side by side, or choose “Compare printings” to see how the words moved between editions.</p>
          <div class="cipher-map-window" tabindex="0" role="region" aria-label="Text-reuse map, scroll horizontally to see both books">
            <iframe src="${reader}" loading="lazy" title="Reception Reader’s interactive map of passages shared with Entick’s 1785 dictionary"></iframe>
          </div>
          <p class="cipher-credit"><a href="${reader}" target="_blank" rel="noopener">Open the full-size map ↗</a> · <a href="https://doi.org/10.5334/johd.101">Reception Reader, Rosson and colleagues</a> · <a href="${scan(3)}">1785 title page</a></p>
        </div>
        <div class="cipher-view positions-view">
          <p>The letter puts <i>glorious</i> and <i>glory</i> two entries apart in the left column of page 163. The line marks that page. Select a year to see where a London printer actually put the words.</p>
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
      <p>We know that people used Entick’s <i>New Spelling Dictionary</i> to send secrets. In 1781 the American diplomat <a href="${jayLetter}">John Jay warned a friend</a> that his mail would probably be opened. He told him exactly which dictionary to get for their letters, right down to the year on the title page. Jay had bought his own copy at a bookshop in Philadelphia.</p>
      <p>Did Wilkinson and his Spanish correspondents choose Entick too? They had a separate list of numbers for names and common words. It is the other words that let us test the dictionary. In their transcription of the Natchez letter, dated March 20, 1792, researchers give <code>163.[26]-</code> for <i>glorious</i>. The dash means the left column. Two entries farther down should be <i>glory</i>. Try that pair in the 1785 printing, then try a word from the end of the letter, <i>water</i>.</p>
      <p class="cipher-credit"><a href="${transcription}/wordbanks/wordbank#L207-L208">Transcribed codes for <i>glorious</i> and <i>glory</i></a> · <a href="https://aclanthology.org/2020.emnlp-main.471/">Chu, Valenti and Knight on how the letters were read</a></p>
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
        <p>On May 26, 1797, the Baron de Carondelet, Spain’s governor in Louisiana, issued an order. Its published English translation contains five words also found in the Natchez letter. The order reads <i>glorious, glory, expect, brilliant, fortune</i>. In the 1792 letter the five appear in exactly the reverse order. That comparison rests on the researchers’ transcription of manuscript pages 2880–2882. We have yet to check the sequence against images of the handwritten pages.</p>
        <p class="cipher-credit"><a href="https://dheller.org/Timeline-files/US-American-State-Papers/Miscellaneous-2/No-264-543.pdf#page=103">Carondelet to Thomas Power, enclosure 38, p. 103</a> · <a href="${transcription}/apply-wordbank#L235-L566">Readings in the order of the 1792 letter</a></p>
      </details>
    </section>

    <section class="lead-open">
      <h2>One page worth turning</h2>
      <p>The Huntington Library holds a copy of Entick which its catalogue dates to about 1784. It ends at page 470, well past all three places we need. We found the catalogue record but no public scan. A photograph of page 163 would answer the first question. If the two words land in the right places, turn to pages 7 and 422. If those match too, there are dozens of other known words to check before trying the book on a dispatch we still cannot read.</p>
      <p class="cipher-credit"><a href="https://www.huntington.org/collections/lib-480434">Huntington Library, rare book 480434</a> · <a href="/p/wilkinson-ciphers">The open problem of Wilkinson’s dispatches →</a></p>
    </section>
    <section class="lead-methodology" id="methodology" aria-labelledby="methodology-heading">
      <h2 id="methodology-heading"><a href="#methodology">Methodology <span aria-hidden="true">¶</span></a></h2>
      <p>We started with the <a href="${transcription}/apply-wordbank#L235-L566">researchers’ transcription of the Natchez letter</a>. It gives us five words to look for on three pages. We searched the machine-readable text of 81 dictionary scans for pairs of words the right number of pages apart. A word in a definition can look like a match in a text search. On the scanned page you can see whether it has an entry of its own.</p>
      <p>For five London printings of Entick, we found <i>glorious</i> and <i>glory</i> on the page and counted entries from the top of the column. None put both words where the letter says they belong. We also checked <i>advanced</i>, <i>advantageous</i> and <i>water</i> in the 1785 copy. Any future candidate has to put all five in place before we try it on an unread passage.</p>
    </section>
  </article>`;
}
