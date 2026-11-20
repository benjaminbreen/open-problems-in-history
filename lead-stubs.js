export const leadStubs = [
  {
    slug: "mughal-dodo", published: "2026-11-20T00:00:00-08:00",
    label: "Mughal India · Seventeenth century", title: "How did a dodo become the subject of a Mughal painting?",
    description: "A painter at the Mughal court depicted a bird native to Mauritius. The traveller Peter Mundy recalled seeing two live dodos in Surat, a port on India’s west coast. Can a particular bird be traced to the artist?",
    image: "/media/leads/dodo/dodo-detail.webp", alt: "Detail of a dodo in a Mughal album painting.",
    caption: "Detail of the bird study attributed to the court painter Mansur.",
    source: "https://www.orientalstudies.ru/eng/images/pdf/st.petersburg_muraqqa_1996.pdf",
    credit: "St. Petersburg album, plate 147",
    next: "A ship’s cargo list or a letter about a gift could connect the arrival of a live bird in India with someone at court. The album catalogue dates the study to about 1615. Any proposed journey would have to fit that date.",
    links: [
      ["Peter Mundy’s account of seeing the birds in Surat", "https://archive.org/details/travelsofpetermu02mund/page/318/mode/2up"],
      ["Read the separate investigation into two Dutch records of dodos on Mauritius in 1615", "/leads/dodo-journal"],
    ],
  },
  {
    slug: "toromiro-provenance", published: "2026-11-20T00:00:00-08:00",
    label: "Rapa Nui and Melbourne · Botanical history", title: "Where did Melbourne’s toromiro trees come from?",
    description: "The toromiro, a tree native to Rapa Nui (Easter Island), survives in gardens. Melbourne’s trees might preserve a separate line of descent from the island’s wild trees. A pressed specimen offers a place to begin.",
    image: "/media/leads/toromiro/menton.jpg", alt: "Toromiro growing in a botanical garden in Menton, France.",
    caption: "A cultivated toromiro at the Val Rahmeh botanical garden in Menton, France.",
    source: "https://commons.wikimedia.org/wiki/File:Sophora_toromiro.jpg", credit: "Photograph by Tangopaso",
    next: "The label on a specimen from garden bed FE82 points to an earlier specimen taken from the same tree. Matching those two records to Melbourne’s planting register might identify the donor and show whether the tree came through Gothenburg, a known source of cultivated toromiro.",
    links: [
      ["Specimen CHR 524208, Allan Herbarium", "https://scd.landcareresearch.co.nz/Specimen/CHR_524208"],
      ["Royal Botanic Gardens Victoria’s living collection", "https://data.rbg.vic.gov.au/rbgcensus/"],
      ["Heenan and colleagues’ genetic study of cultivated toromiro", "https://doi.org/10.1080/0028825X.2021.2007957"],
    ],
  },
];

export function stubHTML(stub) {
  return `<article class="leads-page lead-stub">
    <a class="lead-credit" href="/leads">← Leads</a>
    <p class="lead-label">Research stub · ${stub.label}</p>
    <h1 class="page-title">${stub.title}</h1>
    <figure><img src="${stub.image}" alt="${stub.alt}"><figcaption>${stub.caption} <a href="${stub.source}">${stub.credit}</a>.</figcaption></figure>
    <p class="lead-intro">${stub.description}</p>
    <p class="lead-intro">${stub.next}</p>
    <ul>${stub.links.map(([label, url]) => `<li><a href="${url}">${label}</a></li>`).join("")}</ul>
  </article>`;
}
