import { leadByline } from "../../render.js";

export const leadStubs = [];

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
