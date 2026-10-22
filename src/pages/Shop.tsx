import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FAMILY_LABEL, PRODUCTS, type Family } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { DealSheet } from "../components/Bits";
import { Link, useRouter } from "../lib/router";

type Sort = "featured" | "price-up" | "price-down" | "sweet";
const FILTERS: [string, string][] = [["all", "Everything"], ["rough-cuts", "Rough Cuts"], ["chop-shop", "Chop Shop Bags"], ["truffles", "Truffles"]];

export function Shop({ filter }: { filter?: string }) {
  const { go } = useRouter();
  const [sort, setSort] = useState<Sort>("featured");
  const active = filter ?? "all";

  const list = useMemo(() => {
    const l = PRODUCTS.filter((p) => active === "all" || p.family === (active as Family));
    const s = [...l];
    if (sort === "price-up") s.sort((a, b) => a.price - b.price);
    if (sort === "price-down") s.sort((a, b) => b.price - a.price);
    if (sort === "sweet") s.sort((a, b) => (a.cacao ?? 99) - (b.cacao ?? 99));
    return s;
  }, [active, sort]);

  const heading = active === "all" ? "The Counter" : FAMILY_LABEL[active as Family];
  const sub =
    active === "truffles"
      ? "Twenty chef-grade truffles to a bag, no gold box. Mix any two bags for $32."
      : active === "rough-cuts"
        ? "Belgian chocolate in 34%, 54% and 70%, roughly chopped into 7 oz bags. Any two for $26."
        : active === "chop-shop"
          ? "Roughly chopped for snacking, great on charcuterie and dessert boards."
          : "Every cut is chopped in Williston, Vermont. Mix and match: the bag works out the deal.";

  return (
    <>
      <section className="pagehead gut">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to={{ page: "home" }}>Home</Link> / <span>Shop</span>
          </nav>
          <h1 className="sign sign-xl" style={{ fontSize: "clamp(56px, 9vw, 120px)" }}>{heading}</h1>
          <p className="lede">{sub}</p>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="chips" role="group" aria-label="Filter">
              {FILTERS.map(([k, label]) => (
                <button key={k} className="chip" aria-pressed={k === active} onClick={() => go(k === "all" ? { page: "shop" } : { page: "shop", filter: k })}>
                  {label}
                </button>
              ))}
            </div>
            <label className="row" style={{ gap: 8, fontWeight: 600 }}>
              Sort
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} style={{ minHeight: 42, padding: "0 10px", border: "2px solid var(--cocoa)", background: "var(--tile-raised)", color: "var(--cocoa)", font: "inherit" }}>
                <option value="featured">Featured</option>
                <option value="sweet">Sweetest first</option>
                <option value="price-up">Price, low to high</option>
                <option value="price-down">Price, high to low</option>
              </select>
            </label>
          </div>
        </div>
      </section>
      <section className="band gut" style={{ paddingTop: 36 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <motion.div className="grid" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <motion.div key={p.handle} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.16 }} style={{ display: "flex" }}>
                  <ProductCard p={p} eager />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="split">
            <DealSheet />
            <div className="stack">
              <span className="label">How the deals work</span>
              <h2 className="sign sign-m">Put anything in the bag. We do the math.</h2>
              <p>
                Rough Cuts and Chop Shop bags count as “chopped,” truffle bags count as “truffles.” The bag checks every combination of the market-table deals and rings up the cheapest one, so four bags of anything chopped comes to $48 without a code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
