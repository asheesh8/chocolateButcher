import { useState, type CSSProperties } from "react";
import { PRODUCTS } from "../data/catalog";
import { useCart } from "../lib/cart";
import { moneyShort } from "../lib/pricing";
import { useToast } from "../lib/toast";

// Each card shows the bag; hover, focus or tap slices it open at 45° to show the ganache.
export function TruffleCounter() {
  const truffles = PRODUCTS.filter((p) => p.family === "truffles");
  const [open, setOpen] = useState<string | null>(null);
  const { add } = useCart();
  const toast = useToast();

  return (
    <div className="truffles">
      {truffles.map((p) => {
        const revealed = open === p.handle;
        return (
          <article key={p.handle} className={`truffle${revealed ? " reveal" : ""}`} style={{ "--c": p.band } as CSSProperties}>
            <div className="truffle__band" />
            <div className="truffle__img">
              <img src={p.cut} alt={p.alt} width={600} height={600} loading="lazy" />
              <img className="inside" src={p.images[3]} alt={`Cut-open ${p.short} truffle showing the ganache center`} width={600} height={600} loading="lazy" />
              <button className="sticker peek" aria-pressed={revealed} onClick={() => setOpen(revealed ? null : p.handle)}>
                {revealed ? "Back to the bag" : "See inside"}
              </button>
            </div>
            <div className="truffle__body">
              <span className={`script${p.bandInk ? " dk" : ""}`}>{p.line}</span>
              <p>{p.tagline}.</p>
              <span className="pairing">
                {p.count} · {p.weight}
                {p.pairings ? <><br />Pours well with {p.pairings.join(", ")}</> : null}
              </span>
              <div className="row" style={{ justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
                <span className="price">{moneyShort(p.price)}</span>
                <button
                  className="btn btn--sm btn--add"
                  onClick={() => {
                    add(p.handle);
                    toast(`Added ${p.short} Truffles to your bag`);
                  }}
                >
                  <span className="btn__t">Add to Bag</span>
                  <span className="btn__i" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path className="plus" d="M12 11.5v5M9.5 14h5" /></svg></span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
