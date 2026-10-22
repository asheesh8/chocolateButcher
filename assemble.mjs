import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
// Single-file build for previews: inlines the Vite CSS/JS into one page. Usage: node assemble.mjs [out.html]
const OUT = process.argv[2] ?? "single/index.html";
const a = readdirSync("dist/assets");
const js = readFileSync("dist/assets/" + a.find((f) => f.endsWith(".js")), "utf8").replaceAll("</script", "<\\/script");
const css = readFileSync("dist/assets/" + a.find((f) => f.endsWith(".css")), "utf8");
const page = `<title>The Chocolate Butcher</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="description" content="Rough-cut Belgian chocolate, chef-grade truffles and chocolate for charcuterie boards, chopped in Williston, Vermont." />
<link rel="icon" href="img/favicon-cleavers.webp" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Courier+Prime:wght@400;700&family=Libre+Franklin:ital,wght@0,400..800;1,400&family=Yellowtail&display=swap" />
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, page);
console.log("page bytes", page.length);
