import { notedPassages } from "./lib/lead-notes.js";

export const makassarSmallpoxTitle = "Was Makassar carrying smallpox in 1788?";
export const makassarSmallpoxDescription = "Fifteen months after the British landed at Sydney Cove, smallpox devastated Aboriginal communities around the harbour. One theory blames sea-cucumber fishers sailing from Makassar in eastern Indonesia. Searching 4.79 million Dutch East India Company pages finds no outbreak at Makassar in 1788, but uncovers a forgotten 1782 epidemic there, a multi-island smallpox wave circling the port, and eight shipwrecked fishers naming northern Australia in 1790.";

const media = "/media/leads/makassar-smallpox";
const globalise = "https://globalise.huygens.knaw.nl/";
const campbell = "https://wellcomecollection.org/works/gxhr4h3c";
const warren = "https://doi.org/10.1080/14443058.2013.849750";
const nitschke = "https://doi.org/10.1038/s41562-026-02504-6";
const boomgaard = "https://doi.org/10.1163/22134379-90003743";
const hagerdal = "https://library.oapen.org/handle/20.500.12657/34566";
const sydneyPainting = "https://commons.wikimedia.org/wiki/File:View_of_Sydney_Cove_1792.jpg";
const archive = (inventory, scan) =>
  `https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/${inventory}/file/NL-HaNA_1.04.02_${inventory}_${String(scan).padStart(4, "0")}`;

const extracts = [
  {
    id: "makassar-1782",
    crop: "crop-makassar-1782.webp",
    full: "scan-3623-0137.webp",
    width: 1599,
    height: 943,
    date: "Spring 1782",
    place: "Makassar, Sulawesi",
    title: "Four-foot graves at Castle Rotterdam",
    inventory: 3623,
    scan: 137,
    folio: "fols. 96–97",
    alt: "Handwritten Dutch East India Company resolution from Makassar in spring 1782 ordering deeper graves during a smallpox outbreak.",
    dutch: "…zoo is dewijl thans hier ter plaatse de <mark>kinder ziekte zo sterk grasseert</mark> dat daar door dagelyks een menigte van lijken ten grave werden gebragt ter voorkoming van alle besmettelijke en Contagieuse ziektens goedgevonden … dat de graaven zullen moeten diep weesen vier voeten.",
    english: "…since <mark>smallpox is now raging so fiercely</mark> in this place that a crowd of corpses is carried to the grave every day, to prevent all infectious and contagious illnesses it is resolved … that graves must be dug four feet deep.",
    context: "The Makassar council complained that local residents were putting bodies barely beneath the soil. It ordered a public placard in Dutch and local languages requiring every body to rest at least three feet underground, backed by a five-rixdollar fine split between the town fund, the poor-box, and the prosecutor. A companion general letter dates the placard to the session of 15 April 1782—six years too early to explain Sydney in 1789.",
    word: [26, 49, 47, 11],
  },
  {
    id: "kupang-1786",
    crop: "crop-kupang-1786.webp",
    full: "scan-3732-0552.webp",
    width: 570,
    height: 570,
    date: "20 September 1786",
    place: "Kupang, Timor",
    title: "Missing wax quotas, caves, and over 1,000 dead",
    inventory: 3732,
    scan: 552,
    folio: "fol. 15",
    alt: "Handwritten Timor letter of 20 September 1786 attributing a beeswax shortfall to pestilentially raging smallpox around Kupang.",
    dutch: "Ten tweeden Weegens de <mark>pestiaal woedende kinder pokken</mark>, die in februarij begonnen; en zeedert April een vreeselijke slagting onder den inwoonder hier gemaakt heeft … waar door den Inlander die nog niet daar van aangetast zijn veele uijt vrees, haere woonplaatsen verlaaten, zig in hoolen en klippen verschuijlen … geduurende vijff maanden verre over de 1000. Menschen ten grave gesleept heeft.",
    english: "Secondly, because of the <mark>pestilentially raging smallpox</mark>, which began in February and since April has caused a terrible slaughter among the inhabitants here … so that many locals not yet struck leave their homes out of fear, hide themselves in caves and cliffs … while in five months, within a couple of hours’ walk of Kupang alone, it has dragged well over 1,000 people to the grave.",
    context: "The smallpox passage sits inside an apology for falling short on Batavia’s annual order of 600 piculs of beeswax, 400 of sandalwood, and 800 pounds of honey. Alongside the 1,000 deaths near Kupang, the letter counts over 200 Savunese auxiliaries and 150 Company workmen dead. Neither this outbreak nor its toll appears in Hans Hägerdal’s standard history of VOC Timor.",
    word: [28, 7, 60, 8],
  },
  {
    id: "ambon-1787",
    crop: "crop-ambon-1787.webp",
    full: "scan-3755-0100.webp",
    width: 750,
    height: 600,
    date: "19 March 1787",
    place: "Ambon, Maluku",
    title: "A Chinese ship from Java and 3,000 dead in three months",
    inventory: 3755,
    scan: 100,
    folio: "fol. 141",
    alt: "Handwritten Ambon council resolution of 19 March 1787 recording more than 3,000 smallpox deaths in three months.",
    dutch: "…in de maand December a:o p:o door een Chinees vaartuig van Java hier ingevoerde <mark>kinder Ziekte</mark>, dewelke ten gevolge gehad heeft, dat zeedert een korte tijd van slegts drie maanden, meer dan Drie Duijsend zo Europeesen, naturelle Amboineesen, Chineesen als Slaven, onder dit Hoofd Casteel, het met den dood hebben moeten bekoopen.",
    english: "…the <mark>smallpox</mark> brought in here last December by a Chinese vessel from Java, which has resulted in more than three thousand people—Europeans, native Ambonese, Chinese, and slaves alike—paying for it with their lives under this main castle in the short space of just three months.",
    context: "On the facing page, the council orders a postholder at the mouth of the bay to board every incoming craft and check for anyone carrying the contagion. By the end of the year the annual letter puts the toll at 3,573 dead and notes that smallpox had not raged on Ambon since the early 1700s—nearly eighty years without an epidemic.",
    word: [74, 40, 20, 8],
  },
  {
    id: "rote-1787",
    crop: "crop-rote-1787.webp",
    full: "scan-3810-0432.webp",
    width: 1345,
    height: 505,
    date: "20 September 1787",
    place: "Rote & Savu",
    title: "“Virtually without precedent” on the outer islands",
    inventory: 3810,
    scan: 432,
    folio: "fol. 76",
    alt: "Handwritten Timor letter of 20 September 1787 reporting unprecedented smallpox on Rote and Savu.",
    dutch: "…vermits nog maer weijnig manschappen tot hulp van het Eijland Rottij, en in ’t geheel geene van Savo hier overgekomen zijn, om de wille der <mark>woedende kinderpokken</mark>, die tot [die] Eijlanden overgeslaagen, en genoegsaem sonder voorbeeld is.",
    english: "…since only a few fighting men have come across to help from the island of Rote, and none at all from Savu, on account of the <mark>raging smallpox</mark> that has jumped over to those islands and is virtually without precedent.",
    context: "Notice the clerk’s tiny correction inserted above the line (the second “die” before “Eijlanden”). On the next page, the letter tells how Christoffel Amalo Moeda, the Regent of Termanu on Rote, borrowed a Chinese two-masted prau to bring 100 warriors to assist the Dutch, smashed on a reef, and lost four men plus his fighters’ finest ceremonial ornaments—because, the Dutch explain, they always carry their best finery to war. Even so, the regent promised to sail again once the smallpox subsided.",
    word: [16, 58, 33, 16],
  },
  {
    id: "pasir-1789",
    crop: "crop-pasir-1789.webp",
    full: "scan-3863-0815.webp",
    width: 1100,
    height: 390,
    date: "26 February 1789",
    place: "Pasir, East Borneo",
    title: "A sultan flees inland across the Makassar Strait",
    inventory: 3863,
    scan: 815,
    folio: "fol. 163",
    alt: "Entry in the Makassar secret diary for 26 February 1789 reporting that Sultan Sleeman of Pasir moved inland fearing smallpox.",
    dutch: "Sulthan Sleeman hadde zig in een dorp op ’t land genaamt Gapper begeeven, <mark>bevreest zijnde voor de pokken</mark>. En aan Pangerang Souria zal de regeering in de bovenlanden zijn opgedraagen.",
    english: "Sultan Sleeman had moved to a village in the countryside called Gapper, <mark>being afraid of the pox</mark>, and the government of the uplands was said to have been handed over to Pangeran Souria.",
    context: "This is the closest dated smallpox report to Makassar during the late-1788 / early-1789 sailing window. It was entered in Castle Rotterdam’s own secret diary from an envoy’s report—showing that Makassar’s clerks listened for smallpox news across the strait even when their own town was quiet. Pasir traded with Makassar, but sits northwest across the strait, in the opposite direction from the Australian monsoon run.",
    word: [51, 28, 37, 16],
  },
  {
    id: "marege-1790",
    crop: "crop-marege-1790.webp",
    full: "scan-3936-0167.webp",
    width: 590,
    height: 330,
    date: "14 October 1790",
    place: "Ternate, Maluku",
    title: "Eight Makassar fishers name “Marege” in court",
    inventory: 3936,
    scan: 167,
    folio: "fol. 5",
    alt: "Ternate Council of Justice deposition of 14 October 1790 naming eight Makassar trepang fishers shipwrecked on a voyage to Marege.",
    dutch: "Kannis, Pareba, Djalie, Hamuet, Mamba, Laboe, Sauw en Samauw, dat van Maccassar met een vaartuig <mark>op den Tripang vangst naar Marege</mark> gevaaren, haar vaartuig aan stukken geslagen, en sij na geleeden schipbreuk door de Boegineesen gevangen en in Amboina aan de E. Comp. verkogt waren geworden.",
    english: "Kannis, Pareba, Djalie, Hamuet, Mamba, Laboe, Sauw, and Samauw declared that having sailed from Makassar in a vessel <mark>on the trepang catch to Marege</mark>, their boat was smashed to pieces, and after their shipwreck they were captured by Bugis and sold in Ambon to the Honourable Company.",
    context: "A surprise by-catch from checking Makassar’s trepang records. These eight men (aged 18 to 35) had escaped slavery in Ambon five months earlier “to regain their freedom,” only to be recaptured at Sula Besi and sent back in handcuffs. Their sworn testimony puts the Makassarese name for northern Australia—Marege—into a dated European archive thirteen years before Matthew Flinders heard it from the trepang captain Pobassoo in 1803.",
    word: [22, 37, 64, 13],
  },
];

const outbreakPlaces = [
  {
    id: "makassar",
    name: "Makassar (Castle Rotterdam)",
    role: "hub",
    x: 245,
    y: 238,
    labelDx: -14,
    labelDy: -14,
    anchor: "end",
    years: "1782 outbreak · Clear 1783–1792",
    toll: "Four-foot grave placard (April 1782); 0 mentions 1783–92",
    status: "Image-verified (inv. 3623, scan 137)",
    summary: "Major outbreak in spring 1782, following earlier epidemics in 1765–67 and 1772–73. Across 35 Makassar volumes covering 1783–1792, clerks kept logging enslaved deaths by cause (“natural illness”) and fevers in 1786–87, with zero mentions of smallpox.",
  },
  {
    id: "pasir",
    name: "Pasir (East Borneo)",
    role: "outbreak",
    x: 138,
    y: 162,
    labelDx: 0,
    labelDy: -14,
    anchor: "middle",
    years: "Feb 1789",
    toll: "Sultan Sleeman fled inland to Gapper",
    status: "Image-verified (inv. 3863, scan 815)",
    summary: "Reported back to Makassar’s secret diary on 26 February 1789. Across the Makassar Strait to the northwest—off the southward sailing track to Australia.",
  },
  {
    id: "ternate",
    name: "Ternate, Tidore & Halmahera",
    role: "outbreak",
    x: 472,
    y: 86,
    labelDx: 14,
    labelDy: 4,
    anchor: "start",
    years: "Nov 1791–1792",
    toll: "“Innumerable” dead; first outbreak in 27 years",
    status: "HTR text (inv. 3958, 3966–67, 8158)",
    summary: "Arrived with measles in mid-November 1791, forcing the VOC to postpone a military expedition against Prince Nuku. On Halmahera, villagers fled clove-eradication gangs out of fear of both soldiers and smallpox.",
  },
  {
    id: "ambon",
    name: "Ambon",
    role: "outbreak",
    x: 492,
    y: 204,
    labelDx: 14,
    labelDy: 4,
    anchor: "start",
    years: "Dec 1786–1787",
    toll: "3,573 dead; first outbreak since early 1700s",
    status: "Image-verified (inv. 3755, scan 100); year tally HTR (inv. 7942)",
    summary: "Brought in December 1786 by a Chinese vessel from Java. More than 3,000 died under the main castle in three months, prompting harbor quarantine checks on incoming craft.",
  },
  {
    id: "banda",
    name: "Banda Neira",
    role: "outbreak",
    x: 545,
    y: 238,
    labelDx: 14,
    labelDy: 5,
    anchor: "start",
    years: "May 1784",
    toll: "“Again carrying off many people”",
    status: "HTR text (inv. 8262, scan 145)",
    summary: "In a 28 May 1784 letter to Makassar’s governor Barend Reijke, Banda’s official writes that while Banda is politically at peace, smallpox brought from the west is once more taking many lives.",
  },
  {
    id: "solor",
    name: "Solor & Lamakera",
    role: "outbreak",
    x: 344,
    y: 300,
    labelDx: 0,
    labelDy: -13,
    anchor: "middle",
    years: "May–Jul 1792",
    toll: "~1,500 dead at Lamakera",
    status: "HTR text (inv. 8258, scans 769–780)",
    summary: "Smallpox “blown over from Solor” onto Timor in mid-1792, with heavy mortality reported at Lamakera.",
  },
  {
    id: "kupang",
    name: "Kupang, Rote, Savu & Belu (Timor)",
    role: "outbreak",
    x: 368,
    y: 356,
    labelDx: 14,
    labelDy: -4,
    anchor: "start",
    years: "1786–87 & spring 1789",
    toll: ">1,000 dead around Kupang (1786); Belu resurgence (1789)",
    status: "Image-verified (inv. 3732, 3810, 8307)",
    summary: "Raged around Kupang from February 1786 (people hiding in caves and cliffs), jumped to Rote and Savu in 1787, and surged again in central Timor (Belu) in spring 1789, halting the beeswax trade.",
  },
  {
    id: "marege",
    name: "Marege (Arnhem Land coast)",
    role: "destination",
    x: 618,
    y: 416,
    labelDx: -12,
    labelDy: -14,
    anchor: "end",
    years: "Monsoon season, Dec–Apr",
    toll: "Seasonal sea-cucumber fishery; ~3,000 km from Sydney",
    status: "Named in VOC 3936 (1790) & 3858 (1789)",
    summary: "Makassar fishers sailed south on the northwest monsoon between late November and mid-January, returning home by June. Even if a crew carried smallpox here, the virus still had to cross the continent to reach Sydney by April 1789.",
  },
];

function archipelagoMap() {
  const buttons = outbreakPlaces
    .map(
      (p, i) => `
      <g class="map-node map-node-${p.role}${i === 0 ? " is-selected" : ""}" data-place="${p.id}" tabindex="0" role="button" aria-pressed="${i === 0 ? "true" : "false"}" aria-label="${p.name}: ${p.years}">
        <circle class="node-halo" cx="${p.x}" cy="${p.y}" r="${p.role === "hub" ? 13 : 10}"/>
        <circle class="node-dot" cx="${p.x}" cy="${p.y}" r="${p.role === "hub" ? 6.5 : 5.5}"/>
        <text class="node-label" x="${p.x + p.labelDx}" y="${p.y + p.labelDy}" text-anchor="${p.anchor}">${p.name.replace(" (Castle Rotterdam)", "").replace(" (East Borneo)", "").replace(" (Timor)", "").replace(" (Arnhem Land coast)", "")}</text>
      </g>`
    )
    .join("");

  const fallbackCards = outbreakPlaces
    .map(
      (p, i) => `
      <div class="map-detail-card" data-detail="${p.id}"${i === 0 ? "" : " hidden"}>
        <p class="map-detail-meta"><span>${p.years}</span> · <span>${p.status}</span></p>
        <h4>${p.name}</h4>
        <p class="map-detail-toll"><strong>Recorded impact:</strong> ${p.toll}</p>
        <p>${p.summary}</p>
      </div>`
    )
    .join("");

  return `<section class="sp-map-box" id="archipelago-map" aria-labelledby="map-title">
    <div class="sp-map-head">
      <div>
        <p class="sp-eyebrow">Geography of the 1781–1792 wave</p>
        <h3 id="map-title">Smallpox circled Makassar without touching it</h3>
      </div>
      <div class="sp-map-legend" aria-label="Map legend">
        <span><i class="swatch swatch-hub"></i>Makassar (1782 only; clear 1783–92)</span>
        <span><i class="swatch swatch-outbreak"></i>VOC-recorded outbreak (1784–92)</span>
        <span><i class="swatch swatch-route"></i>Monsoon trepang run to Marege</span>
      </div>
    </div>
    <p class="sp-map-intro">Select any port or island on the map to read what Dutch East India Company clerks reported there. Every documented outbreak in 1784–1792 lay on the ring of islands around South Sulawesi rather than in Makassar itself.</p>
    <div class="sp-map-grid">
      <div class="sp-svg-wrap">
        <svg viewBox="0 0 760 490" class="sp-svg" role="img" aria-labelledby="svg-archipelago-title">
          <title id="svg-archipelago-title">Map of eastern Indonesia and northern Australia showing VOC smallpox reports from 1782 to 1792 and the Macassan sailing route to Marege</title>
          <rect class="sea-bg" x="0" y="0" width="760" height="490" rx="3"/>
          <!-- Subtle latitude/longitude grid -->
          <g class="geo-grid">
            <line x1="0" y1="115" x2="760" y2="115"/><text x="12" y="110">0° Equator</text>
            <line x1="0" y1="242" x2="760" y2="242"/><text x="12" y="237">5° S</text>
            <line x1="0" y1="368" x2="760" y2="368"/><text x="12" y="363">10° S</text>
          </g>
          <!-- Simplified geographic landmasses (lon 112E..138E -> x 40..720; lat 3N..15.5S -> y 40..465) -->
          <g class="landmasses">
            <!-- Borneo (east coast) -->
            <path d="M 0,40 L 145,40 L 178,78 L 164,128 L 146,168 L 130,204 L 68,218 L 0,210 Z"/>
            <!-- Java (east tip) -->
            <path d="M 0,282 L 96,294 L 116,310 L 66,316 L 0,308 Z"/>
            <!-- Bali, Lombok, Sumbawa, Flores chain -->
            <path d="M 126,308 L 154,308 L 152,318 L 124,316 Z"/>
            <path d="M 164,310 L 184,310 L 182,320 L 164,318 Z"/>
            <path d="M 192,308 L 246,312 L 242,324 L 194,320 Z"/>
            <path d="M 262,306 L 336,304 L 334,318 L 260,318 Z"/>
            <!-- Sumba -->
            <path d="M 244,336 L 288,342 L 284,354 L 246,348 Z"/>
            <!-- Savu & Rote -->
            <circle cx="308" cy="356" r="4"/>
            <path d="M 332,360 L 350,356 L 352,364 L 334,366 Z"/>
            <!-- Solor / Alor -->
            <path d="M 342,304 L 386,302 L 384,312 L 342,312 Z"/>
            <!-- Timor -->
            <path d="M 358,354 L 444,316 L 456,326 L 372,368 Z"/>
            <!-- Sulawesi (distinctive K-shape) -->
            <path d="M 232,124 L 330,90 L 368,96 L 354,112 L 268,128 L 282,158 L 328,154 L 318,170 L 286,176 L 314,224 L 298,236 L 274,200 L 264,244 L 242,248 L 236,196 L 222,162 Z"/>
            <!-- Buton / Selayar -->
            <path d="M 316,228 L 328,238 L 320,254 L 310,244 Z"/>
            <path d="M 268,256 L 276,260 L 272,276 L 266,272 Z"/>
            <!-- Halmahera & Ternate -->
            <path d="M 480,58 L 516,74 L 502,94 L 528,108 L 514,124 L 494,108 L 492,146 L 478,136 L 476,94 Z"/>
            <!-- Buru & Seram / Ambon -->
            <path d="M 426,184 L 464,184 L 466,204 L 428,202 Z"/>
            <path d="M 482,182 L 566,186 L 568,204 L 486,198 Z"/>
            <!-- New Guinea west tip -->
            <path d="M 594,108 L 760,118 L 760,268 L 690,242 L 620,192 L 586,144 Z"/>
            <!-- Northern Australia (Kimberley / Arnhem Land) -->
            <path d="M 442,490 L 478,448 L 524,422 L 570,406 L 638,408 L 680,432 L 664,468 L 716,490 Z"/>
          </g>
          <!-- Geographic water & island labels -->
          <g class="geo-labels">
            <text x="58" y="138">BORNEO</text>
            <text x="272" y="148">SULAWESI</text>
            <text x="410" y="346" transform="rotate(-22 410 346)">TIMOR</text>
            <text x="556" y="458">NORTHERN AUSTRALIA</text>
            <text class="sea-label" x="358" y="266">Banda Sea</text>
            <text class="sea-label" x="456" y="392">Timor &amp; Arafura Seas</text>
          </g>
          <!-- Macassan monsoon sailing route (Makassar -> Selayar/Buton -> Timor Sea -> Marege) -->
          <path class="trepang-route" d="M 248,244 C 288,282 436,368 612,414"/>
          <text class="route-note" x="424" y="376" transform="rotate(17 424 376)">Nov–Jan northwest monsoon run</text>
          <!-- Arrow toward Sydney (~3,000 km SSE) -->
          <g class="sydney-vector">
            <line x1="636" y1="428" x2="720" y2="474"/>
            <polyline points="712,464 722,475 708,475"/>
            <text x="728" y="466" text-anchor="end">To Sydney Cove</text>
            <text x="728" y="481" text-anchor="end">(~3,000 km overland)</text>
          </g>
          <!-- Interactive place nodes -->
          ${buttons}
        </svg>
      </div>
      <div class="sp-map-sidebar" id="map-readout" aria-live="polite">
        ${fallbackCards}
        <p class="map-sidebar-hint">Click any circle on the map to inspect its source record.</p>
      </div>
    </div>
  </section>`;
}

function manuscriptReader() {
  const rows = extracts
    .map((entry, index) => {
      const [x, y, width, height] = entry.word;
      return `<details name="smallpox-passages" class="sp-entry" id="entry-${entry.id}"${index === 0 ? " open" : ""}>
        <summary><span>${entry.date}</span><strong>${entry.place}: ${entry.title}</strong></summary>
        <div class="sp-sheet">
          <figure>
            <a class="sp-facsimile" href="${media}/${entry.full}" aria-label="Enlarge the full manuscript spread for ${entry.place}, ${entry.date}">
              <img src="${media}/${entry.crop}" width="${entry.width}" height="${entry.height}" alt="${entry.alt}" loading="lazy">
              <span class="sp-outline" aria-hidden="true" style="left:${x}%;top:${y}%;width:${width}%;height:${height}%"></span>
            </a>
            <figcaption>Nationaal Archief · VOC ${entry.inventory}, ${entry.folio}, scan ${entry.scan} · <a href="${archive(entry.inventory, entry.scan)}">Open archive viewer ↗</a></figcaption>
          </figure>
          <div class="sp-reading">
            <p class="sp-english" lang="en">“${entry.english}”</p>
            <p class="sp-dutch" lang="nl">“${entry.dutch}”</p>
          </div>
          <p class="sp-context">${entry.context}</p>
        </div>
      </details>`;
    })
    .join("");

  return `<section class="sp-reader" aria-labelledby="reader-title" id="reader">
    <h3 id="reader-title">Read the six verified manuscripts</h3>
    <p>Every quotation below was checked directly against the page scan at the Nationaal Archief in The Hague. Switch between English and original Dutch, turn on the highlight box to locate the key phrase in the clerk’s handwriting, or click any detail to open the full spread.</p>
    <div class="sp-controls">
      <fieldset><legend>Language beside the scan</legend>
        <label><input type="radio" name="sp-lang" value="en" checked><span>English translation</span></label>
        <label><input type="radio" name="sp-lang" value="nl"><span>Dutch transcription</span></label>
      </fieldset>
      <label class="sp-locate"><input type="checkbox" id="sp-locate-word"> Highlight key words on the scan</label>
    </div>
    ${rows}
  </section>`;
}

function chronologyTable() {
  const rows = [
    ["Spring 1782", "Makassar, Sulawesi", "Council orders graves dug 4 feet deep (at least 3 feet of earth above the body) with a 5-rixdollar fine because smallpox is killing crowds daily.", "Image-verified", archive(3623, 137), "VOC 3623, scan 137"],
    ["28 May 1784", "Banda Neira", "Letter to Makassar’s governor: political calm, “but the smallpox brought from the west is again carrying off many people.”", "HTR text", archive(8262, 145), "VOC 8262, scan 145"],
    ["20 Sep 1786", "Kupang, Timor", "Began Feb 1786; “terrible slaughter” since April; well over 1,000 dead within two hours of Kupang in five months, plus >200 Savunese auxiliaries and 150 workmen; survivors hiding in caves and cliffs.", "Image-verified", archive(3732, 552), "VOC 3732, scan 552"],
    ["19 Mar 1787", "Ambon", "Brought in Dec 1786 by a Chinese ship from Java; >3,000 dead under the main castle in 3 months (3,573 by year-end); first outbreak since the early 1700s; vessel inspections ordered.", "Image-verified", archive(3755, 100), "VOC 3755, scan 100"],
    ["20 Sep 1787", "Rote & Savu", "Smallpox jumps from Timor to Rote and Savu (“virtually without precedent”), keeping Savu’s fighting men from sailing to Kupang.", "Image-verified", archive(3810, 432), "VOC 3810, scan 432"],
    ["26 Feb 1789", "Pasir, East Borneo", "Makassar secret diary logs an envoy’s report that Sultan Sleeman moved to an inland village named Gapper, “fearing the pox.”", "Image-verified", archive(3863, 815), "VOC 3863, scan 815"],
    ["30 Sep 1789", "Belu, central Timor", "Traders reaching Belu that spring found smallpox raging again; hill peoples refused to come down to trade beeswax; contagion spread back into Timor’s interior.", "Image-verified", archive(8307, 54), "VOC 8307, scan 54"],
    ["Nov 1791–92", "Ternate, Tidore, Bacan, Manado, Halmahera", "First outbreak in 27 years (with measles); “innumerable” dead, mostly locals and enslaved people; campaign against Prince Nuku postponed; people on Halmahera flee clove-eradication gangs.", "HTR text", archive(3958, 25), "VOC 3958 / 8158"],
    ["May–Jul 1792", "Solor & Timor", "Smallpox “blown over from Solor”; roughly 1,500 dead at Lamakera.", "HTR text", archive(8258, 769), "VOC 8258, scans 769–780"],
  ];

  return `<div class="sp-table-wrap">
    <table class="sp-table">
      <caption>Dated VOC smallpox reports across eastern Indonesia, 1782–1792</caption>
      <thead>
        <tr>
          <th scope="col">Document date</th>
          <th scope="col">Place</th>
          <th scope="col">What the Dutch clerks recorded</th>
          <th scope="col">Verification</th>
          <th scope="col">Archive scan</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([date, place, what, status, url, ref]) => `<tr>
          <td class="col-mono">${date}</td>
          <td><strong>${place}</strong></td>
          <td>${what}</td>
          <td class="col-mono">${status}</td>
          <td class="col-mono"><a href="${url}">${ref} ↗</a></td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

function funnelTable() {
  const stages = [
    ["Total scans indexed from GLOBALISE VOC OBP (Amsterdam & Zeeland copies)", "4,790,000"],
    ["Search terms tested (period Dutch & Malay spellings for smallpox and measles)", "24 primary + 15 check variants"],
    ["Pages matching any primary term across all years (1602–1795)", "4,775"],
    ["Pages in volumes touching 1783–1791 carrying Makassar, Timor, Banda, Ambon, or Ternate papers", "368"],
    ["Volumes containing ≥5 Makassar documents across 1783–1792", "35 volumes"],
    ["Smallpox-term pages inside those 35 Makassar volumes", "42 pages"],
    ["  ↳ Timor letters bound into the same volumes (inv. 3732, 8253, 8258, 7944)", "22"],
    ["  ↳ Ternate 1791 letters (inv. 3967)", "15"],
    ["  ↳ Ambon handover memoir & Ternate comments on Batavia (inv. 3818, 8145, 8148)", "4"],
    ["  ↳ Pasir, East Borneo report in Makassar secret diary (inv. 3863 = copy 7952)", "1 (×2 copies)"],
    ["  ↳ False hits (“pokken” as pouches, a textile list, an individual enslaved person’s description)", "3"],
    ["Smallpox reports at Makassar, Bone, Bima, Sumbawa, or Selayar (1783–1792)", "0"],
  ];

  return `<div class="sp-table-wrap">
    <table class="sp-table sp-funnel-table">
      <caption>Search funnel across the GLOBALISE Dutch East India Company archive</caption>
      <thead>
        <tr>
          <th scope="col">Filtering stage</th>
          <th scope="col" class="num">Count</th>
        </tr>
      </thead>
      <tbody>
        ${stages
          .map(
            ([label, count], i) => `<tr${i === stages.length - 1 ? ' class="funnel-zero"' : ""}>
          <td>${label}</td>
          <td class="num col-mono">${count}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

export function makassarSmallpoxHTML() {
  const passages = [
    {
      id: "sydney-1789",
      body: (ref) => `<h2>What happened in Sydney in 1789, and why people still argue about it</h2>
        <p>In January 1788, eleven British ships (the First Fleet) anchored at Sydney Cove to build a penal colony on the land of the Gadigal and neighbouring Aboriginal peoples. Fifteen months later, in April 1789, smallpox broke out around the harbour. Within weeks, British officers were finding dead and dying people in rock shelters along the coves. Governor Arthur Phillip estimated that half the Aboriginal population around Port Jackson died. No British convict or marine caught it, except a single Native American sailor aboard HMS <i>Supply</i>.${ref}</p>
        <p>Ever since, historians have argued over a basic question: how did smallpox reach Sydney? Two main explanations compete. One points directly to the British settlement itself. First Fleet surgeons carried dried smallpox scabs sealed in glass bottles, used in eighteenth-century medicine to inoculate people against the disease, and historians such as Christopher Warren argue that this “variolous matter” was released around Sydney Cove, accidentally or deliberately. The other explanation, developed most fully by Judy Campbell in 2002, looks 3,000 kilometres north. Every year during the northwest monsoon, fishing fleets sailed from Makassar (a major port on the Indonesian island of Sulawesi) down to the coast of Arnhem Land in northern Australia to harvest and dry sea cucumbers, called <i>trepang</i>, for the Chinese market. In Campbell’s version, an infected fishing crew brought smallpox to northern Australia, and the virus then moved along Aboriginal trade routes across the continent until it hit Sydney in April 1789.</p>
        <p>The stakes are large. If the First Fleet brought the epidemic, British colonization began with a biological catastrophe of its own making. If Macassan fishers brought it, an older Asian maritime trade network reshaped Australian history independently of the British landing. Yet for decades, both sides argued without checking the one archive sitting right at the northern starting line: the Dutch East India Company’s own papers from Makassar.</p>`,
      note: `Eyewitness British accounts include Watkin Tench, <i>A Complete Account of the Settlement at Port Jackson</i> (1793), ch. 4, and Governor Arthur Phillip’s dispatches to Lord Sydney. For the two rival theories, see Judy Campbell, <a href="${campbell}"><i>Invisible Invaders: Smallpox and Other Diseases in Aboriginal Australia, 1780–1880</i></a> (2002), and Christopher Warren, “Smallpox at Sydney Cove – who, when, why?”, <a href="${warren}"><i>Journal of Australian Studies</i> 38 (2014)</a>. In 2026, M. C. Nitschke et al. (<a href="${nitschke}"><i>Nature Human Behaviour</i> 10</a>) modelled continental transmission and found a northern route unlikely to reach Sydney, without using Indonesian archives.`,
    },
    {
      id: "sydney-view",
      wide: true,
      body: () => `<figure class="sp-scene">
        <img src="${media}/sydney-cove-1792.webp" width="613" height="322" alt="Watercolour view of Sydney Cove in 1792 showing small brick and timber colonial buildings along the shoreline and an Aboriginal canoe crossing the harbour." loading="lazy">
        <figcaption>Sydney Cove in 1792, three years after the epidemic, painted by the anonymous Port Jackson Painter. <a href="${sydneyPainting}">Natural History Museum, London / Wikimedia Commons (public domain) ↗</a></figcaption>
      </figure>`,
    },
    {
      id: "what-was-found",
      body: (ref) => `<h2>What we checked, and what turned up</h2>
        <p>The northern theory hinges on timing. Smallpox has an incubation period of roughly two weeks, and the trepang fleets left Makassar between late November and mid-January on the monsoon winds. For a boat leaving Makassar in December 1788 to carry live smallpox to northern Australia, the disease had to be circulating in Makassar, or along the islands where crews stopped, right around that departure window.</p>
        <p>The Dutch East India Company (VOC) governed Makassar from Castle Rotterdam and shipped copies of its council resolutions, letters, secret diaries, and shipping lists back to the Netherlands every year. Thanks to the <a href="${globalise}">GLOBALISE</a> project, 4.79 million pages of those handwritten Dutch records are now machine-transcribed and searchable. We searched the entire collection for period spellings of smallpox and then focused on the 35 volumes containing Makassar’s records from 1783 to 1792.${ref}</p>
        <p>The result undercuts the Makassar-1788 link while turning up a much bigger regional story no one had pieced together:</p>
        <ul class="sp-summary-list">
          <li><strong>No smallpox at Makassar in late 1788, or anywhere from 1783 to 1792.</strong> Across all 35 Makassar volumes, there is not a single report of smallpox in Makassar or its neighbouring ports (Bone, Bima, Sumbawa, Selayar). This is not because clerks stopped paying attention. The exact same offices logged smallpox down to single deaths of enslaved workers in earlier years, and in 1788–91 they kept recording enslaved deaths by cause, as “natural illness.”</li>
          <li><strong>A forgotten Makassar epidemic in spring 1782.</strong> Six years too early for Sydney, smallpox hit Makassar hard enough that Castle Rotterdam’s council passed an emergency placard ordering graves dug four feet deep. That finally explains the faint pockmarks that British botanist Robert Brown noticed on a Macassan crew in 1803, the clue Campbell had used to guess at a late-1780s outbreak.</li>
          <li><strong>A devastating smallpox wave circling around Makassar (1784–1792).</strong> Elsewhere in eastern Indonesia, the Company papers preserve an unpublished chronology of catastrophic epidemics: Banda (1784), Kupang on Timor (1786, over 1,000 dead), Ambon (1786–87, 3,573 dead), Rote and Savu (1787), Pasir on East Borneo (1789), central Timor (1789), Ternate and Halmahera (1791–92), and Solor (1792).</li>
          <li><strong>Smallpox was not endemic there.</strong> Campbell built her argument on the older assumption that smallpox smouldered continuously in big Indonesian ports. The Company clerks show the opposite: smallpox struck at long intervals, every seven to ten years in Makassar and only once every twenty-five to eighty years in the Moluccas.</li>
        </ul>`,
      note: `Campbell’s Sulawesi evidence in <i>Invisible Invaders</i> begins in 1838; for the 1780s she extrapolated from Robert Brown’s 1803 diary note of faint pockmarks on Macassan sailors off Arnhem Land. Warren (2014) countered that there was “no evidence of a major outbreak in Macassar before 1789,” relying on Java-centred secondary works. The VOC Makassar papers show Warren was right for 1783–89 and wrong for 1782.`,
    },
    {
      id: "makassar-1782-story",
      body: (ref) => `<h2>Four-foot graves in 1782, and six quiet years after</h2>
        <p>On a crowded double page of Castle Rotterdam’s council resolutions from spring 1782, tucked between routine shipping business and the hiring of a new master bricklayer, the Dutch governors stop to deal with an urgent burial problem. Local residents, they write, were putting corpses barely under the dirt. Because smallpox was raging so fiercely that “a crowd of corpses is carried to the grave every day,” the shallow burials threatened further contagion. The council ordered a public placard posted in Dutch and local languages: every grave had to be dug four feet deep, leaving at least three feet of earth above the body. Anyone caught disobeying faced a five-rixdollar fine, split three ways between the town fund, the church poor-box, and the prosecutor. A follow-up letter dated 17 June 1782 ties the placard to the council session of 15 April 1782.${ref}</p>
        <p>Checking Makassar’s harbourmaster registers for the same winter shows roughly a dozen trading praus clearing port between 26 November 1781 and 18 January 1782 for Bonerate, Buton, and Sumbawa, the island hubs where merchants met sea-cucumber fishers. If a Makassar outbreak ever rode the trepang network in the 1780s, 1781–82 is the one season in the decade where the disease and the departing boats actually overlap. After spring 1782, Makassar’s smallpox record goes completely flat for the next ten years.</p>`,
      note: `Grave-depth resolution: <a href="${archive(3623, 137)}">VOC 3623, fols. 96–97 (scan 137)</a>, checked directly against the scan. Placard date in general letter of 17 June 1782: <a href="${archive(8249, 72)}">VOC 8249, scan 72</a> (HTR). Winter 1781–82 harbourmaster clearances: <a href="${archive(8249, 405)}">VOC 8249, scans 405–456</a> (HTR).`,
    },
    {
      id: "ring-of-epidemics",
      body: (ref) => `<h2>A smallpox wave circling the archipelago</h2>
        <p>If Makassar stayed quiet after 1782, the islands around it did not. Reading the wider eastern-Indonesian correspondence reveals a slow, violent epidemic wave moving from port to port between 1784 and 1792, almost entirely absent from published histories of Indonesian disease.${ref}</p>
        <p>Many of the sharpest details turn up in the most bureaucratic places. In September 1786, the Dutch resident at Kupang on Timor wrote to Batavia apologizing for missing his annual quotas of beeswax, sandalwood, and honey. Second on his list of four excuses was “the pestilentially raging smallpox,” which had killed well over 1,000 people within a two-hour walk of the fort in five months, along with over 200 Savunese soldiers and 150 Company workmen. Healthy villagers had abandoned their farms and fled into “caves and cliffs” rather than gather wax. Three months later, in December 1786, a Chinese trading vessel from Java carried smallpox to Ambon, where it had not raged since the early 1700s. Within ninety days more than 3,000 people were dead under the main castle (3,573 by the year’s end), and the governor ordered a junior official to board every incoming boat at the bay mouth.</p>
        <p>By September 1787 the epidemic had jumped to the neighbouring islands of Rote and Savu, an event the Dutch called “virtually without precedent.” On Rote, the local regent Christoffel Amalo Moeda tried to sail to Kupang with 100 warriors in a borrowed Chinese prau, smashed on a reef, and lost four men along with his soldiers’ finest ceremonial battle ornaments, yet still promised to come once the smallpox cleared. In February 1789, right across the strait from Makassar at Pasir on Borneo’s east coast, an envoy heard that Sultan Sleeman had decamped to a country village called Gapper “fearing the pox.” That same spring, beeswax traders reaching Belu in central Timor turned back empty-handed because hill peoples refused to come down while smallpox raged again. Finally, in November 1791, smallpox and measles swept Ternate, Tidore, Manado, and Halmahera for the first time in 27 years, halting a Dutch war against Prince Nuku as villagers fled clove-eradication gangs out of fear of both soldiers and contagion.</p>`,
      note: `Prior-art checks: Peter Boomgaard’s standard survey (<a href="${boomgaard}"><i>BKI</i> 159, 2003</a>) draws mainly on the printed <i>Generale Missiven</i> (which stop in 1750) and lists no dated epidemics at Makassar, Kupang, Ambon, or Ternate in the 1780s–90s. Hans Hägerdal’s monograph on VOC Timor, <a href="${hagerdal}"><i>Lords of the Land, Lords of the Sea</i></a> (2012), covers 1786–87 on pp. 418–438 without mentioning the Kupang, Rote, or Savu smallpox outbreaks. Two non-open-access books remain to be checked: Knaap &amp; Sutherland, <i>Monsoon Traders</i> (2004), and Hägerdal &amp; Duggan, <i>Savu</i> (2018).`,
    },
    { id: "map-widget", wide: true, body: archipelagoMap },
    { id: "reader-widget", wide: true, body: manuscriptReader },
    {
      id: "interval-disease",
      body: (ref) => `<h2>Why long gaps matter more than a single date</h2>
        <p>Notice how often the Dutch clerks counted the years since the last visit. Ambon in 1787 had seen nothing like it since the early 1700s. Ternate in 1792 said smallpox had been absent for 27 years, pointing straight back to 1764–65, when the Makassar and Ternate papers do record an outbreak. Banjarmasin on southern Borneo wrote in October 1778 that nobody there had known smallpox since 1764. Even Makassar itself, a bigger and busier port, shows discrete bursts separated by seven to ten years: 1765–67 among the nobility of Tanete and Bone, 1772–73 when the king of Bima died and “thousands” perished on Sumbawa and Selayar, and spring 1782.${ref}</p>
        <p>That rhythm settles an older disagreement among historians of Southeast Asian medicine. Frank Fenner and Anthony Reid had suggested that smallpox became endemic (constantly circulating) in major Indonesian ports from the sixteenth century onward. Peter Boomgaard doubted it, noting he had never seen evidence for pre-1800 endemicity outside perhaps Batavia, which Ternate’s governors indeed describe in the 1780s as a place where smallpox “rages now and then.” Judy Campbell relied on Fenner’s assumption: if smallpox was always present in South Sulawesi, any year’s trepang fleet could carry it south. The Company’s eastern posts back Boomgaard instead. Because smallpox burned through these islands in sharp, spaced-out catastrophes, a crew sailing from Makassar could only carry the virus during an active epidemic, and in December 1788 Makassar was six years clear.</p>`,
      note: `Earlier VOC outbreaks confirming interval spacing: Makassar &amp; Ternate 1765–67 (<a href="${archive(3215, 1017)}">VOC 3215, scans 1017–1109</a>); Bima, Sumbawa &amp; Selayar 1772–73 (<a href="${archive(3389, 710)}">VOC 3389, scans 710–728</a>; single enslaved deaths at Castle Rotterdam in <a href="${archive(3358, 159)}">VOC 3358</a> and <a href="${archive(3412, 75)}">VOC 3412</a>); Banjarmasin Oct 1778 (<a href="${archive(3552, 1054)}">VOC 3552, scan 1054</a>); Ternate governors describing Batavia as periodically infected (<a href="${archive(8145, 82)}">VOC 8145, scan 82</a>; <a href="${archive(8148, 111)}">VOC 8148, scan 111</a>). All HTR text.`,
    },
    { id: "chronology", wide: true, body: chronologyTable },
    {
      id: "marege-bonus",
      body: (ref) => `<h2>What the harbour registers revealed, and a 1790 surprise about “Marege”</h2>
        <p>To check whether any Makassar fleet departures in late 1788 left clues about sickness or crew origins, we also parsed Makassar’s harbourmaster registers (<i>Sjabandhaars specificatien</i>) for 1781–82 and 1788–89. Here the archive taught us a useful boundary: the registers never list Australia as a destination. Every registered boat is a larger merchant vessel (2 to 25 <i>lasten</i>, skippered by Chinese, peranakan Chinese, Malay, Bugis, and Dutch burgher buyers) clearing for regional islands like Bonerate, Buton, Sumbawa, and Bima. As a 1767–68 Castle Rotterdam letter explains, the actual sea-cucumber fishers were poorer men working in tiny open boats of half a <i>last</i> to one <i>last</i> under separate “fishers’ passes” that sat below the harbourmaster’s threshold.${ref}</p>
        <p>Even so, the Australian voyages left vivid footprints right beside the registers. “Marege” (the Makassarese word for northern Australia) shows up as a sailor’s nickname as early as 1765: a skipper named <i>Bapa Marege</i> (“Father Australia”), and in 1782 a Makassar crewman called <i>Marege</i> sailing right alongside a shipmate named <i>Tripang</i>. Better yet, a Castle Rotterdam letter dated 17 June 1789 reports the price haggling with the captain of the annual Chinese junk and lists <i>“de triepangs Marege, zijn drie zoorten”</i> (three grades of Marege sea cucumber priced at 13, 12, and 11 Spanish rixdollars per picul), noting that nearly all the trepang fishers had already returned for the 1788–89 season.</p>
        <p>The clearest human witness turned up on Ternate, on 14 October 1790. Ten enslaved men who had escaped from Ambon in a small boat “to regain their freedom” were caught at Sula Besi and questioned by the Council of Justice. Eight of them (Kannis, 26; Pareba, 24; Djalie, 28; Hamuet, 30; Mamba, 22; Laboe, 35; Sauw, 24; and Samauw, 18) testified that they had been free men from Makassar who sailed <i>“op den Tripang vangst naar Marege”</i> (“on the trepang catch to Marege”), wrecked their boat, were seized by Bugis raiders, and were sold to the Dutch Company in Ambon. Ternate sent them back to Ambon in handcuffs. Checked directly against the manuscript image, their deposition puts a named Makassar crew and the explicit name <i>Marege</i> on paper thirteen years before the British explorer Matthew Flinders recorded the word from the Macassan captain Pobassoo off Arnhem Land in 1803.</p>`,
      note: `1767–68 fishers’-pass letter: <a href="${archive(3243, 43)}">VOC 3243, scans 43–44</a> (HTR). Crewman “Marege” beside “Tripang” (1782): <a href="${archive(3648, 286)}">VOC 3648, scan 286</a> (HTR). 17 June 1789 Marege trepang prices and fleet return: <a href="${archive(3858, 627)}">VOC 3858, scans 627–633</a> (HTR). 14 October 1790 Ternate deposition: <a href="${archive(3936, 167)}">VOC 3936, scan 167</a> (image-verified; resolution on scan 166; Ternate-to-Ambon letter of 4 Dec 1790 on scans 428–429). Whether this is the earliest European archival attestation of the word <i>Marege</i> still needs checking against C. C. Macknight’s <i>The Voyage to Marege’</i> (1976) and his 2011 revision.`,
    },
    {
      id: "method-intro",
      body: (ref) => `<h2 id="methodology">Full methodology: how to test an absence in a 4.8-million-page archive</h2>
        <p>Finding an old outbreak is straightforward; proving an archive is genuinely silent is much harder. A blank search result can easily mean you misspelled an eighteenth-century word, the handwriting software garbled the text, or clerks simply did not bother writing that sort of news down. To avoid fooling ourselves, we built a funnel with three calibration checks, testing what the archive <em>can</em> see before trusting what it does not.${ref}</p>
        <h3>1. Whole-corpus lexical sweep and volume funnel</h3>
        <p>We queried a local SQLite FTS5 index of all 4,790,000 handwritten-text-recognized (HTR) page scans from the GLOBALISE release of the VOC <i>Overgekomen Brieven en Papieren</i> (Nationaal Archief 1.04.02, Amsterdam and Zeeland chamber copies). Every page was searched with 24 primary terms covering period Dutch and Malay smallpox and measles vocabulary (<code>kinderpok*</code>, <code>kinderpock*</code>, <code>"kinder pokken"</code>, <code>"kinder pocken"</code>, <code>"kinder pokjes"</code>, <code>pokken</code>, <code>pocken</code>, <code>pokjes</code>, <code>pokjens</code>, <code>pockjes</code>, <code>pokskens</code>, <code>kinderziekte</code>, <code>"kinder ziekte"</code>, <code>kinderziekt*</code>, <code>pokziekte</code>, <code>poksiekte</code>, <code>pokzieckte</code>, <code>mazelen</code>, <code>maselen</code>, <code>tjatjar</code>, <code>tsjatsjar</code>, <code>chachar</code>, and <code>"spaanse/spaansche pokken"</code>), followed by 15 extra spelling variants as a check (<code>kindersiekte</code>, <code>kinder siekte</code>, <code>kinderzieckte</code>, <code>poxkens</code>, <code>de pok</code>, and others, which added zero Makassar hits).</p>
        <p>To prevent any volume-date mislabelling from hiding a document, we pulled every volume whose catalogue date range touched 1783–1792 and that contained at least five Makassar documents. That yielded 35 volumes of council resolutions, enclosures, general and secret letters, secret diaries, harbourmaster lists, and accounts. Every single one of the 42 smallpox-term pages inside those 35 volumes was read and accounted for individually.</p>`,
      note: `All queries were executed locally against the GLOBALISE v2 HTR dump (<a href="https://doi.org/10.34894/50ZYWS">DOI 10.34894/50ZYWS</a>, CC0) paired with the digitized VOC catalogue (<a href="https://doi.org/10.34894/OP20NM">DOI 10.34894/OP20NM</a>). Exact search terms and filtering logic are reproducible from <code>sweep.py</code> and <code>FUNNEL.md</code> in the research archive.`,
    },
    { id: "funnel-widget", wide: true, body: funnelTable },
    {
      id: "method-controls",
      body: (ref) => `<h3>2. Three positive controls that calibrate the silence</h3>
        <ol class="sp-controls-list">
          <li><strong>Vocabulary and HTR control:</strong> Could the handwriting recognizer be mangling Dutch smallpox words? No. The exact same query list retrieved nine different HTR spelling variants (<code>kinderziekte</code>, <code>kinder ziekte</code>, <code>kinderpokken</code>, <code>kinder pokjes</code>, <code>kindere pokken</code>, <code>kinder pocken</code>, <code>pokjes</code>, <code>pokken</code>, <code>kindersiekte</code>) across the Kupang 1786, Ambon 1786–87, Rote/Savu 1787, Belu 1789, Ternate 1791–92, and Makassar 1782 narratives, including Timor and Ternate letters physically bound inside the Makassar volumes themselves.</li>
          <li><strong>Same-office historical control:</strong> Did Castle Rotterdam’s clerks actually report smallpox when it struck? Yes. The exact same Makassar offices generated 10 smallpox pages in 1765–67, 14 pages in 1771–73 (down to single Company slaves dying <i>“aan de kinderziekte”</i> in council resolutions), and 2 pages in spring 1782.</li>
          <li><strong>Active-reporting, coverage, and broad-disease controls:</strong> Did Makassar’s records thin out in 1788–91? Across the 1786–92 Makassar volumes, 86% to 98% of pages carry recognized text (averaging 150 to 400 tokens per page), with frequent hits for <code>hospitaal</code> (up to 37 pages per volume) and <code>overleden</code> (“deceased,” up to 37 pages). Resolutions in 1788–91 continue logging deaths of enslaved Company workers by cause, specifically <i>“natuurlijke ziekte”</i> (“natural illness”). Finally, a broad disease sweep (<code>ziekte</code>, <code>sterfte</code>, <code>besmet*</code>, <code>grasseer*</code>, <code>epidemi*</code>, <code>pest*</code>) across the 1782–92 Makassar volumes catches real non-smallpox outbreaks: malignant fevers (<i>“quaadaartige koorts ziektens”</i>) in 1786–87 and European hospital sickness in 1790–91, confirming that illness was still being written down.${ref}</li>
        </ol>
        <h3>3. Image verification vs. machine transcription</h3>
        <p>Handwriting recognition is good enough to find pages, never good enough to trust on its own. We fetched full-resolution IIIF scans directly from the Nationaal Archief for seven key pages: Makassar 1782 (<code>3623_0137</code>), Kupang 1786 (<code>3732_0552</code>), Ambon 1787 (<code>3755_0100</code>), Rote/Savu 1787 (<code>3810_0432</code>), Pasir 1789 (<code>3863_0815</code>), Belu 1789 (<code>8307_0054</code>), and the Ternate Marege deposition of 1790 (<code>3936_0167</code>). All seven matched the HTR readings against the ink. Every remaining quotation (Banda 1784, Ternate 1791–92, Solor 1792, the earlier 1765–73 Makassar outbreaks, the harbourmaster tables, and the 17 June 1789 price note) is explicitly marked as HTR text and should be checked against scans before formal publication.</p>`,
      note: `1788–91 Makassar slave-death entries (“natuurlijke ziekte”): <a href="${archive(3905, 334)}">VOC 3905, scan 334</a>; <a href="${archive(8258, 165)}">VOC 8258, scans 165 &amp; 272</a>. 1786–87 malignant fevers: <a href="${archive(3760, 26)}">VOC 3760, scans 26, 176, 245</a>. 1790–91 European hospital sickness: <a href="${archive(3939, 24)}">VOC 3939, scans 24 &amp; 232</a>; <a href="${archive(8258, 309)}">VOC 8258, scan 309</a>. Searches for inoculation terms (<code>inent*</code>, <code>inocul*</code>) returned zero across all Makassar volumes.`,
    },
    {
      id: "limits-next",
      body: (ref) => `<h2>What this does not settle, and what to check next</h2>
        <p>An honest archive sweep has to state its blind spots. Even with three working controls, four real limits remain:</p>
        <ul class="sp-summary-list">
          <li><strong>The Hague is not Jakarta.</strong> GLOBALISE covers the copies shipped home to the Netherlands. Papers kept only at Makassar (now in the Arsip Nasional in Jakarta) and the original Batavia daily registers were not searched.</li>
          <li><strong>Big outbreaks can leave thin paper trails.</strong> Makassar’s spring 1782 epidemic, severe enough to require four-foot graves, turns up on just two pages in a full year of records. A minor or coastal outbreak outside Castle Rotterdam’s immediate notice could slip past a keyword search.</li>
          <li><strong>Crews were mixed across islands.</strong> Finding Makassar clear in December 1788 eliminates the specific starting point Campbell assumed, and agrees with Nitschke et al.’s 2026 epidemiological model on independent grounds. It cannot by itself prove that no sailor from Timor or another island carried smallpox aboard a boat, though the only documented 1789 outbreaks nearby (Pasir and interior Belu) lie off the main trepang track.</li>
          <li><strong>Two key books remain unchecked.</strong> Gerrit Knaap and Heather Sutherland’s <i>Monsoon Traders</i> (2004, which analyzes the Makassar shipping registers for 1786–89) and Hans Hägerdal and Geneviève Duggan’s <i>Savu</i> (2018) were not open access and still need a specialist check alongside C. C. Macknight’s trepang work.</li>
        </ul>
        <p>Four concrete steps would close the remaining gaps: read Makassar’s secret diaries for October to December 1788 page by page as a manual recall check; inspect the Nationaal Archief scans for Ternate 1791–92 and Solor 1792; check the Kupang shipping lists for 1788 (<code>VOC 3810, fol. 93</code>) to see whether Timor or Solor sailors joined the southward trepang voyages; and compare the 1782–92 chronology directly against First Fleet medical journals and Aboriginal oral histories of the 1789 epidemic.${ref}</p>`,
      note: `Related open problem page with bibliography, archives, and approach suggestions: <a href="/p/sydney-smallpox">How did smallpox reach Aboriginal communities around Sydney in 1789?</a> For the Kupang 1788 shipping list lead, check <a href="${archive(3810, 93)}">VOC 3810 (Timor papers, 1787–88)</a>.`,
    },
  ];

  return `<article class="leads-page smallpox-lead">
    <div class="lead-page-links">
      <a class="back" href="/leads">← All leads</a>
      <a class="methodology-jump" href="#methodology">Full methodology ↓</a>
    </div>
    <header class="sp-mast">
      <div>
        <p class="lead-label">Makassar &amp; Sydney, 1781–1792 · Disease history</p>
        <h1 class="page-title">${makassarSmallpoxTitle}</h1>
        <p class="sp-deck">${makassarSmallpoxDescription}</p>
        <p class="sp-jumps"><a href="#archipelago-map">Explore the outbreak map ↓</a> · <a href="#reader">Read the manuscripts ↓</a></p>
      </div>
      <figure>
        <a href="${media}/scan-3623-0137.webp" aria-label="Enlarge the full 1782 Makassar council resolution spread">
          <img src="${media}/crop-makassar-1782.webp" width="1599" height="943" alt="Detail of the spring 1782 Makassar council resolution ordering four-foot graves because smallpox was raging daily.">
        </a>
        <figcaption>Castle Rotterdam’s spring 1782 smallpox resolution, ordering graves dug four feet deep. <a href="${archive(3623, 137)}">VOC 3623, scan 137 ↗</a></figcaption>
      </figure>
    </header>
    ${notedPassages(passages)}
    <footer class="sp-footer">
      <p>Related open problem</p>
      <a href="/p/sydney-smallpox">How did smallpox reach Aboriginal communities around Sydney in 1789? →</a>
    </footer>
  </article>
  <script type="module">
    const mapBox = document.querySelector("#archipelago-map");
    if (mapBox) {
      const nodes = [...mapBox.querySelectorAll(".map-node")];
      const cards = [...mapBox.querySelectorAll(".map-detail-card")];
      const select = (id) => {
        for (const n of nodes) {
          const on = n.dataset.place === id;
          n.classList.toggle("is-selected", on);
          n.setAttribute("aria-pressed", String(on));
        }
        for (const c of cards) c.hidden = c.dataset.detail !== id;
      };
      for (const n of nodes) {
        n.addEventListener("click", () => select(n.dataset.place));
        n.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(n.dataset.place);
          }
        });
      }
    }
  </script>`;
}
