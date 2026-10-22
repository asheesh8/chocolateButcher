import { useState, type FormEvent } from "react";
import { SHOP, byHandle } from "../data/catalog";
import { useCart } from "../lib/cart";
import { money, priceBag, type Lines } from "../lib/pricing";
import { Link } from "../lib/router";
import { Head } from "./Inner";

type Errors = Partial<Record<string, string>>;

function Summary({ lines, method }: { lines: Lines; method: string }) {
  const priced = priceBag(lines);
  const free = method === "pickup" || priced.total >= SHOP.freeShipping;
  return (
    <div className="receipt" aria-label="Order summary">
      {Object.entries(lines).map(([h, q]) => (
        <div className="r" key={h}>
          <span>{q} × {byHandle[h].short}</span>
          <span>{money(byHandle[h].price * q)}</span>
        </div>
      ))}
      <hr />
      {priced.applied.map((a) => (
        <div className="r save" key={a.label}><span>{a.label} deal{a.times > 1 ? ` ×${a.times}` : ""}</span><span>✓</span></div>
      ))}
      {priced.savings > 0 && <div className="r save"><span>You save</span><span>−{money(priced.savings)}</span></div>}
      <div className="r"><span>{method === "pickup" ? "Pickup at the Chop Shop" : "2-day shipping"}</span><span>{free ? "Free" : "Added at payment"}</span></div>
      <div className="r tot"><span>Total</span><span>{money(priced.total)}</span></div>
    </div>
  );
}

export function Checkout() {
  const { lines, count, clear } = useCart();
  const [method, setMethod] = useState("ship");
  const [errs, setErrs] = useState<Errors>({});
  const [done, setDone] = useState<{ id: string; lines: Lines; method: string; email: string } | null>(null);

  if (done) {
    return (
      <section className="band gut">
        <div className="wrap confirm" style={{ maxWidth: 720 }}>
          <span className="script confirm__thanks">Thank you!</span>
          <h1 className="sign sign-l">Order <span style={{ whiteSpace: "nowrap" }}>{done.id}</span> is in.</h1>
          <p className="lede">
            {done.method === "pickup"
              ? "We'll have it bagged at the Chop Shop. Come by Wednesday to Sunday, 12 to 7."
              : "Jeff will pack it this week and send it 2-day. A confirmation is on its way to "}
            {done.method !== "pickup" && <b>{done.email}</b>}
          </p>
          <div style={{ width: "100%", textAlign: "left" }}><Summary lines={done.lines} method={done.method} /></div>
          <p className="muted" style={{ fontSize: 14 }}>Preview store: no card was charged.</p>
          <Link className="btn btn--primary" to={{ page: "home" }}>Back to the Shop</Link>
        </div>
      </section>
    );
  }

  if (count === 0) {
    return (
      <>
        <Head crumb="Checkout" title="Your bag is empty." />
        <section className="band gut">
          <div className="wrap empty">
            <p className="lede">Most people start with a bag of 54% Rough Cuts. Mix any four bags for $48.</p>
            <Link className="btn btn--primary" to={{ page: "shop" }}>Shop the Chop</Link>
          </div>
        </section>
      </>
    );
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = "Enter an email so we can send your receipt.";
    if (!v("name")) next.name = "Who's it for?";
    if (method === "ship") {
      if (!v("street")) next.street = "Add a street address.";
      if (!v("city")) next.city = "Add a town or city.";
      if (!/^\d{5}(-\d{4})?$/.test(v("zip"))) next.zip = "Use a 5-digit ZIP.";
    }
    if (v("card").replace(/\s/g, "").length < 15) next.card = "Check the card number.";
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(v("exp"))) next.exp = "Use MM/YY.";
    if (!/^\d{3,4}$/.test(v("cvc"))) next.cvc = "3 or 4 digits.";
    setErrs(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setDone({ id: `CB-${Math.floor(1000 + Math.random() * 9000)}`, lines: { ...lines }, method, email: v("email") });
    clear();
    scrollTo({ top: 0 });
  };

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, full = false) => (
    <label className={full ? "full" : undefined}>
      {label}
      <input name={name} aria-invalid={!!errs[name]} aria-describedby={errs[name] ? `${name}-err` : undefined} {...props} />
      {errs[name] && <span className="err" id={`${name}-err`}>{errs[name]}</span>}
    </label>
  );

  return (
    <>
      <Head crumb="Checkout" title="Checkout" />
      <section className="band gut" style={{ paddingTop: 36 }}>
        <form className="wrap checkout" onSubmit={submit} noValidate>
          <div>
            <fieldset>
              <legend>Contact</legend>
              {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
              {field("name", "Full name", { autoComplete: "name" })}
            </fieldset>
            <fieldset>
              <legend>Getting it</legend>
              <div className="radios" role="radiogroup" aria-label="Delivery">
                <label className="radio">
                  <input type="radio" name="method" value="ship" checked={method === "ship"} onChange={() => setMethod("ship")} />
                  <span><b>Ship it 2-day</b>Free over ${SHOP.freeShipping}. Insulated &amp; iced in warmer months.</span>
                </label>
                <label className="radio">
                  <input type="radio" name="method" value="pickup" checked={method === "pickup"} onChange={() => setMethod("pickup")} />
                  <span><b>Pick up at the Chop Shop</b>{SHOP.street}, Williston · Wed–Sun 12–7</span>
                  <span className="ticket-t">Free</span>
                </label>
              </div>
              {method === "ship" && (
                <>
                  {field("street", "Street address", { autoComplete: "street-address" }, true)}
                  {field("city", "Town / city", { autoComplete: "address-level2" })}
                  {field("zip", "ZIP", { autoComplete: "postal-code", inputMode: "numeric" })}
                </>
              )}
              <label className="full">
                Gift note (optional)
                <textarea name="note" rows={3} placeholder="Happy holidays from all of us…" />
              </label>
            </fieldset>
            <fieldset>
              <legend>Payment</legend>
              {field("card", "Card number", { autoComplete: "cc-number", inputMode: "numeric", placeholder: "1234 5678 9012 3456" }, true)}
              {field("exp", "Expiry", { autoComplete: "cc-exp", placeholder: "MM/YY" })}
              {field("cvc", "CVC", { autoComplete: "cc-csc", inputMode: "numeric" })}
            </fieldset>
          </div>
          <aside className="summary">
            <h2 className="sign sign-m">Your order</h2>
            <Summary lines={lines} method={method} />
            <button className="btn btn--primary btn--block" type="submit">Place Order</button>
            <p className="muted" style={{ fontSize: 14 }}>Questions? Call {SHOP.phone} or email {SHOP.email}.</p>
          </aside>
        </form>
      </section>
    </>
  );
}
