export const grantTitle = "A voice from Vienna";
export const grantDescription = "How a recurring noise on an Edison wax cylinder, a girl’s floor plan, and a school register helped put a possible name to an American voice in Vienna.";

const media = "/media/leads/grant";
const transcript = "https://www.nps.gov/edis/learn/photosmultimedia/prince-bismarck-and-count-moltke-before-the-recording-horn.htm#:~:text=Herr%20Wangemann%20is%20here";
const transfer = "https://www.nps.gov/edis/learn/photosmultimedia/upload/08-tenhp_edison_c_E-5777_edis-93953_20110415.mp3";
const plan = "https://scholarsjunction.msstate.edu/cgi/viewcontent.cgi?article=1003&amp;context=fdg-and-ihg-correspondence#page=7";
const register = "https://books.google.com/books?id=V33R3iW7K50C&amp;pg=RA1-PA61";

export function leadsHTML() {
  return `
    <article class="leads-page">
      <h1 class="page-title">Leads</h1>
      <p class="lead-intro">Start with a source. See what it can tell us and what remains to be found.</p>
      <a class="lead-entry" href="/leads/heerlen">
        <p class="lead-label">Heerlen · Roman game board</p>
        <h2>What game wore down this stone?</h2>
        <p>A Roman stone is worn smooth beside a diagonal cut. Move a piece across it twice to see how two different games could have left that mark.</p>
        <span class="lead-link">Play the two games <span aria-hidden="true">→</span></span>
      </a>
      <p>Three versions of the Roman game board experiment<br>
        <a href="/leads/heerlen">A · GPT Astra 6.2</a> ·
        <a href="/leads/heerlen-v2">B · Gemini 4</a> ·
        <a href="/leads/heerlen-c">C · Claude Fable 5.2</a>
      </p>
      <a class="lead-entry" href="/leads/grant-cylinder">
        <p class="lead-label">Vienna, 1889–90 · Wax cylinder</p>
        <h2>${grantTitle}</h2>
        <p>An American recorded a letter on an Edison phonograph. Could two words in the letter and a child’s drawing help identify him?</p>
        <span class="lead-link">Listen and examine the evidence <span aria-hidden="true">→</span></span>
      </a>
    </article>`;
}

export function grantHTML() {
  return `
    <article class="leads-page grant-lead">
      <a class="back" href="/leads">← All leads</a>
      <header class="lead-hero">
        <p class="lead-label">Vienna · Edison cylinder EDIS 93953 · 1889–90 collection</p>
        <h1 class="page-title">${grantTitle}</h1>
        <p class="lead-intro">When Thomas Edison’s recording engineer Theo Wangemann took a phonograph to Europe, an American in Vienna used it to dictate a letter. He talked about the children and the apartment. The wax cylinder survived. The box it came in had no list of speakers.</p>
        <p class="lead-intro">How do you put a name to a voice when nobody alive could recognize it? Here, two things helped. The cylinder made much the same swishing noise every time it turned, which gave us a way to quiet it. And the man happened to mention something his family had put on paper.</p>
      </header>

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

      <details class="lead-method"><summary>How was the sound cleaned?</summary>
        <p>The starting point was the National Park Service’s 2011 transfer. A swish recurs about every four-tenths of a second. Comparing the same part of neighboring turns helps estimate which frequencies belong to that recurring noise. The filter lowers those frequencies where the swish is strongest. The speech comes entirely from the transfer, at its original timing. Some sounds remain hard to distinguish because the noise and the voice overlap.</p>
        <p class="lead-credit"><a href="https://www.nps.gov/edis/learn/photosmultimedia/provenance-of-the-artifacts.htm">How the cylinders survived and were digitized</a> · <a href="${media}/EDIS-93953-original.mp3">Complete archive audio</a> · <a href="${media}/EDIS-93953-periodic.mp3">Complete cleaned audio</a></p>
      </details>
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
