import { leadByline } from "./render.js";

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
];

export function stubHTML(stub) {
  return `<article class="leads-page lead-stub">
    <a class="lead-credit" href="/leads">← Leads</a>
    <p class="lead-label">Research stub · ${stub.label}</p>
    <h1 class="page-title">${stub.title}</h1>
    ${leadByline([["Claude Opus 5.5", "Drafted this research stub; reviewed by Benjamin Breen."]])}
    <figure><img src="${stub.image}" alt="${stub.alt}"><figcaption>${stub.caption} <a href="${stub.source}">${stub.credit}</a>${stub.license ? ` · <a href="${stub.license}">${stub.licenseLabel}</a>` : ""}.</figcaption></figure>
    <p class="lead-intro">${stub.description}</p>
    <p class="lead-intro">${stub.next}</p>
    <ul>${stub.links.map(([label, url]) => `<li><a href="${url}">${label}</a></li>`).join("")}</ul>
  </article>`;
}
