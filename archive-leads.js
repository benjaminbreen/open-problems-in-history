import { notedPassages } from './lib/lead-notes.js';
import { leadByline } from './render.js';
import { cordReader } from './leads/pachacamac-khipus/cords.js';

const archive = number => `https://www.nationaalarchief.nl/onderzoeken/archief/1.04.02/invnr/7913/file/NL-HaNA_1.04.02_7913_${number}`;
const map = 'https://commons.wikimedia.org/wiki/File:AMH-7996-KB_Map_of_the_island_of_Boero.jpg';
const repository = 'https://zenodo.org/records/18025748';
const guide = id => `https://www.khipufieldguide.com/catalog/${id}.html`;
const oldTable = 'https://www.garyurton.com/_files/archives/6e3754_0c7e13cb74f24d5b97201c46883031e5.zip?dn=Khipu+Data+Tables.zip';

const buru = {
  slug: 'buru-tsunami', published: '2026-11-19T11:33:00-08:00',
  label: 'Buru, 1738 · Earthquakes', title: 'The day the sea ran up the rivers',
  description: 'In 1738, people on an Indonesian island fled uphill as seawater rushed inland. A Dutch official described it twice. His letters preserve evidence of a tsunami missing from modern catalogues.',
  image: '/media/leads/buru/boero.webp', alt: 'An eighteenth-century map of Buru, with rivers winding from the mountains to the coast.',
  caption: `Buru, drawn about fifteen years after the earthquake. The large bay at upper right is Kayeli Bay. <a href="${map}">Royal Library, The Hague · engraving and credits</a>`,
  action: 'Compare the two letters', related: '/p/sumatra-tsunamis',
  relatedLabel: 'Another coastal earthquake in the Company records, at Padang on Sumatra in 1697',
};
const khipus = {
  slug: 'pachacamac-khipus', published: '2026-11-19T11:33:00-08:00',
  label: 'Pachacámac, Peru · Andean records', title: 'Did two sets of knotted cords keep the same account?',
  description: 'People in the Andes kept records by tying knots in cords. Two objects from the coast of Peru preserve a run of numbers in the same order. Even one cord that broke long ago offers a clue.',
  image: '/media/leads/pachacamac/larco.webp', alt: 'Knotted cords suspended from a main cord at the Larco Museum, Lima.',
  caption: 'Khipus on display at the Larco Museum in Lima. The two compared below are in Berlin. <a href="https://commons.wikimedia.org/wiki/File:52_Quipu_Inca_Larco_Museum_Lima_Peru_1840.jpg">Photograph by bobistraveling</a> · <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>',
  action: 'Line up the cords', related: '/p/khipu', relatedLabel: 'What else could people record on a khipu besides numbers?',
};

function article(lead, passages) {
  return `<article class="leads-page archive-lead">
    <div class="lead-page-links"><a class="back" href="/leads">← All leads</a><a class="methodology-jump" href="#methodology">How the search worked ↓</a></div>
    <header class="archive-mast"><div><p class="lead-label">${lead.label}</p><h1 class="page-title">${lead.title}</h1>
    <p class="archive-deck">${lead.description}</p></div>
    <figure><a href="${lead.image}" aria-label="Enlarge the illustration"><img src="${lead.image}" alt="${lead.alt}"></a><figcaption>${lead.caption}</figcaption></figure></header>
    ${leadByline(
      [["Claude Opus 5.5", "Researched the primary sources and drafted this lead; reviewed by Benjamin Breen."]],
      `<a href="#exhibit">${lead.action} ↓</a>`
    )}
    ${notedPassages(passages)}
    <footer class="archive-footer"><p>Related open problem</p><a href="${lead.related}">${lead.relatedLabel} →</a></footer></article>`;
}

const letters = [
  { date: '15 September', file: 'first-letter', scan: '0793', width: 1443, height: 259,
    alt: 'Three lines from the first letter. The count is in the bottom line.',
    english: 'as many as four times', dutch: 'tot 4. malen toe',
    context: 'Here Gledstein describes the water rising and falling. On the line above, he says the rivers and the moat filled in an instant.',
    mark: 'left:28%;top:69%;width:25%;height:29%' },
  { date: '27 September', file: 'second-letter', scan: '0801', width: 822, height: 231,
    alt: 'The second letter, with the count written in words partway down the page.',
    english: 'three surges of the sea', dutch: 'drie zeeberinge',
    context: 'Writing again to the governor, Gledstein refers back to his letter of the 15th. This time he sums up the floods in two words.',
    mark: 'left:58%;top:29%;width:27%;height:25%' },
];

function letterReader() {
  const sheets = letters.map(letter => `<figure class="letter-sheet">
    <h3>${letter.date} 1738</h3>
    <a class="letter-crop" href="/media/leads/buru/page-${letter.scan}.webp" aria-label="Enlarge the full page from ${letter.date}">
      <img src="/media/leads/buru/${letter.file}.webp" width="${letter.width}" height="${letter.height}" alt="${letter.alt}">
      <span class="word-outline" style="${letter.mark}" aria-hidden="true"></span>
    </a><blockquote><span class="letter-en">“${letter.english}”</span><span class="letter-nl" lang="nl">“${letter.dutch}”</span></blockquote>
    <p>${letter.context}</p><figcaption>Nationaal Archief · VOC 7913 · <a href="${archive(letter.scan)}">Scan ${Number(letter.scan)} ↗</a></figcaption></figure>`).join('');
  const answers = [
    ['“Exactly four waves reached Buru.”', 'The first letter gives four. The later letter gives three. An entry can preserve both readings while leaving the precise count open.'],
    ['“After the earthquake, the sea rushed inland several times.”', 'Both letters support this entry. The earlier one also tells us where the water went, who fled, and how word of a death reached the writer.'],
    ['“Two witnesses saw waves reach Buru.”', 'Look at who sent the letters. Both came from Gledstein. A second local account could tell us what someone else saw.'],
  ];
  return `<section class="source-exhibit letter-reader" id="exhibit" aria-labelledby="letters-title"><h2 id="letters-title">Compare the two letters</h2>
    <p>Find the wave count in each piece of handwriting. You can mark the words, switch languages, or open either image to read the full page.</p>
    <div class="letter-controls"><fieldset><legend class="exhibit-sr">Language of the excerpts</legend>
    <label><input type="radio" name="letter-language" value="en" checked> English</label>
    <label><input type="radio" name="letter-language" value="nl"> Dutch</label></fieldset>
    <label><input type="checkbox" id="mark-counts"> Mark the words on the scans</label></div>
    <div class="letter-sheets">${sheets}</div>
    <fieldset class="catalogue-choice"><legend>Which entry would you put in an earthquake catalogue?</legend>
    ${answers.map(([option, explanation], index) => `<div class="catalogue-option"><label><input type="radio" name="catalogue-entry" aria-describedby="answer-${index}"> ${option}</label><p class="choice-feedback" id="answer-${index}">${explanation}</p></div>`).join('')}</fieldset></section>`;
}

function buruHTML() {
  return article(buru, [
    { id: 'morning', body: ref => `<h2>A morning on Buru</h2><p>At about eleven on 14 September 1738, the ground shook on Buru, an island in what is now eastern Indonesia. Then the sea came up the rivers so fast that the moat around the Dutch trading post filled almost at once. People ran uphill. The next day, Carel Gustaeff Gledstein, the Dutch East India Company official stationed there, sent an account to his superior on the island of Ambon.${ref}</p>`,
      note: `The surviving extract names Gledstein, his recipient and the date. He gives the hour of the earthquake and calls it “yesterday.” <a href="${archive('0792')}">Opening of the letter, scan 792</a> · <a href="${archive('0793')}">Continuation, scan 793</a>.` },
    { id: 'death', body: ref => `<p>Some of what Gledstein knew came from people around him. The headman of Masarete reported that an older man had drowned. A sergeant and an assistant surgeon examined the body. The letter preserves the headman’s report at second hand. The man who died goes unnamed in this passage.${ref}</p>`,
      note: `The drowning, the headman’s report and the examination appear together on <a href="${archive('0793')}">scan 793</a>.` },
    { id: 'reader', wide: true, body: letterReader },
    { id: 'search', body: ref => `<h2 id="methodology">How the search worked</h2><p>The Company sent copies of letters and reports back to the Netherlands. Today the GLOBALISE project makes machine transcriptions of those handwritten pages searchable. Research agents looked for old Dutch words for shaking ground and rising water, then checked the dates, places and wording in the manuscript images. Reading the heading on each letter revealed that one official had written both.${ref}</p>`,
      note: `<a href="https://globalise.huygens.knaw.nl/">GLOBALISE</a> provides access to Dutch East India Company records. In the <a href="${archive('0801')}">27 September letter</a>, Gledstein explicitly refers back to his report of the 15th.` },
    { id: 'catalogues', body: ref => `<h2>What the letters add</h2><p>A tsunami is a series of waves that forms when a large amount of water is suddenly displaced. The timing of the shaking and the repeated rushes of seawater make a strong case that one reached Buru. Long before instruments recorded these waves, people kept track of where the water went. Their accounts can extend the history of a particular coast by centuries. The search found no entry for these waves on this date in the Indonesian and international catalogues it checked. A separate entry mentions earthquake damage to a church on Buru in 1739. Whether the same earthquake damaged the church remains an open question.${ref}</p>`,
      note: `Compare the Maluku entries in <a href="https://content.bmkg.go.id/wp-content/uploads/Katalog-Tsunami-Indonesia-Perwilayah-416-2025.pdf">Indonesia’s tsunami catalogue</a>, <a href="https://www.ngdc.noaa.gov/hazel/view/hazards/tsunami/event-search">NOAA’s tsunami database</a> and the earthquake record GN-0123 in <a href="https://github.com/7point1/GempaNusantara">Gempa Nusantara</a>.` },
    { id: 'next', body: () => `<h2>Where else did the water reach?</h2><p>Gledstein gave no wave height, and his letters alone cannot locate the earthquake offshore. A ship’s log or a daily register kept at another post could record the same morning from a different stretch of coast. Even a few words about when the sea arrived, or where it stayed calm, would help establish how far the waves travelled.</p>` },
  ]);
}

function khipuHTML() {
  return article(khipus, [
    { id: 'knots', body: ref => `<h2>How do you read a number from string?</h2><p>A khipu is a record made of cords. Shorter cords hang from a main cord, and on many khipus the positions of knots tell you which stand for hundreds, tens and ones. Someone can read the number 470 from a cord today even if the name of the thing being counted has been lost.${ref}</p>`,
      note: 'The <a href="https://www.khipufieldguide.com/">Khipu Field Guide</a> illustrates how knots are tied, how their positions are recorded, and how to read a catalogue diagram.' },
    { id: 'objects', body: ref => `<p>Two khipus in Berlin’s Ethnological Museum are recorded as coming from Pachacámac, near Lima on the coast of Peru. One has 15 main hanging cords, the other 62. On the shorter one, two groups of seven cords sit side by side. On the longer one, two groups of seven sit in the same order. The interesting part is what happens when you line up the numbers inside them.${ref}</p>`,
      note: `The museum lists separate objects, <a href="https://search.smb.museum/object/obj-39458">VA 42601 (short)</a> and <a href="https://search.smb.museum/object/obj-39416">VA 42559 (long)</a>. See the cord diagrams for <a href="${guide('KH0132')}">KH0132</a> and <a href="${guide('KH0456')}">KH0456</a>.` },
    { id: 'reader', wide: true, body: cordReader },
    { id: 'reading', body: ref => `<h2>What survives the breaks?</h2><p>Start at cord 7 on the long khipu. The two records agree on 620, then 470. Farther along, both give 474, 319, 453 and 492 in succession. Even beyond several breaks in the shorter khipu, both records end this stretch with 275. One broken cord still carries knots for six hundreds. Its partner reads 663. That is a possible fit, but the missing digits keep it out of the score.${ref}</p>`,
      note: 'Marcia and Robert Ascher drew and described the shorter object, including its broken ends. See <a href="https://courses.cit.cornell.edu/quipu/data/as118.pdf">their original AS118 recording, pp. 791–793</a>.' },
    { id: 'dispute', body: ref => `<p>One cord matters especially. An older table gives long cord 9 a value of 0. The modern database gives it 528, exactly the number on its partner. Set that pair aside and seven of the eight fully readable comparisons still agree. The one difference is small enough to inspect on the objects themselves. One cord reads 935 and the other 932. The disagreement comes down to the last knot.${ref}</p>`,
      note: `The 62 values in <a href="${oldTable}">Gary Urton’s table UR218.xls (ZIP)</a> add to 8,282. In the <a href="${repository}">Open Khipu Repository v2.1.0</a> they add to 8,810. Cord 9 accounts for the entire difference. The <a href="https://www.khipufieldguide.com/databook/excel_khipus/KH0456.xlsx">Field Guide workbook</a> supplies the long record used in the exhibit.` },
    { id: 'method', body: ref => `<h2 id="methodology">How the search worked</h2><p>A research agent searched for short runs of numbers recurring on two khipus from the same place. It checked museum numbers to rule out two catalogue entries describing the very same object. Then it set the disputed reading aside and tried the eight remaining comparisons at every possible starting place in 87 other records attributed to Pachacámac. Among 3,452 stretches of cord, this one gave seven matches. Every other object gave at most one.${ref}</p>`,
      note: `These counts use the principal hanging cords in <a href="${repository}">the repository</a> and omit entries already marked as duplicates. The eight positions were chosen after the pair had come to light. The <a href="/media/leads/pachacamac/comparison-results.json">saved search results</a> list the highest-scoring stretches, the positions checked and the comparison restricted to pairs of seven-cord groups.` },
    { id: 'meaning', body: ref => `<h2>What might two matching records mean?</h2><p>One keeper of accounts might have copied part of a longer record. Two keepers might also have written down the same quantities independently. Either possibility would give historians a way to study how accounts travelled between people. An earlier study paired the long khipu with a different object of the same length. The comparison here concerns just fourteen cords.${ref}</p><p>The most valuable next evidence would be close photographs or the original recording notes for cords 9 and 10. They could settle the disputed 528 and show whether the final knot really differs by three turns. What the numbers stood for remains open.</p>`,
      note: `Gary Urton lists whole-object pairs on p. 36 of <a href="https://www.academia.edu/12638794/Quipus_de_Pachacamac"><i>Quipus de Pachacamac</i> (2014)</a>. The <a href="https://search.smb.museum/object/obj-39416">museum record</a> includes a photograph of the long khipu.` },
  ]);
}

export const archiveLeads = [{ ...buru, html: buruHTML }, { ...khipus, html: khipuHTML }];
