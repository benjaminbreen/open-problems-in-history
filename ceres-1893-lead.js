import { notedPassages } from "./lib/lead-notes.js";
import { leadByline } from "./render.js";

export const ceresTitle = "A voice from South Africa, 1893";
export const ceresDescription = "Noise reduction on an unidentified 1893 wax cylinder at UC Santa Barbara turned up what appears to be the earliest known surviving voice recording made in South Africa, thirteen years before the 1906 recording usually cited. The cylinder names the speaker, date, town, and house, and points to the London phonograph agent who recorded Alfred, Lord Tennyson.";

const media = "/media/leads/ceres-1893";
const audio = `${media}/audio`;
const ucsb13010 = "https://cylinders.library.ucsb.edu/detail.php?query_type=mms_id&query=990041106170203776";
const ucsb13009 = "https://cylinders.library.ucsb.edu/detail.php?query_type=mms_id&query=990041106180203776";
const ucsb13011 = "https://cylinders.library.ucsb.edu/detail.php?query_type=mms_id&query=990041106160203776";
const ucsb13012 = "https://cylinders.library.ucsb.edu/detail.php?query_type=mms_id&query=990041106150203776";

function cylinder13010Exhibit() {
  return `
    <section class="source-exhibit ceres-player-card" id="listen-13010" aria-labelledby="listen-13010-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Audio Exhibit 1 · UCSB Cylinder 13010 (Set 197-02 · 15 December 1893)</p>
          <h2 id="listen-13010-title">Listen to Cylinder 13010</h2>
          <p class="exhibit-intro">Select a passage below, then switch between the UC Santa Barbara archive transfer and the filtered version. In the signature at 2:35, listen for the minister’s surname, the day in December 1893, and the town name at the end.</p>
        </div>
      </div>

      <div class="ceres-tabs" role="tablist" aria-label="Choose a passage from Cylinder 13010" data-player="c13010">
        <button type="button" class="ceres-tab is-active" role="tab" aria-selected="true" data-clip="sig">
          <span class="tab-tag">2:35–3:18 · Signature</span>
          <strong>Name, date &amp; church</strong>
        </button>
        <button type="button" class="ceres-tab" role="tab" aria-selected="false" data-clip="opening">
          <span class="tab-tag">0:00–0:44 · Opening</span>
          <strong>“At the house of Mr. Home”</strong>
        </button>
        <button type="button" class="ceres-tab" role="tab" aria-selected="false" data-clip="prophecy">
          <span class="tab-tag">0:44–2:38 · Speech</span>
          <strong>Preaching by phonograph</strong>
        </button>
        <button type="button" class="ceres-tab" role="tab" aria-selected="false" data-clip="coda">
          <span class="tab-tag">3:12–3:48 · Second voice</span>
          <strong>English coda</strong>
        </button>
      </div>

      <div class="ceres-stage" data-stage="c13010">
        <div class="version-bar" role="group" aria-label="Audio version">
          <button type="button" class="ver-btn" data-ver="raw" aria-pressed="false">Archive audio (raw UCSB)</button>
          <button type="button" class="ver-btn is-active" data-ver="v4" aria-pressed="true">Noise reduced</button>
          <button type="button" class="ver-btn" data-ver="slow" aria-pressed="false">Slowed 0.70×</button>
        </div>

        <audio controls preload="metadata" src="${audio}/ucsb-13010-sig-v4.mp3" aria-label="UCSB Cylinder 13010 selected passage"></audio>

        <p class="player-meta">
          <span data-meta-label>2:35–3:18 · Noise reduced (100.09 RPM lock)</span> ·
          <a href="${audio}/ucsb-13010-full-v4.mp3" download>Complete cleaned cylinder (3:48, MP3) ↓</a> ·
          <a href="${ucsb13010}">UCSB archive page ↗</a>
        </p>

        <div class="transcript-box" data-transcript>
          <p class="tr-kicker">Spoken in formal Cape Dutch (<em>Hoog-Hollands</em>)</p>
          <blockquote class="tr-orig">“Johan Andrew Stegmann. Vijftien December achttienhonderd drie-en-negentig. Predikant der Nederduitse Gereformeerde Kerk te Ceres.”</blockquote>
          <p class="tr-eng"><strong>English:</strong> “Johan Andrew Stegmann. Fifteen December eighteen hundred and ninety-three. Minister of the Dutch Reformed Church at Ceres.” UCSB’s catalogue previously read the surname as “Johan Andrew Dechman?” and left the date and church blank.</p>
        </div>

        <noscript>
          <p><a href="${audio}/ucsb-13010-sig-raw.mp3">Signature (raw)</a> · <a href="${audio}/ucsb-13010-sig-v4.mp3">Signature (cleaned)</a> · <a href="${audio}/ucsb-13010-sig-v4-slow.mp3">Signature (0.70× slowed)</a> · <a href="${audio}/ucsb-13010-opening-v4.mp3">Opening (cleaned)</a> · <a href="${audio}/ucsb-13010-prophecy-v4.mp3">Speech (cleaned)</a> · <a href="${audio}/ucsb-13010-coda-v4.mp3">English coda (cleaned)</a></p>
        </noscript>
      </div>
    </section>
  `;
}

function catalogComparisonExhibit() {
  return `
    <section class="source-exhibit catalog-compare" id="catalog-cards" aria-labelledby="catalog-cards-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Source Exhibit · UCSB Set 197-01 and 197-02</p>
          <h2 id="catalog-cards-title">Two catalogue entries from the same box</h2>
          <p class="exhibit-intro">Cylinders 13009 and 13010 entered the UC Santa Barbara archive together from the Don Hill Collection around 2000 as Set 197-01 and Set 197-02. Both were listed with no location and no identified speaker.</p>
        </div>
      </div>

      <div class="doc-grid">
        <figure class="doc-card">
          <a href="${media}/ucsb-13010-catalog.webp" aria-label="Enlarge screenshot of UCSB Cylinder 13010 catalogue page">
            <img src="${media}/ucsb-13010-catalog.webp" width="1280" height="865" alt="Screenshot of UCSB Cylinder Audio Archive entry for Cylinder 13010, noting performers not decipherable, oral signature guessed as Johan Andrew Dechman, and Set Number 197-02." loading="lazy">
          </a>
          <figcaption>
            <h3>Cylinder 13010 (Set 197-02 · 15 Dec 1893)</h3>
            <p>The catalogue entry reads “Johan Andrew Dechman?” and tags the language as Afrikaans. On the filtered copy, Ds. Johan Andrew Stegmann states his name, the date (15 December 1893), his church in Ceres, and that he is speaking “at the house of Mr. Home at Ceres.” <a href="${ucsb13010}">Live record ↗</a></p>
          </figcaption>
        </figure>

        <figure class="doc-card">
          <a href="${media}/ucsb-13009-catalog.webp" aria-label="Enlarge screenshot of UCSB Cylinder 13009 catalogue page">
            <img src="${media}/ucsb-13009-catalog.webp" width="1280" height="865" alt="Screenshot of UCSB Cylinder Audio Archive entry for Cylinder 13009, noting performer not given, song from The Girls of Gottenburg (1907), addressee possibly Mister Steytler, and Set Number 197-01." loading="lazy">
          </a>
          <figcaption>
            <h3>Cylinder 13009 (Set 197-01 · 1907 or later)</h3>
            <p>The companion cylinder holds an English passage naming Cape Town and Ceres, a song from a 1907 London musical, and an Afrikaans speech addressed to “Mister Steytler.” Charles Rhenius Cruywagen Steytler recorded Tennyson in 1890 and married Margaret Henrietta Home in Ceres in 1897. <a href="${ucsb13009}">Live record ↗</a></p>
          </figcaption>
        </figure>
      </div>

      <figure class="specimen-strip">
        <img src="${media}/brown-wax-cylinder.webp" width="576" height="512" alt="Photograph of an early 1890s Edison brown wax cylinder with beveled interior ribs." loading="lazy">
        <figcaption>
          <p class="exhibit-kicker">Channel-rim brown wax</p>
          <p>All four cylinders in Set 197 are channel-rim brown wax blanks, the soft-wax format Edison supplied in the early 1890s. A narrow groove around the rim seated the blank on the phonograph’s brass mandrel. Owners could record into a horn at home, play the cylinder back immediately, or shave the surface smooth to reuse it. <em>Specimen shown: Edison brown wax cylinder EDIS 93947, Thomas Edison National Historical Park (Public Domain).</em></p>
        </figcaption>
      </figure>
    </section>
  `;
}

function companionAudioExhibit() {
  return `
    <section class="source-exhibit ceres-player-card" id="listen-13009" aria-labelledby="listen-13009-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Audio Exhibit 2 · Set 197-01, 197-03 &amp; 197-04</p>
          <h2 id="listen-13009-title">The other three cylinders in Set 197</h2>
          <p class="exhibit-intro">Cylinder 13009 carries spoken Afrikaans addressed to “Mister Steytler” alongside an English message naming Ceres. Cylinders 13011 and 13012 come from the same box.</p>
        </div>
      </div>

      <div class="companion-grid">
        <div class="mini-player" data-mini="c13009afr">
          <p class="tab-tag">Cylinder 13009 · Afrikaans (1:35–2:22)</p>
          <h3>“Mister Steytler! Ons predikant…”</h3>
          <div class="version-bar" role="group" aria-label="Cylinder 13009 Afrikaans version">
            <button type="button" class="ver-btn" data-mini-src="${audio}/ucsb-13009-afrikaans-raw.mp3" aria-pressed="false">Archive audio (raw)</button>
            <button type="button" class="ver-btn is-active" data-mini-src="${audio}/ucsb-13009-afrikaans-v4.mp3" aria-pressed="true">Noise reduced</button>
          </div>
          <audio controls preload="none" src="${audio}/ucsb-13009-afrikaans-v4.mp3" aria-label="Cylinder 13009 spoken Afrikaans addressing Mister Steytler"></audio>
          <p class="mini-quote">“Mister Steytler! Ons predikant lyk my liewe man… Ons het hom ’n paar slae gehoor preek, maar hy’s ’n goeie preek gelewer. Hy lyk my ons gemeente hoog tevrede is met hom. Ons wens hom ’n goeie geluk hierop, in die gemeente!”</p>
          <p class="mini-note">Spoken in vernacular Afrikaans, praising a minister whom the congregation has heard preach a few times (possibly Ds. R. D. McDonald, installed at Ceres in 1911).</p>
        </div>

        <div class="mini-player">
          <p class="tab-tag">Cylinder 13009 · English (0:00–1:02)</p>
          <h3>Cape Town docks and Ceres</h3>
          <audio controls preload="none" src="${audio}/ucsb-13009-ceres-eng-v4.mp3" aria-label="Cylinder 13009 English opening mentioning Cape Town and Ceres"></audio>
          <p class="mini-quote">“This is the first time I’ve ever spoken into a gramophone, and I don’t quite believe that my voice will ever come out again! … I’m going to Cape Town on Monday night, and I hope to be at the docks at 8 o’clock on Tuesday morning … and that they’ll arrive at Ceres at the end of the week.”</p>
          <p class="mini-note">After this passage the speaker sings “Two Little Sausages” from <em>The Girls of Gottenberg</em> (London, May 1907), placing this cylinder in 1907 or later.</p>
        </div>

        <div class="mini-player">
          <p class="tab-tag">Cylinder 13011 · Set 197-03 · Catalogue correction</p>
          <h3>Austrian-German yodeling song</h3>
          <audio controls preload="none" src="${audio}/ucsb-13011-tyrolean-v4.mp3" aria-label="Cylinder 13011 Austrian-German yodeling folksong"></audio>
          <p class="mini-note">UCSB catalogued <a href="${ucsb13011}">Cylinder 13011</a> as “Male singing in Afrikaans.” Filtered at 165.01 RPM, it is an Austrian-German yodeling folksong (<em>“Es zog ein Pater von Österreich… der ging so gern nach Frankreich…”</em>).</p>
        </div>

        <div class="mini-player">
          <p class="tab-tag">Cylinder 13012 · Set 197-04 · 96.60 RPM</p>
          <h3>Schiller and Shelley</h3>
          <audio controls preload="none" src="${audio}/ucsb-13012-schiller-v4.mp3" aria-label="Cylinder 13012 Schiller recitation"></audio>
          <p class="mini-note">Recorded at roughly 100 RPM, the same early-1890s speed as Cylinder 13010. The speaker announces an excerpt from Schiller’s <em>Song of the Bell</em>, recites in German, switches to Shelley’s “To a Skylark” in English, and closes with laughter and a line of Spanish. <a href="${ucsb13012}">UCSB record ↗</a></p>
        </div>
      </div>
    </section>
  `;
}

function methodologyDiagramExhibit() {
  return `
    <section class="source-exhibit dsp-figure-card" id="dsp-diagram" aria-labelledby="dsp-diagram-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Acoustic Measurements · UCSB Cylinder 13010</p>
          <h2 id="dsp-diagram-title">Rotation lock and spectrograms of the 1893 signature</h2>
          <p class="exhibit-intro">Top: correlating the high-frequency surface noise (3.5–8 kHz) against itself produces a spike at 0.600 seconds (100.0 RPM, <em>r</em> = +0.44) and a second spike at two turns (1.20 s). Middle and bottom: spectrograms of the 38-second oral signature before and after phase-locked filtering.</p>
        </div>
      </div>
      <figure class="dsp-fig">
        <a href="${media}/v4-scrub-diagram.webp" aria-label="Open full-resolution acoustic diagnostic diagram for UCSB Cylinder 13010">
          <img src="${media}/v4-scrub-diagram.webp" width="1600" height="1080" alt="Three-panel acoustic diagram of UCSB Cylinder 13010 showing the rotation-lock autocorrelation peak at 0.600 seconds (100.0 RPM, r = +0.44), the raw spectrogram of 2:38 to 3:16 obscured by vertical scratch stripes, and the cleaned v4 spectrogram revealing speech formants for Johan Andrew Stegmann, 15 December 1893, Predikant der NG Kerk te Ceres." loading="lazy">
        </a>
        <figcaption>Measured directly from UCSB Cylinder 13010 raw transfer and filtered output. The filter lowers only repeating frequencies locked to the cylinder’s rotation period and preserves the original phase of the signal. <a href="${media}/v4-scrub-diagram.webp">Full-size chart ↗</a></figcaption>
      </figure>
    </section>
  `;
}

function pilotBatchTable() {
  const rows = [
    { cyl: "13010", set: "Set 197-02", rpm: "100.09 RPM", lock: "+0.195", before: "Unidentified “Johan Andrew Dechman?”, tagged Afrikaans", after: "Ds. Johan Andrew Stegmann (1825–1908), 15 Dec 1893, at Mr. Home’s house in Ceres, formal Cape Dutch." },
    { cyl: "13009", set: "Set 197-01", rpm: "128.04 RPM", lock: "+0.140", before: "Unidentified, “Mister Steytler?”", after: "Ceres/Cape Town English speech, 1907 song, and vernacular Afrikaans addressing C. R. C. Steytler (1864–1919)." },
    { cyl: "13011", set: "Set 197-03", rpm: "165.01 RPM", lock: "+0.167", before: "Mislabeled “Male singing in Afrikaans”", after: "Austrian-German yodeling folksong (<em>“Es zog ein Pater von Österreich”</em>)." },
    { cyl: "13012", set: "Set 197-04", rpm: "96.60 RPM", lock: "+0.374", before: "Unidentified “Schiller’s […] when I was a schoolboy”", after: "Early ~100 RPM channel-rim recitation of Schiller’s <em>Song of the Bell</em> and Shelley’s “To a Skylark.”" },
    { cyl: "12884", set: "Set 140-07", rpm: "155.90 RPM*", lock: "+0.341", before: "Jèrriais, announcement missing “[during the … season?]”", after: "“Conversation between two farmers in the Island of Jersey during the potato season — Edison Record.”" },
    { cyl: "13001", set: "Giovannoni", rpm: "120.20 RPM", lock: "+0.183", before: "Dated Dec 30, 1897, street blank", after: "“109 West [84th/94th?] Street, New York, Dec. 30, 1897, 11 P.M.”" },
    { cyl: "12892", set: "Set 141-06", rpm: "164.63 RPM", lock: "+0.150", before: "Unidentified German encounter with the Pope", after: "Austrian-German account of a 6-person Papal audience on “Monday, 19 October” (1903, 1908, or 1914)." },
    { cyl: "12962", set: "Giovannoni", rpm: "134.24 RPM", lock: "+0.420", before: "William Dunlop, Dec 26, 1900", after: "Strongest lock in pilot; clear Irish Boxing Day voice letter to brother George Dunlop in America." },
    { cyl: "12888", set: "Set 141-02", rpm: "166.28 RPM", lock: "+0.268", before: "Unidentified German, Dec 1, 1915", after: "WWI-era Austrian-German conversation (box inscribed <em>Josef Robauch</em>)." },
  ];

  return `
    <section class="source-exhibit pilot-table-card" id="pilot-batch" aria-labelledby="pilot-batch-title">
      <div class="exhibit-head">
        <div>
          <p class="exhibit-kicker">Test Batch · 9 of 9 Cylinders Locked</p>
          <h2 id="pilot-batch-title">Results across the first nine cylinders</h2>
          <p class="exhibit-intro">Set 197 turned up during a nine-cylinder test of automated rotation-locked filtering on noisy, mostly non-English home recordings in the UCSB archive.</p>
        </div>
      </div>
      <div class="table-scroll">
        <table class="ceres-table">
          <thead>
            <tr>
              <th>UCSB #</th>
              <th>Set</th>
              <th>Detected speed</th>
              <th>Lock <em>r</em></th>
              <th>Catalogue before</th>
              <th>Recovered after filtering</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `<tr>
              <td class="nowrap"><code>${r.cyl}</code></td>
              <td class="nowrap">${r.set}</td>
              <td class="nowrap">${r.rpm}</td>
              <td class="nowrap"><code>${r.lock}</code></td>
              <td>${r.before}</td>
              <td>${r.after}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="table-footnote">*Cylinder 12884 locked onto its half-speed subharmonic (77.95 RPM, two turns at 155.90 RPM). Lock <em>r</em> gives the batch script’s broadband score; on Cylinder 13010, isolating the 3.5–8 kHz noise band raises envelope correlation to <code>r = +0.44</code>.</p>
    </section>
  `;
}

export function ceresHTML() {
  const passages = [
    {
      id: "who-spoke",
      body: ref => `
        <h2>A minister’s prediction, 15 December 1893</h2>
        <p>On the evening of Friday, 15 December 1893, a retired Dutch Reformed minister spoke into the horn of an Edison phonograph in Ceres, a town about ninety miles northeast of Cape Town. He had never heard a sound recording before. Speaking slowly in formal pulpit Dutch, he predicted that the new machine would soon carry sermons:${ref}</p>
        <blockquote class="pull-quote">“I have heard much of the so-called phonograph. This evening I heard it for the first time, at the house of Mr. Home at Ceres. I do not doubt for a moment that the telephone will one day be used for the spread of the Word. The Gospel will one day without doubt be preached through the phonograph. The time is fast approaching when this great wonder shall be used among us to extend His kingdom through the preaching of the Word in an artificial manner.”</blockquote>
        <p>At the end he gave his name, the exact date, and his title: “Johan Andrew Stegmann. Fifteen December eighteen hundred and ninety-three. Minister of the Dutch Reformed Church at Ceres.”</p>
        <p>The brown-wax cylinder eventually reached the UC Santa Barbara Cylinder Audio Archive as Cylinder 13010. Surface hiss and a repeating scratch obscured the consonants in the closing lines. UCSB’s catalogue noted the year 1893, guessed “Johan Andrew Dechman?” for the speaker’s name, and left the date, host, and church unread.</p>
      `,
      note: `UCSB Cylinder Audio Archive, <a href="${ucsb13010}">Cylinder 13010</a> (David Giovannoni Collection of home cylinder recordings, Set Number 197-02, originally acquired from the Don Hill Collection, c. 2000). The spoken phrase for “in an artificial manner” is <em>op eene kunstmatige wijze</em>, formal 19th-century Cape Dutch (<em>Hoog-Hollands</em>).`,
    },
    {
      id: "audio-13010",
      wide: true,
      body: cylinder13010Exhibit,
    },
    {
      id: "stegmann-id",
      body: ref => `
        <h2>Who spoke into the horn</h2>
        <p>With the repeating scratch lowered, the closing signature reads clearly: Johan Andrew Stegmann, 15 December 1893, Predikant der Nederduitse Gereformeerde Kerk te Ceres. South African church histories record him as the first resident minister of the Ceres Dutch Reformed congregation, where he served from 1857 until 1883. Born around April 1825 in Cape Town and named after his brother-in-law Andrew Murray Sr., Stegmann was sixty-eight years old when he made the recording. He died on 5 January 1908 in Sea Point, Cape Town.${ref}</p>
        <p>Slowing the signature to 0.70× speed helped avoid a genealogical mix-up. Cape Town records list a contemporary cousin, Johannes Augustus Stegmann (31 October 1819 – 17 August 1894), from another branch of the same family. On the slowed clip the middle name is unmistakably <em>Andrew</em>, and parish histories confirm that Johan Andrew Stegmann was the Ceres minister.</p>
        <p>A second speaker filled the last thirty-five seconds of blank wax at the end of the cylinder. Speaking in English, he jokes: “Well now, Mr. Phonograph, here’s a [broad?] voice to hear my voice. This is Sunday afternoon, a jolly good way of spending it, isn’t it? Here all the girls come down in their nightgowns, I mean to say in their dressing gowns.” In 1893, 15 December was a Friday, so this coda was likely added two days later, on Sunday afternoon, 17 December.</p>
      `,
      note: `On Ds. Johan Andrew Stegmann’s 1857–1883 ministry in Ceres, see <a href="https://www.gemeentegeskiedenis.co.za/ng-gemeente-ceres/">NG Gemeente Ceres (Gemeentegeskiedenis)</a> and J. Du Plessis, <em>The Life of Andrew Murray of South Africa</em> (1919). WikiTree and <em>South African Genealogies</em> give his dates as c. April 1825 – 5 January 1908 (Sea Point, Cape Town), distinct from Johannes Augustus Stegmann (31 Oct 1819 – 17 Aug 1894, son of George Frederik Stegmann and Anna Maria Zibee).`,
    },
    {
      id: "tennyson-link",
      body: ref => `
        <h2>The link to Tennyson’s recordist</h2>
        <p>An Edison wax-cylinder phonograph was rare anywhere outside Europe and North America in 1893. The clue to how one reached rural Cape Colony sat on the companion cylinder in the same UCSB box, Cylinder 13009 (Set 197-01).</p>
        <p>UCSB’s notes on Cylinder 13009 mentioned that both an English speaker and an Afrikaans speaker seemed to address a “Mister Steytler.” On the filtered English track, the speaker talks about taking the train to Cape Town on Monday night to meet relatives at the docks and hopes “that they’ll arrive at Ceres at the end of the week.”${ref}</p>
        <p>That points directly to Charles Rhenius Cruywagen Steytler (c. 1864 – 10 September 1919). Born into a Cape Colony family, Steytler worked in London in the late 1880s for Colonel George Edward Gouraud, Thomas Edison’s European agent. In May 1890, Steytler went to Farringford on the Isle of Wight and recorded Alfred, Lord Tennyson reading “The Charge of the Light Brigade” on Edison wax cylinders. Through at least April 1891 he toured British theaters demonstrating Edison’s “Perfected” Phonograph before returning to South Africa.</p>
        <p>A local marriage register ties Steytler directly to the house named on the 1893 cylinder. Ds. Stegmann opens by saying he heard the phonograph “at the house of Mr. Home at Ceres.” Parish records for St. Andrew’s Anglican Church in Ceres show that on 10 February 1897, Charles Rhenius Cruywagen Steytler married Margaret Henrietta Home, a daughter of the Home family in Ceres. Four years earlier, in December 1893, Gouraud’s former London agent was demonstrating his phonograph in his future in-laws’ parlor.${ref}</p>
      `,
      note: `On C. R. C. Steytler’s May 1890 Tennyson session for Col. Gouraud and his April 1891 lecture at the Tyne Theatre in Newcastle, see Musical Box Society of Great Britain journals and Library of Congress Tennyson discographies. Parish marriage transcriptions (<a href="https://www.1820settlers.com/">1820settlers.com</a>, St. Andrew’s Anglican Church, Ceres &amp; Prince Alfred Hamlet) record the marriage of Charles Rhenius Cruywagen Steytler and Margaret Henrietta Home on 10 February 1897; Henry Home (1822–1903) lived in Ceres. Steytler later served as Honorary Secretary of the Ceres Angling Association (<em>Cape Piscatorial Society</em> records) and died in Sea Point, Cape Town, on 10 September 1919.`,
    },
    {
      id: "catalog-exhibit",
      wide: true,
      body: catalogComparisonExhibit,
    },
    {
      id: "companion-exhibit",
      wide: true,
      body: companionAudioExhibit,
    },
    {
      id: "significance",
      body: ref => `
        <h2>Cape Dutch, Afrikaans, and open questions</h2>
        <p>Standard South African sound histories place the earliest Afrikaans recording in July 1906, when the touring Springbok rugby team recorded “Springboks Conversing in the Taal” in London (Gramophone Concert Record <code>GC 4608</code>). Major ethnographic cylinder collections made inside Southern Africa, such as Dorothea Bleek’s and Percival Kirby’s, begin around 1905. Dated 15 December 1893 and localized to Ceres, Cylinder 13010 predates both by over a decade.${ref}</p>
        <p>One linguistic distinction matters. Although UCSB tagged Cylinder 13010 as Afrikaans, Ds. Stegmann speaks formal Cape Dutch (<em>Hoog-Hollands</em>) with a South African pronunciation, as educated Dutch Reformed clergy of his generation did on formal occasions. Conversational Afrikaans appears on the companion cylinder, Cylinder 13009, in the tribute addressed to “Mister Steytler.” Because Cylinder 13009 also includes a song from the May 1907 musical <em>The Girls of Gottenberg</em>, that recording dates to 1907 or later. Its praise of a newly arrived Ceres minister fits Ds. R. D. McDonald, who took the pulpit in 1911 after Ds. W. A. Alheit drowned in December 1910.${ref}</p>
        <p>Three checks remain open before treating Cylinder 13010 as the earliest surviving recording made in South Africa:</p>
        <ul class="limits-list">
          <li><strong>Check with South African sound historians and UCSB curators:</strong> Ask specialists (including Schalk D. van der Merwe, Patrick Feaster, and UCSB Special Collections) whether any earlier 1889–1893 Cape Colony cylinder survives in another archive or private collection, and send UCSB the Set 197 identifications and the Cylinder 13011 language correction.</li>
          <li><strong>Search 1891–1894 Cape newspapers and <em>De Kerkbode</em>:</strong> Contemporary press mentions of C. R. C. Steytler demonstrating an Edison phonograph in the Western Cape, or a church notice mentioning Ds. Stegmann’s recording, would give an independent written witness.</li>
          <li><strong>Compare the English coda voice against 1890 British cylinders:</strong> The English speaker at 3:12 of Cylinder 13010 may be C. R. C. Steytler himself or a member of the Home family. Comparing that clip with any surviving spoken announcement by Steytler on Gouraud’s 1890 cylinders could test the match.</li>
        </ul>
      `,
      note: `On the July 1906 Springbok rugby recording (<em>GC 4608</em>), see South African discographical surveys (<a href="https://www.flatinternational.org/">Flat International</a>; Schalk D. van der Merwe) and UCT Special Collections notes on early Southern African wax cylinders (Dorothea Bleek, Percival Kirby). On the Ceres NG ministers (J. A. Stegmann 1857–1883, G. F. Marais 1884–1893, W. A. Alheit 1894–1910, R. D. McDonald 1911–1939), see <a href="https://www.gemeentegeskiedenis.co.za/ng-gemeente-ceres/">Gemeentegeskiedenis</a>.`,
    },
    {
      id: "methodology",
      body: ref => `
        <h2 id="methodology">Methodology</h2>
        <p>Standard AI speech-enhancement tools are risky for historical recordings because generative models fill noisy gaps with guessed syllables. On a damaged name like Stegmann’s, a generative model can invent clear consonants that were never spoken. Our pipeline uses deterministic signal processing only.${ref}</p>
        <p>A wax cylinder turns on a mandrel at a steady rate, typically 95 to 165 revolutions per minute. Every scratch, mold patch, or seam on the wax hits the stylus at the same point in every turn, while human speech changes continuously from one turn to the next. That physical difference allows four repeatable steps:</p>
        <ol class="method-steps">
          <li><strong>Light impulse de-clicking:</strong> Decode the archive MP3 to 24 kHz mono WAV and apply a mild median de-click filter (<code>ffmpeg adeclick</code>) to knock down isolated pops while keeping the 150–7,800 Hz speech band intact.</li>
          <li><strong>Automatic rotation-speed lock:</strong> Isolate the 3.5–8 kHz surface-noise band, compute its amplitude envelope, and correlate that envelope against itself across lags from 0.30 to 1.30 seconds. A peak marks the cylinder’s true revolution period <em>T</em>. On Cylinder 13010, the peak falls at 0.600 seconds (100.0 RPM, <em>r</em> = +0.44), with a second peak at two turns (1.20 s).</li>
          <li><strong>Full-band phase-locked spectral filtering (150–7,800 Hz):</strong> Convert the audio to a Short-Time Fourier Transform spectrogram and compare each time slice <em>t</em> against the same angular position on the wax one, two, and three revolutions earlier and later (<em>t</em> ± <em>kT</em>). A smooth Wiener-style gain mask lowers energy that repeats across turns while keeping the original acoustic phase unchanged.</li>
          <li><strong>Direct listening, slowed playback, and archival checking:</strong> Listen directly to normal-speed and 0.70× pitch-preserved clips to extract concrete names, dates, and places, then verify every candidate against church registers, genealogies, and sibling cylinders in the same archival set.</li>
        </ol>
      `,
      note: `The batch script (<code>v4_batch_scrub.py</code>) extends the periodic-noise filter used on <a href="/leads/grant-cylinder">EDIS 93953 (“A voice from Vienna”)</a> across 150–7,800 Hz and adds automatic revolution-period detection. All nine cylinders in the first multilingual batch (Dutch/Cape Dutch, Afrikaans, Jèrriais, Austrian German, Irish English, and New York English) locked cleanly onto their rotation speeds.`,
    },
    {
      id: "dsp-diagram-block",
      wide: true,
      body: methodologyDiagramExhibit,
    },
    {
      id: "pilot-batch-block",
      wide: true,
      body: pilotBatchTable,
    },
    {
      id: "what-next",
      body: ref => `
        <h2>Other cylinders from the test batch</h2>
        <p>The same nine-cylinder run recovered missing words on several unrelated home recordings. On Cylinder 12884, a recording in Jèrriais (Jersey Norman French) where UCSB had bracketed the opening announcement as “[during the … season?],” the filtered audio reads clearly: “Conversation between two farmers in the Island of Jersey during the potato season — Edison Record.” Other cylinders in the batch yielded a dated 30 December 1897 New York address (Cylinder 13001) and a clear Austrian-German account of a six-person private Papal audience on “Monday, 19 October” (Cylinder 12892).${ref}</p>
        <p>More than a hundred additional unidentified home recordings remain digitized in the UCSB archive alone. Running the same rotation-locked filter across multi-cylinder sets and non-English recordings takes a few seconds per cylinder locally and gives archivists concrete names and dates to check.</p>
      `,
      note: `All nine cylinders come from the <a href="https://cylinders.library.ucsb.edu/">UC Santa Barbara Cylinder Audio Archive</a> (David Giovannoni Collection of home cylinder recordings). Cylinder 12884 (<a href="https://cylinders.library.ucsb.edu/detail.php?query_type=mms_id&query=990041107430203776">Set 140-07, Frank O. Moon Collection</a>) is worth checking with <em>La Société Jersiaise</em> as an early surviving recording of Jèrriais.`,
    },
  ];

  return `
    <article class="leads-page ceres-lead">
      <div class="lead-page-links">
        <a class="back" href="/leads">← All leads</a>
        <a class="methodology-jump" href="#methodology">Methodology ↓</a>
      </div>

      <header class="ceres-mast">
        <div class="ceres-mast-copy">
          <p class="lead-label">Ceres, South Africa · December 1893 · Wax cylinder</p>
          <h1 class="page-title">${ceresTitle}</h1>
          <p class="ceres-deck">Lowering a repeating scratch on an unidentified 1893 brown-wax cylinder at UC Santa Barbara turned up what appears to be the <strong>earliest known surviving voice recording made in South Africa</strong>, thirteen years before the 1906 recording usually cited. The filtered audio names the speaker, date, town, and house, and traces the cylinder back to the London agent who recorded Alfred, Lord Tennyson.</p>
          ${leadByline(
            [["Gemini 4", "Deterministic audio restoration pipeline, transcription, archival triangulation, and writeup; reviewed by Benjamin Breen."]],
            `<a href="#listen-13010">Listen to the 1893 voice ↓</a> · <a href="#catalog-cards">Catalogue cards ↓</a> · <a href="#methodology">Methodology ↓</a>`
          )}
        </div>
        <figure class="ceres-hero-fig">
          <a href="${media}/edison-gouraud-1888.webp" aria-label="Enlarge June 16, 1888 photograph of Thomas Edison and Col. George Gouraud with the Perfected Phonograph">
            <img src="${media}/edison-gouraud-1888.webp" width="1100" height="829" alt="June 16, 1888 photograph of Thomas Edison seated behind his Perfected Phonograph with wax cylinders on the table, surrounded by staff including Col. George Gouraud and Theo Wangemann.">
          </a>
          <figcaption>Thomas Edison and his European agent Col. George Gouraud (seated right) with the Perfected Phonograph and wax cylinders at West Orange, 16 June 1888. Gouraud’s London recordist, South African-born C. R. C. Steytler, recorded Tennyson in 1890 and brought an Edison phonograph home to Ceres, Cape Colony. <em>National Park Service / Wikimedia Commons (Public Domain).</em></figcaption>
        </figure>
      </header>

      ${notedPassages(passages)}

      <footer class="ceres-footer">
        <p class="footer-kicker">Related open problem &amp; audio lead</p>
        <div class="footer-links">
          <a href="/p/wax-cylinder-voices">Whose voices survive on unidentified early wax cylinders? →</a>
          <a href="/leads/grant-cylinder">A voice from Vienna (Edison cylinder EDIS 93953, 1889–90) →</a>
        </div>
      </footer>
    </article>
  `;
}
