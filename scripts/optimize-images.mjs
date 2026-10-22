// Turns the raw scraped photos into web-ready WebP files in public/img.
// Product shots stay true to colour; lifestyle shots get a gentle lift so the site reads bright.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = process.argv[2] ?? "../site/img";
const OUT = "public/img";

const LIFT = {
  "site-storefront-spring": { brightness: 1.1, saturation: 1.06, width: 1800 },
  "site-img-7746": { brightness: 1.22, saturation: 1.05, width: 1600 },
  "site-img-1106": { brightness: 1.35, saturation: 1.0, width: 1200 },
  "site-charcuterieboard": { brightness: 1.12, saturation: 1.05, width: 1600 },
  "site-img-9035": { brightness: 1.1, saturation: 1.05, width: 1600 },
  "milk-chocolate-roughly-chopped-3": { brightness: 1.12, saturation: 1.04, width: 1400 },
  "semisweet-dark-chocolate-roughly-chopped-3": { brightness: 1.12, saturation: 1.04, width: 1200 },
  "site-trufflemold-chocolateballs-alt": { brightness: 1.08, saturation: 1.0, width: 1400 },
};
// Cutaway shots ship with a thin drawn frame; trim it off.
const INSET = { "dark-chocolate-raspberry-truffles-4": 0.035, "dark-mint-truffles-4": 0.035, "milk-chocolate-caramel-truffles-4": 0.035 };

await mkdir(OUT, { recursive: true });
for (const file of await readdir(SRC)) {
  const { name, ext } = parse(file);
  if (![".jpg", ".jpeg", ".png"].includes(ext.toLowerCase())) continue;
  const lift = LIFT[name];
  let img = sharp(join(SRC, file));
  const meta = await img.metadata();
  if (INSET[name]) {
    const dx = Math.round(meta.width * INSET[name]), dy = Math.round(meta.height * INSET[name]);
    img = img.extract({ left: dx, top: dy, width: meta.width - dx * 2, height: meta.height - dy * 2 });
  }
  if (name === "logo") {
    await img.trim().png({ compressionLevel: 9 }).toFile(join(OUT, "logo.png"));
    continue;
  }
  img = img.resize({ width: lift?.width ?? 1100, withoutEnlargement: true });
  if (lift) img = img.modulate({ brightness: lift.brightness, saturation: lift.saturation });
  const transparent = ext === ".png" && meta.hasAlpha;
  await img.webp({ quality: 78, alphaQuality: 90, effort: 5 }).toFile(join(OUT, `${name}.webp`));
  if (transparent) continue;
}
console.log("images optimized");

// Background-free bag shots (made by scripts/cutout.py) for bags standing on coloured surfaces.
await mkdir(join(OUT, "cut"), { recursive: true });
for (const file of await readdir("raw-cutouts")) {
  const { name } = parse(file);
  await sharp(join("raw-cutouts", file)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 85, effort: 5 }).toFile(join(OUT, "cut", `${name}.webp`));
}
console.log("cutouts optimized");
