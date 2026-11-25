// Null results: short, reproducible records of multi-archive investigations that hit an evidentiary wall.
// Built to /null-results/<slug> by scripts/build.mjs and listed under Null results on the Leads page.
import { leadByline } from "../../render.js";

const muraqqa = "https://www.orientalstudies.ru/eng/images/pdf/st.petersburg_muraqqa_1996.pdf";
const mundy = "https://archive.org/details/travelsofpetermu02mund/page/318/mode/2up";
const grandidier = "https://archive.org/details/collectiondesouv02gran/page/208/mode/2up";
const qdlXlix = "https://www.qdl.qa/en/archive/81055/vdc_100000001273.0x000332";
const qdlG29 = "https://www.qdl.qa/en/archive/81055/vdc_100000001251.0x00035e";
const voc1072 = "https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/1072/file/NL-HaNA_1.04.02_1072_0597";
const naVapoer = "https://www.nationaalarchief.nl/onderzoeken/archief/1.10.30/invnr/35";
const rahCatalog = "https://www.rah.es/wp-content/uploads/2016/11/SalazaryCastro_22_nov_2016.pdf";

export const mughalDodoTitle = "How did a dodo become the subject of a Mughal painting?";
export const mughalDodoDescription = "Eleven archival passes across Dutch, English, Portuguese and Persian sources tested how a Mauritian dodo reached the artist behind the St. Petersburg bird study. They broke the standard 1624–27 dating and mapped specific offline shelfmarks, without linking any documented bird to the painting.";

export function mughalDodoHTML() {
  return `
    <article class="leads-page null-result">
      <a class="back" href="/leads#null-results">← Leads and warnings</a>
      <header class="nr-mast">
        <div>
          <p class="lead-label">Null result · Mughal India &amp; Safavid Persia · Seventeenth century</p>
          <h1 class="page-title">${mughalDodoTitle}</h1>
          <p class="lead-intro">An unsigned miniature in the St. Petersburg Muraqqa depicts a live dodo alongside South Asian birds. Art historians generally attribute it to the Mughal court painter Ustad Mansur. Across eleven passes through digitized Dutch, English, Portuguese and Persian archives, we tried to trace a specific bird—or a European print—to the artist. The search came back inconclusive.</p>
        </div>
        <figure class="nr-figure">
          <img src="/media/leads/dodo/dodo-detail.webp" alt="Detail of a dodo in a Mughal album painting.">
          <figcaption>Detail of the dodo on folio 80r of the <a href="${muraqqa}">St. Petersburg Muraqqa, plate 147</a>. Unsigned; mounted in an Isfahan collage whose reverse border is dated 1748–49.</figcaption>
        </figure>
      </header>
      ${leadByline([
        ["Claude Opus 5.5", "Ran the October archival sweeps across Dutch, Portuguese, English and Persian sources."],
        ["Gemini 4", "Checked post-1650 VOC Persia records and Qatar Digital Library East India Company manuscripts; drafted this null result, reviewed by Benjamin Breen."],
      ])}

      <section class="nr-section">
        <h2>Outcome in brief</h2>
        <p>No document found in public digital archives connects a particular dodo shipment, gift or European print to the St. Petersburg painting. The investigation did change the baseline in three ways: it refuted the standard 1624–27 dating argument built on silence in Jahangir’s memoirs, corrected the 1616 Portuguese return date to Goa from 1 September to Saturday 17 September, and showed that official 1628 English ship logs omit even the live dodo Emanuel Altham is independently known to have shipped home on the same fleet.</p>
      </section>

      <section class="nr-section">
        <h2>What was searched</h2>
        <div class="nr-table-wrap">
          <table class="nr-table">
            <thead>
              <tr>
                <th scope="col">Corpus &amp; scope</th>
                <th scope="col">Method &amp; targets</th>
                <th scope="col">Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Dutch VOC archives</strong><br>GLOBALISE HTR (4.79M pages, 1605–1700) &amp; finding aids</td>
                <td>Lexical sweeps for dodo, bird, gift, painter and print terms across Surat, Agra, Goa, Mauritius and Persia (including post-1650 inventories); scan checks of Ravesteijn’s <a href="${voc1072}">May 1617 Mauritius loading list</a>, Surat’s 1619 parrot/cockatoo balance, Vapoer’s 1625 cassowary mission, Mir Musa’s 1629–32 procurements, and 1625/1647 Persian bird requests.</td>
                <td><strong>Zero dodos tied to India or Persia.</strong> Established active court bird-gift channels in both empires, but the early Surat factory expense books (“books A”) are largely lost.</td>
              </tr>
              <tr>
                <td><strong>English EIC manuscripts &amp; calendars</strong><br>Qatar Digital Library, Foster (1624–33), <a href="${mundy}">Peter Mundy</a></td>
                <td>Fixed Mundy’s two Surat windows (Sept 1628–Nov 1630; May 1633–Jan 1634), traced the 1632 <i>Great James</i> Mauritius–Gombroon–Surat leg, and read manuscript scans of three 1628 Hall-fleet journals (<code>IOR/L/MAR/A/XLVI</code>, <code>XLVII</code>, <a href="${qdlXlix}"><code>XLIX</code></a>), the 1630 <i>Discovery</i> log (<code>LII</code>), and <a href="${qdlG29}"><i>Early Papers on Persia</i></a> (<code>IOR/G/29/1</code>, 1621–97).</td>
                <td><strong>No dodo named.</strong> The 1628 logs record Mauritius provisioning and Swally arrival without mentioning Altham’s or Mundy’s dodos; QDL notes that most early Persia and Surat letters sit outside <code>G/29/1</code> in un-digitized <code>IOR/E/3</code> and <code>G/36</code>.</td>
              </tr>
              <tr>
                <td><strong>Portuguese Goa &amp; Jesuit records</strong><br><i>Livros das Monções</i> (1605–31), <i>Assentos</i>, <i>Lettere annue</i> (1620–24)</td>
                <td>Swept printed Goa–Lisbon correspondence and Jesuit annual letters; scan-checked <a href="${grandidier}">Grandidier II, p. 208</a> (correcting the 1616 patache’s return to Goa from OCR “1&quot;” to 17 Sept) and searched the 13,001-page <a href="${rahCatalog}">Salazar y Castro catalogue</a>.</td>
                <td><strong>No Goa arrival record for a bird.</strong> Almeida’s May 1616 capture survives only in French translation; located an un-digitized contemporary Madrid witness (<code>N-63</code>, fols. 7–13).</td>
              </tr>
              <tr>
                <td><strong>Mughal Persian chronicles</strong><br><i>Tuzuk</i>, <i>Iqbalnama</i>, Hadi, Lahori I (939 pp.), Kanbo I (654 pp.)</td>
                <td>Searched English editions and fresh local Tesseract Persian OCR (1616–38), visually checking animal wonders and Muʿizz al-Mulk’s February 1632 Surat–Cambay rarities consignment (Lahori I, p. 417).</td>
                <td><strong>No dodo in any court narrative.</strong> Because 1624–27 chronicles still record exotic birds (a live <i>huma</i>, a white falcon), silence no longer favors 1624–27 over any other reign.</td>
              </tr>
              <tr>
                <td><strong>Painting &amp; print audit</strong><br>Iwanow &amp; Stresemann (1958), Rosenberg (1923), 1996 catalogue, Parish (2013)</td>
                <td>Checked early attribution history and tested European dodo depictions (Clusius, Savery, <i>Het tweede Boeck</i>, Van den Broecke, and their derivatives in De Bry, Jonston, Olearius and Bontius) against fol. 80r.</td>
                <td><strong>No European print match.</strong> Confirmed that both the c. 1615 and 1624–27 dates—and Mansur’s authorship—rest on connoisseurship, not inscriptions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="nr-section">
        <h2>Why the result stayed inconclusive</h2>
        <ul class="nr-list">
          <li><strong>The painting has no firm date or documentary provenance.</strong> Folio 80r is unsigned, has no Mughal seal, and was pasted into an Isfahan collage in the mid-eighteenth century (its earliest documented record is a 1909 Tehran telegram). Even A. I. Iwanow, announcing the painting in 1958, left open whether it was painted at a Mughal court or for a Persian shah. Without a tighter date, any plausible shipping route across three decades stays merely compatible.</li>
          <li><strong>Routine records filter out curiosities.</strong> Navigation logs rarely mention private live animals, and court chronicles fold exotic presents into generic formulas (“gifts and rarities”). Absence from these series cannot rule out a transfer.</li>
          <li><strong>The remaining high-signal files are offline.</strong> Every pass that pushed past published calendars hit an un-digitized manuscript or a paywalled archive.</li>
        </ul>
      </section>

      <section class="nr-section nr-next">
        <h2>What could still settle it</h2>
        <p>Further sweeps of open full-text corpora have hit diminishing returns. Progress now depends on four specific physical holdings:</p>
        <ul class="nr-list">
          <li><strong>Real Academia de la Historia, Madrid, Salazar y Castro <code>N-63</code>, fols. 7–13 (inv. 63461)</strong> and <strong><code>ARSI Goa 33 II</code> (Rome)</strong> — to test whether the bird captured on Mauritius in March 1616 survived to Goa.</li>
          <li><strong>Nationaal Archief, The Hague, <a href="${naVapoer}"><code>1.10.30</code> (Geleynssen de Jongh), inv. 35 &amp; inv. 33</a></strong> — unread 1625 Lahore and Agra letters of the Dutch painter Hendrick Vapoer, who brought a live flightless bird (recorded as a cassowary) to Jahangir’s court.</li>
          <li><strong>British Library, <code>IOR/E/3/12–13</code> and <code>IOR/G/36/102–118</code></strong> — un-digitized Surat and Persia factory correspondence and steward accounts for 1628–34, covering Mundy’s Surat birds and the <i>Great James</i>’s 1632 Gombroon stop.</li>
          <li><strong>Institute of Oriental Manuscripts, St. Petersburg, <code>E-14</code>, fol. 80r</strong> — raking and transmitted light, paper-fiber and pigment analysis to test Mughal versus Safavid paper and whether the dodo is an original life-study or a later copy.</li>
        </ul>
        <p class="nr-related"><a href="/leads/dodo-journal">Related lead: The dodos in a ship’s journal (1615 VOC discovery and method) →</a></p>
      </section>
    </article>`;
}

export const nullResults = [
  {
    slug: "mughal-dodo",
    href: "/null-results/mughal-dodo",
    published: "2026-11-24T00:15:00-08:00",
    label: "Mughal India & Persia · Seventeenth century · Inconclusive",
    title: mughalDodoTitle,
    description: mughalDodoDescription,
    image: "/media/leads/dodo/dodo-detail.webp",
    alt: "Detail of a dodo in a Mughal album painting.",
    action: "Read the null result",
    html: mughalDodoHTML,
  },
];
