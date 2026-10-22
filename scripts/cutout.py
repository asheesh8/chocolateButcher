"""Knock the white studio background out of the product shots so bags can stand on any surface.
Flood-fills near-white from the image border, then feathers the edge. Run with: python3 -I scripts/cutout.py SRC OUT"""
import sys, glob, os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
SKIP = ("-4.", "site-", "logo", "cleavers", "milk-chocolate-roughly-chopped-3", "semisweet-dark-chocolate-roughly-chopped-3")
for f in sorted(glob.glob(os.path.join(src, "*.jpg"))):
    name = os.path.basename(f)
    if any(s in name for s in SKIP):
        continue
    im = Image.open(f).convert("RGB")
    im.thumbnail((1100, 1400))
    w, h = im.size
    # work on a marker image: flood near-white from many border seeds
    marker = im.copy()
    for x in list(range(0, w, 25)) + [w - 1]:
        for y in (0, h - 1):
            if sum(marker.getpixel((x, y))) > 3 * 225:
                ImageDraw.floodfill(marker, (x, y), (255, 0, 255), thresh=28)
    for y in list(range(0, h, 25)) + [h - 1]:
        for x in (0, w - 1):
            if sum(marker.getpixel((x, y))) > 3 * 225:
                ImageDraw.floodfill(marker, (x, y), (255, 0, 255), thresh=28)
    r, g, b = marker.split()
    bg = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), b.point(lambda v: 255 if v == 255 else 0)), g.point(lambda v: 255 if v == 0 else 0))
    alpha = ImageChops.invert(bg).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    rgba = im.copy()
    rgba.putalpha(alpha)
    rgba.save(os.path.join(out, name.rsplit(".", 1)[0] + ".png"))
    print("cut", name)
