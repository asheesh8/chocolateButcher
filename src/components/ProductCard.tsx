import type { CSSProperties } from "react";
import type { Product } from "../data/catalog";
import { useCart } from "../lib/cart";
import { moneyShort } from "../lib/pricing";
import { Link } from "../lib/router";
import { useToast } from "../lib/toast";

export function ProductCard({ p, eager = false }: { p: Product; eager?: boolean }) {
  const { add } = useCart();
  const toast = useToast();
  return (
    <article className="card" style={{ "--c": p.band } as CSSProperties}>
      <Link to={{ page: "product", handle: p.handle }} className="card__img" aria-label={p.name}>
        <img src={p.cut} alt={p.alt} width={600} height={800} loading={eager ? "eager" : "lazy"} />
      </Link>
      <span className="card__line">{p.line}</span>
      <h3 className="card__name">
        <Link to={{ page: "product", handle: p.handle }} style={{ textDecoration: "none" }}>
          {p.cacao ? `${p.cacao}% ${p.short.replace(/^\d+%\s*/, "")}` : p.short}
        </Link>
      </h3>
      <span className="card__meta">
        {p.count ? `${p.count} · ` : ""}
        {p.weight}
      </span>
      <div className="card__foot">
        <span className="price">{moneyShort(p.price)}</span>
        <button
          className="btn btn--sm btn--add"
          onClick={() => {
            add(p.handle);
            toast(`Added ${p.short} to your bag`);
          }}
        >
          <span className="btn__t">Add to Bag</span>
          <span className="btn__i" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path className="plus" d="M12 11.5v5M9.5 14h5" /></svg></span>
        </button>
      </div>
    </article>
  );
}
