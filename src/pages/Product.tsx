import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { FAMILY_LABEL, PRODUCTS, byHandle } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../lib/cart";
import { money, moneyShort } from "../lib/pricing";
import { Link } from "../lib/router";
import { useToast } from "../lib/toast";
import { NotFound } from "./NotFound";

export function ProductPage({ handle }: { handle: string }) {
  return byHandle[handle] ? <Product handle={handle} /> : <NotFound />;
}

function Product({ handle }: { handle: string }) {
  const p = byHandle[handle];
  const [shot, setShot] = useState(0);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const toast = useToast();
  useEffect(() => {
    setShot(0);
    setQty(1);
  }, [handle]);

  const dealHint =
    p.bundle === "chop" ? "Any 2 chopped bags for $26, any 4 for $48. Pair it with a truffle bag for $29." : "Any 2 truffle bags for $32, any 4 for $60. Pair it with a chopped bag for $29.";
  const related = PRODUCTS.filter((x) => x.handle !== p.handle && (x.family === p.family || x.family === "truffles")).slice(0, 3);

  const rows: [string, string][] = [
    ["Line", p.line],
    ["Net weight", p.weight],
    ...(p.count ? ([["Count", p.count]] as [string, string][]) : []),
    ...(p.cacao ? ([["Cacao", `${p.cacao}% Belgian`]] as [string, string][]) : []),
    ...(p.calories ? ([["Nutrition", p.calories]] as [string, string][]) : []),
    ...(p.pairings ? ([["Wine pairings", p.pairings.join(", ")]] as [string, string][]) : []),
    ["Chopped in", "Williston, Vermont"],
    ["Ships", "2-day, insulated, iced in warm months"],
  ];

  return (
    <>
    <div className="lineband gut" style={{ "--c": p.band, "--on": p.bandInk ? "#2a1a14" : "#fff", marginTop: 18 } as CSSProperties}>
      <div className="wrap">
        <span className="script">{p.line}</span>
        <span className="sign">{p.short}</span>
        <span className="ticket-t">{p.count ? `${p.count} · ` : ""}{p.weight} · {moneyShort(p.price)}</span>
      </div>
    </div>
    <section className="band gut" style={{ paddingTop: 32 }}>
      <div className="wrap stack" style={{ gap: 28 }}>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={{ page: "home" }}>Home</Link> / <Link to={{ page: "shop", filter: p.family }}>{FAMILY_LABEL[p.family]}</Link> / <span>{p.short}</span>
        </nav>
        <div className="pdp">
          <div>
            <div className="gallery__main">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img key={p.images[shot]} src={p.images[shot]} alt={shot === 0 ? p.alt : `${p.name}, photo ${shot + 1}`} width={600} height={800} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} />
              </AnimatePresence>
            </div>
            <div className="gallery__thumbs" role="group" aria-label="Photos">
              {p.images.map((src, n) => (
                <button key={src} aria-pressed={n === shot} aria-label={`Show photo ${n + 1}`} onClick={() => setShot(n)}>
                  <img src={src} alt="" width={150} height={150} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <div className="pdp__info">
            <span className="script" style={{ fontSize: 44, lineHeight: 1, color: p.bandInk ? `color-mix(in srgb, ${p.band} 70%, #231a15)` : p.band }}>
              {p.line}
            </span>
            <h1 className="sign sign-l">{p.family === "rough-cuts" ? `${p.cacao}% ${p.short.replace(/^\d+%\s*/, "")}` : p.name}</h1>
            <p className="lede">{p.description}</p>
            <div className="row" style={{ gap: 14 }}>
              <span className="price" style={{ fontSize: 32 }}>{moneyShort(p.price)}</span>
              <span className="ticket-t muted">{p.weight}</span>
              <span className="flavor" style={{ "--c": p.band } as CSSProperties}>
                {p.tagline}
              </span>
            </div>
            <div className="row">
              <div className="qty">
                <button aria-label="One fewer" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <output aria-live="polite">{qty}</output>
                <button aria-label="One more" onClick={() => setQty((q) => Math.min(24, q + 1))}>+</button>
              </div>
              <button
                className="btn btn--primary"
                onClick={() => {
                  add(p.handle, qty);
                  toast(`Added ${qty} × ${p.short} to your bag`);
                  setOpen(true);
                }}
              >
                Add to Bag · {money(p.price * qty)}
              </button>
            </div>
            <div className="deal-hint">{dealHint}</div>
            <div className="ticket" style={{ display: "block" }}>
              <span className="ticket__head" style={{ marginBottom: 6 }}>
                <span>Cut sheet</span>
                <span>{p.handle.slice(0, 14).toUpperCase()}</span>
              </span>
              <table className="specs">
                <tbody>
                  {rows.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="stack" style={{ gap: 6 }}>
              <span className="label">Good for</span>
              <ul style={{ margin: 0, paddingLeft: "1.1em" }}>
                {p.uses.map((u) => <li key={u}>{u}</li>)}
              </ul>
            </div>
            {(p.ingredients || p.allergens) && (
              <details className="faq" style={{ borderTop: "1px solid var(--rule)" }}>
                <summary style={{ fontSize: 18 }}>Ingredients &amp; allergens</summary>
                <p>{p.ingredients}</p>
                {p.allergens && <p><b>{p.allergens}</b></p>}
              </details>
            )}
          </div>
        </div>
        <div className="stack" style={{ marginTop: 40, gap: 20 }}>
          <h2 className="sign sign-m">Goes well with</h2>
          <div className="grid">
            {related.map((r) => <ProductCard key={r.handle} p={r} />)}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
