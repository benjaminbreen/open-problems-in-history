import { notedPassages } from "../../lib/lead-notes.js";
import { leadByline } from "../../render.js";

export const phantomTitle = "Disasters that never happened";
export const phantomDescription = "How a 1786 hiking trip entered the Smithsonian catalogue as a confirmed volcanic eruption, a 1934 Italian town suffered an earthquake in 1248, and 145,784 duplicate deaths leaked into public charts—and what happens when AI agents check global hazard databases back against the original historical pages.";

const media = "/media/leads/phantom-disasters";

function ghostTracerExhibit() {
  return `
    <section class="source-exhibit ghost-tracer" id="ghost-tracer" aria-labelledby="ghost-tracer-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Interactive Exhibit 1 · From Archive to Database</p>
          <h2 id="ghost-tracer-title">Trace six false entries back to the original page</h2>
          <p class="exhibit-intro">Pick any case below to follow how a real 18th- or 19th-century record turned into a duplicate or misdated disaster in a live scientific database.</p>
        </div>
      </div>

      <div class="ghost-tabs" role="tablist" aria-label="Select a documented error case">
        <button type="button" class="ghost-tab is-active" role="tab" aria-selected="true" data-case="merapi">
          <span class="tab-tag">Hike → Eruption</span>
          <strong>Merapi 1786</strong>
        </button>
        <button type="button" class="ghost-tab" role="tab" aria-selected="false" data-case="lamongan">
          <span class="tab-tag">10-year slip</span>
          <strong>Lamongan 1808</strong>
        </button>
        <button type="button" class="ghost-tab" role="tab" aria-selected="false" data-case="raung">
          <span class="tab-tag">Wrong volcano</span>
          <strong>Raung / Ijen 1817</strong>
        </button>
        <button type="button" class="ghost-tab" role="tab" aria-selected="false" data-case="bromo">
          <span class="tab-tag">Weekday alibi</span>
          <strong>Bromo 1825 vs. 1829</strong>
        </button>
        <button type="button" class="ghost-tab" role="tab" aria-selected="false" data-case="rinjani">
          <span class="tab-tag">Year typo</span>
          <strong>Rinjani 1909 vs. 1900</strong>
        </button>
        <button type="button" class="ghost-tab" role="tab" aria-selected="false" data-case="almanac">
          <span class="tab-tag">Almanac &amp; 1934 town</span>
          <strong>Sabaudia 1248 &amp; Izmir 1668</strong>
        </button>
      </div>

      <div class="ghost-stage" id="ghost-stage" aria-live="polite">
        <noscript><p>Enable JavaScript to inspect all six cases interactively.</p></noscript>
      </div>
    </section>
  `;
}

function scoreboardExhibit() {
  return `
    <section class="source-exhibit scoreboard-viz" id="scoreboard-viz" aria-labelledby="scoreboard-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Interactive Exhibit 2 · Public Charts vs. Specialist Catalogues</p>
          <h2 id="scoreboard-title">How far do the copying errors travel?</h2>
          <p class="exhibit-intro">Switch between the two views below. The first shows how a hidden NOAA duplicate flag inflates historical death tolls in Our World in Data. The second tests whether the specialist catalogues used by geophysicists contain copying duplicates of their own.</p>
        </div>
        <div class="view-switch" role="group" aria-label="Select scoreboard view">
          <button type="button" class="view-btn is-active" data-view="owid" aria-pressed="true">1. The OWID Death-Toll Leak</button>
          <button type="button" class="view-btn" data-view="gold" aria-pressed="false">2. Specialist Catalogue Test</button>
        </div>
      </div>

      <div class="scoreboard-panel" id="scoreboard-panel" aria-live="polite"></div>
    </section>
  `;
}

function klugeInspectorExhibit() {
  return `
    <section class="source-exhibit kluge-inspector" id="kluge-inspector" aria-labelledby="kluge-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Interactive Exhibit 3 · One Page, Four Entries</p>
          <h2 id="kluge-title">One 1863 table, four revealing lines</h2>
          <p class="exhibit-intro">Toggle the highlights below to inspect a single page from an 1863 German eruption table. On the same column sit the 1786 Merapi hike, the misdated 1808 Lamongan entry, the real 1817 Ijen eruption (still under the right volcano), and the real 1818 Lamongan eruption ten lines below its own duplicate.</p>
        </div>
        <label class="highlight-toggle">
          <input type="checkbox" id="kluge-toggle" checked>
          <span>Highlight the four entries on the 1863 scan</span>
        </label>
      </div>

      <div class="kluge-grid">
        <figure class="kluge-scan-wrap">
          <div class="kluge-frame is-highlighted" id="kluge-frame">
            <a href="${media}/kluge-1863-p65.webp" aria-label="Open full 1863 page scan of Emil Kluge p. 65">
              <img src="${media}/kluge-1863-crop.webp" width="361" height="1143" alt="Column from Emil Kluge's 1863 volcanic eruption table showing Merapi 1786, Lamongan 1808, Idjen 1817, and Lamongan 1818." loading="lazy">
            </a>
            <button type="button" class="kluge-box box-amber is-selected" data-entry="merapi" style="left:6%;top:6.0%;width:90%;height:4.8%;" aria-label="Inspect Merapi 1786 on scan"></button>
            <button type="button" class="kluge-box box-red" data-entry="lam1808" style="left:6%;top:47.2%;width:90%;height:5.1%;" aria-label="Inspect Lamongan 1808 on scan"></button>
            <button type="button" class="kluge-box box-teal" data-entry="ijen1817" style="left:6%;top:82.4%;width:90%;height:2.9%;" aria-label="Inspect Idjen 1817 on scan"></button>
            <button type="button" class="kluge-box box-teal" data-entry="lam1818" style="left:6%;top:89.0%;width:90%;height:4.7%;" aria-label="Inspect Lamongan 1818 on scan"></button>
          </div>
          <figcaption>Emil Kluge, <em>Ueber Synchronismus und Antagonismus von vulkanischen Eruptionen</em> (1863), p. 65 · <a href="${media}/kluge-1863-p65.webp">Open full page ↗</a></figcaption>
        </figure>

        <div class="kluge-notes">
          <div class="kluge-card is-selected" data-entry="merapi" tabindex="0">
            <p class="kluge-badge badge-amber">Line 3 · 1786 · Not an eruption</p>
            <h3>“Merapi auf Java am 17. Juli … 1786.”</h3>
            <p>Here the 1786 climb has already hardened into a bare eruption date. In the original 1792 account, July 17 was simply the morning the Dutch engineer left town to hike up the mountain. The Smithsonian catalogue still lists it as a confirmed eruption (<code>#15865</code>).</p>
          </div>
          <div class="kluge-card" data-entry="lam1808" tabindex="0">
            <p class="kluge-badge badge-red">Line 19 · 1808 · Misdated copy</p>
            <h3>“Lamongan am 8. December … 1808.”</h3>
            <p>Copied from an 1836 French edition that cited an 1826 Latin book on the 8 November 1818 eruption, but accidentally changed both month and year. It still sits in the Smithsonian catalogue as confirmed eruption <code>#13674</code>, right inside the search window for the mysterious 1808–09 climate-cooling volcano.</p>
          </div>
          <div class="kluge-card" data-entry="ijen1817" tabindex="0">
            <p class="kluge-badge badge-teal">Line 27 · 1817 · Still under the right volcano</p>
            <h3>“Idjen … 1817.”</h3>
            <p>In 1863 this catastrophic acid-lake eruption was still listed under Kawah Ijen, where it actually happened. Fifty-four years later, another German compiler filed the exact same dates under neighboring Mount Raung, creating a second major eruption that survives in global databases today.</p>
          </div>
          <div class="kluge-card" data-entry="lam1818" tabindex="0">
            <p class="kluge-badge badge-teal">Line 29 · 1818 · The real original</p>
            <h3>“Lamongan am 8. November … 1818.”</h3>
            <p>Ten lines below the misdated 1808 copy sits the real 8 November 1818 eruption. Once a copying slip gives an event a new year, later compilers merging two lists see two separate disasters and never suspect they are the same event.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function lindeSacksFigure() {
  const rows = [
    { year: "1818", pair: "Semeru / Bima", lag: "Day 0", cls: "Same sentence, wrong volcano", clsType: "bad", detail: "The 1845 German source actually names Lamongan, in the very sentence reporting the earthquake (“at the same time there was an earthquake”)." },
    { year: "1833", pair: "Kaba / Bengkulu", lag: "Day 0", cls: "Guess based on the quake", clsType: "bad", detail: "The Batavia newspaper Javasche Courant (7 Feb 1834) says people attributed the earthquake to a volcanic eruption. Only a crater lake vanished." },
    { year: "1889", pair: "Banua Wuhu / Moluccas", lag: "Day 0", cls: "Inferred from dead fish", clsType: "bad", detail: "A local letter guessed at an underwater eruption because dead fish washed ashore after the shock. The catalogue’s 6–9 September span is just the gap from the quake to the dead fish." },
    { year: "1837", pair: "Villarrica & Osorno / Valdivia", lag: "Day 0", cls: "Absent from official reports", clsType: "bad", detail: "The original provincial reports from Valdivia and Chiloé describe the great earthquake but mention no eruption." },
    { year: "1730 & 1737", pair: "Villarrica / Chile", lag: "Day 0", cls: "Unresolved (town abandoned)", clsType: "warn", detail: "The town of Villarrica stood abandoned from 1602 to 1882, and no contemporary eyewitness account has been found for either date." },
    { year: "1868", pair: "Cotopaxi & Pichincha / Ecuador", lag: "Day 0", cls: "Placeholder / near-constant activity", clsType: "warn", detail: "Both volcanoes were active almost every year, and Pichincha’s date carries a ±15-day placeholder." },
    { year: "1913", pair: "Ambrym / Vanuatu", lag: "Day 0", cls: "Date mismatch", clsType: "warn", detail: "Newspapers and Geological Magazine place the main eruption on 6–7 December 1913, not 14 October." },
  ];

  return `
    <section class="source-exhibit co-report-exhibit" id="co-reporting" aria-labelledby="co-report-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Case Study · When Folklore Becomes Data</p>
          <h2 id="co-report-title">Inside the pre-1900 “earthquakes trigger eruptions” spike</h2>
          <p class="exhibit-intro">Rebuilding a famous 1998 <em>Nature</em> test on current NOAA and Smithsonian data for 1500–1925 reproduces a sharp spike: 10 coincidences against 1.04 expected by chance. Yet <strong>9 of the 10 land on the exact same day</strong>, and tracing the original reports confirms zero independent same-day eyewitnesses.</p>
        </div>
      </div>

      <div class="co-report-strip" aria-label="Summary of pre-1900 earthquake-eruption coincidences">
        <div class="stat-pill"><span class="stat-num">10</span><span class="stat-lbl">Pre-1900 coincidences<br>(vs. 1.04 expected)</span></div>
        <div class="stat-pill"><span class="stat-num">9 / 10</span><span class="stat-lbl">Land on Day 0<br>(not spread across days 0–5)</span></div>
        <div class="stat-pill stat-pill-red"><span class="stat-num">5</span><span class="stat-lbl">Shown to be the quake story<br>or a guess from the quake</span></div>
        <div class="stat-pill stat-pill-teal"><span class="stat-num">0</span><span class="stat-lbl">Confirmed independent<br>same-day eyewitnesses</span></div>
      </div>

      <div class="table-scroll">
        <table class="phantom-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Volcano / Quake pair</th>
              <th>Lag</th>
              <th>Source-check verdict</th>
              <th>What the original historical record actually says</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>
              <td class="nowrap"><strong>${r.year}</strong></td>
              <td>${r.pair}</td>
              <td class="nowrap">${r.lag}</td>
              <td><span class="pill pill-${r.clsType}">${r.cls}</span></td>
              <td>${r.detail}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="table-footnote">Caveat: this rebuild checks the current NOAA and Smithsonian pre-1925 coincidence set against primary sources. We have not yet checked Linde &amp; Sacks’s printed 11-case table or two regional compilations (Petit-Breuilh on Chile; Wolf’s <em>Crónica</em> on Ecuador).</p>
    </section>
  `;
}

export function phantomHTML() {
  const passages = [
    {
      id: "opening-errors",
      body: ref => `
        <h2>Three disasters that never happened</h2>
        <p>When journalists, climate researchers, or disaster historians look up the deadliest earthquakes and largest volcanic eruptions of the past five centuries, they turn to the same global databases: the <strong>NOAA Significant Earthquake Database</strong>, the <strong>Smithsonian Global Volcanism Program (GVP)</strong>, and public chart sites like <strong>Our World in Data</strong> that draw on them. Because these databases return clean rows of dates, coordinates, magnitudes, and death tolls, it is easy to assume their older entries rest on solid scientific records.</p>
        <p>Check the original books and newspapers behind those rows, and a different picture emerges. Pre-1900 rows often behave less like instrument readings than like medieval manuscripts, full of scribal slips, bad translations, and old almanac rumors passed from book to book:${ref}</p>
        <ul class="ghost-trio">
          <li><strong>An earthquake in a town that did not exist yet.</strong> NOAA records a 1248 earthquake killing 9,000 people in <em>Sabaudia, Italy</em>. The actual disaster was a limestone rockfall on Mont Granier in Alpine Savoy (<em>Sabaudia</em> in Latin)—a landslide in France that was matched to a coastal Italian town founded by Benito Mussolini in 1934.</li>
          <li><strong>A morning hike recorded as a “confirmed eruption.”</strong> The Smithsonian catalogue lists Mount Merapi in Java as erupting on 17 July 1786 (<code>#15865</code>). In the original 1792 Dutch account by army engineer François van Boekhold, 17 July is simply the morning he left Salatiga to climb the mountain. At the top he saw ordinary burning sulfur and remarked that with proper gear one could walk close enough to toss a stone into the vent.</li>
          <li><strong>145,784 duplicate deaths leaked into public charts.</strong> NOAA’s curators do mark duplicate earthquakes inside their records. Yet NOAA’s bulk download API omits that duplicate flag completely, and 18 flagged rows still keep their death tolls. As a result, Our World in Data counts 145,784 deaths on rows NOAA itself marked as duplicates—doubling Italy’s 1693 Sicily disaster to 120,000 deaths and keeping a non-existent 1668 Izmir earthquake with 17,500 fatalities.</li>
        </ul>
      `,
      note: `Based on our 23 November 2026 audit (<code>GVPPhantomAudit</code>), which inspected all 3,180 pre-1926 NOAA earthquake records individually via the per-event API and cross-checked them against AHEAD/EPICA (5,703 European events), Italy’s CPTI15 v4.0 (4,894), GEM-GHEC v1 (825), LaMEVE v3 (2,310 large eruptions), and Smithsonian GVP.`,
    },
    {
      id: "why-it-matters",
      body: ref => `
        <h2>Why this matters beyond fixing typos</h2>
        <p>A few dozen wrong rows out of roughly 16,000 historical disasters might sound like small housekeeping. No volcano’s broad hazard picture collapses because one 1825 date was copied from 1829. What makes these errors consequential is what they expose about how historical evidence enters modern science.${ref}</p>
        <p>Fields like seismology, volcanology, paleoclimatology, and historical epidemiology all rely on written records for the centuries before instruments. Yet the work of checking those records falls between disciplines. Geophysicists treat historical catalogues as ready-made inputs; they rarely have time to chase a 1792 Dutch journal, an 1826 Latin dissertation, or an Edo-period Japanese chronicle. Historians know how to trace how books copy one another, but they rarely write code to scan 16,000 database rows for statistical patterns of copying errors.</p>
        <p>The result is a forty-year gap between specialist scholarship and public data. European historical seismologists have spent decades weeding out invented and duplicated earthquakes, yet their corrections rarely reach NOAA’s global database or the Our World in Data charts built on top of it. Outside Europe—especially in Indonesia and Latin America—no equivalent purge has ever taken place, so modern global catalogues still lean heavily on 19th-century European compilations.</p>
      `,
      note: `Italy’s CFTI5Med catalogue flags 98 of 1,259 historical Italian earthquakes as false, and AHEAD/SHEEC (Stucchi et al. 2013) incorporates four decades of European critical studies (including Ambraseys). On volcanoes, prior work on Smithsonian GVP (Deligne et al. 2010; Brown et al. 2014; Rougier et al. 2016, 2018) studies <em>under-recording</em> rather than false positives. Outside Europe, Indonesian GVP entries still rest heavily on Franz Junghuhn (1857) and Karl Sapper (1917).`,
    },
    {
      id: "tracer-exhibit",
      wide: true,
      body: ghostTracerExhibit,
    },
    {
      id: "popular-almanacs",
      body: ref => `
        <h2>How popular almanacs ended up inside NOAA</h2>
        <p>Tracing five major NOAA errors back through printed books turned up a sobering pattern: when two or three catalogues agree on a disaster, they are often copying the same mistake rather than confirming one another.</p>
        <p>Consider two high-casualty entries in NOAA: an <strong>1137 earthquake in Catania</strong> (15,000 dead; the real destruction happened in 1169) and a <strong>16 September 1857 earthquake in Montemurro</strong> (10,000 dead; a misdated copy of the 16 December 1857 Basilicata earthquake, which doubles Italy’s 1857 death toll to 20,000 in Our World in Data). Neither error came from a seismologist. Both were repeated in popular almanacs and date books, reprinted in newspapers after the 1886 Charleston earthquake, gathered into an 1888 Congressional report, and copied straight into modern tables.${ref}</p>
      `,
      note: `Popular-almanac chain: <em>The Tablet of Memory</em> (1787) → Tegg → <em>Haydn’s Dictionary of Dates</em> → newspaper disaster lists after the 1886 Charleston quake → “U.S. Congress 1888, <em>Great Earthquakes</em>” (NOAA Reference <code>1073</code>, cited by 51 NOAA rows totaling 712,877 deaths). Similarly, NOAA’s 1668 Izmir earthquake (17,500 dead) comes from John Milne’s 1688 Smyrna entry with two digits swapped (17,500 is the midpoint of Milne’s “15,000–20,000”), repeated in later regional catalogues (Ergin 1967; Shebalin 1974).`,
    },
    {
      id: "lambesc-precision",
      body: ref => `
        <p>Other errors grew more specific every time someone copied them. A medieval Bavarian chronicle mentions a 1227 Alpine rockfall in a vaguely named region. Over the next three centuries, successive compilers guessed at the place and the toll—moving it first to the Rhône valley, then to the region around Aix-en-Provence, then adding a death toll of 5,000—until 20th-century catalogues placed exact coordinates on the French town of Lambesc, where NOAA still lists 5,000 earthquake deaths.${ref}</p>
      `,
      note: `The Lambesc chain runs from Aventinus’s 1227 Alpine rockfall (“in Salviorum gente”) → Karl von Hoff (Rhône) → Alexis Perrey (Pays d’Aix) → Robert Mallet (5,000 killed) → John Milne (Aix) → Rothé and Montandon → NOAA “Lambesc.” Each copyist added precision the original chronicle never supported.`,
    },
    {
      id: "scoreboard-section",
      wide: true,
      body: scoreboardExhibit,
    },
    {
      id: "gold-standards",
      body: ref => `
        <h2>Do the specialist catalogues scientists actually use fare better?</h2>
        <p>A seismologist reading this would rightly point out that serious hazard models do not rely on NOAA’s public table. Instead, researchers use curated regional and global catalogues vetted by specialists. So our second pass tested those gold-standard catalogues directly.</p>
        <p>The findings split cleanly along a single dividing line: <strong>whether a catalogue was rebuilt from primary historical studies, or assembled by merging older tables.</strong>${ref}</p>
        <ul class="finding-list">
          <li><strong>NOAA’s headline European errors stay out of the specialist earthquake catalogues.</strong> Every major NOAA error we checked (Izmir 1668, Sabaudia 1248, Catania 1137, Montemurro Sept 1857, Cosenza 1757) is absent from Italy’s national catalogue, Europe’s main hazard catalogue, and the global large-earthquake catalogue. For earthquakes, those errors distort public statistics like Our World in Data rather than modern hazard models.</li>
          <li><strong>Italy’s national catalogue passes the duplicate test cleanly.</strong> When we search for nearby, same-day earthquakes whose years differ by a single digit (or by one year), Italy’s catalogue shows 9 pairs against 7.1 expected by chance—pure coincidence. Because Italian seismologists rebuilt every entry from primary studies, old copying duplicates were eliminated.</li>
          <li><strong>Outside Italy, even the specialist earthquake catalogues contain duplicates of their own.</strong> Europe’s main historical catalogue shows roughly <strong>11 excess year-typo pairs</strong>, concentrated in older rows inherited from bare tabular lists rather than primary studies. Examples include a non-existent 22 December <strong>1883</strong> Lisbon shock copied from 22 December 1884 (with the false copy assigned a <em>larger</em> magnitude than the real quake) and five Swiss shocks at Neuchâtel duplicated one year early in <strong>1875/1876</strong>. The global large-earthquake catalogue also carries a probable duplicate M6.7 shock near Lima in <strong>1696</strong>, whose exact 09:00 GMT timestamp is the converted local time of the real 1699 Lima shock.</li>
          <li><strong>In volcanology, there is no independent check.</strong> The Smithsonian catalogue <em>is</em> the reference, and the global large-eruption database inherits directly from it. As a result, a 1917 misfiling of Java’s 1817 Ijen disaster under neighboring <strong>Mount Raung</strong> still sits inside the large-eruption database as a magnitude-4.7 eruption (0.55 km³) sourced to nothing but the Smithsonian. Across 1,148 dated pre-1900 Smithsonian eruptions, our test flagged 20 dated pairs against roughly 6 expected by chance; reading all 20 confirmed <strong>10 clear or probable duplicates</strong> (including Etna 1723/1727, Serua 1692/1693, and five Edo-period Mount Asama rows) alongside 7 genuine coincidences.</li>
        </ul>
      `,
      note: `Catalogues tested: Italy’s <strong>CPTI15 v4.0</strong> (4,894 events; clean), Europe’s <strong>AHEAD/EPICA v1.1</strong> (5,703 events behind the 2020 European Seismic Hazard Model, ESHM20; +11 excess), <strong>GEM-GHEC v1</strong> (825 large global earthquakes; Peru 1696), <strong>EMTC 2.0</strong> (294 Euro-Med tsunamis; clean on Izmir), <strong>LaMEVE / VOGRIPA v3</strong> (2,310 large eruptions; carries Raung 1817 VEI 4), and <strong>Smithsonian GVP</strong>. On Mount Asama, five unsourced entries from an 1894 compilation (<em>Nihon Saii-shi</em>) carry Japanese lunar dates that convert to the <em>exact</em> Western calendar day of sourced Edo chronicles one or two years away—impossible under ordinary lunisolar drift (~11 or ~19 days), implying a misdated Western year was back-converted into a lunar date.`,
    },
    {
      id: "kluge-section",
      wide: true,
      body: klugeInspectorExhibit,
    },
    {
      id: "co-reporting-prose",
      body: ref => `
        <h2>When a 19th-century assumption becomes a <em>Nature</em> finding</h2>
        <p>Sometimes an unaudited historical database feeds straight back into published science. In 1998, a widely cited <em>Nature</em> paper compared historical earthquake and volcano catalogues and found that great earthquakes (magnitude 8 and above) were followed by volcanic eruptions within five days and 800 kilometers roughly four times more often than chance.</p>
        <p>When we rebuilt that test on current NOAA and Smithsonian records for 1500–1925, the statistical spike came right back: <strong>10 coincidences against 1.04 expected by chance</strong>. One clue immediately stood out: <strong>nine of the ten happened on the exact same day as the earthquake</strong>, instead of spreading across a zero-to-five-day window. Reading the 19th-century reports behind those entries explained why. In the 1800s, witnesses and colonial officials routinely assumed a terrifying earthquake must have been caused by a nearby volcano—or inferred an underwater eruption when dead fish washed ashore after a shock. Later compilers turned those guesses into dated eruption rows, and a late-20th-century statistical study read them back as physical proof that earthquakes trigger eruptions.${ref}</p>
        <p>That historical explanation fits modern geophysics cleanly: a 2018 re-examination showed that the short-term triggering spike disappears once you restrict the test to post-1900 instrumental records.</p>
      `,
      note: `A. T. Linde &amp; I. S. Sacks, “Triggering of volcanic eruptions,” <em>Nature</em> 395 (1998): 888–890; T. M. Sawi &amp; M. Manga, “Revisiting short-term earthquake triggered volcanism,” <em>Bull. Volcanol.</em> 80 (2018): 57. Our pre-1925 rebuild used 200 random date-shift nulls in <code>scripts/linde_sacks_rebuild.py</code>.`,
    },
    {
      id: "co-reporting-table",
      wide: true,
      body: lindeSacksFigure,
    },
    {
      id: "methodology",
      body: ref => `
        <h2 id="methodology">What this suggests for AI-assisted historical auditing</h2>
        <p>Beyond fixing individual entries, this audit points to a practical method: <strong>pairing statistical code with multilingual archival reading and a skeptical second agent makes it possible to check the historical foundations of scientific datasets systematically.</strong></p>
        <p>That division of labor mattered at every step of this investigation:${ref}</p>
        <ol class="method-steps">
          <li><strong>Step 1 — Statistical screening (Python, no AI guessing):</strong> Rather than asking a language model to browse 16,000 rows by eye, a short script tests each catalogue against its own chance baseline—for example, counting how many nearby, same-day pairs differ by one year digit. On the Smithsonian volcano catalogue, that filter narrowed 1,148 dated pre-1900 eruptions down to 20 inspectable pairs, and the extra pairs turned out to be real copying errors. (Running the same test on the 6,111-event NCEI/Krivsky aurora catalogue found 2,422 observed vs. 2,432 expected—a useful negative control.)</li>
          <li><strong>Step 2 — Multilingual primary-source reading (First agent):</strong> Research agents tracked each flagged pair back into Dutch colonial newspapers, 18th-century Batavia academy volumes, 19th-century German and French volcanology, Latin dissertations, and Japanese chronicle tables. Whenever a contemporary report named a day of the week—like Bromo’s “Thursday, 5 November”—simple calendar math turned a suspected typo into a proof.</li>
          <li><strong>Step 3 — Skeptical cross-check (Second agent):</strong> A second model checked the first round of findings against live per-event API records and specialist catalogues. That review changed the results substantially: it withdrew false alarms (including Algeria 1855, which NOAA had already flagged, and doubtful tsunami rows where NOAA’s validity scoring was working as intended), caught NOAA’s missing <code>flagDuplicate</code> API field, tested the specialist catalogues, and uncovered the 1998 <em>Nature</em> co-reporting loop.</li>
          <li><strong>Step 4 — Open errata ready for human curators:</strong> Every suspect row is documented with page scans, confidence grades, and explicit caveats, ready to review before anything is sent to NOAA, Smithsonian, or Our World in Data maintainers.</li>
        </ol>
      `,
      note: `The same workflow—statistical anomaly check, multilingual primary-scan verification, and a skeptical second-agent audit—can be applied to historical climate proxy tables, extinction chronologies, historical disease registries, and price series, wherever modern quantitative science rests on 18th- and 19th-century documentary compilations.`,
    },
    {
      id: "data-and-limits",
      body: ref => `
        <h2>Data, open errata, and what still needs checking</h2>
        <p>These findings do <strong>not</strong> overturn modern seismic hazard maps or erase volcanic risk. They do affect public historical fatality charts in Our World in Data, a small set of legacy duplicates inside specialist catalogues (including a magnitude-4.7 eruption in the global large-eruption database), and our explanation of why pre-1900 catalogue coincidences can mimic earthquake-triggered volcanism.</p>
        <p>Before submitting a formal data note or sending batch corrections to database curators, three checks remain open:${ref}</p>
        <ul class="limits-list">
          <li><strong>A random-sample error rate:</strong> Our cases came from targeted duplicate detectors and a cross-catalogue comparison (where 106 of 605 pre-1900 Mediterranean NOAA rows had no European counterpart). Checking a fixed random sample of roughly 60 Smithsonian and 60 NOAA pre-1900 rows against their cited sources will give a true measured error rate with confidence bounds.</li>
          <li><strong>Remaining regional checks:</strong> Comparing our co-reporting table against the printed 1998 <em>Nature</em> case list and regional compilations for Chile and Ecuador, plus checking four unverified dates (Merapi 1678, Fuego 1856, Mont Granier 1248, and 1457–58).</li>
          <li><strong>Curator feedback:</strong> Submitting documented batches to NOAA, the Smithsonian, and Our World in Data and tracking how many corrections are accepted—the cleanest external test of automated historical auditing.</li>
        </ul>
        <div class="download-bar">
          <a class="download-btn" href="${media}/smithsonian_gvp_errata_2026.csv" download>Smithsonian GVP Errata (CSV · 16 cases) ↓</a>
          <a class="download-btn download-btn-alt" href="${media}/noaa_hazel_errata_2026.csv" download>NOAA Quake &amp; Tsunami Errata (CSV · 23 cases) ↓</a>
        </div>
      `,
      note: `Both errata CSVs preserve the 23 November 2026 second-agent review notes—including withdrawn false alarms (<code>NOAA-05</code>) and rows still marked <code>NEEDS CHECK</code> (<code>NOAA-15</code>, <code>GVP-16</code>). Remaining specialist sources to check: Linde &amp; Sacks’s printed 11-case table, Petit-Breuilh (Chile), Wolf’s <em>Crónica</em> (Ecuador 1868), Voight et al. (2000) on Merapi 1678, <em>Gaceta de Guatemala</em> on Fuego 1856, Berlioz (1987) on Mont Granier 1248, and Ambraseys (2009) on 1457–58.`,
    },
  ];

  return `
    <article class="leads-page phantom-lead">
      <div class="lead-page-links">
        <a class="back" href="/leads">← All leads</a>
        <a class="methodology-jump" href="#methodology">How the two-agent audit worked ↓</a>
      </div>

      <header class="phantom-mast">
        <div class="phantom-mast-copy">
          <p class="lead-label">Global, 1248–1913 · Historical geophysics &amp; data auditing</p>
          <h1 class="page-title">${phantomTitle}</h1>
          <p class="phantom-deck">A 1786 hiking trip sits in the Smithsonian catalogue as a confirmed volcanic eruption. A medieval French landslide sits in NOAA as an earthquake in a town founded in 1934. Here is what surfaces when AI agents work in tandem to check global hazard databases back against the original historical pages.</p>
          ${leadByline(
            [
              ["Gemini 4", "Initial NOAA/GVP duplicate sweeps, primary-scan proof pack, and writeup."],
              ["Claude Opus 5.5", "Second-agent audit, hidden-flag API catch, specialist catalogue tests, source chains, and Nature 1998 rebuild."],
            ],
            `<a href="#ghost-tracer">Trace six cases ↓</a> · <a href="#scoreboard-viz">Public &amp; specialist scoreboard ↓</a> · <a href="#kluge-inspector">1863 scan highlights ↓</a>`
          )}
        </div>
        <figure class="phantom-hero-fig">
          <a href="${media}/boekhold-1786-p8.webp" aria-label="Enlarge François van Boekhold's 1792 account of climbing Mount Merapi">
            <img src="${media}/boekhold-1786-p8.webp" width="1200" height="2206" alt="Printed Dutch page from 1792 titled Relaas van een' Togt na den Brandende Berg op Java, opening 'Ik vertrok den 17e July 1786, 's Morgens vroeg van Salatiga.'">
          </a>
          <figcaption><strong>Not an eruption—a morning hike.</strong> François van Boekhold’s 1792 account begins <em>“I departed on 17 July 1786, early in the morning from Salatiga”</em> to climb Mount Merapi. Nineteenth-century compilers turned that departure date into a volcanic eruption; Smithsonian GVP still lists it as confirmed (<code>#15865</code>). <a href="${media}/boekhold-1786-p8.webp">Full page ↗</a></figcaption>
        </figure>
      </header>

      ${notedPassages(passages)}

      <footer class="phantom-footer">
        <p class="footer-kicker">Related open problems</p>
        <div class="footer-links">
          <a href="/p/eruption-1809">Which volcano caused the mystery eruption of 1808–1809? →</a>
          <a href="/p/sumatra-tsunamis">What historical tsunamis struck Sumatra before 1900? →</a>
          <a href="/cautionary-tales/one-year-off">Cautionary tale: One year off (why sizing matters) →</a>
        </div>
      </footer>
    </article>
  `;
}
