# The Chocolate Butcher — website

Custom storefront for The Chocolate Butcher® and its Chop Shop at 22 Merchants Row, Williston, Vermont.
React 18 + TypeScript + Vite + framer-motion. No Shopify, no theme: every page is hand-built.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

`node assemble.mjs [out.html]` inlines the built CSS and JS into one HTML page (default `single/index.html`). Serve it next to `public/img/` for a single-file preview.

## Layout

| Path | What it is |
| --- | --- |
| `src/pages/` | Home, Shop, Rough Cuts, Truffles, Snack Boards, Holiday, Gifting, Reviews, Visit, Our Story, FAQ, Checkout, Near You hub + 11 town pages, product pages, 404 |
| `src/components/` | Header/footer chrome and ticker, cart drawer (bottom sheet on phones), phone tab bar, magnetic nav dock, seasons timelapse, watercolor washes and dividers, maple-leaf rating |
| `src/data/` | Product catalog, real Google reviews with Jeff's replies, press, town pages (`towns.ts`), art slots (`art.ts`) |
| `src/lib/` | Hash router, cart, bundle pricing (2/$26, 4/$48 …), JSON-LD schema, toasts |
| `src/styles/app.css` | All styling ("Chop Shop Pop": League Gothic, Yellowtail, Libre Franklin, Courier Prime) |
| `public/img/` | Web-ready WebP: real product photos, bag cutouts, watercolor art (`img/art/`), seasons frames |
| `assets/photos/` | Original real photos (scraped from the current site and shared by the team) |
| `assets/cutouts/` | Full-size transparent bag cutouts |
| `assets/watercolor/` | Original watercolor and line-art sheets |
| `media/` | Seasons timelapse videos for social (16:9 and 1:1) |
| `scripts/optimize-images.mjs` | Raw photos → `public/img` WebP (`npm run images -- <src dir>`) |
| `tools/media/` | Python: seasons frame alignment (OpenCV), timelapse render (ffmpeg), watercolor/line-art prep |
| `tools/qa/` | Playwright checks: every route at 390/820/1024/1280/1440 for overflow and console errors, screenshots |

## Routes

Hash routes, so it works on any static host: `#home`, `#shop`, `#roughcuts`, `#truffles`, `#board`, `#holiday`, `#gifting`, `#reviews`, `#visit`, `#story`, `#faq`, `#checkout`, `#near-you`, `#near-<town>`, `#cut-<product-handle>`.

## Notes

- Checkout is a working preview flow (validation, confirmation) with no payment processor connected yet.
- Only real photography of the shop and products is used on the site.
- QA: `npm run build && npm run preview`, then `node tools/qa/allw.cjs` (needs Playwright + Chromium).
