export const grantTitle = "A voice from Vienna";
export const grantDescription = "Listen to an unidentified Edison cylinder and follow the clues that point to Frederick Dent Grant.";

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
        <p>One diagonal is worn smooth. Can you read the rules of the game from the tracks that players left?</p>
        <span class="lead-link">Try the blind test and play the board <span aria-hidden="true">→</span></span>
      </a>
      <a class="lead-entry" href="/leads/grant-cylinder">
        <p class="lead-label">Vienna, 1889–90 · Wax cylinder</p>
        <h2>${grantTitle}</h2>
        <p>An American voice on an Edison cylinder mentions two children. A girl’s drawing may tell us who was speaking.</p>
        <span class="lead-link">Listen and examine the evidence <span aria-hidden="true">→</span></span>
      </a>
    </article>`;
}

export function grantHTML() {
  return `
    <article class="leads-page grant-lead">
      <a class="back" href="/leads">← All leads</a>
      <header class="lead-hero">
        <p class="lead-label">Vienna, 1889–90 · Edison cylinder EDIS 93953</p>
        <h1 class="page-title">${grantTitle}</h1>
        <p class="lead-intro">An American man talks about children, school, and the apartment plan he mailed home. The National Park Service lists the speaker as unidentified. Listen for the name just before he starts talking about school.</p>
      </header>

      <div class="lead-listen-layout">
        <section class="lead-player" id="listen" aria-labelledby="listen-heading">
          <h2 id="listen-heading">Listen to the cylinder</h2>
          <div class="lead-controls" hidden>
            <div role="group" aria-label="Passage">
              <button type="button" data-scope="excerpt" aria-pressed="true">Name passage</button>
              <button type="button" data-scope="full" aria-pressed="false">Full recording</button>
            </div>
            <div role="group" aria-label="Audio version">
              <button type="button" data-version="original" aria-pressed="true">Original</button>
              <button type="button" data-version="restored" aria-pressed="false">Noise reduced</button>
            </div>
          </div>
          <audio controls preload="metadata" src="${media}/EDIS-93953-name-original.mp3" aria-label="Edison cylinder recording"></audio>
          <p class="lead-player-note"><span data-passage>0:20.8–0:31.0 of the full recording</span> · <a href="${transfer}">National Park Service source</a></p>
          <p class="lead-error" role="status" hidden>The audio could not be loaded. Try the source recording or choose another version.</p>
          <noscript>
            <p class="lead-player-note"><a href="${media}/EDIS-93953-name-periodic.mp3">Noise-reduced excerpt</a> · <a href="${media}/EDIS-93953-original.mp3">Full original</a> · <a href="${media}/EDIS-93953-periodic.mp3">Full restoration</a></p>
          </noscript>
        </section>
        <details class="lead-reading">
          <summary>Reveal the two readings</summary>
          <div class="lead-transcript">
            <p class="lead-label">Near 0:25 in the full recording</p>
            <dl>
              <div><dt>National Park Service</dt><dd>“… your baby brother and <strong>Julius</strong>.”</dd></div>
              <div><dt>Benjamin Breen</dt><dd>“… your baby brother and <strong>Julia</strong>.”</dd></div>
            </dl>
            <p class="lead-player-note">The proposed change is the final name. <a href="${transcript}">Read the published transcription</a>.</p>
          </div>
        </details>
      </div>

      <section class="lead-evidence" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading">Two clues from Vienna</h2>
        <p class="lead-intro">The clues point to <strong>Frederick Dent Grant</strong>, President Ulysses S. Grant’s eldest son and the U.S. minister in Vienna. His wife was named Ida, a name audible near 1:01. A few seconds later, the speaker says he had sent the plans of his apartment.</p>
        <div class="lead-docs">
          <figure>
            <a class="lead-doc lead-room-doc" href="${plan}" aria-label="Open Julia Grant’s original apartment plan">
              <span class="lead-doc-label">Labels from two adjoining rooms</span>
              <span class="lead-room-labels"><span>Julia’s room</span><span>Baby Brothers room</span></span>
            </a>
            <figcaption>
              <h3>Julia’s drawing</h3>
              <p>Julia Grant sent this plan to her grandmother on June 26, 1889. She labeled her room and her younger brother’s side by side. Her drawing predates the one mentioned on the cylinder.</p>
              <p class="lead-credit"><a href="${plan}">See the original drawing on page 7</a> · <a href="https://scholarsjunction.msstate.edu/fdg-and-ihg-correspondence/4/">Mississippi State University Libraries</a></p>
            </figcaption>
          </figure>
          <figure>
            <a class="lead-doc lead-register-doc" href="${media}/Theresianum-1889-90-page-61.png" aria-label="Open the full Theresianum register page">
              <span class="lead-doc-label">Theresianum, 1889–90</span>
              <img src="${media}/Theresianum-Grant-entry.png" alt="Register entry reading Ulysses S. Grant aus Chicago in Illinois (Nordamerika)" loading="lazy">
            </a>
            <figcaption>
              <h3>Brother at school</h3>
              <p>The Vienna school register lists Ulysses S. Grant of Chicago. In December he wrote to his grandmother that he had a great many lessons and liked them.</p>
              <p class="lead-credit"><a href="${register}">School report, p. 61</a> · <a href="https://scholarsjunction.msstate.edu/fdg-and-ihg-correspondence/15/">Ulysses’s letter</a></p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="lead-open">
        <h2>Can we be sure?</h2>
        <p>Another American official in Vienna, Julius Goldschmidt, also had a wife named Ida. Grant fits the school news and the family’s habit of sending apartment plans, as well as the proposed reading of Julia. No surviving letter has yet been found that puts Grant at Wangemann’s phonograph.</p>
        <p><a href="/p/wax-cylinder-voices">Whose voices survive on unidentified early wax cylinders? →</a></p>
      </section>
      <details class="lead-method">
        <summary>About the audio restoration</summary>
        <p>The restoration starts with the National Park Service’s public 2011 transfer and reduces a wash of noise recurring roughly every 0.397 seconds. It uses no synthesized speech. The excerpt covers 20.8 to 31.0 seconds in both versions. The published transcription ends with the apartment plans. Most of the final minute is unclear.</p>
      </details>
    </article>`;
}
