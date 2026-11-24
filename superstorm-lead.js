import { notedPassages } from "./lib/lead-notes.js";

export const superstormTitle = "The missing half of the 1770 superstorm";
export const superstormDescription = "In September 1770, blood-red auroras burned over Japan, China, and Captain Cook’s ship off Timor for nine nights—an extreme solar storm now used to stress-test modern power grids. Searching 18th-century European academy journals, observatory logs, and newspapers recovers eight overlooked sightings, finds a date error still live in NASA’s historical catalog, and uses a single star in southern France to explain why Europe saw a far weaker sky.";

const media = "/media/leads/1770-superstorm";
const hayakawa2017 = "https://arxiv.org/abs/1711.00690";
const yuan2026 = "https://doi.org/10.3389/fspas.2026.1857812";
const willis1996 = "https://adsabs.harvard.edu/full/1996QJRAS..37..733W";
const nbBerlin = "https://www.nb.no/items/a59bbf03bc5bbf288fa67d7251cdc455";
const uitTromholt = "https://septentrio.uit.no/index.php/aurora/issue/view/314";
const bhlRubenson = "https://www.biodiversitylibrary.org/item/105428";
const iaPaulian = "https://archive.org/details/b30531871_0001/page/212/mode/2up";
const iaCotte = "https://archive.org/details/b30411968/page/26/mode/2up";
const iaCotteAmiot = "https://archive.org/details/b30411968/page/602/mode/2up";
const iaLovering67 = "https://archive.org/details/jstor-25057995";
const iaLovering68 = "https://archive.org/details/jstor-25058017";
const spdfNewEngland = "https://spdf.gsfc.nasa.gov/pub/data/aaa_special-purpose-datasets/aaa_historical_aurora/new_england_auroral_obs_1720_1948/ane720t.txt";
const spdfTemp01 = "https://spdf.gsfc.nasa.gov/pub/data/aaa_special-purpose-datasets/aaa_historical_aurora/misc/temp01.txt";
const delpherVienna = "http://resolver.kb.nl/resolve?urn=ddd:010713472:mpeg21:a0003:ocr";
const bhlBern = "https://www.biodiversitylibrary.org/item/43610";
const bhlDuhamel = "https://www.biodiversitylibrary.org/item/89160";
const bhlEuler = "https://www.biodiversitylibrary.org/item/38626";
const bhlWilcke = "https://www.biodiversitylibrary.org/item/178458";
const iaGM = "https://archive.org/details/sim_gentlemans-magazine_1771-08_41_8";
const aragones2010 = "https://museucienciesjournals.cat/tmgb/issue/vol-17-2010/auroras-boreales-observadas-en-la-peninsula-iberica-baleares-y-canarias-durante-el-siglo-xviii?lang=en";
const carrasco2018 = "https://doi.org/10.5194/hgss-9-133-2018";
const toaldo2016 = "https://doi.org/10.1051/swsc/2016016";
const iaLeGentil = "https://archive.org/details/gri_33125012932931";
const iaWashington = "https://archive.org/details/diariesofgeorgew01wash";

function stormExplorer() {
  return `<section class="storm-widget" id="storm-explorer" aria-labelledby="explorer-title">
    <p class="storm-eyebrow">Exhibit 1 · 9–20 September 1770</p>
    <h3 id="explorer-title">Watch the storm night by night</h3>
    <p class="storm-widget-intro">Each row is a place where someone kept a record, and each column is a night. Rows are ordered by <strong>magnetic latitude</strong>, which measures distance from Earth’s magnetic pole rather than the geographic one; in 1770 that pole sat near northwest Greenland. Auroras ring the magnetic pole, so the lower a row sits, the stronger a storm must be to reach it. Choose a night to read what each observer wrote.</p>
    <div class="storm-legend" aria-label="Key">
      <span class="leg-item"><i class="sg-mark sg-new"></i>Aurora, newly found</span>
      <span class="leg-item"><i class="sg-mark sg-known"></i>Aurora, already known</span>
      <span class="leg-item"><i class="sg-mark sg-clear"></i>Clear sky, no aurora</span>
      <span class="leg-item"><i class="sg-mark sg-cloud"></i>Cloud or rain</span>
      <span class="leg-item"><i class="sg-mark sg-none"></i>No aurora recorded</span>
      <span class="leg-item"><i class="sg-mark sg-bug"></i>Date error in NASA’s catalog</span>
      <span class="leg-item"><i class="sg-mark sg-asia2"></i><i class="sg-mark sg-asia4"></i>East Asia: larger dot, more sightings</span>
    </div>
    <div class="storm-grid-wrap">
      <button type="button" class="storm-all-btn" id="storm-all-btn" aria-pressed="false">Summary of all twelve nights</button>
      <div class="storm-grid-scroll"><table class="storm-grid" id="storm-grid"></table></div>
    </div>
    <div class="storm-readout" id="storm-readout" aria-live="polite">
      <div class="storm-readout-head">
        <h4 id="readout-date">September 17</h4>
        <p id="readout-summary"></p>
      </div>
      <ul class="storm-station-list" id="readout-list"></ul>
    </div>
  </section>`;
}

function capellaWidget() {
  return `<section class="storm-widget" id="capella-geometry" aria-labelledby="capella-title">
    <p class="storm-eyebrow">Exhibit 2 · Evening of 17 September 1770</p>
    <h3 id="capella-title">Locating the aurora over Europe from one star</h3>
    <p class="storm-widget-intro">The storm peaked while Europe was in daylight. By the time darkness reached France, Father Amiot in Beijing had been watching the aurora for hours, and near Paris Louis Cotte’s compass needle had been jumping all afternoon.</p>

    <figure class="utc-strip">
      <svg id="utc-svg" class="utc-svg" viewBox="0 0 712 240" role="img" aria-labelledby="utc-title"><title id="utc-title">Timeline of 17 September 1770 in Universal Time. Night in Beijing runs from about 10:20 to 22:00 UTC; Amiot watched the aurora from 13:15 to 19:15 UTC. Night in France began around 18:00 UTC. Paulian at Nîmes saw the aurora from about 18:40 to 20:40 UTC, and Vienna saw it at about 19:55 UTC.</title></svg>
      <figcaption>One day on a single clock. Shaded stretches are night at each place. When Amiot began watching at 9 PM in Beijing, it was about 1:30 in the afternoon in Paris. Cotte did not note the hours of his compass readings. The star marks Paulian’s sighting under Capella.</figcaption>
    </figure>

    <div class="capella-pair">
      <figure class="sky-fig">
        <svg id="sky-svg" class="sky-svg" viewBox="0 0 560 379" role="img" aria-labelledby="sky-title"><title id="sky-title">The north-northeast sky from Nîmes at 8:30 PM on 17 September 1770: Capella stands about 9 degrees above the horizon, with the rest of the constellation Auriga below it and a red glow behind.</title></svg>
        <figcaption><strong>What Paulian saw.</strong> At 8:30 PM, from Montaury hill above Nîmes, the reddest, thickest part of the aurora lay “beneath the constellation Auriga,” with its brightest star, Capella, shining through it. Star positions are computed for that moment; the glow follows Paulian’s description.</figcaption>
      </figure>
      <figure class="sky-fig">
        <svg id="capella-svg" class="capella-svg" viewBox="0 0 560 250" role="img" aria-labelledby="capella-svg-title"><title id="capella-svg-title">Cross-section of the Earth, drawn to scale, showing the line of sight from Nîmes toward Capella meeting the layer where red aurora glows.</title></svg>
        <figcaption><strong>Where that glow really was.</strong> Red aurora shines roughly 250–500 km up. Follow Paulian’s line of sight until it reaches that height, and you find the spot where the aurora was directly overhead: far to the north, near the Baltic. Drawn to scale.</figcaption>
      </figure>
    </div>

    <div class="capella-controls" role="radiogroup" aria-label="Height of the red glow">
      <span class="capella-ctrl-label">Height of the red glow:</span>
      <label><input type="radio" name="em-height" value="250"><span>250 km</span></label>
      <label><input type="radio" name="em-height" value="400" checked><span>400 km (typical)</span></label>
      <label><input type="radio" name="em-height" value="500"><span>500 km</span></label>
    </div>

    <div class="capella-metrics" id="capella-metrics" aria-live="polite">
      <div class="cap-stat">
        <span class="cap-k">Aurora overhead at</span>
        <strong class="cap-v" id="cap-mlat">+56.0° magnetic latitude</strong>
        <span class="cap-sub" id="cap-geo"></span>
      </div>
      <div class="cap-stat">
        <span class="cap-k">Compared with China and Japan a few hours earlier</span>
        <strong class="cap-v" id="cap-gap">22°–27° closer to the pole</strong>
        <span class="cap-sub">In East Asia the aurora had reached about +29° to +34° magnetic latitude, and was seen as far as Lake Dongting (+19°), and south of the equator off Timor (−21°).</span>
      </div>
    </div>
    <p class="cap-takeaway">Whichever height you choose, the answer moves by only about two degrees. By the time it was dark in Europe, the storm had already weakened sharply and pulled far back toward the pole.</p>
  </section>`;
}

const sourceEntries = [
  {
    id: "trondhjem",
    date: "Sept 11, 17 & 18, 1770",
    place: "Trondhjem, Norway",
    title: "Johan Daniel Berlin’s daily weather and aurora table",
    scan: `${media}/trondhjem-sept-crop.webp`,
    full: `${media}/trondhjem-1770-sept.webp`,
    width: 1155,
    height: 1153,
    alt: "Printed September 1770 daily weather table for Trondhjem by Johan Daniel Berlin (1784), showing Nordlys on nights 2, 11, 17, 18, 23, and 24.",
    caption: `Johan Daniel Berlin, <i>Nye Samling af det Kongelige Norske Videnskabs-Selskabs Skrifter</i> (Copenhagen, 1784), p. 334 · <a href="${nbBerlin}">National Library of Norway ↗</a>`,
    origLang: "da",
    origLabel: "Danish/Norwegian",
    rows: true,
    original: "9. N. V. [Dagen:] Tykke Driveskyer og Blæst. [Natten:] Driveskyer og stille.<br>10. S. [Dagen:] Klart og stille. [Natten:] Klart og vindigt.<br>11. N. V. [Dagen:] Klart og vindigt. [Natten:] <mark>Nordlys, klart og stille.</mark><br>12. N. V. [Dagen:] Klart og stille. [Natten:] Tykt, Regn og stille.<br>13. S. O. [Dagen:] idem. [Natten:] Driveskyer og stille.<br>14. S. O. [Dagen:] idem. [Natten:] idem.<br>15. N. V. [Dagen:] idem. [Natten:] idem.<br>16. N. V. [Dagen:] idem. [Natten:] idem.<br>17. N. V. [Dagen:] idem. [Natten:] <mark>Nordlys. Klart og stille.</mark><br>18. N. V. [Dagen:] idem. [Natten:] <mark>idem.</mark><br>19. S. [Dagen:] Driveskyer og stille. [Natten:] Tykt, Regn og stille.<br>20. S. [Dagen:] Tykt og stille. [Natten:] Tykt og stille.<br>[Barometer and thermometer columns omitted.]",
    english: "9. Wind NW. [Day:] Thick drifting clouds and gale. [Night:] Drifting clouds and calm.<br>10. Wind S. [Day:] Clear and calm. [Night:] Clear and windy.<br>11. Wind NW. [Day:] Clear and windy. [Night:] <mark>Northern lights, clear and calm.</mark><br>12. Wind NW. [Day:] Clear and calm. [Night:] Overcast, rain and calm.<br>13. Wind SE. [Day:] Same. [Night:] Drifting clouds and calm.<br>14. Wind SE. [Day:] Same. [Night:] Same.<br>15. Wind NW. [Day:] Same. [Night:] Same.<br>16. Wind NW. [Day:] Same. [Night:] Same.<br>17. Wind NW. [Day:] Same. [Night:] <mark>Northern lights. Clear and calm.</mark><br>18. Wind NW. [Day:] Same. [Night:] <mark>Same [northern lights, clear and calm].</mark><br>19. Wind S. [Day:] Drifting clouds and calm. [Night:] Overcast, rain and calm.<br>20. Wind S. [Day:] Overcast and calm. [Night:] Overcast and calm.<br>[Barometer and thermometer columns omitted.]",
    context: "This one table gives the first European sightings found for September 11 and September 18, and shows why Trondhjem saw nothing on Sept 12–16 and Sept 19–20: rain and cloud. Sophus Tromholt’s 1902 Norwegian catalog (p. 15) reprinted these rows and marked only Sept 17 with “(f)”—meaning Fritz (1873) had a non-Norwegian sighting that day, and none of Berlin’s Trondhjem entries ever entered Fritz or NASA SPDF.",
  },
  {
    id: "paulian",
    date: "Sept 17, 1770",
    place: "Nîmes, France",
    title: "Aimé-Henri Paulian’s Capella sightline from Montaury hill",
    scan: `${media}/paulian-crop.webp`,
    full: `${media}/paulian-1773-p212.webp`,
    width: 1807,
    height: 907,
    alt: "Page 212 of Aimé-Henri Paulian’s Dictionnaire de physique (1773), describing the September 17, 1770 aurora at Nîmes beneath Auriga and Capella.",
    caption: `Aimé-Henri Paulian, <i>Dictionnaire de physique</i>, Tome 1 (Nîmes, 1773), pp. 211–212 · <a href="${iaPaulian}">Wellcome / Internet Archive ↗</a>`,
    origLang: "fr",
    origLabel: "French",
    original: "Le 17 Septembre, sur les 7 heures du soir, il y eut une aurore boréale qui commença du côté du couchant… Le côté du Nord ne parut éclairé que sur les huit heures. A huit heures &amp; demi, <mark>l’endroit le plus rouge &amp; le plus épais du phénomene se trouva sous la constellation du cocher. L’on vit cependant toujours à travers, l’étoile appellée la Chevre.</mark> Il ne resta à 9 heures, aucune trace de cette aurore boréale. Je crois devoir encore ranger celle-ci dans la classe des aurores paisibles.",
    english: "On 17 September, around 7 o’clock in the evening, there was an aurora borealis that began toward the west… The northern side did not appear lit until about eight o’clock. At half past eight, <mark>the reddest and thickest part of the phenomenon lay beneath the constellation Auriga. One could still see through it the star called Capella.</mark> By 9 o’clock no trace of this aurora borealis remained. I believe this one too belongs in the class of quiet auroras.",
    context: "Missing from NASA’s catalog, Hayakawa et al. (2017), and Yuan et al. (2026), Paulian’s Nîmes account is the most southerly dated European sighting of the storm, and the only one anywhere in Europe that fixes the aurora against a named star.",
  },
  {
    id: "cotte",
    date: "Sept 17, 1770",
    place: "Montmorency & Beijing",
    title: "Louis Cotte’s agitated compass needle & Father Amiot’s Beijing clock",
    scan: `${media}/cotte-p26-crop.webp`,
    full: `${media}/cotte-1774-p26.webp`,
    width: 1250,
    height: 550,
    alt: "Page 26 of Louis Cotte’s Traité de météorologie (1774), recording daytime magnetic needle swings of 15 and 20 minutes on 17 September 1770.",
    caption: `Louis Cotte, <i>Traité de météorologie</i> (Paris, 1774), p. 26 (and pp. 601–602 for Amiot) · <a href="${iaCotte}">Wellcome / Internet Archive ↗</a>`,
    origLang: "fr",
    origLabel: "French",
    original: "…c’est ce qui m’arriva le 17 Septembre 1770, jour où je remarquai une <mark>agitation continuelle dans mon aiguille aimantée ; d’un moment à l’autre elle varioit de 15 &amp; 20 minutes</mark> ; je me crus autorisé en conséquence à prédire une Aurore boréale pour le soir, il y en eut une en effet, &amp; les papiers publics nous apprirent ensuite qu’on l’avoit aussi aperçue à Vienne en Allemagne, où elle avoit été très-brillante.",
    english: "…this is what happened to me on 17 September 1770, a day when I noticed a <mark>continual agitation in my magnetic needle; from one moment to the next it varied by 15 and 20 arcminutes</mark>; I felt justified in predicting an aurora borealis for that evening, and indeed there was one, and the newspapers later informed us that it had also been seen in Vienna, where it had been very bright.",
    context: "In his 2nd Addition (pp. 601–602, citing the January 1773 Journal des Savans, p. 41), Cotte explicitly linked his daytime compass oscillations to Father Joseph-Marie Amiot’s observation in Beijing from 9 PM to 3 AM local (~13:15–19:15 UTC). That makes it the earliest instrument reading tied directly to the 1770 storm.",
  },
  {
    id: "sweden",
    date: "Sept 10/11, 19 & 20, 1770",
    place: "Norrbärke, Brunflo, Lund & Stockholm, Sweden",
    title: "Four Swedish manuscript sightings missed by Fritz and NASA SPDF",
    scan: `${media}/tromholt-sept-crop.webp`,
    full: `${media}/tromholt-1902-p15.webp`,
    width: 1037,
    height: 453,
    alt: "Detail of Sophus Tromholt’s 1902 catalog page 15 showing Trondhjem September 1770 entries and confirming absence of Swedish overlap on Sept 11 and 18.",
    caption: `Compare with Tromholt (1902), p. 15 (<a href="${uitTromholt}">UiT ↗</a>); Swedish entries from Robert Rubenson, <i>K. Sv. Vet.-Akad. Handl.</i> Bd. 15, N:o 5 (1879), p. 114 (<a href="${bhlRubenson}">BHL 105428 ↗</a>).`,
    origLang: "fr",
    origLabel: "French (Rubenson 1879)",
    original: "1770 Septembre <mark>10 m. Norrbärke</mark> — élevée [Nr C] · <mark>19 s. Brunflo</mark> [JT B an. 1771, N:o 76] · <mark>20 [8,30] Lund</mark> — faible [ML C; Ld C] · <mark>20 toute la soirée Stockholm</mark> — peu forte [MS C].",
    english: "1770 September <mark>10 morning [civil Sept 11, pre-dawn] Norrbärke</mark> — high · <mark>19 evening Brunflo</mark> (<i>Inrikes Tidningar</i> 1771, No. 76) · <mark>20 [8:30 PM] Lund</mark> — faint · <mark>20 all evening Stockholm</mark> — weak.",
    context: "Rubenson marks every sighting already in Hermann Fritz (1873) with “F”; none of these four carry “F,” so all four vanished from NASA SPDF. Because Rubenson’s astronomical day runs noon-to-noon (pp. 5–6), “10 m.” means the early morning of civil September 11—bridging Cambridge, MA (Sept 10 evening) directly to Trondhjem (Sept 11 night). Across 10 active Swedish stations, zero auroras were recorded from Sept 11 through Sept 18.",
  },
  {
    id: "vienna-gurzelen",
    date: "Sept 17, 1770",
    place: "Vienna & Gurzelen",
    title: "Dutch newspaper dispatch from Vienna & Pastor Sprüngli’s Swiss diary",
    origLang: "nl",
    origLabel: "Dutch & German",
    original: "WEENEN den 19 September. Voorleden Maandag… Dien zelfden dag zag men hier, des avonds, ten 9 uuren, <mark>een zeer sterk Noorderlicht.</mark> (<i>Amsterdamsche Courant</i>, 2 Oct 1770) · 1770. Januar 18: Ein schönes Nordlicht. Februar 12: Ein kleines Nordlicht. <mark>September 17: Ein kleines Nordlicht.</mark> (J. J. Sprüngli, Gurzelen, via R. Wolf 1855.)",
    english: "VIENNA, 19 September. Last Monday [17 Sept]… That same day one saw here, in the evening at 9 o’clock [~19:55 UTC], <mark>a very strong Northern Light.</mark> (<i>Amsterdamsche Courant</i>, 2 Oct 1770) · 1770. January 18: A fine northern light. February 12: A small northern light. <mark>September 17: A small northern light.</mark> (J. J. Sprüngli, Gurzelen.)",
    context: "Vienna’s contemporary weather chronicler Anton Pilgram (1788) missed the Sept 17 display entirely, yet it surfaced in both the French press (Gazette de France, 1 Oct) and Dutch press (Delpher). Meanwhile, Sprüngli’s exact diary words—contrasting “small” on Sept 17 with “fine” on Jan 18—independently confirm Paulian’s assessment from Nîmes.",
  },
  {
    id: "cererols",
    date: "Post-Aug 3, 1770 (undated)",
    place: "Cererols, Catalonia",
    title: "An undated blood-red sky candidate in a Catalan farmer’s chronicle",
    origLang: "ca",
    origLabel: "Catalan",
    original: "L’any 1770 es veieren grans senyals al cel. Primerament, es veié un cometa que començà d’exir a la part del sol ixent. <mark>Desprès es veieren uns grans raigs de color de sang, a la part de Tramuntana.</mark>",
    english: "In the year 1770 great signs were seen in the sky. First, a comet was seen rising in the east [Lexell’s Comet, naked-eye from Aug 3]. <mark>Afterward, great blood-colored rays were seen toward the North.</mark>",
    context: "Recorded in the family chronicle of Joan Fàbrega of Cererols (El Bages, near Barcelona) and catalogued by Enric Aragonès and Jorge Ordaz (2010, entry 17), who favor [17 September 1770?] over 31 August because of Paulian’s Nîmes sighting 280 km northeast. Because the chronicle gives no day, it remains a low-confidence candidate—and notably, no dated Spanish, Portuguese, or Canary Islands archive records September 1770 at all.",
  },
];

function primarySourceReader() {
  const rows = sourceEntries.map((e, i) => `
    <details name="storm-sources" class="src-entry" id="src-${e.id}"${i === 0 ? " open" : ""}>
      <summary><span class="src-date">${e.date}</span><span class="src-place">${e.place}</span><strong>${e.title}</strong></summary>
      <div class="src-body">
        ${e.scan ? `<figure class="src-fig"><a class="src-scan" href="${e.full}" aria-label="Enlarge full archival page for ${e.title}"><img src="${e.scan}" width="${e.width}" height="${e.height}" alt="${e.alt}" loading="lazy"></a><figcaption>${e.caption}</figcaption></figure>` : ""}
        <div class="src-quote">
          <p class="src-en${e.rows ? " src-rows" : ""}" lang="en">“${e.english}”</p>
          <p class="src-orig${e.rows ? " src-rows" : ""}" lang="${e.origLang}">“${e.original}”</p>
        </div>
        <p class="src-context">${e.context}</p>
      </div>
    </details>`).join("");

  return `<section class="storm-widget src-reader" id="primary-sources" aria-labelledby="sources-reader-title">
    <p class="storm-eyebrow">Exhibit 3 · The sources</p>
    <h3 id="sources-reader-title">Read the primary sources</h3>
    <p class="storm-widget-intro">Open an entry to read the passage in English or in the original language. Select a page image to see the full scan.</p>
    <div class="src-controls">
      <fieldset><legend>Display language</legend>
        <label><input type="radio" name="src-lang" value="en" checked><span>English translation</span></label>
        <label><input type="radio" name="src-lang" value="orig"><span>Original language</span></label>
      </fieldset>
    </div>
    ${rows}
  </section>`;
}

function matrixTable() {
  return `<div class="storm-table-wrap">
    <table class="storm-table">
      <caption>Night by night, September 9–20, 1770</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">N. America (+52.2°)</th>
          <th scope="col">Britain (+56.2°) &amp; France (+48°–53.4°)</th>
          <th scope="col">Central Europe (+50.2°–56.6°)</th>
          <th scope="col">Norway (+65.7°) &amp; Sweden (+57.9°–64.6°)</th>
          <th scope="col">East Asia (+19°–30°) &amp; Timor (−20.7°)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Sept 9</strong></td><td><strong>Aurora</strong> (Winthrop, Cambridge)</td><td>Denainvilliers: partly cloudy</td><td><strong>Aurora</strong> (Berlin)</td><td>Trondhjem: drifting clouds</td><td>Quiet</td></tr>
        <tr><td><strong>Sept 10</strong></td><td><strong>Aurora</strong> (Winthrop, Cambridge)*</td><td>Denainvilliers: partly cloudy</td><td>—</td><td><strong>Aurora (new)</strong>: Norrbärke (10 m. = night 10–11); Trondhjem clear, none</td><td><strong>Storm onset</strong> (low East Asian counts)</td></tr>
        <tr><td><strong>Sept 11</strong></td><td>—</td><td>Denainvilliers: overcast</td><td>—</td><td><strong>Aurora (new)</strong>: Trondhjem (<i>Nordlys, klart</i>)</td><td>Sparse East Asia</td></tr>
        <tr><td><strong>Sept 12–13</strong></td><td>—</td><td>Denainvilliers: rain / variable</td><td>—</td><td>Trondhjem: rain (12), clouds (13)</td><td>Sparse East Asia</td></tr>
        <tr><td><strong>Sept 14</strong></td><td>—</td><td>Denainvilliers: <em>clear, no aurora</em></td><td>—</td><td>Trondhjem: drifting clouds</td><td>East Asia active</td></tr>
        <tr><td><strong>Sept 15</strong></td><td>—</td><td>London: <em>very fine, no aurora</em></td><td>—</td><td>Trondhjem: drifting clouds</td><td>East Asia active</td></tr>
        <tr><td><strong>Sept 16</strong></td><td><em>SPDF 9/16 is a Lovering typo*</em></td><td>London &amp; Denainvilliers: <em>clear, no aurora</em></td><td>—</td><td>Trondhjem: drifting clouds</td><td><strong>Major surge</strong> + <strong>HMS <i>Endeavour</i> off Timor</strong></td></tr>
        <tr class="row-peak"><td><strong>Sept 17</strong></td><td>—</td><td><strong>Aurora (new)</strong>: Nîmes (Capella → +56° MLAT); Montmorency <strong>needle 15′–20′</strong> + aurora; Paris, Burgundy; London <em>gloomy</em>; Denainvilliers clear, none</td><td><strong>Burst</strong>: Vienna (9 PM), Gurzelen (<i>kleines</i>), Böhringen, Berlin, Lübeck; Catalonia candidate</td><td><strong>Aurora (new)</strong>: Trondhjem (<i>Nordlys, klart</i>); 0 across 10 Swedish stations</td><td><strong>GLOBAL PEAK</strong> (74/111 records) + <strong>Amiot Beijing</strong> (13:15–19:15 UTC)</td></tr>
        <tr><td><strong>Sept 18</strong></td><td>—</td><td>London &amp; Denainvilliers: <em>clear, no aurora</em></td><td>—</td><td><strong>Aurora (new)</strong>: Trondhjem (<i>Nordlys, klart</i>); 0 in Sweden</td><td>Strong East Asia (VOC Dejima: nothing to note)</td></tr>
        <tr><td><strong>Sept 19</strong></td><td>—</td><td>London: stormy; Denainvilliers: cloudy</td><td>—</td><td><strong>Aurora (new)</strong>: Brunflo (eve); Trondhjem <em>rain</em></td><td>Final East Asian night</td></tr>
        <tr><td><strong>Sept 20</strong></td><td>—</td><td>Denainvilliers: cloudy</td><td><strong>Aurora</strong> (Böhringen)</td><td><strong>Aurora (new)</strong>: Stockholm (all eve) &amp; Lund (faint); Trondhjem <em>overcast</em></td><td>Quiet</td></tr>
      </tbody>
    </table>
  </div>`;
}

function dryWellsTable() {
  return `<div class="storm-table-wrap">
    <table class="storm-table">
      <caption>Archives that recorded no aurora</caption>
      <thead>
        <tr>
          <th scope="col">Archive / Source</th>
          <th scope="col">Region &amp; 1770 MLAT</th>
          <th scope="col">What we checked</th>
          <th scope="col">Result &amp; diagnostic value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Guillaume Le Gentil</strong>, <i>Voyage dans les mers de l’Inde</i> (T. 1–2, 1779–81)</td>
          <td>Port-Louis, Mauritius (<strong>−24.0°</strong>)</td>
          <td>Full text of both volumes; Le Gentil stayed on Mauritius 16 Apr–19 Nov 1770.</td>
          <td><strong>Nothing found.</strong> Logged an April 19 atmospheric flash and Lexell’s Comet, but zero Sept 1770 aurora or compass anomalies—despite sitting 3.3° poleward of <i>HMS Endeavour</i> off Timor.</td>
        </tr>
        <tr>
          <td><strong>VOC / GLOBALISE</strong> (<code>voc.sqlite</code>, 1770–71)</td>
          <td>Batavia (−15.9°), Timor, Dejima (+22.6°), Canton, Bengal, Cape</td>
          <td>FTS5 sweep for aurora, red/fiery sky, meteors, and compass terms + direct inspection of Sept 1770 station dagregisters.</td>
          <td><strong>Nothing found.</strong> Dejima Sept 18 reads <i>“Niets te noteeren.”</i> All “aurora” hits were ship names (<i>HMS Aurora</i>), enslaved women, or bastion names.</td>
        </tr>
        <tr>
          <td><strong>Iberian &amp; Canary archives</strong> (Aragonès &amp; Ordaz 2010; Carrasco et al. 2018)</td>
          <td>Spain, Portugal, Canaries (<strong>+36.0° to +46.5°</strong>)</td>
          <td>Complete 18th-century catalogue (80 auroras) + <i>Gaceta de Madrid</i>.</td>
          <td><strong>0 dated Sept 1770 sightings</strong> (only undated Cererols chronicle entry). Strong contrast with <strong>18 Jan 1770</strong>, seen at 35 sites down to Tenerife (+36.0°).</td>
        </tr>
        <tr>
          <td><strong>Delpher Dutch newspapers</strong> (1770–71)</td>
          <td>Europe + delayed colonial mail</td>
          <td>1770–71 SRU sweep for <i>noorderlicht</i>, <i>zuiderlicht</i>, <i>luchtverschijnsel</i>, <i>vuurige/roode lucht</i>.</td>
          <td><strong>Search confirmed working:</strong> flooded with Jan 18, 1770 reports from Lisbon, Cádiz, Naples, Genoa, and Warsaw—yet carried <strong>only Vienna Sept 17</strong> for September 1770.</td>
        </tr>
        <tr>
          <td><strong>Johan Carl Wilcke</strong>, <i>K. Sv. Vet. Acad. Handl.</i> v. 38 (1777)</td>
          <td>Stockholm (+60.5°)</td>
          <td>Full magnetic-needle memoir and tables (pp. 273–300).</td>
          <td><strong>Too late to help:</strong> Wilcke’s continuous daily Stockholm declination journal began in <strong>October 1771</strong>—13 months after the storm (he cites only the 18 Jan 1770 dip-needle event).</td>
        </tr>
        <tr>
          <td><strong>Johann Albrecht Euler</strong>, <i>Novi Comm. Petrop.</i> t. 15 (1770)</td>
          <td>St. Petersburg (+58.9°)</td>
          <td>Meteorological tables (pp. 676–683), Julian Old Style (+11 days).</td>
          <td><strong>Cloudy month:</strong> Sept 1770 O.S. (= Sept 12–Oct 11 N.S.) had only <strong>2 clear days</strong>, 5 foggy, 10 rainy, and 0 auroras—explaining Russian silence.</td>
        </tr>
        <tr>
          <td><strong>Duhamel du Monceau</strong> (Denainvilliers) &amp; <strong><i>Gentleman’s Magazine</i></strong> (London)</td>
          <td>N. France (+52.6°) &amp; Britain (+56.2°)</td>
          <td>Daily weather tables for September 1770.</td>
          <td><strong>Clear, no aurora:</strong> Clear skies on Sept 14, 15, 16, and 18 with zero auroras; London was “gloomy” on Sept 17. (Duhamel’s “stationary needle” note belongs to Dec 1770; his Sept 6 storm was 1771.)</td>
        </tr>
        <tr>
          <td><strong>Alzate</strong> (Mexico), <strong>Washington</strong> (Mount Vernon), <strong>APS Vol. 1</strong>, <strong>LOC</strong>, <strong>British &amp; Norwegian press</strong></td>
          <td>Americas (+26.8° to +52°) &amp; Norway</td>
          <td>Alzate (1770/72), Washington Diaries Vol. 1, APS 1769–71, Chronicling America, Nov 1770–Apr 1771 British magazines, all 15 Sept–Oct 1770 NB.no Norwegian issues.</td>
          <td><strong>Nothing found.</strong> Alzate’s 1770 print covered 1769; late 1770/71 British press “Aurora” hits referred to the missing frigate <i>HMS Aurora</i>; Norwegian press caught Feb 1770 but missed Sept 1770.</td>
        </tr>
      </tbody>
    </table>
  </div>`;
}

export function superstormHTML() {
  const passages = [
    {
      id: "why-matters",
      body: ref => `<h2>1770 and the modern power grid</h2>
      <p>When most people hear “extreme solar storm,” they think of the <strong>Carrington Event of September 1859</strong>, when a giant eruption on the Sun set telegraph offices on fire and lit up skies as far south as Cuba and Hawaii. For modern electrical engineers, a Carrington-class storm is already a nightmare scenario: rapidly shifting magnetic currents in Earth’s upper atmosphere can induce surges strong enough to damage high-voltage transformers and knock out regional power grids.</p>
      <p>Over the past decade, however, space-weather historians led by Hisashi Hayakawa have pointed to an even more unsettling benchmark: <strong>September 10–19, 1770</strong>. Using 110 Chinese and Japanese chronicles alongside the ship’s logs of Captain James Cook’s <i>HMS Endeavour</i> off Timor, they reconstructed a barrage of solar eruptions that kept blood-red auroras burning near the tropics for <strong>nine consecutive nights</strong>—far longer than the two-day Carrington storm. Because a multi-day storm pounds electrical infrastructure repeatedly without giving grids time to recover, the September 1770 “nine-night storm” is now used as an extreme worst-case stress test.${ref}</p>
      <p>Yet a glaring puzzle sat right in the middle of the map. East Asia was saturated with eyewitness accounts—and <i>HMS Endeavour</i> saw red southern lights on the same night, the earliest known case of both hemispheres at once—while <strong>Europe and the Americas looked strangely quiet</strong>. A February 2026 review noted that European reports remained “sparse and geographically confined, primarily to Germany and France,” relying on a handful of 19th-century catalog lines in NASA’s Space Physics Data Facility (SPDF). Had Europe simply been cloudy, had historians missed the sources, or did the storm itself behave very differently on the other side of the world?</p>`,
      note: `Foundational baseline papers: Hisashi Hayakawa et al., “Long-lasting extreme magnetic storm activities in 1770 found in historical documents,” <a href="${hayakawa2017}"><i>ApJL</i> 850:L31 (2017)</a>; D. M. Willis, F. R. Stephenson &amp; J. R. Singh, “Auroral observations on AD 1770 September 16: the earliest known conjugate sightings,” <a href="${willis1996}"><i>QJRAS</i> 37 (1996), 733–742</a>; and H. Yuan, Z. Yin, Z. Xu et al., “Multi-day extreme geomagnetic storm in September 1770,” <a href="${yuan2026}"><i>Frontiers in Astronomy and Space Sciences</i> (2026)</a>.`,
    },
    {
      id: "what-turned-up",
      body: ref => `<h2 id="findings">What the archives turned up</h2>
      <p>Sweeping 18th-century academy transactions, observatory weather registers, newspapers, and travel narratives across ten countries changed the picture of the storm’s Western half in four concrete ways:</p>
      <ul class="storm-highlights">
        <li><strong>Eight overlooked European and Scandinavian sightings.</strong> Four Swedish sightings from Robert Rubenson’s 1879 national catalog (<strong>Norrbärke</strong> on the night of Sept 10–11, <strong>Brunflo</strong> on Sept 19, and <strong>Lund</strong> and <strong>Stockholm</strong> on Sept 20), three Norwegian sightings from Johan Daniel Berlin’s daily Trondhjem register (<strong>Sept 11, 17, and 18</strong>), and a detailed Southern French account by Aimé-Henri Paulian at <strong>Nîmes (Sept 17)</strong> never made it into Hermann Fritz’s 1873 global list, NASA SPDF’s European table, or modern 1770 storm reconstructions.${ref}</li>
        <li><strong>A date error still live in NASA’s New England aurora database.</strong> NASA SPDF’s New England catalog (<code>ane720t.txt</code>) lists Harvard astronomer John Winthrop seeing an aurora in Cambridge, Massachusetts on <strong>September 16, 1770</strong>—the exact night Cook’s crew saw the southern lights off Timor. Checking Joseph Lovering’s original 1867 transcription of Winthrop’s manuscript journal shows the real date was <strong>September 10</strong>. Lovering misprinted 10 as 16 in his 1868 summary table, and NASA’s digital file copied the phantom sighting onto the storm’s biggest night.</li>
        <li><strong>A compass reading in France, timed against Beijing.</strong> On September 17 in Montmorency (just north of Paris), Father Louis Cotte recorded his compass needle swinging <strong>15 to 20 arcminutes</strong> from moment to moment during daylight—enough for him to predict that evening’s aurora before sunset. In his 1774 appendix, Cotte explicitly tied those daytime swings to Father Joseph-Marie Amiot’s sighting in Beijing from 9 PM to 3 AM local time (~13:15–19:15 UTC).</li>
        <li><strong>Clear nights with no aurora, which show the storm did not reach everywhere every night.</strong> Daily weather tables from Denainvilliers in north-central France and from London show <em>clear</em> skies on September 14, 15, 16, and 18 with no aurora reported, even as East Asia and Timor blazed on Sept 16 and Trondhjem, far to the north in Norway, lit up on Sept 18. (One caution: Duhamel at Denainvilliers also logged nothing on Sept 17, when an aurora was seen near Paris.)</li>
      </ul>`,
      note: `Primary sources for the newly integrated records: Johan Daniel Berlin, <i>Nye Samling af det Kongelige Norske Videnskabs-Selskabs Skrifter</i> (1784), <a href="${nbBerlin}">p. 334</a>, and Sophus Tromholt, <i>Catalog der in Norwegen</i> (1902), <a href="${uitTromholt}">p. 15</a>; Robert Rubenson, <i>Catalogue des aurores boréales observées en Suède</i> (1879), <a href="${bhlRubenson}">p. 114</a>; Aimé-Henri Paulian, <i>Dictionnaire de physique</i>, T. 1 (1773), <a href="${iaPaulian}">pp. 211–212</a>; Louis Cotte, <i>Traité de météorologie</i> (1774), <a href="${iaCotte}">p. 26</a> &amp; <a href="${iaCotteAmiot}">pp. 601–602</a>; and John Winthrop in Joseph Lovering (1867), <a href="${iaLovering67}">entry 158, p. 363</a> vs. <a href="${iaLovering68}">Lovering (1868), p. 60</a> and <a href="${spdfNewEngland}">NASA SPDF <code>ane720t.txt</code> L667</a>.`,
    },
    { wide: true, body: stormExplorer },
    {
      id: "three-pulses",
      body: ref => `<h2>A storm in three waves</h2>
      <p>Once the newly recovered Norwegian, Swedish, and French entries are placed beside the clear-sky and overcast weather diaries, the apparent contradiction between East Asia and Europe snaps into focus. Rather than nine nights of equally intense aurora across the whole planet, the Western record shows <strong>three distinct waves</strong>:</p>
      <p><strong>Wave 1 (Sept 9–11):</strong> An early aurora reached Berlin (Sept 9), Cambridge, Massachusetts (Sept 9–10), Norrbärke in Sweden (night of Sept 10–11), and Trondhjem in Norway (Sept 11). <strong>The Sept 12–16 split:</strong> While Trondhjem and St. Petersburg sat under rain and clouds, north-central France and London enjoyed clear skies on Sept 14–16 and saw nothing—even as the storm surged violently over China, Japan, and Timor on Sept 16. <strong>Wave 2 and the tail (Sept 17–20):</strong> On September 17, the storm’s peak ran from East Asia’s night into Europe’s evening across at least ten European sites from Trondhjem to Nîmes (with an undated blood-red chronicle candidate in Catalonia). By September 18, clear-sky Britain and France were dark again while high-latitude Trondhjem stayed lit; on Sept 19–20, clouds closed over Trondhjem just as a last, weak aurora appeared at Brunflo, Lund, Stockholm, and Böhringen.${ref}</p>
      <p>Why did the European peak on September 17 look so restrained—a “small northern light” to Pastor Sprüngli in Switzerland, a “quiet aurora” to Father Paulian in Nîmes, and totally absent from dated Spanish, Portuguese, and Canary Islands archives that had erupted with panic eight months earlier during the great aurora of 18 January 1770? Paulian’s mention of a single star lets us measure the answer.</p>`,
      note: `Clear-sky and overcast controls: H.-L. Duhamel du Monceau’s daily Denainvilliers weather log in <i>Hist. Acad. Roy. Sci. Paris</i> 1771 (1774), <a href="${bhlDuhamel}">pp. 818–819</a>; London meteorological diary in <i>The Gentleman’s Magazine</i> (Aug 1771), <a href="${iaGM}">Sept 1770 table</a>; J. A. Euler’s St. Petersburg weather counts in <i>Novi Comm. Petrop.</i> t. 15 (1770), <a href="${bhlEuler}">pp. 676–683</a>; and J. J. Sprüngli’s Gurzelen diary in Rudolf Wolf, <i>Mittheilungen der Naturforschenden Gesellschaft in Bern</i> (1855), <a href="${bhlBern}">p. 40</a>.`,
    },
    { wide: true, body: capellaWidget },
    {
      id: "capella-meaning",
      body: ref => `<p>Put simply, the September 1770 storm was not just long; it came in <strong>bursts tied to the clock</strong>. Its most violent hours, which pushed red auroras deep into China and Japan, fell during East Asia’s night (about 12:00–19:00 UTC), when Europe was in broad daylight. The only European trace of those hours is Cotte’s restless compass. By the time the sun set over Western Europe around 18:00–20:00 UTC, the storm had already eased, and the band of aurora had pulled back roughly 20°–25° toward the magnetic pole. That is why Spain, Portugal, Mauritius, and the Atlantic stayed quiet while Norway still glowed.${ref}</p>`,
      note: `Capella (α Aurigae) precessed from J2000 (RA 5h 16m 41s, Dec +46.00°) to epoch 1770.71 gives RA 4h 59m 45s, Dec +45.76°. At Nîmes (43.84°N, 4.36°E) on 1770-09-17 20:30 local apparent solar time (~20:07 UTC, JD 2367799.338), Capella stood at Alt 9.2°, Az 31.7° (NNE). Using Earth radius 6,371 km and a standard 400 km red-oxygen (630.0 nm) emission altitude yields a ground distance of 12.6° (54.1°N, 15.6°E = +56.0° MLAT in the 1770 GUFM1 dipole).`,
    },
    { wide: true, body: primarySourceReader },
    {
      id: "methodology",
      body: ref => `<h2 id="methodology">Methodology: how the search was done</h2>
      <p>Historical space weather is an unusually clean proving ground for agentic archival research because the target window is razor-narrow (ten nights in September 1770) and the physical signatures—red sky, northern/southern lights, compass-needle agitation—are unmistakable across languages. Still, a naive keyword sweep would have produced at least five serious errors. Four checks guarded against them:${ref}</p>
      <ol class="storm-method-list">
        <li><strong>Checking NASA’s files and the published papers first.</strong> Before trusting any hit as “new,” we downloaded and inspected NASA SPDF’s exact text files (<code>misc/temp01.txt</code>, <code>silv1nts.txt</code>, and <code>ane720t.txt</code>) alongside Hayakawa et al. (2017) and Yuan et al. (2026). That immediately revealed both what the digital baseline was missing (Sweden, Norway, Nîmes, magnetic-needle readings, weather controls) and the live <code>Sept 16</code> date bug in <code>ane720t.txt</code>.</li>
        <li><strong>Testing the search on the January 1770 aurora.</strong> Eight months earlier, a massive aurora lit up Europe down to Cádiz, Naples, and Tenerife (+36° MLAT). Whenever our queries across Delpher Dutch newspapers, Iberian catalogs, Swedish/Norwegian journals, or Wilcke’s Stockholm memoirs lit up with <strong>January 18, 1770</strong> hits—and returned silence for September 1770—that proved our retrieval pipeline had high recall and that the September silence in southern Europe was physically real rather than a search failure.</li>
        <li><strong>Allowing for slow mail and other words for the sky.</strong> Because news from India, Java, Mauritius, and the Caribbean took two to six months to reach London and Amsterdam, we swept British and Dutch periodicals through <strong>mid-1771</strong>, and searched VOC Dutch archives for descriptive sky terms (<i>luchtverschijnsel</i>, <i>zuiderlicht</i>, <i>roode/vuurige lucht</i>, <i>bloedrood</i>, <i>compas</i>) rather than just “aurora.”</li>
        <li><strong>Checking dates, citations, and page images by eye.</strong> Direct scan and convention checks caught five classic historical traps: (a) <strong>St. Petersburg Old Style dates</strong> (+11 days, shifting Euler’s Sept O.S. table to Sept 12–Oct 11 N.S.); (b) <strong>Rubenson’s noon-to-noon astronomical day</strong> (meaning Norrbärke “10 m.” is civil morning Sept 11, and Lund OCR “3,30” is 8:30 PM); (c) <strong>publication lag</strong> (Swedish Academy 1770 printed the <em>1769</em> comet; Duhamel’s “stationary needle” belonged to Dec 1770 and his Sept 6 storm was 1771); (d) <strong>false-positive “Aurora” homonyms</strong> (the lost British frigate <i>HMS Aurora</i> dominated late-1770/1771 British and VOC hits); and (e) <strong>OCR drift</strong> (inspecting Cotte’s original p. 26 scan corrected “15 à 20” to “15 &amp; 20 minutes” and pinned Paulian’s Nîmes entry to pp. 211–212).</li>
      </ol>`,
      note: `Archives swept: Biodiversity Heritage Library (Paris, St. Petersburg, Stockholm, Uppsala, Bern, Zurich, Philadelphia), National Library of Norway API (<code>api.nb.no</code>), UiT Septentrio (Tromholt 1902), Internet Archive / Wellcome Collection, Delpher Dutch newspapers (1770–71), Library of Congress Chronicling America, Harvard Institutional Books, GLOBALISE/VOC SQLite (1770–71), RACO / Museu de Ciències Naturals de Barcelona, and NASA SPDF. Three external gates hit anti-bot walls and were not bypassed: ANNO (<i>Wienerisches Diarium</i>), HathiTrust (replaced cleanly by UiT’s open-access Tromholt PDF), and SWSC / DataDome (Domínguez-Castro et al. 2016 Padua table).`,
    },
    {
      id: "specialist-data",
      body: ref => `<h2 id="specialist-data">Data and next steps</h2>
      <p>For space-weather modelers and historians wishing to ingest these records into geomagnetic reconstructions (e.g., testing UT-localized substorm / ring-current models against the 1770 GUFM1 dipole), the complete structured dataset—39 rows covering every newly recovered observation, NASA SPDF comparison flag, clear-sky control, overcast control, and verified dry well—is available as a single CSV file:</p>
      <p class="storm-download"><a class="storm-dl-btn" href="${media}/1770-sept-observations.csv" download>Download structured dataset (CSV · 39 records) ↓</a></p>
      <h3>Night-by-night table</h3>
      <p>The same information as Exhibit 1, as a table: every sighting, north and south, alongside the recorded weather.${ref}</p>`,
      note: `All geomagnetic latitudes in the CSV and tables are computed in the 1770 GUFM1 dipole frame (north geomagnetic pole at 79.8°N, 303.4°E, matching <a href="${hayakawa2017}">Hayakawa et al. 2017</a>, Fig. 2). Controls reproduce published values within 0.5°: Dongtinghu +19.3° MLAT, <i>HMS Endeavour</i> off Timor −20.7° MLAT.`,
    },
    { wide: true, body: matrixTable },
    {
      id: "dry-wells-head",
      body: () => `<h3>Where nothing was seen</h3>
      <p>Knowing where the aurora was <em>not</em> seen, and whether the sky there was clear, cloudy, or simply unrecorded, matters as much as finding new sightings:</p>`,
    },
    { wide: true, body: dryWellsTable },
    {
      id: "open-targets",
      body: ref => `<h3>Where to look next</h3>
      <p>This sweep closes most open digitized European academy volumes and Dutch Asian archives, leaving four sharply defined manuscript or paywalled targets that could push the 1770 reconstruction even further:</p>
      <ol class="storm-checklist">
        <li><strong>Nicolaus von Béguelin’s 1770 Berlin Academy memoir.</strong> Harvard’s digitized run of <i>Nouveaux mémoires de l’Académie Royale des Sciences et Belles-Lettres</i> skips <i>Année MDCCLXX</i> (Berlin, 1772, pp. 75–96). Béguelin kept daily weather, aurora, and magnetic-needle notes (confirmed from his 1771 volume); reading his actual 1770 pages would test whether Berlin recorded a numerical compass deflection on Sept 9 or Sept 17 alongside Cotte’s Montmorency reading.</li>
        <li><strong>Giuseppe Toaldo’s Padua register (+48.3° MLAT).</strong> Toaldo’s first edition (dated 20 Sept 1770) stops at winter 1769–70, and the modern catalog of his 1766–1797 Padua manuscript logs (<a href="${toaldo2016}">Domínguez-Castro et al., <i>SWSC</i> 6, A21, 2016</a>) sits behind a DataDome check. Verifying whether Padua logged clear skies or an aurora on Sept 17 would pair directly with Paulian’s Nîmes (+48.0°) sightline.</li>
        <li><strong>Unpublished Swedish observatory weather logs (Sept 11–18).</strong> Rubenson (1879) extracted aurora sightings from manuscript registers at Stockholm (<code>MS C</code>), Uppsala (<code>Mt C</code>), and Lund (<code>ML C; Ld C</code>), showing zero Swedish auroras between Sept 11 and Sept 18. Checking the underlying sky-cover columns in the Royal Swedish Academy archives would establish whether Sweden was clouded out on Sept 17–18 or genuinely quiet on Sept 18 while Trondhjem (+65.7°) glowed.</li>
        <li><strong>1770 British East Indiaman, Royal Navy, and Moravian logs.</strong> No 1770 ship logs outside <i>HMS Endeavour</i> have been systematically read for Sept 10–19. British Library India Office logbooks (<code>IOR/L/MAR/B</code>) for ships crossing the Indian Ocean and South Atlantic in September 1770, Royal Navy captains’ logs (TNA <code>ADM 51</code>), and Moravian mission diaries in Greenland and Labrador remain the best chance of adding a second Southern Hemisphere or North Atlantic sighting.${ref}</li>
      </ol>`,
      note: `For the Spanish 18 January 1770 baseline and Cererols chronicle entry, see Enric Aragonès Valls &amp; Jorge Ordaz Gargallo, <a href="${aragones2010}"><i>Treb. Mus. Geol. Barcelona</i> 17 (2010), 45–110</a>, and V. M. S. Carrasco et al., <a href="${carrasco2018}"><i>HGSS</i> 9 (2018), 133–139</a>. For Wilcke’s Stockholm needle start date (Oct 1771), see <a href="${bhlWilcke}"><i>K. Sv. Vet. Acad. Handl.</i> v. 38 (1777), p. 279</a>; for Le Gentil on Mauritius, <a href="${iaLeGentil}"><i>Voyage dans les mers de l’Inde</i>, T. 2</a>; for Washington at Mount Vernon, <a href="${iaWashington}"><i>Diaries</i>, Vol. 1, pp. 396–398</a>.`,
    },
  ];

  return `<article class="leads-page storm-lead">
    <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">Methodology &amp; data ↓</a></div>
    <header class="storm-mast">
      <div>
        <p class="lead-label">Global, September 1770 · Space weather</p>
        <h1 class="page-title">${superstormTitle}</h1>
        <p class="storm-deck">${superstormDescription}</p>
        <div class="storm-jumps">
          <a href="#storm-explorer">Night by night ↓</a>
          <a href="#capella-geometry">Locating the aurora ↓</a>
          <a href="#specialist-data">Specialist CSV &amp; tables ↓</a>
        </div>
      </div>
      <figure>
        <a href="${media}/trondhjem-1770-sept.webp" aria-label="Enlarge Johan Daniel Berlin’s 1784 printed September 1770 Trondhjem weather and aurora table">
          <img src="${media}/trondhjem-sept-crop.webp" width="1155" height="1153" alt="September 1770 daily weather table for Trondhjem, Norway by Johan Daniel Berlin (1784), recording northern lights on clear nights Sept 11, 17, and 18.">
        </a>
        <figcaption>Johan Daniel Berlin’s daily Trondhjem weather table for September 1770 (printed 1784), recording <i>Nordlys</i> on Sept 11, 17, and 18 alongside rain and cloud cover on the silent nights. <a href="${nbBerlin}">National Library of Norway ↗</a></figcaption>
      </figure>
    </header>
    ${notedPassages(passages)}
  </article>`;
}
