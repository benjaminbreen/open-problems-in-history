"""Turn source images into red halftones, and make share cards.

  data/images/<id>.json + source file  ->  img/<id>.webp      (4:3 halftone, transparent, for the problem page)
                                       ->  og/<id>.png        (1200x630 share card)
  all halftones                        ->  og/index.png       (share card for the home page)

Run: python3 scripts/images.py   (then npm run data)
"""
import json, math, glob, os, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
RED = (196, 50, 28)
INK = (17, 17, 17)
MUTED = (107, 107, 107)
FONTS = "scripts/fonts"
SITE = "Open Problems in History"
HOME = ["vermeer", "indus", "black-death-africa", "roman-census"]  # mosaic on the home share card


def crop_to(img, w, h, hint="center", zoom=1.0):
    """Crop to aspect w:h, keeping the part named by hint, then resize. zoom > 1 crops tighter."""
    if zoom > 1:
        zw, zh = round(img.width / zoom), round(img.height / zoom)
        img = img.crop(((img.width - zw) // 2, (img.height - zh) // 2, (img.width + zw) // 2, (img.height + zh) // 2))
    sw, sh = img.size
    target = w / h
    if sw / sh > target:
        nw = round(sh * target)
        x = {"left": 0, "right": sw - nw}.get(hint, (sw - nw) // 2)
        box = (x, 0, x + nw, sh)
    else:
        nh = round(sw / target)
        y = {"top": 0, "bottom": sh - nh}.get(hint, (sh - nh) // 2)
        box = (0, y, sw, y + nh)
    return img.crop(box).resize((w, h), Image.LANCZOS)


def prepare(img):
    """Greyscale with local contrast: large-scale shading is flattened toward mid-grey so
    texture and edges (signs, folds, faces) carry the dots rather than dark backgrounds."""
    g = ImageOps.autocontrast(ImageOps.grayscale(img.convert("RGB")), cutoff=1.5)
    base = g.filter(ImageFilter.GaussianBlur(radius=max(g.size) / 25))
    hp = Image.eval(Image.merge("RGB", (g, base, g)).split()[0], lambda v: v)  # copy
    hp = Image.blend(g, Image.eval(base, lambda v: 255 - v), 0.5)  # g - base, centred on 128
    hp = ImageOps.autocontrast(hp, cutoff=1)
    out = Image.blend(g, hp, 0.6)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=110, threshold=2))
    return out.point(lambda v: round(255 * (v / 255) ** 0.62))


def prepare_bold(img):
    """Hard tonal split for inscriptions: dark ground prints solid, light incisions stay white."""
    g = ImageOps.autocontrast(ImageOps.grayscale(img.convert("RGB")), cutoff=3).filter(ImageFilter.MedianFilter(3))
    return g.point(lambda v: 255 if v > 150 else round(255 * (v / 150) ** 2.2))


def halftone(img, w, h, hint="center", cell=9, angle=45, color=RED, bg=None, zoom=1.0, invert=False, style="soft"):
    """Return an RGBA halftone of img at w x h: dots sized by darkness on a rotated grid.
    invert prints light areas instead (for light incisions on dark stone)."""
    c = crop_to(img, w, h, hint, zoom)
    c = ImageOps.invert(c.convert("RGB")) if invert else c
    g = prepare_bold(c) if style == "bold" else prepare(c)
    px = g.load()
    s = 3  # supersample for smooth dots
    out = Image.new("RGBA", (w * s, h * s), bg + (255,) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    a = math.radians(angle)
    ca, sa = math.cos(a), math.sin(a)
    r_max = cell * 0.6
    reach = int((w + h) / cell) + 2
    cx0, cy0 = w / 2, h / 2
    for i in range(-reach, reach):
        for j in range(-reach, reach):
            u, v = i * cell, j * cell
            x = cx0 + u * ca - v * sa
            y = cy0 + u * sa + v * ca
            if not (-cell <= x < w + cell and -cell <= y < h + cell):
                continue
            xs, ys = min(max(int(x), 0), w - 1), min(max(int(y), 0), h - 1)
            dark = (1 - px[xs, ys] / 255) ** 1.25
            if dark < 0.1:
                continue
            r = r_max * math.sqrt(dark)
            d.ellipse([(x - r) * s, (y - r) * s, (x + r) * s, (y + r) * s], fill=color + (255,))
    return out.resize((w, h), Image.LANCZOS)


def font(name, size, weight=None):
    f = ImageFont.truetype(f"{FONTS}/{name}", size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight, min(max(size, 6), 72)])  # Newsreader axes: wght, opsz
        except Exception:
            pass
    return f


def wrap(draw, text, f, width):
    words, lines, line = text.split(), [], ""
    for w in words:
        t = f"{line} {w}".strip()
        if draw.textlength(t, font=f) <= width:
            line = t
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines


def mark(d, x, y, size=22):
    d.rectangle([x, y + 4, x + size * 0.62, y + 4 + size * 0.62], fill=RED)
    d.text((x + size * 0.62 + 14, y), SITE.upper(), font=font("IBMPlexMono-SemiBold.ttf", size), fill=INK)


def card(p, ht):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), "white")
    im.paste(ht, (W - ht.width, 0), ht)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W, 10], fill=INK)
    mark(d, 64, 56)
    text_w = W - ht.width - 64 - 56
    for size in (64, 58, 52, 47, 43):
        f = font("Newsreader.ttf", size, 500)
        lines = wrap(d, p["title"], f, text_w)
        if len(lines) <= 4:
            break
    y = 136
    for line in lines:
        d.text((64, y), line, font=f, fill=INK)
        y += round(size * 1.16)
    meta = " · ".join(x for x in [p["field"], p["region"], period(p)] if x)
    fm = font("IBMPlexMono-Medium.ttf", 22)
    d.text((64, H - 112), meta, font=fm, fill=MUTED)
    d.text((64, H - 74), "historyproblems.com", font=font("IBMPlexMono-SemiBold.ttf", 22), fill=RED)
    return im


def period(p):
    s, e = p["start"], p["end"]
    if s < 0 and e < 0:
        return f"{-s}–{-e} BCE"
    if s < 0:
        return f"{-s} BCE–{e} CE"
    return f"{s}–{e}"


def main():
    os.makedirs("img", exist_ok=True)
    os.makedirs("og", exist_ok=True)
    problems = {p["id"]: p for p in json.load(open("data/problems.json"))}
    thumbs = []
    for meta_file in sorted(glob.glob("data/images/*.json")):
        m = json.load(open(meta_file))
        p = problems.get(m["id"])
        if not p or not os.path.exists(m["file"]):
            print("skip", m["id"])
            continue
        src = Image.open(m["file"])
        hint = m.get("crop", "center")
        ht_page = halftone(src, 960, 720, hint, cell=7, zoom=m.get("zoom", 1.0), invert=m.get("invert", False), style=m.get("style", "soft"))
        alpha = ht_page.split()[3].point(lambda v: min(255, (v + 16) // 32 * 32))  # few alpha levels compress well
        flat = Image.merge("RGBA", (*Image.new("RGB", ht_page.size, RED).split(), alpha))
        flat.save(f"img/{p['id']}.webp", lossless=True, method=6)
        ht = halftone(src, 500, 630, hint, cell=5.5, bg=(255, 255, 255), zoom=m.get("zoom", 1.0), invert=m.get("invert", False), style=m.get("style", "soft"))
        card(p, ht).save(f"og/{p['id']}.jpg", quality=86, optimize=True)
        if p["id"] in HOME:
            thumbs.append((HOME.index(p["id"]), halftone(src, 300, 315, hint, cell=4.5, bg=(255, 255, 255))))
        print("ok", p["id"])

    # Home card: title on the left, a 2x2 mosaic of halftones on the right.
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), "white")
    for k, (_, t) in enumerate(sorted(thumbs, key=lambda x: x[0])[:4]):
        im.paste(t, (W - 600 + (k % 2) * 300, (k // 2) * 315))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, W, 10], fill=INK)
    mark(d, 64, 56)
    f = font("Newsreader.ttf", 64, 500)
    y = 150
    for line in ["Open problems", "in history that", "historians and AI", "agents could solve"]:
        d.text((64, y), line, font=f, fill=INK)
        y += 74
    d.text((64, H - 74), "historyproblems.com", font=font("IBMPlexMono-SemiBold.ttf", 22), fill=RED)
    im.save("og/index.jpg", quality=86, optimize=True)
    print("done")


if __name__ == "__main__":
    main()
