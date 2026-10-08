# Image brief

For each problem id, choose ONE image from Wikimedia Commons that directly depicts the object, document, place or person at the heart of the problem (an artifact, a manuscript page, an inscription, a painting, a map, a period photograph). It will be turned into a high-contrast red halftone, so prefer:
- a clear subject with strong shapes and texture (inscriptions, manuscript pages, objects against plain backgrounds, engravings);
- landscape or square orientation; original at least ~1200 px wide;
- licences: public domain, CC0, CC BY, or CC BY-SA only (no NC/ND, no fair use, no "unknown").

Download a 1600px-wide rendition with the Commons API, e.g.
  curl -sL -A "historyproblems.com image research (breen85@gmail.com)" "https://commons.wikimedia.org/w/api.php?action=query&titles=File:NAME&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600&format=json"
then fetch the `thumburl` (same User-Agent) to data/images/src/<id>.jpg (convert/rename as needed; keep the original format extension if not jpg).
Look at the downloaded file (Read tool on the image) to confirm it shows what you think and will work as a halftone.

Write data/images/<id>.json:
{
  "id": "<problem id>",
  "file": "data/images/src/<id>.<ext>",
  "caption": "What the image shows, max 12 words, e.g. 'Obelisk of Manishtushu, Susa, c. 2270 BCE'",
  "commons": "https://commons.wikimedia.org/wiki/File:...",
  "author": "Plain-text author/photographer as Commons gives it (strip HTML)",
  "license": "Short name, e.g. 'CC BY-SA 3.0' or 'Public domain'",
  "license_url": "https://creativecommons.org/... (omit or empty for public domain)",
  "crop": "center" | "top" | "bottom" | "left" | "right",  // where the interesting part is, for a 4:3 crop
  "zoom": 1.0  // optional; >1 crops tighter around the centre (for dense subjects like inscriptions)
}

Optional rendering keys: "zoom" (crop tighter, >1), "invert" (print light areas), "style": "bold" (hard split for inscriptions; dark ground solid, incisions white).
