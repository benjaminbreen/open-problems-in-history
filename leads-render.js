import { leadStubs } from "./lead-stubs.js";
import { archiveLeads } from "./archive-leads.js";
import { cautionaryTales } from "./cautionary-tales.js";
import { notedPassages } from "./lib/lead-notes.js";
import { leadByline } from "./render.js";
import { wilkinsonTitle } from "./wilkinson-lead.js";

import { dodoTitle, dodoDescription } from "./dodo-lead.js";
import { superstormTitle, superstormDescription } from "./superstorm-lead.js";
import { makassarSmallpoxTitle, makassarSmallpoxDescription } from "./makassar-smallpox-lead.js";
import { phantomTitle, phantomDescription } from "./phantom-disasters-lead.js";

export const grantTitle = "A voice from Vienna";
export const grantDescription = "How a recurring noise on an Edison wax cylinder, a girl’s floor plan, and a school register helped put a possible name to an American voice in Vienna.";
export const langleyTitle = "Did Langley ever try Bell’s kite designs?";
export const langleyDescription = "In 1902 the astronomer Samuel Langley asked Alexander Graham Bell to help him fly an experimental kite. A notebook records two changes Bell suggested. Did either design get into the air?";

const media = "/media/leads/grant";
const transcript = "https://www.nps.gov/edis/learn/photosmultimedia/prince-bismarck-and-count-moltke-before-the-recording-horn.htm#:~:text=Herr%20Wangemann%20is%20here";
const transfer = "https://www.nps.gov/edis/learn/photosmultimedia/upload/08-tenhp_edison_c_E-5777_edis-93953_20110415.mp3";
const plan = "https://scholarsjunction.msstate.edu/cgi/viewcontent.cgi?article=1003&amp;context=fdg-and-ihg-correspondence#page=7";
const register = "https://books.google.com/books?id=V33R3iW7K50C&amp;pg=RA1-PA61";

export const leadsDescription = "Preliminary writeups of promising leads, methods and cautionary tales from tackling open historical problems using digitized archives and agentic research.";

export function leadsHTML() {
  // First appearance of each writeup on the Leads index, in repository time.
  const entries = [
    {
      slug: "phantom-disasters", published: "2026-11-23T22:20:00-08:00",
      label: "Global, 1248–1913 · Historical geophysics & data auditing", title: phantomTitle, description: phantomDescription,
      image: "/media/leads/phantom-disasters/boekhold-thumb.webp", alt: "Opening of François van Boekhold’s 1792 account of departing Salatiga on 17 July 1786 to climb Mount Merapi.",
      action: "Trace the false entries",
    },
    {
      slug: "makassar-smallpox", published: "2026-11-23T16:25:00-08:00",
      label: "Makassar & Sydney, 1781–1792 · Disease history", title: makassarSmallpoxTitle, description: makassarSmallpoxDescription,
      image: "/media/leads/makassar-smallpox/crop-makassar-1782.webp", alt: "Detail of the spring 1782 Makassar council resolution ordering four-foot graves during a smallpox outbreak.",
      action: "Read the Company papers",
    },
    {
      slug: "1770-superstorm", published: "2026-11-23T16:10:00-08:00",
      label: "Global, September 1770 · Space weather", title: superstormTitle, description: superstormDescription,
      image: "/media/leads/1770-superstorm/trondhjem-sept-crop.webp", alt: "September 1770 daily weather and aurora table for Trondhjem, Norway by Johan Daniel Berlin (1784).",
      action: "Explore the 12-night storm",
    },
    ...leadStubs.map(stub => ({ ...stub, action: "Read the research stub" })),
    ...archiveLeads,
    {
      slug: "dodo-journal", published: "2026-11-19T11:05:53-08:00",
      label: "Mauritius, 1615 · Natural history", title: dodoTitle, description: dodoDescription,
      image: "/media/leads/dodo/scan-277.webp", alt: "A manuscript page from the Dutch ship’s journal.",
      action: "Read the manuscripts",
    },
    {
      slug: "langley-kite", published: "2026-11-19T10:29:16-08:00",
      label: "Potomac River, 1902 · Early flight", title: langleyTitle, description: langleyDescription,
      image: "/og/langley-kite.jpg", alt: "Notebook detail beginning ‘Mr Bell suggested’.",
      action: "Read the notebook",
    },
    {
      slug: "wilkinson-dictionary", published: "2026-11-19T07:33:35-08:00",
      label: "The Mississippi River, 1792 · Espionage", title: wilkinsonTitle,
      description: "James Wilkinson was a U.S. Army officer who secretly worked for Spain. He and Spanish officials hid words in their letters by giving the page, column and entry in a dictionary. Can we find the book they had on their desks?",
      image: "/leads/wilkinson-dictionary/wilkinson-sharples.webp", alt: "James Wilkinson in his blue officer’s coat.",
      action: "Try the dictionary",
      versions: `<a href="/leads/wilkinson-dictionary">Version A</a> · <a href="/leads/wilkinson-dictionary-b">Version B · Which dictionary did Agent 13 use?</a>`,
    },
    {
      slug: "heerlen", published: "2026-11-18T19:46:44-08:00",
      label: "Heerlen · Roman game board", title: "What game wore down this stone?",
      description: "A Roman stone is worn smooth beside a diagonal cut. Move a piece across it twice to see how two different games could have left that mark.",
      image: "/leads/heerlen/heerlen-stone.webp", alt: "A Roman stone with the lines of a game board cut into its surface.",
      action: "Play the two games",
      versions: `<a href="/leads/heerlen">A · GPT Astra 6.2</a> · <a href="/leads/heerlen-v2">B · Gemini 4</a> · <a href="/leads/heerlen-c">C · Claude Fable 5.2</a>`,
    },
    {
      slug: "grant-cylinder", published: "2026-11-18T14:44:39-08:00",
      label: "Vienna, 1889–90 · Wax cylinder", title: grantTitle,
      description: "An American recorded a letter on an Edison phonograph. Could two words in the letter and a child’s drawing help identify him?",
      image: "/media/leads/grant/Julia-Grant-rooms.jpg", alt: "Julia Grant’s drawing of her room and her baby brother’s room.",
      action: "Listen and examine the evidence",
    },
  ];
  const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" });
  const renderRows = (list) => [...list].sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).map(entry => `
    <li class="lead-index-row">
      <a class="lead-entry" href="${entry.href || `/leads/${entry.slug}`}" aria-labelledby="title-${entry.slug}">
        <img class="lead-thumb" src="${entry.image}" alt="${entry.alt}" width="168" height="126">
        <p class="lead-label">${entry.label}</p>
        <h2 id="title-${entry.slug}">${entry.title}</h2>
        <p class="lead-summary">${entry.description}</p>
        <div class="lead-index-details"><span class="lead-link">${entry.action} <span aria-hidden="true">→</span></span><time datetime="${entry.published}">Published ${dateFormat.format(new Date(entry.published))}</time></div>
      </a>${entry.versions ? `\n      <p class="lead-versions">${entry.versions}</p>` : ""}
    </li>`).join("");
  return `<article class="leads-page leads-index">
    <h1 class="page-title">Leads and warnings</h1>
    <p class="lead-intro">${leadsDescription}</p>
    <p class="lead-jumps"><a href="#promising-leads">Promising leads</a> · <a href="#cautionary-tales">Cautionary tales</a></p>
    <h2 class="lead-section-head" id="promising-leads">Promising leads</h2>
    <ol class="lead-index-list" aria-label="Promising leads, newest first">${renderRows(entries)}</ol>
    <h2 class="lead-section-head" id="cautionary-tales">Cautionary tales</h2>
    <ol class="lead-index-list" aria-label="Cautionary tales, newest first">${renderRows(cautionaryTales)}</ol>
  </article>`;
}

export function langleyHTML() {
  const notebook = "https://edan.si.edu/slideshow/viewer/?eadrefid=NASM.XXXX.0494_ref690";
  const journal = "https://tile.loc.gov/storage-services/service/mss/magbell/216/21610101/21610101.pdf";
  const scans = "/media/leads/langley";
  const langleyBio = "https://siarchives.si.edu/history/samual-pierpont-langley";
  const bellBio = "https://www.loc.gov/collections/alexander-graham-bell-papers/articles-and-essays/inventor-and-scientist/";
  const passages = [
    {
      id: "island",
      body: ref => `<h2>A kite that might right itself</h2>
        <p>On March 10, 1902, Langley and Bell took a boat to Analostan Island in the Potomac River at Washington, D.C. They had come to try a kite with a six-sided frame and a curious tail. As Bell understood it, if the kite tilted, a weight would slide along a rod and adjust the tail to bring the kite level again. For anyone hoping to put a person in the air, it mattered whether a flying machine could recover its balance.</p>
        <p>That afternoon there was hardly any wind. Bell ran with the string, then let go when he saw that Langley’s kite would come down hard. In his journal he suggested trying again from the top of a pole, where Langley could watch how the kite behaved without smashing it.${ref}</p>`,
      note: `Bell described the outing, sketched the kite from memory and explained what he thought the sliding weight did in <a href="${journal}#page=103">his journal, pp. 631–634</a>. The Smithsonian traces Langley’s progression from powered models to a machine with a pilot in its <a href="https://sirismm.si.edu/EADpdfs/NASM.XXXX.0494.pdf">guide to his papers</a>.`,
    },
    {
      id: "designs",
      body: ref => `<h2>What the notebook adds to Bell’s account</h2>
        <p>AI agents found another account among Langley’s papers. Partway down a page of shorthand, the writer switched to ordinary handwriting and wrote “Mr Bell suggested”. The kite’s frame formed a single open compartment, called a cell. Bell proposed adding a second cell directly behind it. His other idea was to add one cell on each side, then move the middle one back about six inches.${ref}</p>`,
      note: `<a href="${notebook}">National Air and Space Museum Archives, Langley Collection, box 62, folder 7</a>, notebook pp. 14–15. Both arrangements appear here. Bell’s <a href="${journal}#page=104">account of the trial</a> records his advice about the pole.`,
    },
    {
      id: "pages",
      wide: true,
      body: () => `<div class="kite-documents">
        <figure><a class="kite-scan" href="${scans}/page-14.webp" aria-label="Enlarge notebook page 14"><img src="${scans}/page-14.webp" width="1506" height="2880" alt="Pencilled shorthand gives way to cursive halfway down the page, beginning ‘Mr Bell suggested’." loading="lazy"></a>
          <figcaption><a href="${scans}/page-14.webp">Page 14</a> &nbsp;·&nbsp; Look halfway down for “Mr Bell suggested”, then “two cells” and “three cells”.</figcaption></figure>
        <figure><a class="kite-scan" href="${scans}/page-15.webp" aria-label="Enlarge notebook page 15"><img src="${scans}/page-15.webp" width="1489" height="2880" alt="At the top, ‘moved back about six inches’ completes the suggestion. Farther down are the numbers 930 and 50 × 25." loading="lazy"></a>
          <figcaption><a href="${scans}/page-15.webp">Page 15</a> &nbsp;·&nbsp; The suggestion ends on the first line. Below it, the writer jotted down the kite’s measurements.</figcaption></figure>
        </div>`,
    },
    {
      id: "measurements",
      body: ref => `<h2 id="methodology">How the agents identified the kite</h2>
        <p>The Smithsonian catalogues this notebook as undated. Even with Bell’s name, which kite did the writer mean? Page 15 gives two figures, 930 grams and 50 × 25 centimetres. Bell copied into his journal a letter Langley sent him on March 11 about the previous day’s trial. The kite weighed 930 grams with its balancing weight, Langley wrote, and each of its twelve panels measured about 50 × 25 centimetres. Those figures tie the notebook passage to the March 10 outing.${ref}</p>`,
      note: `Compare <a href="${scans}/page-15.webp">the notebook measurements</a> with <a href="${journal}#page=105">Langley’s March 11 letter</a>, reproduced on p. 634 of Bell’s journal at the Library of Congress.`,
    },
    {
      id: "survey",
      body: ref => `<h2>Why the shorthand is still unread</h2>
        <p>The kite passage turned up in a search for something harder to read. The Smithsonian holds 37 notebooks from Langley’s papers, much of their content written in shorthand, a way of taking rapid notes by using strokes and curves to stand for sounds or whole words. AI agents sampled 1,108 of the collection’s 7,248 scans. They also ran handwriting recognition over every page of four notebooks to look for names and phrases in ordinary script. The software sometimes turned shorthand strokes into plausible English words, so the agents checked promising passages against the page images.${ref}</p>`,
      note: `The <a href="https://sova.si.edu/record/nasm.xxxx.0494/ref659">Smithsonian catalogue</a> lists all 37 volumes. The agents’ <a href="${scans}/sampled-scans.csv" download>list of sampled scans (CSV)</a> identifies each volume and page in the survey.`,
    },
    {
      id: "shorthand",
      body: ref => `<p>In another notebook, the words “towed by a steamship” were legible. Just before them was a single downward stroke. The agents compared it with two shorthand manuals of the period. In one system a heavy stroke of that shape could mean “all”, while a lighter one could mean “to”. The pencil pressure varied across the page. Neither the neighboring pages nor a search of Langley’s published account supplied the same sentence in ordinary writing. The agents could identify the kite and Bell’s advice, but they could not reliably transcribe a continuous passage of shorthand.${ref}</p>`,
      note: `See <a href="https://sova.si.edu/record/nasm.xxxx.0494/ref674">notebook p. 99 (scan 100)</a>, the <a href="https://archive.org/details/newpracticalsho00pitmgoog">1892 Pitman manual</a> (sign table, p. 83), the <a href="https://archive.org/details/1898GreggsShorthandManual-3rdVersionPublishedInUs">1898 Gregg manual</a> and Langley and Charles Manly’s <a href="https://www.gutenberg.org/ebooks/47981"><i>Memoir on Mechanical Flight</i></a> (1911).`,
    },
    {
      id: "diary",
      body: ref => `<h2>Did either design get into the air?</h2>
        <p>The agents found no record of a flight with either arrangement. One place to look is the Smithsonian’s diary of Langley’s experimental work for the U.S. Army in 1901–02. An entry after March 10 describing two cells in line, or three across with the middle one set back, would be worth comparing with dated workshop drawings. An account of a launch with that arrangement could establish that someone actually tried it.${ref}</p>
        <p>The shorthand presents a different opening. A specialist could start with a dated notebook entry and a letter about the same experiment. If several consecutive words in the letter fit the strokes on the page, a second reader could test that reading independently. That would give researchers a way to check what the notebooks say about experiments for which no letter survives.</p>`,
      note: `The <a href="https://siarchives.si.edu/collections/siris_arc_217203">Samuel P. Langley Papers, Record Unit 7003</a>, list the 1901–02 Ordnance and Fortifications diary in box 13. The agents located the catalogue entry. The diary itself still needs to be examined.`,
    },
  ];
  return `
    <article class="leads-page kite-lead">
      <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">How the agents investigated ↓</a></div>
      <header class="kite-mast">
        <div class="kite-opening">
          <p class="lead-label">Washington, D.C. · March 1902</p>
          <h1 class="page-title">${langleyTitle}</h1>
          <p><a href="${langleyBio}">Samuel Pierpont Langley</a>, an astronomer who ran the Smithsonian Institution, had flown a steam-powered model airplane. Now he was building one large enough to carry a pilot. <a href="${bellBio}">Alexander Graham Bell</a>, who had patented the telephone in 1876, had spent years building kites. After the two men tried one of Langley’s kites together, Bell suggested two ways to rebuild it. A few pencilled lines in a notebook preserve his advice.</p>
        </div>
        <div class="kite-portraits">
          <figure><a href="https://siarchives.si.edu/collections/siris_arc_403972" aria-label="Samuel Langley’s portrait at the Smithsonian"><img src="${scans}/langley-portrait.webp" width="336" height="416" alt="Sepia portrait of Samuel Langley with a dark beard and bow tie."></a><figcaption>Samuel P. Langley<br><a href="https://siarchives.si.edu/collections/siris_arc_403972">Smithsonian Archives</a></figcaption></figure>
          <figure><a href="https://parks.canada.ca/culture/designation/personnage-person/alexander-graham-bell" aria-label="View Alexander Graham Bell’s portrait and archival credit"><img src="${scans}/bell-portrait.webp" width="336" height="416" alt="Alexander Graham Bell with a white beard, wearing a dark jacket and waistcoat."></a><figcaption>Alexander Graham Bell<br><a href="https://parks.canada.ca/culture/designation/personnage-person/alexander-graham-bell">Library and Archives Canada</a></figcaption></figure>
        </div>
      </header>
      ${leadByline([["Claude Opus 5.5", "Researched the notebook and drafted this lead; reviewed by Benjamin Breen."]])}
      ${notedPassages(passages)}
    </article>`;
}

export function grantHTML() {
  return `
    <article class="leads-page grant-lead">
      <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">Methodology ↓</a></div>
      <header class="lead-hero">
        <p class="lead-label">Vienna · Edison cylinder EDIS 93953 · 1889–90 collection</p>
        <h1 class="page-title">${grantTitle}</h1>
        <p class="lead-intro">When Thomas Edison’s recording engineer Theo Wangemann took a phonograph to Europe, an American in Vienna used it to dictate a letter. He talked about the children and the apartment. The wax cylinder survived. The box it came in had no list of speakers.</p>
        <p class="lead-intro">How do you put a name to a voice when nobody alive could recognize it? Here, two things helped. The cylinder made much the same swishing noise every time it turned, which gave us a way to quiet it. And the man happened to mention something his family had put on paper.</p>
      </header>
      ${leadByline([["Claude Opus 5.5", "Researched the cylinder and drafted this lead; reviewed by Benjamin Breen."]], `<a href="#listen">Listen to the cylinder ↓</a>`)}

      <div class="cylinder-passages">
        <section class="lead-player" id="listen" aria-labelledby="listen-heading">
          <h2 id="listen-heading">What does he call the children?</h2>
          <p class="passage-guide">Listen for the name just after “baby brother.” Try the archive audio and the cleaned version before opening the two readings below.</p>
          <div class="lead-controls" hidden>
            <div role="group" aria-label="Amount of audio"><button type="button" data-scope="excerpt" aria-pressed="true">Children and school</button><button type="button" data-scope="full" aria-pressed="false">Whole cylinder</button></div>
            <div role="group" aria-label="Sound version"><button type="button" data-version="original" aria-pressed="true">Archive audio</button><button type="button" data-version="restored" aria-pressed="false">Noise reduced</button></div>
          </div>
          <audio controls preload="metadata" src="${media}/EDIS-93953-name-original.mp3" aria-label="The children and school, or the full cylinder"></audio>
          <p class="lead-player-note"><span data-passage>0:20.8–0:31.0 of the full recording</span> · <a href="${transfer}">NPS transfer</a></p>
          <p class="lead-error" role="status" hidden>The audio could not be loaded. The NPS transfer is linked above.</p>
          <noscript><p><a href="${media}/EDIS-93953-name-periodic.mp3">Cleaned excerpt</a> · <a href="${media}/EDIS-93953-original.mp3">Whole cylinder</a> · <a href="${media}/EDIS-93953-periodic.mp3">Whole cylinder, noise reduced</a></p></noscript>
          <details class="lead-reading"><summary>Read what two listeners heard</summary><div class="lead-transcript">
            <dl><div><dt>Published by the National Park Service</dt><dd>“… your baby brother and <strong>Julius</strong>.”</dd></div><div><dt>Benjamin Breen’s reading</dt><dd>“… your baby brother and <strong>Julia</strong>.”</dd></div></dl>
            <p>The last syllable is hard to hear in both copies. A few seconds later the speaker says that the boy is doing well at school. <a href="${transcript}">Published transcript</a>.</p>
          </div></details>
        </section>

        <section class="cylinder-apartment" aria-labelledby="apartment-heading">
          <h2 id="apartment-heading">What did he send home?</h2>
          <p class="passage-guide">About a minute in, the man mentions Ida. Then he recalls sending someone a plan of his apartment in a letter. That detail gave us something specific to look for in family papers.</p>
          <p class="lead-player-note">Noise reduced · 1:00–1:16 of the full recording</p>
          <audio controls preload="metadata" src="${media}/EDIS-93953-apartment-periodic.mp3" aria-label="Ida and the apartment plan, noise reduced"></audio>
          <details class="lead-reading"><summary>Hear the same passage before cleanup</summary><div class="lead-transcript">
            <audio controls preload="none" src="${media}/EDIS-93953-apartment-original.mp3" aria-label="Ida and the apartment plan, archive audio"></audio>
          </div></details>
        </section>
      </div>

      <section class="lead-evidence" aria-labelledby="papers-heading">
        <h2 id="papers-heading">An apartment plan and a school register</h2>
        <p class="lead-intro">One American family in Vienna fits both passages. Frederick Dent Grant, the U.S. minister to Austria-Hungary, lived there with his wife Ida, their daughter Julia and their son Ulysses. Two documents let us check more than the names.</p>
        <div class="lead-docs">
          <figure><a class="lead-doc" href="${plan}" aria-label="Open Julia Grant’s letter at the full drawing on page 7">
              <img src="${media}/Julia-Grant-rooms.jpg" width="886" height="364" alt="Two adjoining rooms in Julia’s handwriting, labeled Julia’s room and Baby Brothers room." loading="lazy">
            </a><figcaption><h3>Julia’s rooms</h3>
            <p>On June 26, 1889, Julia sent her grandmother a plan of the family’s new flat. She labeled two rooms “Julia’s room” and “Baby Brothers room.” This drawing is earlier than the plan the speaker says he sent. It shows that this family sent floor plans home and used the same expression for the boy.</p>
            <p class="lead-credit"><a href="${plan}">Full drawing, scan 7</a> · <a href="https://scholarsjunction.msstate.edu/fdg-and-ihg-correspondence/4/">Julia’s letter, Mississippi State University Libraries</a>. Detail rotated for reading.</p></figcaption></figure>
          <figure><a class="lead-doc" href="${media}/Theresianum-1889-90-page-61.png" aria-label="Enlarge page 61 of the school register">
              <img src="${media}/Theresianum-Grant-entry.png" width="750" height="235" alt="Printed entry for Ulysses S. Grant of Chicago, Illinois, among pupils awarded a first-class certificate." loading="lazy">
            </a><figcaption><h3>Her brother’s school</h3>
            <p>The Theresianum in Vienna listed Ulysses S. Grant of Chicago among the pupils who earned a first-class certificate in 1889–90. In December, Ulysses himself wrote to his grandmother about how much he liked his lessons. The subject of the spoken letter was also news the family sent in writing.</p>
            <p class="lead-credit"><a href="${register}">School report, printed p. 61</a> · <a href="https://scholarsjunction.msstate.edu/fdg-and-ihg-correspondence/15/">Ulysses’s letter, December 8, 1889</a></p></figcaption></figure>
        </div>
        <p class="lead-intro"><strong>Frederick Dent Grant is our best candidate.</strong> The American consul-general in Vienna, Julius Goldschmidt, also had a wife named Ida. What favors Grant is the combination of the schoolboy, his sister’s drawing and the way she referred to her brother. We still lack a letter or diary entry placing Grant at Wangemann’s phonograph. The speaker’s “your baby brother” also leaves open whom he was addressing.</p>
      </section>

      <section class="lead-open"><h2>What could this do for another recording?</h2>
        <p>When a speech-recognition program was given overlapping excerpts without being told what name to expect, it returned both “Julia” and “Julian.” Those are spellings an archivist can search for. The next question is one the software cannot answer from the sound alone. Did any of the families who turn up in that search have a boy at school in Vienna, and did they send drawings of their apartment to relatives?</p>
        <p>The same approach could help with an unlabeled film. Suppose a parade passes a shop whose sign is legible for just one frame. A city directory could put that shop on a particular corner. A newspaper could then tell you which parades went down that street. Keep the frame, the directory entry and the competing dates together, so the next person can test the identification.</p>
        <p class="lead-credit"><a href="/p/wax-cylinder-voices">More on unidentified early wax cylinders →</a></p>
      </section>

      <section class="lead-methodology" id="methodology" aria-labelledby="methodology-heading">
        <h2 id="methodology-heading"><a href="#methodology">Methodology <span aria-hidden="true">¶</span></a></h2>
        <p>On the <a href="${transfer}">National Park Service’s 2011 transfer</a>, a swish returns about every four-tenths of a second as the cylinder turns. We compared the same part of neighboring turns to estimate which frequencies belonged to the swish, then lowered them where it was loudest. You can compare the <a href="${media}/EDIS-93953-original.mp3">complete recording</a> with the <a href="${media}/EDIS-93953-periodic.mp3">filtered version</a>. Both preserve the timing of the voice. Where the swish overlaps a syllable, the name is still hard to hear.</p>
        <p>We checked the possible names against details elsewhere in the recording. The speaker remembers sending a plan of his apartment and says a boy is doing well at school. We looked for a family in Vienna that fit both clues. <a href="${plan}">Julia Grant’s drawing</a> and a <a href="${register}">school register naming her brother</a> give us two independent checks. We still lack a document placing their father at the phonograph.</p>
        <p><a href="https://www.nps.gov/edis/learn/photosmultimedia/provenance-of-the-artifacts.htm">How the cylinders survived and were digitized</a></p>
      </section>
      <script type="module">
        const exhibit = document.querySelector(".grant-lead");
        exhibit.addEventListener("play", event => {
          if (event.target instanceof HTMLAudioElement) {
            for (const audio of exhibit.querySelectorAll("audio")) {
              if (audio !== event.target && !audio.paused) audio.pause();
            }
          }
        }, true);
      </script>
    </article>`;
}
