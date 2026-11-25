const MEDIA = "/media/leads/phantom-disasters";

const CASES = {
  merapi: {
    title: "Mount Merapi (17 July 1786): A morning hike turned into a volcanic eruption",
    tag: "Smithsonian GVP #15865 · Not an eruption",
    lead: "The Smithsonian catalogue lists a confirmed eruption of Mount Merapi on 17 July 1786. Reading the original 1792 Dutch report shows that 17 July was simply the morning army engineer François van Boekhold left Salatiga to climb the mountain, where he saw ordinary burning sulfur and noted one could nearly walk up and toss a stone into the vent.",
    steps: [
      { cls: "ok", label: "1 · Original 1792 Report", head: "Boekhold’s mountain climb", body: "In VBG Vol. VI (1792), pp. 8–12, Boekhold leaves Salatiga early on 17 July 1786 to inspect the steaming summit of Java’s ‘Burning Mountain’." },
      { cls: "warn", label: "2 · 1857 Compression", head: "Junghuhn misreads the ascent", body: "Franz Junghuhn (1857, p. 319) cites the wrong volume number and condenses Boekhold’s climb into an eruption entry." },
      { cls: "bad", label: "3 · 1863 Table", head: "Printed as a bare eruption date", body: "Emil Kluge (1863, p. 65) lists ‘Merapi auf Java am 17. Juli 1786’ in his eruption table, dropping the hiking story altogether." },
      { cls: "bad", label: "4 · Live Database Today", head: "Confirmed eruption #15865", body: "Smithsonian GVP keeps 17 July 1786 as a confirmed VEI-1 eruption, turning a travel departure date into volcanic activity." },
    ],
    kind: "scans",
    hasLang: true,
    scans: [
      {
        title: "Departure page (VBG VI, 1792, p. 8)",
        img: `${MEDIA}/boekhold-thumb.webp`,
        full: `${MEDIA}/boekhold-1786-p8.webp`,
        alt: "1792 Dutch printed page beginning Ik vertrok den 17e July 1786 van Salatiga.",
        orig: "“RELAAS Van een’ Togt na den BRANDENDE BERG, op JAVA. Ik vertrok den 17e July 1786., ’s Morgens vroeg van Salatiga, en kwam om twaalf uuren op Selo…”",
        en: "“ACCOUNT of a trip to the BURNING MOUNTAIN, on JAVA. I departed on the 17th of July 1786, early in the morning from Salatiga, and arrived at twelve o’clock at Selo…”",
      },
      {
        title: "Summit description (VBG VI, 1792, p. 11)",
        img: `${MEDIA}/boekhold-1786-p11-crop.webp`,
        full: `${MEDIA}/boekhold-1786-p11.webp`,
        alt: "Crop of page 11 describing burning sulfur and getting close enough to throw a stone into the vent.",
        orig: "“Op den geheelen top… ligt eene groote menigte Zwavel… Men hoorde van tyd tot tyd, een geruisch als of een wagen over eenen harden grond rydt; en de rook scheen dan wat sterker uit het gat te komen. Zo men zig ’er naar uitrustte, zou het niet onmogelyk zyn, om zo digt aan het gat te komen, dat men ’er eenen steen in konde werpen…”",
        en: "“Over the whole summit… lies a great quantity of sulfur… From time to time one heard a rumble like a wagon riding over hard ground; and the smoke then seemed to come somewhat stronger out of the vent. If one outfitted oneself for it, it would not be impossible to get close enough to the vent to throw a stone into it…”",
      },
    ],
  },

  lamongan: {
    title: "Mount Lamongan (8 Dec 1808): How one French translation invented an eruption",
    tag: "Smithsonian GVP #13674 · 10-year miscitation",
    lead: "In 1826, Dutch geologist A. H. van der Boon Mesch wrote in Latin about a violent Java earthquake and Lamongan eruption on 8 November 1818. Ten years later, Leopold von Buch’s revised French edition cited that exact page, but printed 8 December 1808 instead. Both dates ended up as separate confirmed eruptions.",
    steps: [
      { cls: "ok", label: "1 · 1826 Latin Original", head: "8 November 1818 (p. 19)", body: "Following an explicit 1818 date on p. 18, p. 19 reports a severe earthquake on ‘8 Novembris ejusdem anni’ and a same-night eruption of Lamongan." },
      { cls: "bad", label: "2 · 1836 French Slip", head: "Changed to 8 December 1808", body: "Buch’s 1836 French edition (p. 420) explicitly cites ‘(Boon Mesch., p. 19)’, yet shifts both month (Nov → Dec) and year (1818 → 1808)." },
      { cls: "bad", label: "3 · 1863 Split", head: "Both dates printed side by side", body: "By 1863 Emil Kluge prints 8 Dec 1808 and 8 Nov 1818 as two separate eruptions on the same table page." },
      { cls: "bad", label: "4 · Live Database Today", head: "False lead in the 1808–09 mystery", body: "GVP still lists 8 Dec 1808 as a confirmed VEI-2 eruption (#13674), right inside the window of the huge unknown 1808/09 climate-cooling eruption." },
    ],
    kind: "scans",
    hasLang: true,
    scans: [
      {
        title: "The Latin original (Boon Mesch 1826, p. 19)",
        img: `${MEDIA}/mesch-1826-p19-crop.webp`,
        full: `${MEDIA}/mesch-1826-p19.webp`,
        alt: "1826 Latin text reading Sic die 8 Novembris ejusdem anni... Eadem nocte montis Lamongan incendium magnum fuit.",
        orig: "“Sic die 8 Novembris ejusdem anni [1818, p. 18] tota insula Java… gravissimo terrae motu concutiebatur… Eadem nocte montis Lamongan incendium magnum fuit multumque lavae ejectum.”",
        en: "“Thus on 8 November of the same year [1818, from p. 18] the whole island of Java… was shaken by a very severe earthquake… That same night there was a great eruption of Mount Lamongan and much lava was ejected.”",
      },
      {
        title: "The French mistranslation (von Buch 1836, p. 420)",
        img: `${MEDIA}/buch-1836-p420-crop.webp`,
        full: `${MEDIA}/buch-1836-p420.webp`,
        alt: "1836 French text reading Le 8 décembre 1808, toute l'île fut ébranlée... (Boon Mesch., p. 19).",
        orig: "“Le 8 décembre 1808, toute l’île fut ébranlée par un violent tremblement de terre, et peu après le Lamongan fit une éruption terrible (Boon Mesch., p. 19).”",
        en: "“On 8 December 1808, the whole island was shaken by a violent earthquake, and shortly afterward Lamongan underwent a terrible eruption (Boon Mesch., p. 19).”",
      },
    ],
  },

  raung: {
    title: "Raung vs. Ijen (1817): One acid-lake disaster split across two volcanoes",
    tag: "GVP #16113 + LaMEVE · Misfiled VEI-4 (0.55 km³)",
    lead: "In January–February 1817, Kawah Ijen’s acidic crater lake erupted violently, blanketing eastern Java in ash and sulfuric mudflows. Karl Sapper’s 1917 catalogue accidentally summarized Junghuhn’s exact Ijen pages under neighboring Mount Raung, creating a second major eruption that persists in global large-eruption statistics today.",
    steps: [
      { cls: "ok", label: "1 · 1857 Primary Account", head: "Junghuhn’s Kawah Ijen chapter", body: "In Java Vol. II (pp. 706–709), Junghuhn details Kawah Ijen’s eruption: 16 Jan onset, 25 Jan–11 Feb ashfall, 10 Feb renewed ash, 18 Feb mudflows ending." },
      { cls: "bad", label: "2 · 1917 Misfiling", head: "Sapper files pp. 707 ff. under Raung", body: "Karl Sapper (1917, p. 191) cites ‘Junghuhn (S. 707 ff.)’ with the exact same dates (16 Jan, 24–25 Jan, 4 Feb, 10 Feb, 18 Feb 1817) inside his Mount Raung entry." },
      { cls: "bad", label: "3 · Database Split", head: "GVP keeps both volcanoes erupting", body: "Smithsonian GVP lists both Ijen (#16169, 15 Jan–18 Feb) and Raung (#16113, 16 Jan–10 Feb, VEI 4?) for the exact same event." },
      { cls: "bad", label: "4 · Global Impact", head: "LaMEVE inherits Raung 1817 alone", body: "The LaMEVE global large-eruption database lists Raung 1817 as a magnitude-4.7, 0.55 km³ eruption citing only GVP, while omitting Ijen 1817." },
    ],
    kind: "scans",
    hasLang: true,
    scans: [
      {
        title: "Junghuhn’s Kawah Ijen chronology (1857, p. 709)",
        img: `${MEDIA}/junghuhn-1857-p709-crop.webp`,
        full: `${MEDIA}/junghuhn-1857-p709.webp`,
        alt: "1857 German text summarizing 33 days of Kawah Ijen eruption from 16 January to 18 February 1817.",
        orig: "“Wir sehen also, dass 33 Tage lang, vom 16. Januar bis zum 18. Februar 1817, unaufhörliche Rauchwolken aus dem Krater gestiegen waren… 17 Tage lang, vom 25. Januar bis zum 11. Februar, war die Luft durch Aschenregen verfinstert…”",
        en: "“We see therefore that for 33 days, from 16 January to 18 February 1817, incessant smoke clouds rose from the crater… for 17 days, from 25 January to 11 February, the air was darkened by ashfall…”",
      },
      {
        title: "Sapper filing the same dates under Raung (1917, p. 191)",
        img: `${MEDIA}/sapper-1917-p191-crop.webp`,
        full: `${MEDIA}/sapper-1917-p191.webp`,
        alt: "1917 German page by Karl Sapper citing Junghuhn p. 707 ff. with dates 16 Jan, 24 Jan, 25 Jan, 4 Feb, 10 Feb, 18 Feb 1817 under Raung.",
        orig: "“Über einen großen Ausbruch vom Ende Januar 1817 berichtet Junghuhn (a. a. O., S. 707 ff.) ausführlich: Am 16. Januar 1817… am 24. Januar… am 25.… Erst am 4. Februar… Freilich folgte am 10. Februar ein neuer Aschenregen und bis zum 18. Februar traten noch neue Hochwasser auf.”",
        en: "“Junghuhn (op. cit., pp. 707 ff.) reports in detail on a great eruption at the end of January 1817: on 16 January… 24 January… 25th… Only on 4 February… On 10 February a new ashfall followed and until 18 February new floods occurred.”",
      },
    ],
  },

  bromo: {
    title: "Mount Bromo (5 Nov 1825 vs. 1829): Settled by a day-of-the-week alibi",
    tag: "Smithsonian GVP #16020 · Calendar-proven duplicate",
    lead: "The Smithsonian catalogue lists Mount Bromo erupting on 5–8 November 1825 and again on 5–11 November 1829. A contemporary Batavia newspaper settles the question mathematically: the eyewitness report names the exact days of the week, which fit 1829 and are impossible in 1825.",
    steps: [
      { cls: "ok", label: "1 · 1829 Newspaper Dispatch", head: "Javasche Courant, 19 Nov 1829", body: "Reports that ash clouds rose from Bromo on ‘Thursday and Friday, the 5th and 6th of this month’ and heavy ash fell on ‘Sunday morning, the 8th’." },
      { cls: "ok", label: "2 · 1857 Verification", head: "Junghuhn dates only 5 Nov 1829", body: "Junghuhn (1857, p. 595) quotes the Assistant Resident’s 9 Nov 1829 report and notes only undated minor activity sometime in 1815–1825." },
      { cls: "bad", label: "3 · Year-Digit Slip", head: "1829 copied onto 1825", body: "Later compilations attached the exact 5–8 November dates onto the vague ‘1815–1825’ remark, duplicating the 1829 onset onto 1825." },
      { cls: "bad", label: "4 · Live Database Today", head: "Two identical November starts", body: "GVP keeps both #16020 (5–8 Nov 1825) and #16021 (5–11 Nov 1829), even though calendar arithmetic rules out 1825." },
    ],
    kind: "bromo",
    hasLang: true,
    scan: {
      title: "Junghuhn on Gunung Bromo (1857, p. 595)",
      img: `${MEDIA}/junghuhn-1857-p595-crop.webp`,
      full: `${MEDIA}/junghuhn-1857-p595.webp`,
      alt: "1857 German text listing Bromo eruption on 5 November 1829 citing Javasche Courant of 19 November 1829.",
      orig: "Javasche Courant, 19 Nov 1829 (Delpher): “Op donderdag en vrijdag, den 5den en 6den dezer ontwaarde men, dat uit den berg Brama… zware rook kolommen opstegen… Zondag morgen, den 8sten dezer, tegen half zeven ure, begon het te Malang asch en steen-gruis te regenen…”",
      en: "Javasche Courant, 19 Nov 1829: “On Thursday and Friday, the 5th and 6th of this month, heavy smoke columns were observed rising from Mount Brama… Sunday morning, the 8th of this month, toward half past six, it began raining ash and gravel at Malang…”",
    },
  },

  rinjani: {
    title: "Mount Rinjani (30 Nov – 2 Dec 1909 vs. 1900): A 0 misread as a 9",
    tag: "Smithsonian GVP #16216 · Single-digit duplicate",
    lead: "The Smithsonian lists Mount Rinjani on Lombok erupting from 30 November to 2 December 1900—and then again on the exact same three calendar days in 1909. Official Dutch East Indies geophysical annual reports settle it cleanly: 1900 is documented in detail, while the complete 1909 report never mentions Rinjani.",
    steps: [
      { cls: "ok", label: "1 · Dec 1900 Telegram & Journal", head: "Confirmed ashfall on Lombok", body: "The Resident’s 1 Dec 1900 telegram and NTNI Vol. 61 (1902, p. 196) document ashfall from 8:45 p.m. on 30 Nov 1900 until the night of 1–2 Dec." },
      { cls: "ok", label: "2 · Complete 1909 Report", head: "Zero mention of Rinjani in 1909", body: "The Batavia Observatory’s complete 1909 volcanic report (NTNI Vol. 70, pp. 35–39) covers every active Indonesian volcano that year and omits Rinjani." },
      { cls: "bad", label: "3 · Digit Slip (1900 → 1909)", head: "Exact 3-day span duplicated", body: "A single-digit transcription error moved the exact 30 Nov – 2 Dec span nine years forward into 1909." },
      { cls: "bad", label: "4 · Live Database Today", head: "Both #16213 and #16216 live", body: "GVP keeps both 1900 (#16213) and 1909 (#16216) as confirmed VEI-2 eruptions with identical start and end dates." },
    ],
    kind: "scans",
    hasLang: true,
    single: true,
    scans: [
      {
        title: "Official 1900 geophysical report (NTNI Vol. 61, 1902, p. 196)",
        img: `${MEDIA}/ntni-1902-p196-crop.webp`,
        full: `${MEDIA}/ntni-1902-p196.webp`,
        alt: "1902 Dutch geophysical journal page reporting IV. Vulkaan Rendjani ashfall on Lombok from 30 November to 2 December 1900.",
        orig: "“IV. Vulkaan Rendjani. In den avond van den 30sten November om kwart voor negen begon op Lombok een aschregen te vallen, welke eerst in den nacht van den 1sten op den 2den December ophield en afkomstig was uit den krater van het Rendjani-gebergte…”",
        en: "“IV. Volcano Rinjani. On the evening of 30 November at a quarter to nine an ashfall began to fall on Lombok, which only ceased in the night of 1 to 2 December and came from the crater of the Rinjani massif…”",
      },
      {
        title: "Why 1909 is ruled out",
        textOnly: true,
        body: "Karl Sapper’s 1917 global catalogue (p. 195) records only the 30 Nov – 2 Dec 1900 eruption. The Royal Magnetic and Meteorological Observatory in Batavia published comprehensive annual volcano inventories in <em>Natuurkundig Tijdschrift voor Nederlandsch-Indië</em> (NTNI); its full 1909 inventory (Vol. 70, 1911, pp. 35–39) contains zero mention of Rinjani. Both contemporary telegrams (Dec 1900 / Jan 1901) and Dr. R. D. M. Verbeek’s ash assay (51.5% silica) anchor the event uniquely to 1900.",
      },
    ],
  },

  almanac: {
    title: "Sabaudia 1248, Catania 1137 & Izmir 1668: Almanac errors inside NOAA",
    tag: "NOAA EQ #462, #397, #1053 · 41,500 false deaths",
    lead: "Several dramatic medieval and early modern earthquakes in NOAA trace back to copying chains rather than seismology. Some were repeated in 18th-century almanacs and reprinted after the 1886 Charleston quake; another was a French Alpine rockfall matched to an Italian town built in 1934.",
    steps: [
      { cls: "ok", label: "1 · Real Historical Event", head: "Savoy 1248 · Catania 1169 · Izmir 1688", body: "Mont Granier collapsed in Savoy (1248); Catania was destroyed in 1169; Smyrna/Izmir was devastated on 10 July 1688." },
      { cls: "bad", label: "2 · Almanac & Digit Drift", head: "Date books & swapped digits", body: "Popular 18th–19th c. date dictionaries printed 1137 Catania and misplaced Montemurro (1857); Milne’s 1688 Izmir digits flipped to 1668." },
      { cls: "bad", label: "3 · Gazetteer Mistake", head: "‘Sabaudia’ matched to 1934 town", body: "Latin Sabaudia (Savoy, France) was geocoded to modern Sabaudia in Lazio, Italy—putting 9,000 deaths in a town founded 686 years later." },
      { cls: "bad", label: "4 · Live Public Impact", head: "Repeated in Our World in Data", body: "51 NOAA rows cite the 1888 Congressional almanac list (Ref 1073, 712,877 deaths); Turkey 1668 still appears in OWID with 17,500 deaths." },
    ],
    kind: "almanac",
    hasLang: false,
  },
};

function renderGhostCase(key, lang = "en") {
  const c = CASES[key];
  const stage = document.getElementById("ghost-stage");
  if (!stage || !c) return;

  const stepsHTML = `
    <div class="chain-grid">
      ${c.steps.map(s => `
        <div class="chain-step chain-step-${s.cls}">
          <span class="chain-step-num">${s.label}</span>
          <h4>${s.head}</h4>
          <p>${s.body}</p>
        </div>
      `).join("")}
    </div>
  `;

  let bodyHTML = "";
  if (c.kind === "scans") {
    const langBar = c.hasLang ? `
      <div class="lang-toggle-row">
        <span class="exhibit-kicker">Primary-source excerpts (click any scan to open full page)</span>
        <div class="lang-pills" role="group" aria-label="Excerpt language">
          <button type="button" class="lang-pill ${lang === "en" ? "is-active" : ""}" data-lang="en">English</button>
          <button type="button" class="lang-pill ${lang === "orig" ? "is-active" : ""}" data-lang="orig">Original language</button>
        </div>
      </div>
    ` : "";

    bodyHTML = `${langBar}<div class="scan-pair ${c.single ? "is-single" : ""}">
      ${c.scans.map(sc => sc.textOnly ? `
        <div class="scan-card">
          <div class="scan-card-head"><h4>${sc.title}</h4></div>
          <p class="ghost-lead-text" style="margin:0;font-size:.96rem;">${sc.body}</p>
        </div>
      ` : `
        <div class="scan-card">
          <div class="scan-card-head">
            <h4>${sc.title}</h4>
            <a href="${sc.full}" style="font:.76rem/1.2 var(--mono);white-space:nowrap;">Full page ↗</a>
          </div>
          <a href="${sc.full}" aria-label="Enlarge ${sc.title}">
            <img src="${sc.img}" alt="${sc.alt}" loading="lazy">
          </a>
          <blockquote class="scan-quote">${lang === "orig" ? sc.orig : sc.en}</blockquote>
        </div>
      `).join("")}
    </div>`;
  } else if (c.kind === "bromo") {
    const sc = c.scan;
    bodyHTML = `
      <div class="lang-toggle-row">
        <span class="exhibit-kicker">Primary scan (Junghuhn 1857) &amp; Javasche Courant weekday check</span>
        <div class="lang-pills" role="group" aria-label="Excerpt language">
          <button type="button" class="lang-pill ${lang === "en" ? "is-active" : ""}" data-lang="en">English</button>
          <button type="button" class="lang-pill ${lang === "orig" ? "is-active" : ""}" data-lang="orig">Original Dutch dispatch</button>
        </div>
      </div>
      <div class="scan-pair is-single">
        <div class="scan-card">
          <div class="scan-card-head">
            <h4>${sc.title}</h4>
            <a href="${sc.full}" style="font:.76rem/1.2 var(--mono);white-space:nowrap;">Full page ↗</a>
          </div>
          <a href="${sc.full}" aria-label="Enlarge ${sc.title}">
            <img src="${sc.img}" alt="${sc.alt}" loading="lazy">
          </a>
          <blockquote class="scan-quote">${lang === "orig" ? sc.orig : sc.en}</blockquote>
        </div>
        <div class="scan-card">
          <div class="scan-card-head"><h4>The calendar alibi</h4></div>
          <p class="ghost-lead-text" style="font-size:.95rem;margin-bottom:.75rem;">The Batavia newspaper report of 19 November 1829 names the exact <strong>days of the week</strong>: smoke rose on <em>Thursday the 5th</em> and heavy ash fell on <em>Sunday the 8th</em>.</p>
          <div class="alibi-grid">
            <div class="alibi-card is-false">
              <p class="alibi-year">1825</p>
              <p class="alibi-day">5 Nov = SATURDAY ✕</p>
              <p>8 November 1825 was a Tuesday. The eyewitness weekday sequence is impossible in 1825. GVP row <code>#16020</code> is a duplicate.</p>
            </div>
            <div class="alibi-card is-true">
              <p class="alibi-year">1829</p>
              <p class="alibi-day">5 Nov = THURSDAY ✓</p>
              <p>6 Nov = Friday, 8 Nov = Sunday. Every weekday in the <em>Javasche Courant</em> dispatch matches 1829 exactly (GVP <code>#16021</code>).</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (c.kind === "almanac") {
    bodyHTML = `
      <div class="scan-pair">
        <div class="scan-card">
          <div class="scan-card-head"><h4>From 1787 pocket almanac to NOAA</h4></div>
          <div class="stemma-stack">
            <div class="stemma-node"><strong>1787 · The Tablet of Memory</strong><span>Popular British pocket almanac listing historical disasters without primary citations.</span></div>
            <div class="stemma-arrow">↓ copied into</div>
            <div class="stemma-node"><strong>1841–1885 · Haydn’s Dictionary of Dates</strong><span>Repeats ‘1137 Catania (15,000 dead)’ and misplaces 1857 Montemurro into Calabria.</span></div>
            <div class="stemma-arrow">↓ reprinted in newspapers after the 1886 Charleston quake</div>
            <div class="stemma-node"><strong>1888 · U.S. Congress, ‘Great Earthquakes’ (NOAA Ref 1073)</strong><span>Reprinted newspaper list cited as a scientific reference by 51 NOAA rows totaling 712,877 deaths.</span></div>
            <div class="stemma-arrow">↓ copied without specialist cross-check</div>
            <div class="stemma-node is-end"><strong>2026 · Live NOAA Database &amp; Our World in Data</strong><span>Catania 1137 (15,000), Montemurro Sept 1857 (10,000), and Izmir 1668 (17,500) remain live, though absent from Europe’s vetted catalogues.</span></div>
          </div>
        </div>
        <div class="scan-card">
          <div class="scan-card-head"><h4>How a 1248 Alpine rockfall moved to a 1934 Italian town</h4></div>
          <div class="stemma-stack">
            <div class="stemma-node"><strong>24–25 Nov 1248 · Mont Granier, Savoy (France)</strong><span>A massive limestone collapse buries villages in the Duchy of Savoy, written in Latin chronicles as <em>Sabaudia</em>.</span></div>
            <div class="stemma-arrow">↓ Latin name retained in disaster compilations</div>
            <div class="stemma-node"><strong>1934 · Benito Mussolini founds ‘Sabaudia’ in Lazio</strong><span>A planned town is built on the Pontine Marshes south of Rome, named after the House of Savoy.</span></div>
            <div class="stemma-arrow">↓ gazetteer place-name match</div>
            <div class="stemma-node is-end"><strong>NOAA EQ #462 · ‘ITALY: SABAUDIA’, 41°N 13°E</strong><span>9,000 deaths from a medieval French landslide end up logged as an earthquake in a 20th-century Italian resort town, 600 km away.</span></div>
          </div>
        </div>
      </div>
    `;
  }

  stage.innerHTML = `
    <div class="ghost-summary-bar">
      <h3>${c.title}</h3>
      <span class="ghost-meta-tag">${c.tag}</span>
    </div>
    <p class="ghost-lead-text">${c.lead}</p>
    ${stepsHTML}
    ${bodyHTML}
  `;

  stage.querySelectorAll(".lang-pill").forEach(btn => {
    btn.addEventListener("click", () => renderGhostCase(key, btn.dataset.lang));
  });
}

function renderScoreboard(view = "owid") {
  const panel = document.getElementById("scoreboard-panel");
  if (!panel) return;

  if (view === "owid") {
    const items = [
      { label: "Italy 1693 (Sicily)", owid: 120000, real: 57000, note: "Foreshock (60k) + mainshock (54k) double-counted; specialist total ~54–60k" },
      { label: "Azerbaijan 1667 (Shemakha)", owid: 97000, real: 17000, note: "80,000 deaths come from a row NOAA itself flagged as a duplicate" },
      { label: "Italy 1857 (Basilicata)", owid: 20000, real: 10000, note: "Month typo (Sept 16 vs Dec 16) doubles the 10,000 toll" },
      { label: "Turkey 1668 (Izmir)", owid: 17500, real: 0, note: "Duplicate of the 10 July 1688 Izmir quake" },
      { label: "Peru 1657 (Lima)", owid: 11000, real: 0, note: "Flagged as a duplicate by NOAA, yet keeps 11,000 deaths in OWID" },
      { label: "Iran 1779 (Tabriz)", owid: 10000, real: 0, note: "NOAA-flagged duplicate row leaking 10,000 deaths" },
    ];
    const maxVal = 125000;
    const rowH = 56;
    const topPad = 30;
    const leftPad = 215;
    const chartW = 500;
    const svgW = 900;
    const svgH = topPad + items.length * rowH + 22;

    const bars = items.map((d, i) => {
      const y = topPad + i * rowH;
      const wOwid = Math.max(2, (d.owid / maxVal) * chartW);
      const wReal = d.real > 0 ? Math.max(3, (d.real / maxVal) * chartW) : 0;
      return `
        <g transform="translate(0, ${y})">
          <text x="${leftPad - 12}" y="15" text-anchor="end" font-size="13" font-weight="600" fill="currentColor">${d.label}</text>
          <text x="${leftPad - 12}" y="32" text-anchor="end" font-size="10.5" fill="var(--muted, #666)">${d.real === 0 ? "Duplicate / non-existent" : "Double-counted in OWID"}</text>
          <rect x="${leftPad}" y="2" width="${wOwid}" height="15" rx="2" fill="var(--ph-red, #982b27)" opacity="0.88"></rect>
          <text x="${leftPad + wOwid + 8}" y="14" font-size="12" font-family="var(--mono, monospace)" fill="var(--ph-red, #982b27)">${d.owid.toLocaleString()}</text>
          ${wReal > 0
            ? `<rect x="${leftPad}" y="20" width="${wReal}" height="13" rx="2" fill="var(--ph-teal, #1e665c)"></rect>
               <text x="${leftPad + wReal + 8}" y="31" font-size="11.5" font-family="var(--mono, monospace)" fill="var(--ph-teal, #1e665c)">${d.label.includes("1693") ? "~54–60,000" : d.real.toLocaleString()} (vetted)</text>`
            : `<text x="${leftPad}" y="31" font-size="11" font-family="var(--mono, monospace)" fill="var(--ph-teal, #1e665c)">0 (should be excluded)</text>`
          }
          <text x="${leftPad}" y="46" font-size="10.5" fill="var(--muted, #666)">${d.note}</text>
        </g>
      `;
    }).join("");

    panel.innerHTML = `
      <div class="api-flow">
        <div class="api-box">
          <h4>1 · Individual NOAA record</h4>
          <p>Curators do mark duplicates: across 3,180 pre-1926 events, <strong>69 rows</strong> carry <code>flagDuplicate: true</code>.</p>
        </div>
        <div class="api-box is-leak">
          <h4>2 · The bulk API omits the flag</h4>
          <p>NOAA’s bulk list endpoint drops <code>flagDuplicate</code>, and <strong>18 flagged rows</strong> still keep casualty figures totaling <strong>145,784 deaths</strong>.</p>
        </div>
        <div class="api-box">
          <h4>3 · Public charts count them</h4>
          <p>Our World in Data pulls NOAA’s bulk series directly, displaying doubled death tolls and misdated years to the public.</p>
        </div>
      </div>
      <div class="bar-chart-wrap">
        <svg class="bar-chart-svg" viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="Comparison of earthquake deaths shown in Our World in Data versus vetted specialist totals across six headline cases.">
          <g font-size="11.5" font-family="var(--mono, monospace)">
            <rect x="${leftPad}" y="6" width="12" height="10" rx="2" fill="var(--ph-red, #982b27)"></rect>
            <text x="${leftPad + 18}" y="15" fill="currentColor">Shown in Our World in Data (via NOAA bulk API)</text>
            <rect x="${leftPad + 378}" y="6" width="12" height="10" rx="2" fill="var(--ph-teal, #1e665c)"></rect>
            <text x="${leftPad + 396}" y="15" fill="currentColor">Specialist / unflagged baseline</text>
          </g>
          ${bars}
        </svg>
      </div>
    `;
  } else {
    const cats = [
      { name: "NOAA Earthquakes", sub: "Public global aggregator", obs: 13, exp: 2.4, ratio: "5.4×", tone: "bad", note: "+10.6 excess duplicates. Also carries 106 unmatched pre-1900 Mediterranean rows (18% ceiling) compared with Europe’s AHEAD catalogue." },
      { name: "Smithsonian GVP", sub: "Global volcano reference", obs: 24, exp: 6.2, ratio: "3.9×", tone: "bad", note: "Roughly +18 excess duplicates across 1,148 dated 1500–1899 eruptions. Reading all 20 non-placeholder pairs confirmed 10 clear or probable duplicates (Etna, Asama, Serua, Bromo, Merapi, Fuego) and 7 genuine coincidences." },
      { name: "Europe EPICA / SHEEC", sub: "European hazard model baseline", obs: 53, exp: 41.8, ratio: "+11 excess", tone: "warn", note: "Free of NOAA’s headline errors, yet holds ~11 excess duplicates of its own in legacy tabular rows (Lisbon 1883/84, Neuchâtel 1875/76, Izmir 1776/78)." },
      { name: "Italy CPTI15 v4.0", sub: "Study-based national standard", obs: 9, exp: 7.1, ratio: "Clean", tone: "clean", note: "+1.9 (consistent with pure chance). Because Italian seismologists rebuilt every row from primary studies, old copying duplicates disappeared." },
    ];
    const maxV = 56;
    const leftPad = 190;
    const chartW = 450;
    const rowH = 54;
    const topPad = 30;
    const svgW = 900;
    const svgH = topPad + cats.length * rowH + 14;

    const bars = cats.map((c, i) => {
      const y = topPad + i * rowH;
      const wObs = Math.max(4, (c.obs / maxV) * chartW);
      const wExp = Math.max(4, (c.exp / maxV) * chartW);
      const color = c.tone === "clean" ? "var(--ph-teal, #1e665c)" : c.tone === "warn" ? "var(--ph-amber, #a8640b)" : "var(--ph-red, #982b27)";
      return `
        <g transform="translate(0, ${y})">
          <text x="${leftPad - 12}" y="16" text-anchor="end" font-size="13" font-weight="600" fill="currentColor">${c.name}</text>
          <text x="${leftPad - 12}" y="33" text-anchor="end" font-size="10.5" fill="var(--muted, #666)">${c.sub}</text>
          <rect x="${leftPad}" y="3" width="${wObs}" height="15" rx="2" fill="${color}" opacity="0.9"></rect>
          <text x="${leftPad + wObs + 8}" y="15" font-size="12" font-family="var(--mono, monospace)" fill="${color}">${c.obs} observed (${c.ratio})</text>
          <rect x="${leftPad}" y="22" width="${wExp}" height="12" rx="2" fill="currentColor" opacity="0.28"></rect>
          <text x="${leftPad + wExp + 8}" y="32" font-size="11.5" font-family="var(--mono, monospace)" fill="var(--muted, #666)">${c.exp} expected by chance</text>
        </g>
      `;
    }).join("");

    panel.innerHTML = `
      <div class="bar-chart-wrap">
        <svg class="bar-chart-svg" viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="Observed versus chance-expected same-day year-typo duplicate pairs across NOAA, Smithsonian GVP, EPICA, and CPTI15.">
          <g font-size="11.5" font-family="var(--mono, monospace)">
            <rect x="${leftPad}" y="6" width="12" height="10" rx="2" fill="var(--ph-red, #982b27)"></rect>
            <text x="${leftPad + 18}" y="15" fill="currentColor">Observed same-day year-typo pairs (pre-1900)</text>
            <rect x="${leftPad + 372}" y="6" width="12" height="10" rx="2" fill="currentColor" opacity="0.3"></rect>
            <text x="${leftPad + 390}" y="15" fill="currentColor">Expected by chance</text>
          </g>
          ${bars}
        </svg>
      </div>
      <div class="gold-cards">
        ${cats.map(c => `
          <div class="gold-card is-${c.tone}">
            <h4>${c.name} · <span>${c.ratio}</span></h4>
            <p>${c.note}</p>
          </div>
        `).join("")}
      </div>
    `;
  }
}

function initExhibits() {
  const tabs = document.querySelectorAll(".ghost-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      renderGhostCase(tab.dataset.case, "en");
    });
  });
  renderGhostCase("merapi", "en");

  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      viewBtns.forEach(b => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      renderScoreboard(btn.dataset.view);
    });
  });
  renderScoreboard("owid");

  const toggle = document.getElementById("kluge-toggle");
  const frame = document.getElementById("kluge-frame");
  const boxes = document.querySelectorAll(".kluge-box");
  const cards = document.querySelectorAll(".kluge-card");

  const selectKluge = (id) => {
    boxes.forEach(b => b.classList.toggle("is-selected", b.dataset.entry === id));
    cards.forEach(c => c.classList.toggle("is-selected", c.dataset.entry === id));
  };

  if (toggle && frame) {
    toggle.addEventListener("change", () => {
      frame.classList.toggle("is-highlighted", toggle.checked);
    });
  }
  boxes.forEach(b => b.addEventListener("click", () => selectKluge(b.dataset.entry)));
  cards.forEach(c => {
    c.addEventListener("click", () => selectKluge(c.dataset.entry));
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectKluge(c.dataset.entry);
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExhibits);
} else {
  initExhibits();
}
