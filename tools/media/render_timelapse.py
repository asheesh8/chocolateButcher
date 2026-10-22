# Renders the storefront seasons timelapse: aligned frames, crossfades, a slow push-in,
# a season tag per frame, and an end card. Usage: render_timelapse.py <landscape|square> <out.mp4>
import subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

mode, out = sys.argv[1], sys.argv[2]
FPS = 30
HOLD, FADE = 2.2, 1.0
SEASONS = ["Spring", "Summer nights", "Fall", "Fall rain", "Winter", "The holidays"]
frames = [Image.open(f"align/{i:02d}.png").convert("RGB") for i in range(1, 7)]
W0, H0 = frames[0].size
if mode == "square":
    OW, OH = 1080, 1080
    base = (int(W0 * 0.56 - H0 / 2), 0, int(W0 * 0.56 + H0 / 2), H0)
else:
    OW, OH = 1280, 720
    bh = int(W0 * 9 / 16)
    base = (0, int((H0 - bh) * 0.35), W0, int((H0 - bh) * 0.35) + bh)

BSD = "fonts/BSD800.ttf"
YT = "fonts/Yellowtail.ttf"
COCOA, TILE, CLEAVER = (58, 32, 22), (255, 253, 249), (215, 38, 46)
S = OW / 1280 if mode != "square" else 1080 / 1280 * 1.15

def crop_zoom(img, z):
    x0, y0, x1, y1 = base
    cx, cy = (x0 + x1) / 2 + (x1 - x0) * 0.04 * (z - 1) / 0.14, (y0 + y1) / 2
    w, h = (x1 - x0) / z, (y1 - y0) / z
    return img.resize((OW, OH), Image.LANCZOS, box=(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2))

def tag(label):
    """A cream ticket with a cleaver-cut corner, like the price tags in the shop."""
    f = ImageFont.truetype(BSD, int(46 * S))
    tw = int(f.getlength(label.upper()))
    pad, h = int(22 * S), int(74 * S)
    w, cut = tw + pad * 2, int(16 * S)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.polygon([(0, 0), (w, 0), (w, h - cut), (w - cut, h), (0, h)], fill=TILE + (245,))
    d.rectangle([0, 0, int(6 * S), h], fill=CLEAVER + (255,))
    d.text((pad + int(3 * S), h / 2), label.upper(), font=f, fill=COCOA, anchor="lm")
    return im

tags = [tag(s) for s in SEASONS]
logo = Image.open("cb/public/img/logo.png").convert("RGBA")

def end_card():
    im = Image.new("RGB", (OW, OH), TILE)
    lw = int(OW * (0.42 if mode != "square" else 0.6))
    lg = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    y = int(OH * (0.2 if mode != "square" else 0.24))
    im.paste(lg, ((OW - lw) // 2, y), lg)
    d = ImageDraw.Draw(im)
    y += lg.height + int(34 * S)
    d.text((OW / 2, y), "Open every season", font=ImageFont.truetype(YT, int(56 * S)), fill=CLEAVER, anchor="mt")
    y += int(86 * S)
    f = ImageFont.truetype(BSD, int(40 * S))
    d.text((OW / 2, y), "22 MERCHANTS ROW · WILLISTON, VT", font=f, fill=COCOA, anchor="mt")
    d.text((OW / 2, y + int(52 * S)), "WED–SUN 12–7 · CHOCOLATEBUTCHER.COM", font=f, fill=(122, 84, 70), anchor="mt")
    return im

seg = HOLD + FADE
total = seg * len(frames) + 0.6 + 3.0  # last hold, fade to card, card hold
n = int(total * FPS)
card = end_card()
ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{OW}x{OH}", "-r", str(FPS), "-i", "-",
                       "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
photo_end = seg * len(frames) - FADE + 0.6
for k in range(n):
    t = k / FPS
    z = 1.0 + 0.14 * min(1, t / photo_end)
    i = min(int(t // seg), len(frames) - 1)
    local = t - i * seg
    a = 0.0
    if i < len(frames) - 1 and local > HOLD:
        a = (local - HOLD) / FADE
        a = a * a * (3 - 2 * a)
    cur = crop_zoom(frames[i], z)
    if a > 0:
        cur = Image.blend(cur, crop_zoom(frames[i + 1], z), a)
    cur = cur.convert("RGBA")
    # tag slides in at the start of each hold and fades with its photo
    for j, alpha in ((i, 1 - a), (i + 1, a)):
        if j >= len(frames) or alpha <= 0:
            continue
        since = t - j * seg if j == i else 0
        tg = tags[j]
        slide = min(1, max(0, since / 0.45)) if j == i else 1
        ease = 1 - (1 - slide) ** 3
        x = int(36 * S - (1 - ease) * 40 * S)
        y = OH - tg.height - int(36 * S)
        layer = Image.new("RGBA", cur.size, (0, 0, 0, 0))
        layer.paste(tg, (x, y), tg)
        if alpha * ease < 1:
            layer.putalpha(Image.fromarray((np.asarray(layer)[..., 3] * alpha * ease).astype(np.uint8)))
        cur = Image.alpha_composite(cur, layer)
    cur = cur.convert("RGB")
    if t > photo_end:
        c = min(1, (t - photo_end) / 0.8)
        cur = Image.blend(cur, card, c * c * (3 - 2 * c))
    ff.stdin.write(cur.tobytes())
ff.stdin.close()
ff.wait()
print("wrote", out, f"{total:.1f}s")
