import { notedPassages } from "./lib/lead-notes.js";

export const dodoTitle = "The dodos in a ship’s journal";
export const dodoDescription = "In April 1615, Dutch sailors went ashore on Mauritius and brought dodos back to their ship. Two entries in their journal fill a gap in the short written history of this extinct, flightless bird.";

const media = "/media/leads/dodo";
const blog = "https://resobscura.substack.com/p/using-opus-55-to-discover-a-new-eyewitness";
const dossier = "https://claude.ai/artifact/4nLg6iQE1154NEz1thp2MU";
const globalise = "https://globalise.huygens.knaw.nl/";
const catalogue = "https://www.orientalstudies.ru/eng/images/pdf/st.petersburg_muraqqa_1996.pdf";
const chronology = "https://doi.org/10.3390/quat3010004";
const mundy = "https://archive.org/details/travelsofpetermu02mund/page/318/mode/2up";
const almeida = "https://archive.org/details/collectiondesouv02gran/page/117/mode/2up";
const arrival = "https://archive.org/details/collectiondesouv02gran/page/208/mode/2up";
const archive = (inventory, scan) => `https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/${inventory}/file/NL-HaNA_1.04.02_${inventory}_${String(scan).padStart(4, "0")}`;

const extracts = [
  {
    id: "hunters", width: 1252, height: 262, date: "17 April 1615", title: "The hunters come back", inventory: 1059, scan: 277,
    alt: "Five lines of the ship’s journal. Dodersen is near the right end of the fourth line.",
    dutch: "Jagers vuyt die sommighe schiltpadden &amp; <mark>dodersen</mark> aen boort brochten",
    english: "Hunters went out and brought some tortoises and <mark>dodos</mark> aboard.",
    context: "The ship had sent its small boat to carry a letter to two other ships. The writer gives the hunters’ return just a few words at the end of the day’s entry.",
    word: [72, 51, 15, 29],
  },
  {
    id: "water", width: 1246, height: 152, date: "21 April 1615", title: "A second catch", inventory: 1059, scan: 277,
    alt: "Two lines beginning Den 21 dito. Dodeersen begins the second line.",
    dutch: "Den 21 dito wederom water gehaelt ende veel schiltpadden <mark>dodeersen</mark> ende sommighe gansen &amp; papegayen geuangen",
    english: "On the 21st, fetched water again and caught many tortoises, <mark>dodos</mark> and some geese and parrots.",
    context: "The writer uses a slightly different spelling here. “Many” clearly applies to the tortoises. The entry leaves the number of dodos open.",
    word: [3, 39, 17, 39],
  },
  {
    id: "provisions", width: 1210, height: 240, date: "30 April 1615", title: "What the island provided", inventory: 1059, scan: 278,
    alt: "A detail of the following page. Dodeersen appears near the right margin above the line listing tortoises.",
    dutch: "goede ververssinge gecregen, soe van <mark>dodeersen</mark>, landt ende water schiltpadden met meenichte",
    english: "Obtained fresh provisions, including <mark>dodos</mark> and plentiful land tortoises and sea turtles.",
    context: "As the ship prepares to leave, the writer sums up what the crew obtained at the anchorage. This third mention looks back over the stay. Counting it as another hunt would count the same evidence twice.",
    word: [72, 31, 17, 27],
  },
  {
    id: "verse", width: 635, height: 295, date: "The same voyage", title: "The dodo in a sailor’s verse", inventory: 1059, scan: 51,
    alt: "Stanza 200 of the rhymed account. Dodersen begins the fourth line of verse.",
    dutch: "<mark>dodersen</mark> en patrysen<br>gansen weert om te prijsen<br>en schiltpadden daer syn",
    english: "There are <mark>dodos</mark> and partridges,<br>geese worth praising,<br>and tortoises there.",
    context: "Johan Both Volkertsz put the voyage into rhyme. His poem drew on the ship’s journal and was published in a modern edition in 1971. It preserves the name in another form of writing about the same voyage.",
    word: [4, 49, 33, 20],
  },
  {
    id: "rail", width: 949, height: 180, date: "November 1638", title: "What was a “field-hen”?", inventory: 1128, scan: 360,
    alt: "An underlined list of animals. Velthoenderen follows the word for geese.",
    dutch: "koebeesten gansz <mark>velthoenderen</mark> eenden duijven",
    english: "Cattle, geese, <mark>field-hens</mark>, ducks, pigeons.",
    context: "In a December letter, the Dutch commander Cornelis Gooyer described sailing around Mauritius the previous month. A French edition in 1890 rendered “field-hens” as “partridges.” Other Dutch visitors used a similar word for the red rail, another flightless Mauritian bird that later died out. Gooyer gives too little detail for a certain identification.",
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
    <p>Open an entry to see the handwriting. Switch languages to compare the excerpt, or select the image to enlarge the whole page.</p>
    <div class="dodo-controls"><fieldset><legend>Text beside the manuscript</legend>
      <label><input type="radio" name="reading-language" value="en" checked><span>English translation</span></label>
      <label><input type="radio" name="reading-language" value="nl"><span>Dutch transcription</span></label>
    </fieldset><label class="dodo-locate"><input type="checkbox" id="locate-word"> Show the bird’s name on the scan</label></div>
    ${rows}
  </section>`;
}

const places = [
  { id: "mauritius", label: "Mauritius", heading: "A young bird caught on Mauritius", x: 43.1, y: 91.15,
    body: `In 1616 Manuel de Almeida, a Portuguese Jesuit priest, described catching what he called a young ostrich. The place and description have led historians to identify it as a dodo. Almeida leaves its fate open. <a href="${almeida}">Read the French edition, p. 117</a>.` },
  { id: "goa", label: "Goa", heading: "A ship returns to Goa", x: 71.6, y: 25.0,
    body: `After visiting Madagascar, one ship from Almeida’s expedition reached this port on India’s west coast on 17 September 1616. The arrival account names a Malagasy passenger presented to the Portuguese viceroy. Whether the bird boarded either ship or survived the journey is unknown. <a href="${arrival}">Read the arrival account, p. 208</a>.` },
  { id: "surat", label: "Surat", heading: "Two dodos at an English trading house", x: 69.9, y: 14.5,
    body: `English traveller Peter Mundy wrote, “I saw two of them in Suratt howse that were brought from thence.” He meant Mauritius. Mundy stayed in Surat in 1628–30 and again in 1633–34. He gives neither a date for the sighting nor the name of the person who brought the birds. <a href="${mundy}">Read Mundy’s account, pp. 318–19</a>.` },
];

function evidenceMap() {
  return `<section class="dodo-map" id="map" aria-labelledby="map-title"><h3 id="map-title">Where the records place the birds</h3>
    <p>Select a place to read its evidence. Each point belongs to a separate account.</p>
    <div class="dodo-atlas"><div class="dodo-geography" role="group" aria-label="Locations in the western Indian Ocean">
      <span class="sea" aria-hidden="true">Indian Ocean</span><span class="madagascar" aria-hidden="true">Madagascar</span><span class="india" aria-hidden="true">India</span>
      ${places.map(p => `<a href="#place-${p.id}" class="dodo-pin" style="left:${p.x}%;top:${p.y}%">${p.label}</a>`).join("")}
    </div><div class="dodo-places">${places.map(p => `<div class="dodo-place" id="place-${p.id}"><h4>${p.heading}</h4><p>${p.body}</p></div>`).join("")}</div></div>
    <p class="dodo-credit">Coastlines from <a href="https://www.naturalearthdata.com/">Natural Earth</a>.</p>
  </section>`;
}

export function dodoHTML() {
  const passages = [
    {
      id: "painting",
      body: ref => `<h2>The problem</h2><p>How did a painter in India know what a dodo looked like? The dodo was a large, flightless bird whose only wild home was Mauritius, an island east of Madagascar. It died out in the seventeenth century. Few people who saw one left a drawing. One of the most lifelike surviving pictures comes from India, thousands of miles away.</p>
      <p>The artist usually credited with the dodo is Mansur. He painted animals for Jahangir, the Mughal emperor who ruled much of South Asia from 1605 to 1627. The bird now appears among parrots and other birds on an album page. Someone assembled that page later from several pictures. Even the date specialists give the dodo itself, around 1615, is an estimate.${ref}</p>`,
      note: `See folio 80r, plate 147, in <a href="${catalogue}">the St. Petersburg album catalogue</a>, printed p. 98. Stuart Cary Welch attributes the dodo to Mansur and explains how the separate pictures were assembled. <a href="https://artsandculture.google.com/asset/a-page-of-birds-st-petersburg-muraqqa/hQHTqIc-rsbHOg">Explore the album page</a>.`,
    },
    {
      id: "search",
      body: ref => `<h2 id="methodology">How the search worked</h2><p>Dutch East India Company ships stopped at Mauritius for fresh water and food. Their officers kept journals of winds, repairs, letters and provisions. An entry about filling water casks could mention an animal in passing.</p>
      <p>Using GLOBALISE’s machine transcriptions, the agents searched for old spellings of the bird’s name and for passages about hunting or taking on provisions. Each method found things the other could miss. A search by meaning missed a known 1629 dodo reference buried on a page about crew changes. A spelling search recovered it. The agents then compared the promising words with the handwriting and the dates with published lists of sightings.${ref}</p>`,
      note: `The <a href="${globalise}">GLOBALISE project</a> makes millions of manuscript pages searchable. Breen’s <a href="${blog}">account of the search</a> and the <a href="${dossier}">original Claude research dossier</a> describe the investigation. The <a href="${archive(1095,922)}">1629 journal page</a> provides a known example to test against.`,
    },
    {
      id: "journal",
      body: ref => `<h2 id="findings">What turned up</h2><p>On 17 April 1615, hunters returned to the Dutch ship <i>Wapen van Amsterdam</i> with tortoises and dodos. Four days later, the crew fetched water and caught dodos again. Both entries fit on one page. Turn the leaf and a third mention appears in the ship’s account of the provisions it gathered before sailing on.</p>
      <p>These entries add two days to the short list of occasions when someone actually recorded encountering a dodo in the wild. A widely used chronology goes from 1611 to 1616 without this stop. The ship’s voyage was already known, and a rhymed account was in print. The apparent addition to dodo history is the dated evidence in the prose journal.${ref}</p>`,
      note: `The journal is in the Dutch National Archives, <a href="${archive(1059,277)}">VOC 1059, folio 141</a>. The <a href="${archive(1059,300)}">title on the journal</a> identifies the ship. Compare <a href="${chronology}">Cheke and Parish’s chronology</a>, Table A1, and the <a href="${archive(1059,51)}">rhymed account</a>, edited by L. M. Akveld and J. P. Houterman in 1971.`,
    },
    { wide: true, body: manuscriptReader },
    {
      id: "field-hen",
      body: ref => `<h2>A second bird hidden in translation</h2><p>The last manuscript above comes from the first year of Dutch settlement on Mauritius. Its author lists “field-hens” between geese and ducks. A reader of the later French translation would find partridges there. Someone searching only that edition for a red rail could pass straight over the passage.</p><p>The original wording makes this a possible sighting of the red rail in 1638. The same search that recovered a date for the dodo also turned up a place where one translated word may have obscured another animal.${ref}</p>`,
      note: `Compare <a href="${archive(1128,360)}">Gooyer’s letter, VOC 1128, scan 360</a>, with Roland Bonaparte’s <i>Le premier établissement des Néerlandais à Maurice</i> (1890), pp. 39–40. <a href="${chronology}">Cheke and Parish</a> discuss how names for the island’s birds changed over time.`,
    },
    {
      id: "india",
      body: ref => `<h2>Did a bird reach the painter?</h2><p>The 1615 journal follows the hunters as far as their ship. Other travellers left clues closer to India. A Portuguese expedition caught a young bird on Mauritius the following year. An English traveller later recalled seeing two dodos in Surat. Following the dates and places shows where a bird can be traced and where its trail breaks off.${ref}</p>`,
      note: `Almeida’s account survives in a <a href="${almeida}">French edition published in 1904</a>. The return to Goa appears in a <a href="${arrival}">separate account of the expedition</a>. Mundy’s <a href="${mundy}">recollection</a> describes the birds at the trading house.`,
    },
    { wide: true, body: evidenceMap },
    {
      id: "next",
      body: ref => `<h2>What to look for next</h2><p>A letter saying who received a bird at Surat, or a household entry paying someone to feed or transport it inland, could connect a port sighting to an artist or patron. The bird’s description matters as much as its destination. In 1625, for instance, a Dutch merchant did send a large flightless bird to Jahangir. His letter calls it a cassowary, a different bird that the Dutch also traded.${ref}</p>
      <p>The dated catches already tell us something about the dodo on Mauritius. Finding the painter’s model will take a record that follows an individual bird one step further.</p><p><a href="/leads/mughal-dodo">How did a dodo become the subject of a Mughal painting? →</a></p>`,
      note: `The <a href="${archive(1084,134)}">1625 letter from Surat</a> names the bird. A <a href="${archive(1090,626)}">later letter</a> records how well the king received it.`,
    },
  ];
  return `<article class="leads-page dodo-lead">
    <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">How the agents investigated ↓</a></div>
    <header class="dodo-mast"><div><p class="lead-label">Mauritius · April 1615</p><h1 class="page-title">${dodoTitle}</h1>
      <p class="dodo-deck">${dodoDescription}</p><a class="dodo-jump" href="#reader">Read the ship’s journal ↓</a></div>
      <figure><a href="https://commons.wikimedia.org/wiki/File:DodoMansur.jpg"><img src="${media}/birds.webp" width="760" height="1222" alt="A painted dodo with a large curved bill stands at the centre of an album page among smaller, brightly coloured birds."></a><figcaption>The dodo study attributed to Mansur, now part of an album in St. Petersburg. <a href="${catalogue}">Plate 147</a>.</figcaption></figure></header>
    <aside class="dodo-note" aria-labelledby="ben-note"><h2 id="ben-note">A note from Benjamin Breen</h2>
      <p>The text below is a research report of some new findings using AI agents to search through the digitized Dutch East India Company records (<a href="${globalise}">GLOBALISE</a>). I wrote <a href="${blog}">this post</a> on my newsletter Res Obscura with some initial thoughts on the process and the new 17th century report about dodos it unearthed.  As this site gets more developed, I will write up a full methods report in my own words. Until then please excuse the AI-written text below, which was produced by GPT-6.2 Astra. I figured it would be helpful to include an initial report of the method and findings that the AI research agents used to help develop this promising early finding, which I think is reproducible in hunting for other references to extinct species in digitized early modern records.</p></aside>
    ${notedPassages(passages)}<script type="module" src="/leads/dodo-journal/map.js"></script></article>`;
}
