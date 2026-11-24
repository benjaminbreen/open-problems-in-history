import { notedPassages } from "./lib/lead-notes.js";
import { leadByline } from "./render.js";

export const dodoTitle = "The dodos in a ship’s journal";
export const dodoDescription = "In April 1615, Dutch sailors went ashore on Mauritius and brought dodos back to their ship. Three dated entries in their prose journal—and the search across 4.8 million pages of handwriting that found them—offer a practical guide to agentic archival research.";

const media = "/media/leads/dodo";
const blog = "https://resobscura.substack.com/p/using-opus-55-to-discover-a-new-eyewitness";
const dossier = "https://claude.ai/artifact/4nLg6iQE1154NEz1thp2MU";
const globalise = "https://globalise.huygens.knaw.nl/";
const chronology = "https://doi.org/10.3390/quat3010004";
const hume2006 = "https://doi.org/10.1080/08912960600639400";
const arrival = "https://archive.org/details/collectiondesouv02gran/page/208/mode/2up";
const archive = (inventory, scan) => `https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/${inventory}/file/NL-HaNA_1.04.02_${inventory}_${String(scan).padStart(4, "0")}`;

const extracts = [
  {
    id: "hunters", width: 1252, height: 262, date: "17 April 1615", title: "The hunters come back", inventory: 1059, scan: 277,
    alt: "Five lines of the ship’s journal. Dodeersen is near the right end of the fourth line.",
    dutch: "…ende sonden meede Jagers vuyt die sommighe schiltpadden &amp; <mark>dodeersen</mark> aen boort brochten",
    english: "…and also sent hunters out, who brought some tortoises and <mark>dodos</mark> aboard.",
    context: "The ship had sent its boat with a letter to the Walcheren and the Engel. The writer gives the hunters’ return a single clause at the end of the day’s entry. Although machine transcription dropped an e to read “dodersen,” the manuscript clearly has the same double-e secretary-hand loops (“dodeersen”) used throughout the journal.",
    word: [72, 51, 15, 29],
  },
  {
    id: "water", width: 1246, height: 152, date: "21 April 1615", title: "A second catch", inventory: 1059, scan: 277,
    alt: "Two lines beginning Den 21 dito. Dodeersen begins the second line.",
    dutch: "Den 21 dito wederom water gehaelt ende veel schilt padden / <mark>dodeersen</mark> ende sommighe gansen &amp; papegayen geuangen",
    english: "On the 21st, fetched water again and caught many tortoises, <mark>dodos</mark>, and some geese and parrots.",
    context: "Because there is no “ende” (“and”) between “schilt padden” and “dodeersen,” it is grammatically open whether “veel” (“many”) applies to the dodos as well as the tortoises.",
    word: [3, 39, 17, 39],
  },
  {
    id: "provisions", width: 1210, height: 240, date: "30 April 1615", title: "Departure summary", inventory: 1059, scan: 278,
    alt: "A detail of the following page. Dodeersen appears near the right margin above the line listing tortoises.",
    dutch: "Wy hebben al hier opde Molucksche Ree leggende goede ververssinge gecregen, soe van <mark>dodeersen</mark>, landt ende water schiltpadden met meenichte",
    english: "Lying here at the Moluccan Roadstead, we obtained good fresh provisions, including <mark>dodos</mark> and plentiful land tortoises and sea turtles.",
    context: "As the ship prepares to sail, the writer sums up what the crew obtained at the anchorage (and notes releasing a sheep and fat-tailed ram brought from Madagascar). Because this third mention looks back over the whole stay, counting it as another hunt would double-count the evidence.",
    word: [72, 31, 17, 27],
  },
  {
    id: "verse", width: 635, height: 295, date: "The same voyage", title: "The dodo in a sailor’s verse", inventory: 1059, scan: 51,
    alt: "Stanza 200 of the rhymed account. Dodeersen begins the fourth line of verse.",
    dutch: "<mark>dodeersen</mark> en patrysen<br>gansen weert om te prijsen<br>en schiltpadden daer syn",
    english: "There are <mark>dodos</mark> and partridges,<br>geese worth praising,<br>and tortoises there.",
    context: "Johan Both Volkertsz put the voyage into rhyme, drawing on the prose journal. His poem has been known to literary historians since 1850 and was edited in 1971—so the voyage itself was not unknown, only absent from specialist dodo chronologies. Here too, the ink reads “dodeersen” (compare “weert” directly below it).",
    word: [4, 49, 33, 20],
  },
  {
    id: "rail", width: 949, height: 180, date: "November 1638", title: "A “field-hen” hidden in translation", inventory: 1128, scan: 360,
    alt: "An underlined list of animals. Velthoenderen follows the word for geese.",
    dutch: "koebeesten gansz <mark>velthoenderen</mark> eenden duijven",
    english: "Cattle, geese, <mark>field-hens</mark>, ducks, pigeons.",
    context: "In a December 1638 letter describing a circuit of Mauritius the previous month, Dutch commander Cornelis Gooyer listed “velthoenderen.” Roland Bonaparte’s 1890 French edition translated that word as “partridges” (“perdrix”), hiding a probable red-rail sighting inside a twenty-year period modern chronologies describe as empty. Without an anatomical description, the identification stays probable rather than certain.",
    word: [31, 46, 24, 23],
  },
];

function manuscriptReader() {
  const rows = extracts.map((entry, index) => {
    const [x, y, width, height] = entry.word;
    return `<details name="journal-passages" class="dodo-entry" id="entry-${entry.id}"${index === 0 ? " open" : ""}>
      <summary><span>${entry.date}</span><strong>${entry.title}</strong></summary>
      <div class="dodo-sheet">
        <figure><a class="dodo-facsimile" href="${media}/scan-${entry.scan}.webp" aria-label="Enlarge the full manuscript page for ${entry.title}">
          <img src="${media}/${entry.id}.webp" width="${entry.width}" height="${entry.height}" alt="${entry.alt}" loading="lazy">
          <span class="dodo-outline" aria-hidden="true" style="left:${x}%;top:${y}%;width:${width}%;height:${height}%"></span>
        </a><figcaption>Nationaal Archief · VOC ${entry.inventory}, scan ${entry.scan} · <a href="${archive(entry.inventory, entry.scan)}">Open archive viewer ↗</a></figcaption></figure>
        <div class="dodo-reading"><p class="dodo-english" lang="en">“${entry.english}”</p><p class="dodo-dutch" lang="nl">“${entry.dutch}”</p></div>
        <p class="dodo-context">${entry.context}</p>
      </div></details>`;
  }).join("");
  return `<section class="dodo-reader" aria-labelledby="reader-title" id="reader">
    <h3 id="reader-title">Read the manuscripts</h3>
    <p>Open an entry to inspect the handwriting. Switch languages to compare the excerpt, highlight the bird’s name on the scan, or select any crop to enlarge the full page.</p>
    <div class="dodo-controls"><fieldset><legend>Text beside the manuscript</legend>
      <label><input type="radio" name="reading-language" value="en" checked><span>English translation</span></label>
      <label><input type="radio" name="reading-language" value="nl"><span>Dutch transcription</span></label>
    </fieldset><label class="dodo-locate"><input type="checkbox" id="locate-word"> Show the bird’s name on the scan</label></div>
    ${rows}
  </section>`;
}

function retrievalTable() {
  return `<div class="dodo-table-wrap">
    <table class="dodo-table">
      <caption>Lexical search vs. semantic embeddings on the same VOC archive</caption>
      <thead>
        <tr>
          <th scope="col">Method</th>
          <th scope="col">Corpus slice</th>
          <th scope="col">What it found</th>
          <th scope="col">What it missed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Whole-corpus FTS5 lexical + fuzzy sweep</strong><br>Exact + edit distance ≤ 2 for period spellings (<code>dodaers</code>, <code>dodeersen</code>, <code>dodersen</code>, <code>walgvogel</code>)</td>
          <td>All 4.79M GLOBALISE pages (~1 min, $0)</td>
          <td><strong>Found the 1615 <i>Wapen van Amsterdam</i> entries immediately</strong>, plus every known VOC dodo record (1629, 1647, 1669, 1674).</td>
          <td>Passages describing an animal without using a standard name, or masked behind synonyms and translations.</td>
        </tr>
        <tr>
          <td><strong>Semantic embedding search</strong><br><code>text-embedding-3-large</code>, 16 descriptive queries written without quoting sources</td>
          <td>17,513 post-1638 Mauritius pages ($1.65) &amp; 7,895 pre-1640 pages ($0.83)</td>
          <td>Ranked Pretorius’s held-out 1669 report <strong>#1 on 13 of 16 queries</strong>; surfaced Gooyer’s 1638 <i>velthoenderen</i> and tortoise-exploitation registers.</td>
          <td>Ranked the 1615 prose pages <strong>163rd and 171st</strong> of 273; <strong>missed the known 1629 Nassau dodo page completely</strong>; ranked the known 1647 Japan cargo line (“1 dodeers”) <strong>2,293rd of 7,415</strong> in a gift-list pass.</td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

export function dodoHTML() {
  const passages = [
    {
      id: "why-test",
      body: ref => `<h2>Why this case is a good test of agentic archival research</h2>
      <p>Most historical questions make poor tests for AI research agents: either generations of specialists have already combed every surviving page, or the evidence is too thin to tell whether a new find changes anything. Extinct-species records sit in a productive middle ground. The written eyewitness history of the dodo (<i>Raphus cucullatus</i>) on Mauritius comes down to only a few dozen dated accounts between 1598 and the late seventeenth century, and standard specialist chronologies note a quiet interval in Dutch records after 1611, jumping straight to a 1616 Portuguese Jesuit report and a 1617 Dutch drawing.${ref}</p>
      <p>Meanwhile, the <a href="${globalise}">GLOBALISE</a> project released bulk Handwritten Text Recognition (HTR) transcriptions covering 4,786,033 page scans from the Dutch East India Company (VOC) <i>Overgekomen Brieven en Papieren</i> series at the Nationaal Archief in The Hague. Pairing a scarce, well-catalogued scholarly baseline with a newly searchable manuscript archive turned this search into a clear test of what AI agents actually do well in archives—and where they break.</p>`,
      note: `Major specialist dodo works checked: Julian P. Hume, “The history of the Dodo <i>Raphus cucullatus</i> and the penguin of Mauritius,” <a href="${hume2006}"><i>Historical Biology</i> 18 (2006)</a>; Anthony Cheke and Julian P. Hume, <i>Lost Land of the Dodo</i> (2008); Jolyon C. Parish, <i>The Dodo and the Solitaire: A Natural History</i> (2013); and Anthony Cheke and Jolyon C. Parish, “The Dodo and the Red Hen, a Confusing Tale,” <a href="${chronology}"><i>Quaternary</i> 3(1):4 (2020), Table A1</a>. For the initial account of this search, see Benjamin Breen’s <a href="${blog}">Res Obscura post</a> and the <a href="${dossier}">original Claude research dossier</a>.`,
    },
    {
      id: "journal",
      body: ref => `<h2 id="findings">What turned up in the manuscripts</h2>
      <p>In April 1615, the VOC ship <i>’t Wapen van Amsterdam</i> anchored at Mauritius (<i>Molucksche Ree</i>), where its crew learned of the recent wrecks of the <i>Banda</i> and <i>Provintia</i> and the drowning of Governor-General Pieter Both. The ship’s official prose journal—kept by Isbrant Cornelisz van Petten—mentions dodos three times across two facing pages: hunters returning with tortoises and dodos on 17 April, a second catch alongside water, geese and parrots on 21 April, and a departure summary on 30 April looking back over the provisions gathered at the anchorage.${ref}</p>
      <p>A rhymed account of the same voyage by Johan Both Volkertsz (<i>Cort verhaell</i>), which drew on the prose journal, has been known to literary historians since 1850 and in print since 1971. So this is not a claim that the voyage itself was unknown. What was overlooked by all four specialist dodo chronologies are the dated eyewitness entries in the prose journal, which fill the 1611–1616 gap. They sit mid-sequence and do not move the dodo’s extinction date; their value is tightening a sparse baseline and showing what a systematic sweep can recover.</p>`,
      note: `Nationaal Archief, <code>NL-HaNA 1.04.02</code>, <a href="${archive(1059, 277)}">VOC 1059, fol. 141r (scan 277)</a> and <a href="${archive(1059, 278)}">fol. 141v (scan 278)</a>; journal endorsement on <a href="${archive(1059, 300)}">scan 300</a>. The rhymed version appears on <a href="${archive(1059, 51)}">scan 51 (stanza 200)</a>, edited by L. M. Akveld and J. P. Houterman (MNVZ, 1971). Direct inspection of all four scans shows the writer consistently wrote <i>dodeersen</i> with a double <i>e</i>—correcting earlier machine-transcription readings of <i>dodersen</i>.`,
    },
    {
      id: "field-hen",
      body: ref => `<p>The same investigation surfaced a second, subtler kind of find: a December 1638 letter from Cornelis Gooyer, the first Dutch commander on Mauritius, listing <i>velthoenderen</i> (“field-hens”) among the wildlife he saw while sailing around the island in November. Roland Bonaparte’s 1890 French edition translated that word as <i>perdrix</i> (“partridges”). Modern chronologies citing Bonaparte describe 1638–58 as a faunal blank mentioning only introduced livestock, even though those same tables treat Dutch <i>velthoenders</i> in 1629 and c. 1632 as the extinct red rail (<i>Aphanapteryx bonasia</i>). Gooyer gives no description of the bird, so the identification remains probable rather than proved—yet reading the manuscript recovered a clue a single translated word had obscured.${ref}</p>`,
      note: `Compare Gooyer’s letter, <a href="${archive(1128, 360)}">VOC 1128, fols. 251–252 (scan 360)</a>, with Roland Bonaparte, <i>Le premier établissement des Néerlandais à Maurice</i> (1890), pp. 39–40, and <a href="${chronology}">Cheke &amp; Parish (2020)</a> on Mauritian bird names.`,
    },
    { wide: true, body: manuscriptReader },
    {
      id: "methodology-intro",
      body: ref => `<h2 id="methodology">How the search actually worked</h2>
      <p>Most accounts of AI-assisted research make the pipeline sound smoother than it is. In practice, <strong>the semantic embedding search we built first did not surface the 1615 dodo entries</strong>, and <strong>an automated LLM reader hallucinated a dodo quote that did not exist</strong>. What worked only became clear by testing each stage against known records already inside the archive.${ref}</p>
      <h3>1. Match the search method to how facts sit on the page</h3>
      <p>Agents often default to semantic embeddings (“search by meaning”) because they feel more sophisticated than keyword queries. Running both head-to-head on the same VOC corpus exposed a sharp division of labor: lexical and fuzzy search caught brief, one-word log mentions immediately, while semantic embeddings shone on longer narrative descriptions and translation-masked references.</p>`,
      note: `Known VOC recall controls inside GLOBALISE: Le Febvre / <i>Nassau</i> 1629 (<a href="${archive(1095, 922)}">VOC 1095, scan 922</a>), 1647 Japan dodo (<a href="${archive(1164, 738)}">VOC 1164, scan 738</a>; <a href="${archive(1165, 143)}">VOC 1165, scan 143</a>), Pretorius 1669 (<a href="${archive(4005, 603)}">VOC 4005, scan 603</a>) and Hugo 1674 (<a href="${archive(4011, 411)}">VOC 4011, scan 411</a>). Other pages cited below: hallucinated gift-screen hit (<a href="${archive(1053, 430)}">VOC 1053, scan 430</a>), 1683 <i>Europa</i> goose supply list (<a href="${archive(4019, 170)}">VOC 4019, scan 170</a>), and the 1616 Goa arrival date corrected from OCR “1&quot;” to Saturday 17 September in <a href="${arrival}">Grandidier II, p. 208</a>.`,
    },
    { wide: true, body: retrievalTable },
    {
      id: "lessons",
      body: () => `<h3>2. Plant held-out positive controls before trusting a sweep</h3>
      <p>Before reading new hits, choose two or three known records already inside the corpus and keep their wording out of your prompts. When Pretorius’s 1669 report ranked first on 13 of 16 queries without being quoted, we knew the narrative embedding pass had real recall. When the known 1647 Japan cargo line (“1 dodeers”) ranked 2,293rd in a gift-list embedding pass, that failed control immediately told us embeddings were blind to archaic single-word cargo entries—saving us from falsely declaring “no dodos in VOC gift lists” until we switched to lexical windows.</p>
      <h3>3. Automate quote verification—and then still look at the ink</h3>
      <p>Two distinct kinds of error surfaced, and each needs its own check. First, <strong>LLM readers fabricate</strong>: when a fast model (<code>gpt-5.4-mini</code>) screened 8,287 gift-and-cargo windows, only 460 of 914 flagged items contained quotes actually present in the source text, and on VOC 1053 (scan 430) the model flatly invented a “1 dodeers” quotation. Every agent-extracted quote must pass a programmatic exact-substring check against the stored text before a human ever reviews it.</p>
      <p>Second, <strong>HTR and OCR still drift even when quotes match the text</strong>. Substring verification proves only that a quote matches the machine transcription, not the ink. Inspecting the actual VOC 1059 scans caught that the machine text dropped an <i>e</i> on 17 April and in Stanza 200—an artifact an earlier AI draft had turned into an invented note about spelling variation. Looking at the original scans also caught HTR reading 1683 as 1688 on a Mauritius supply list and Internet Archive OCR turning “17 septembre 1616” into “1&quot;” in a Portuguese arrival account (verified against the Gregorian weekday, Saturday).</p>
      <h3>4. Check specialist print monographs, not just web search</h3>
      <p>During the wider sweep, an agent flagged Nicolaes van Wassenaer’s 1625 printed mention of “Dodeersen” as possibly new because web searches did not link it to dodo bibliographies. Checking Jolyon Parish’s 2013 print monograph showed it was already quoted in full. Web indexes, OpenAlex and Wikipedia miss large stretches of book-length scholarship, non-English editions and specialist catalogues; treat them as a first filter, never proof of novelty.</p>
      <h3>5. Separate corpus boundaries from absence—and know when to stop</h3>
      <p>A follow-up sweep read 815 filtered late-Mauritius pages (1655–1702) in GLOBALISE and found no new dodo or red-rail entries. That closes GLOBALISE cleanly while preserving an explicit boundary: the decisive 1685–88 Lamotius hunting journals survive in the Cape Archives (C 2238–2240), not in the Amsterdam and Zeeland copies digitized here. (The same sweep turned up a scan-verified 1683 supply list recording 605 unpriced wild geese fifteen years before the last recorded sighting of the extinct Mauritius sheldgoose.)</p>
      <p>Just as important is knowing when to park an unpromising thread. After the 1615 find, agents spent ten follow-up passes trying to trace which live bird inspired the famous St. Petersburg dodo miniature attributed to the Mughal painter Ustad Mansur—checking 1616 Portuguese Goa voyages, 1617–18 Dutch embassies, 939 freshly OCR’d pages of Persian chronicles, Surat gift consignments and a Dutch painter’s 1625 cassowary mission. Those runs produced genuine archival plumbing (shelfmarks, corrected dates, a named Mughal painting pupil), yet zero documents connecting a dodo to the painting. Compatible context can accumulate indefinitely without narrowing a hypothesis; the right move was to separate the verified 1615 journal find from the unproven Mughal route and park the painting question as a brief <a href="/leads/mughal-dodo">research stub</a> until a bird-specific transfer or conservation record appears.</p>`,
    },
    {
      id: "checklist",
      body: () => `<h2 id="checklist">A repeatable checklist for future agentic archive sweeps</h2>
      <p>The same workflow has since been reused on VOC earthquake and tsunami records (including the <a href="/leads/buru-tsunami">1738 Buru tsunami</a>), seventeenth-century VOC smallpox and cannabis ordinances, and the Dutch West India Company Atlantic corpus:</p>
      <ol class="dodo-checklist">
        <li><strong>Define the baseline and pick held-out controls first.</strong> Identify the 2–4 specialist monographs or catalogues that define what is already known, and choose 2–3 records inside the corpus to serve as blind recall checks.</li>
        <li><strong>Run lexical and semantic passes as complements.</strong> Index locally with FTS5 for exact and fuzzy period-spelling sweeps (essential for logs, lists and archaic orthography); reserve semantic embeddings for narrative passages where concepts appear without standard keywords.</li>
        <li><strong>Measure recall on your controls before trusting a null.</strong> If a known record ranks low or disappears, diagnose why before drawing historical conclusions from empty results.</li>
        <li><strong>Gate every LLM-screened batch with programmatic quote checks.</strong> Automatically discard any extracted quotation that is not a verbatim substring of the underlying text buffer.</li>
        <li><strong>Inspect original page images for every surviving candidate.</strong> Verify spellings, numerals, dates (with folio and weekday checks), and whether a passage is an independent eyewitness entry or a later summary or copy.</li>
        <li><strong>Check print prior art and enforce a stopping rule.</strong> Compare survivors against canonical print editions, state what the corpus cannot observe, and park any line where compatible context grows faster than discriminating evidence—a lesson paired with our cautionary tale <a href="/cautionary-tales/one-year-off">One year off</a>.</li>
      </ol>
      <p class="dodo-next-links"><a href="/leads/mughal-dodo">Related stub: How did a dodo become the subject of a Mughal painting? →</a></p>`,
    },
  ];
  return `<article class="leads-page dodo-lead">
    <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">How the agents investigated ↓</a></div>
    <header class="dodo-mast"><div><p class="lead-label">Mauritius, 1615 &amp; 1638 · Natural history &amp; archival method</p><h1 class="page-title">${dodoTitle}</h1>
      <p class="dodo-deck">${dodoDescription}</p></div>
      <figure><a href="${media}/scan-277.webp" aria-label="Enlarge folio 141r of the ship’s journal"><img src="${media}/scan-277.webp" width="2000" height="2642" alt="Folio 141 recto of the handwritten prose journal of ’t Wapen van Amsterdam, April 1615, under Mauritius."></a><figcaption>Folio 141r of the prose journal of <i>’t Wapen van Amsterdam</i>, April 1615. <a href="${archive(1059, 277)}">VOC 1059, scan 277 ↗</a></figcaption></figure></header>
    ${leadByline(
      [["Claude Opus 5.5", "Researched the VOC archive and drafted this lead; reviewed by Benjamin Breen."]],
      `<a href="#reader">Read the ship’s journal ↓</a>`
    )}
    ${notedPassages(passages)}</article>`;
}
