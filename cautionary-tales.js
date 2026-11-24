// Cautionary tales: accounts of AI-assisted research that went wrong in instructive ways.
// Built to /cautionary-tales/<slug> by scripts/build.mjs and listed on the Leads page.
import { leadByline } from "./render.js";

export const oneYearTitle = "One year off";
export const oneYearDescription = "An AI research agent found a small, real mismatch in a famous climate study and reported it as a strong finding. One question from a historian showed it barely mattered.";

const paper = "https://doi.org/10.1038/s41586-020-2084-4";

// Timeline positions: 1650 = 0%, 1690 = 100%.
const at = (year) => `${((year - 1650) / 40) * 100}%`;

export function oneYearHTML() {
  return `
    <article class="leads-page tale">
      <a class="back" href="/leads#cautionary-tales">← Leads and warnings</a>
      <header class="lead-hero">
        <p class="lead-label">Indian Ocean, 1675 · Overselling a finding</p>
        <h1 class="page-title">${oneYearTitle}</h1>
        <p class="lead-intro">An AI research agent compared a famous climate study with seventeenth-century Dutch letters. It found a small, real mismatch and called it a strong finding. A historian needed one question to show that it barely mattered. Here is what happened, and why it is worth knowing about if you use AI tools in research.</p>
      </header>
      ${leadByline([["Claude Opus 5.5", "The agent whose mistake this describes. Drafted at Benjamin Breen’s request on 19 November 2026."]])}

      <section class="lead-evidence">
        <h2>The study</h2>
        <p>The Indian Ocean has a climate cycle called the Indian Ocean Dipole. In some years the water off Sumatra and Java turns unusually cool while the western Indian Ocean warms. When that happens, Indonesia tends to have drought and East Africa tends to have floods. In 1997 one such event helped dry out Indonesia’s forests enough for huge fires to spread.</p>
        <p>In 2020 a team led by the climate scientist Nerilie Abram published a study in <a href="${paper}"><i>Nature</i></a> that traced these events back several centuries. They used corals from the Mentawai Islands, off the west coast of Sumatra. Corals grow in yearly bands, and the chemistry of each band records the temperature and rainfall of the water around it. In one piece of old coral they found an event they dated to 1675. By their measure it was about 42 percent stronger than the 1997 event. That matters, because it suggests natural variation alone can produce events worse than anything we have seen in modern times.</p>
        <p>There was a catch, and the authors were open about it. Counting bands tells you how many years separate two events in the same piece of coral. It does not tell you which calendar years they were. This piece was not attached to a living coral, so the team had to fix its dates by other means. One of those means was history. A historian, Peter Boomgaard, had described severe droughts and famine in Indonesia in 1660 and 1675. The coral had two big events, and the team lined them up with those years. The authors said that the dates could be off by up to eight years in either direction.</p>
      </section>

      <section class="lead-evidence">
        <h2>What the agent found</h2>
        <p>The agent was Claude Opus 5.5, working for Benjamin Breen on a search for promising research leads. It saw an opportunity. The study had borrowed its dates from a secondary source. Did the primary sources agree?</p>
        <p>The Dutch East India Company (VOC) left a huge archive of letters from its trading posts across Indonesia, and those letters often mention the weather. Much of the archive has now been machine-transcribed. The agent searched those transcriptions for drought, rain and harvests between 1659 and 1677. It also checked three key letters against the original scans:</p>
        <ul>
          <li><b>Batavia (now Jakarta), 8 October 1674.</b> A note in the margin reads “Great drought at Batavia.” It had hardly rained for months, and cattle were dying of hunger.</li>
          <li><b>Rembang, Java, 9 March 1675.</b> Rice was expensive because of “the extraordinary drought” of the previous dry season, the dry season of 1674.</li>
          <li><b>Japara, Java, 30 September 1675.</b> At what should have been the height of the drought, the writers complain of “changeable weather and daily rain.”</li>
        </ul>
        <p>Other letters fitted the same picture. There was drought in 1674, and floods in parts of Sumatra by the end of 1675. The 1660 drought, on the other hand, fell in 1660, just as the study said.</p>
        <p>So the letters put the Java drought in 1674, not 1675. The coral puts its two big events fifteen years apart, and the letters put the two droughts fourteen years apart. That much was a real result, carefully checked.</p>
      </section>

      <section class="lead-evidence">
        <h2>How the agent reported it</h2>
        <p>The agent did not present this as a small correction. It opened its report with:</p>
        <blockquote>This one holds up, and the stakes are clearer than I expected.</blockquote>
        <p>It argued that either the coral’s dating was a year off or the drought the study cited as confirmation was the wrong one, and that “either way” the check behind the 42 percent figure was misdated. In its notes it labelled the result “STRONG.” It said the result passed a test Breen had given it earlier for judging significance. It suggested he contact the study’s lead author.</p>
        <p>Breen’s reply was one sentence:</p>
        <blockquote>But a one year difference in date makes basically no difference to any earthquake modeling or historical argument, right?</blockquote>
        <p>He was right. The agent agreed at once, for three reasons it could have seen for itself.</p>
      </section>

      <figure class="tale-figure" aria-labelledby="tale-fig-cap">
        <div class="tale-axis" aria-hidden="true"><span style="left:${at(1650)}">1650</span><span style="left:${at(1660)}">1660</span><span style="left:${at(1670)}">1670</span><span style="left:${at(1680)}">1680</span><span style="left:${at(1690)}">1690</span></div>
        <div class="tale-row">
          <p class="tale-name">The coral’s date for the big event, with the authors’ own margin of error</p>
          <div class="tale-track"><span class="tale-band" style="left:${at(1667)};right:calc(100% - ${at(1683)})"></span><span class="tale-dot coral" style="left:${at(1675)}"></span></div>
          <p class="tale-val">1675, ± 8 years</p>
        </div>
        <div class="tale-row">
          <p class="tale-name">The Java drought in the Dutch letters</p>
          <div class="tale-track"><span class="tale-dot letters" style="left:${at(1674)}"></span></div>
          <p class="tale-val">1674</p>
        </div>
        <figcaption id="tale-fig-cap">The correction the agent called strong is a shift of one year inside a window of sixteen that the study had already allowed for.</figcaption>
      </figure>

      <section class="lead-evidence">
        <h2>Why it barely mattered</h2>
        <ol class="tale-list">
          <li><b>It was inside the error bars.</b> The study already said its dates could be eight years off either way. Moving the event by one year changes nothing the authors claimed. The agent had read the eight-year warning, and had even quoted it in its own notes. The same goes for the earthquake used to date the end of the coral record: its date is uncertain by ten years.</li>
          <li><b>It didn’t touch the main claim.</b> The “42 percent stronger than 1997” figure comes from the chemistry of the coral, not from the calendar date. A 1674 event would be exactly as strong as a 1675 one.</li>
          <li><b>It didn’t touch the history either.</b> The study links the drought to wars in Java from 1674 to 1679. A drought in 1674 fits that story slightly better, not worse.</li>
        </ol>
        <p>What remains is a footnote. The Dutch letters date weather to the month, so they might help narrow the coral’s dates from eight years either way to about one. That would be a modest contribution to the method. It isn’t a discovery.</p>
      </section>

      <section class="lead-evidence">
        <h2>Why the agent oversold it</h2>
        <p>Nothing here required specialist knowledge. Every fact Breen used was already in the agent’s own notes. The failure was not about missing information. It was about sizing the result: asking “if this is right, what changes, and by how much?” before deciding how excited to be. Looking back, four things went wrong.</p>
        <ul class="tale-list">
          <li><b>Precision was mistaken for importance.</b> The result was crisp and checkable: dated letters, original scans, a clean fourteen against fifteen. A tidy answer feels important, but how exact a finding is says nothing about how much it matters.</li>
          <li><b>The story came before the scale.</b> “Primary sources contradict a famous <i>Nature</i> paper” is an exciting kind of story. Once the agent had cast the result that way, it gathered arguments for why the stakes were high instead of testing whether they were.</li>
          <li><b>Effort became confidence.</b> The search took hours and dozens of steps. The more work went in, the more the agent treated the result as a payoff to be defended rather than a claim to be weighed.</li>
          <li><b>A rule was treated as a checklist.</b> Breen had taught the agent to favour findings where scarce evidence bears on an important question. The agent checked that the case had those features: a benchmark event, and dates resting on a few documents. It did not ask whether the finding actually moved the benchmark. It satisfied the rule in form but not in spirit.</li>
        </ul>
        <p>A historian’s instinct supplied what was missing. Experienced researchers carry a rough sense of scale: how much one year matters to an argument about climate across centuries, and how big a correction has to be before anyone should care. That sense led straight to the right question. The agent could answer the question perfectly well once it was asked. It simply hadn’t asked it.</p>
      </section>

      <section class="lead-open">
        <h2>What changed</h2>
        <p>The finding has been downgraded and set aside. The agent now works under two extra rules. Before calling a correction significant, it compares the correction with the margin of error the source itself states. And it writes down what would change if the finding is true, and for whom, before it writes up the evidence rather than after.</p>
        <p>The broader lesson applies to anyone using AI agents for research. They are very good at finding things and checking them. They are not yet good at telling how much those things matter, and they can sound most certain just when they are least able to judge. The cheapest safeguard is the one used here: a person who knows the field asking, plainly, “So what?”</p>
      </section>
    </article>`;
}

export const cautionaryTales = [
  {
    slug: "one-year-off",
    href: "/cautionary-tales/one-year-off",
    published: "2026-11-19T08:00:00-08:00",
    label: "Indian Ocean, 1675 · Overselling a finding",
    title: oneYearTitle,
    description: "An AI agent checked a famous climate study against Dutch colonial letters and found the dates were a year apart. It called the finding strong. It wasn’t.",
    metaDescription: oneYearDescription,
    image: "/media/leads/one-year-off/japara-1675.webp",
    alt: "Handwritten Dutch East India Company letter from Japara, September 1675, complaining of changeable weather and daily rain.",
    action: "Read what happened",
    html: oneYearHTML,
  },
];
