import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PRODUCTS, byHandle } from "../data/catalog";
import { useCart } from "../lib/cart";
import { money, priceBag, type Lines } from "../lib/pricing";
import { Link } from "../lib/router";
import { useToast } from "../lib/toast";

const CHOPS = PRODUCTS.filter((p) => p.bundle === "chop");
const TRUFFLES = PRODUCTS.filter((p) => p.bundle === "truffle");
const PANTRY = ["Pretzels", "Salted cashews", "Almonds", "Dried cranberries", "Vermont cheddar", "Salami"];
const ozOf = (w: string) => parseFloat(w);

/** About 1 oz of chocolate and 2 truffles per guest: the serving sizes printed on the bags. */
export function planBoard(guests: number, cuts: string[], truffles: string[]): Lines {
  const lines: Lines = {};
  if (cuts.length) {
    let oz = guests;
    let n = 0;
    while (oz > 0) {
      const h = cuts[n % cuts.length];
      lines[h] = (lines[h] ?? 0) + 1;
      oz -= ozOf(byHandle[h].weight);
      n++;
    }
  }
  if (truffles.length) {
    const bags = Math.ceil((guests * 2) / 20);
    for (let n = 0; n < bags; n++) {
      const h = truffles[n % truffles.length];
      lines[h] = (lines[h] ?? 0) + 1;
    }
  }
  return lines;
}

function Picker({ items, picked, toggle, counts }: { items: typeof PRODUCTS; picked: string[]; toggle: (h: string) => void; counts: Lines }) {
  return (
    <div className="picker">
      {items.map((p) => {
        const on = picked.includes(p.handle);
        return (
          <button key={p.handle} className="pick" aria-pressed={on} onClick={() => toggle(p.handle)}>
            {on && counts[p.handle] ? <span className="n">×{counts[p.handle]}</span> : null}
            <img src={p.cut} alt="" width={300} height={400} loading="lazy" />
            <b>{p.short}</b>
            <span className="ticket-t muted" style={{ fontSize: 13 }}>{p.weight}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Board() {
  const [guests, setGuests] = useState(12);
  const [cuts, setCuts] = useState<string[]>(["belgian-54-dark-chocolate", "roughly-chopped-34-milk-chocolate"]);
  const [truffles, setTruffles] = useState<string[]>(["milk-chocolate-caramel-truffles"]);
  const [pantry, setPantry] = useState<string[]>(["Pretzels", "Salted cashews", "Dried cranberries"]);
  const { add, setOpen } = useCart();
  const toast = useToast();

  const lines = useMemo(() => planBoard(guests, cuts, truffles), [guests, cuts, truffles]);
  const priced = priceBag(lines);
  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (h: string) => set((xs) => (xs.includes(h) ? xs.filter((x) => x !== h) : [...xs, h]));
  const bags = Object.values(lines).reduce((s, n) => s + n, 0);

  return (
    <>
      <section className="pagehead gut">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link to={{ page: "home" }}>Home</Link> / <span>Build a Board</span></nav>
          <h1 className="sign sign-xl" style={{ fontSize: "clamp(56px, 9vw, 120px)" }}>Build a Board</h1>
          <p className="lede">Tell us how many people are coming. We'll work out how much chocolate to put out, using the serving sizes on our bags, and ring it up with the mix-and-match deals.</p>
        </div>
      </section>
      <section className="band gut" style={{ paddingTop: 36 }}>
        <div className="wrap builder">
          <div className="stack" style={{ gap: 30 }}>
            <div className="stack" style={{ gap: 10 }}>
              <label className="label" htmlFor="guests">How many guests?</label>
              <div className="guests">
                <output htmlFor="guests">{guests}</output>
                <input id="guests" type="range" min={4} max={40} value={guests} onChange={(e) => setGuests(+e.target.value)} />
              </div>
              <span className="muted" style={{ fontSize: 15 }}>About 1 oz of chocolate and 2 truffles per person.</span>
            </div>
            <div className="stack" style={{ gap: 10 }}>
              <span className="label">Pick your cuts</span>
              <Picker items={CHOPS} picked={cuts} toggle={toggle(setCuts)} counts={lines} />
            </div>
            <div className="stack" style={{ gap: 10 }}>
              <span className="label">Add truffles</span>
              <Picker items={TRUFFLES} picked={truffles} toggle={toggle(setTruffles)} counts={lines} />
            </div>
            <div className="stack" style={{ gap: 10 }}>
              <span className="label">From your pantry</span>
              <div className="chips">
                {PANTRY.map((x) => (
                  <button key={x} className="chip" aria-pressed={pantry.includes(x)} onClick={() => toggle(setPantry)(x)}>{x}</button>
                ))}
              </div>
            </div>
          </div>
          <aside className="plan" aria-label="Your board">
            <figure className="photo-chop" style={{ margin: 0, aspectRatio: "4 / 3" }}>
              <img src="img/site-charcuterieboard.webp" alt="A chocolate charcuterie board" width={1600} height={858} />
            </figure>
            <div className="receipt" aria-live="polite">
              <div className="r" style={{ fontWeight: 700, textTransform: "uppercase" }}><span>Board for {guests}</span><span>{bags} bags</span></div>
              <hr />
              {Object.entries(lines).map(([h, q]) => (
                <motion.div className="r" key={h} layout>
                  <span>{q} × {byHandle[h].short}</span>
                  <span>{money(byHandle[h].price * q)}</span>
                </motion.div>
              ))}
              {pantry.length > 0 && <div className="r muted"><span>+ {pantry.join(", ").toLowerCase()}</span></div>}
              {bags === 0 && <span className="muted">Pick at least one cut or truffle.</span>}
              <hr />
              {priced.applied.map((a) => (
                <div className="r save" key={a.label}><span>{a.label} deal{a.times > 1 ? ` ×${a.times}` : ""}</span><span>✓</span></div>
              ))}
              {priced.savings > 0 && <div className="r save"><span>You save</span><span>−{money(priced.savings)}</span></div>}
              <div className="r tot"><span>Total</span><span>{money(priced.total)}</span></div>
            </div>
            <button
              className="btn btn--primary btn--block"
              disabled={bags === 0}
              onClick={() => {
                Object.entries(lines).forEach(([h, q]) => add(h, q));
                toast(`Board for ${guests} added to your bag`);
                setOpen(true);
              }}
            >
              Add Board to Bag
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
