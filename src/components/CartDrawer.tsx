import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { SHOP, byHandle } from "../data/catalog";
import { useCart } from "../lib/cart";
import { money } from "../lib/pricing";
import { useRouter } from "../lib/router";

export function CartDrawer() {
  const { open, setOpen, lines, set, priced, count } = useCart();
  const { go } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const sheet = typeof matchMedia !== "undefined" && matchMedia("(max-width: 760px)").matches;
  const off = sheet ? { y: "100%" } : { x: "100%" };
  const on = sheet ? { y: 0 } : { x: 0 };
  const left = Math.max(0, SHOP.freeShipping - priced.total);
  const handles = Object.keys(lines);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} onClick={() => setOpen(false)} />
          <motion.aside className={`drawer${sheet ? " drawer--sheet" : ""}`} role="dialog" aria-modal="true" aria-label="Your bag" initial={off} animate={on} exit={off} drag={sheet ? "y" : false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }} onDragEnd={(_, i) => { if (i.offset.y > 120) setOpen(false); }} transition={{ type: "tween", ease: [0.2, 0.8, 0.2, 1], duration: 0.28 }}>
            {sheet && <span className="grabber" aria-hidden="true" />}
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h2 className="sign sign-m">Your Bag</h2>
              <button ref={closeRef} className="btn btn--sm" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <div className="stack" style={{ gap: 6 }}>
              <span style={{ fontSize: 15 }}>
                {count === 0 ? "Free 2-day shipping on orders over $50." : left > 0 ? <>Add <b>{money(left)}</b> for free 2-day shipping.</> : <b>Free 2-day shipping. Packed insulated, iced if it's warm.</b>}
              </span>
              <div className="meter" aria-hidden="true">
                <motion.i initial={false} animate={{ scaleX: Math.min(1, priced.total / SHOP.freeShipping) }} transition={{ duration: 0.3 }} />
              </div>
            </div>
            <div className="drawer__lines">
              {handles.length === 0 && (
                <div className="empty">
                  <p>Your bag is empty. Most people start with a bag of 54% Rough Cuts.</p>
                  <button className="btn btn--sm" onClick={() => { setOpen(false); go({ page: "product", handle: "belgian-54-dark-chocolate" }); }}>See the 54%</button>
                </div>
              )}
              <AnimatePresence initial={false}>
                {handles.map((h) => {
                  const p = byHandle[h];
                  const q = lines[h];
                  return (
                    <motion.div key={h} className="line" layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.16 }}>
                      <img src={p.cut} alt="" width={64} height={80} />
                      <div style={{ minWidth: 0 }}>
                        <b>{p.short}</b>
                        <span className="ticket-t muted" style={{ fontSize: 13 }}>
                          {p.weight}
                        </span>
                        <div className="mini-qty">
                          <button aria-label={`One less ${p.short}`} onClick={() => set(h, q - 1)}>
                            −
                          </button>
                          <span>{q}</span>
                          <button aria-label={`One more ${p.short}`} onClick={() => set(h, q + 1)}>
                            +
                          </button>
                        </div>
                      </div>
                      <span className="ticket-t" style={{ fontWeight: 700 }}>
                        {money(p.price * q)}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {count > 0 && (
              <div className="receipt" aria-label="Order summary">
                <div className="r">
                  <span>Items</span>
                  <span>{money(priced.list)}</span>
                </div>
                {priced.applied.map((a) => (
                  <div className="r save" key={a.label}>
                    <span>
                      {a.label} deal {a.times > 1 ? `×${a.times}` : ""}
                    </span>
                    <span>applied</span>
                  </div>
                ))}
                {priced.savings > 0 && (
                  <div className="r save">
                    <span>You save</span>
                    <span>−{money(priced.savings)}</span>
                  </div>
                )}
                <hr />
                <div className="r tot">
                  <span>Total</span>
                  <span>{money(priced.total)}</span>
                </div>
              </div>
            )}
            <button className="btn btn--primary btn--block" disabled={count === 0} onClick={() => {
                setOpen(false);
                go({ page: "checkout" });
              }}>
              Checkout
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
