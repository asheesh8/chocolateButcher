import { DEALS, SHOP } from "../data/catalog";
import { FAQ } from "../data/faq";

export function FaqList({ items = FAQ, openFirst = true }: { items?: [string, string][]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map(([q, a], n) => (
        <details key={q} open={openFirst && n === 0}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function DealSheet({ title = "Mix & Match" }: { title?: string }) {
  return (
    <div className="cutsheet">
      <h3>{title}</h3>
      <ul>
        {DEALS.map((d) => (
          <li key={d.id}>
            <span className="n">
              {d.label}
              <small>{d.chop && d.truffle ? "Any cut with any truffle bag" : d.chop ? "Any Rough Cuts or Chop Shop bags" : "Any flavor, mix them up"}</small>
            </span>
            <span className="dots" />
            <span className="p">${d.price}</span>
          </li>
        ))}
      </ul>
      <span style={{ fontSize: 14 }}>Your bag works out the best combination on its own.</span>
    </div>
  );
}

export function VisitInfo() {
  return (
    <>
      <span className="label">The Chop Shop</span>
      <span className="addr" translate="no">
        {SHOP.street}
        <br />
        {SHOP.city}, {SHOP.region} {SHOP.zip}
      </span>
      <span className="muted">Taft Corners, at Route 2A and Marshall Avenue, in the building with Casa Grande.</span>
      <div className="hours" aria-label="Hours">
        {SHOP.hours.map(([d, h]) => (
          <span key={d} style={{ display: "contents" }}>
            <span>{d}</span>
            <span className={h === "Closed" ? "muted" : undefined}>{h}</span>
          </span>
        ))}
      </div>
      <span className="ticket-t" style={{ fontWeight: 700, fontSize: 18, userSelect: "all" }}>
        {SHOP.phone}
      </span>
      <span className="muted" style={{ fontSize: 15 }}>
        Samples every visit. Ask Jeff for the tour of the counter.
      </span>
    </>
  );
}
