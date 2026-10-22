import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPE, type KeyboardEvent } from "react";
import { PRODUCTS } from "../data/catalog";
import { useCart } from "../lib/cart";
import { moneyShort } from "../lib/pricing";
import { Link } from "../lib/router";
import { useToast } from "../lib/toast";

// The "More sweet ← 34% · 54% · 70% → Less sweet" scale printed on the back of every
// Rough Cuts bag, turned into the thing you shop with.
const CUTS = PRODUCTS.filter((p) => p.family === "rough-cuts").sort((a, b) => (a.sweetness ?? 0) - (b.sweetness ?? 0));

export function SweetnessScale() {
  const [i, setI] = useState(1);
  const railRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5); // 0..1 along the rail
  const [dragging, setDragging] = useState(false);
  const { add } = useCart();
  const toast = useToast();
  const p = CUTS[i];

  useEffect(() => {
    if (dragging) return;
    const ctl = animate(x, CUTS[i].sweetness ?? 0, { type: "spring", stiffness: 420, damping: 34 });
    return () => ctl.stop();
  }, [i, dragging, x]);

  const fromPointer = (clientX: number) => {
    const r = railRef.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };
  const nearest = (v: number) => (v < 0.25 ? 0 : v < 0.75 ? 1 : 2);

  const onDown = (e: RPE) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragging(true);
    const v = fromPointer(e.clientX);
    x.set(v);
    setI(nearest(v));
  };
  const onMove = (e: RPE) => {
    if (!dragging) return;
    const v = fromPointer(e.clientX);
    x.set(v);
    setI(nearest(v));
  };
  const onUp = () => setDragging(false);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") setI((n) => Math.min(2, n + 1));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") setI((n) => Math.max(0, n - 1));
    else if (e.key === "Home") setI(0);
    else if (e.key === "End") setI(2);
    else return;
    e.preventDefault();
  };

  const left = (v: number) => `${v * 100}%`;
  const [thumbLeft, setThumbLeft] = useState("50%");
  useEffect(() => x.on("change", (v) => setThumbLeft(left(v))), [x]);

  return (
    <section className="scale band gut" style={{ backgroundColor: `color-mix(in srgb, ${p.band} 9%, #fffdf9)` } as CSSProperties} aria-labelledby="scale-h">
      <div className="wrap">
        <div className="scale__photo">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={p.handle}
              src={p.cut}
              alt={p.alt}
              width={600}
              height={800}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -20, rotate: 2 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className="scale__panel">
          <span className="label" style={{ color: p.band }}>
            The sweetness scale, from the back of the bag
          </span>
          <h2 id="scale-h" className="sign sign-l">
            Pick your cut.
          </h2>
          <p className="lede">Three Belgian Rough Cuts, one scale. Slide toward sweet or toward dark, and the bag comes off the shelf.</p>

          <div className="track">
            <div className="track__ends" aria-hidden="true">
              <span>← More sweet</span>
              <span>Less sweet →</span>
            </div>
            <div ref={railRef} className="track__rail" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
              {CUTS.map((c) => (
                <span key={c.handle} className="track__stop" style={{ left: left(c.sweetness ?? 0) }} aria-hidden="true" />
              ))}
              <div
                className="track__thumb"
                role="slider"
                tabIndex={0}
                aria-label="Cacao percentage"
                aria-valuemin={34}
                aria-valuemax={70}
                aria-valuenow={p.cacao}
                aria-valuetext={`${p.cacao}%, ${p.tagline}`}
                onKeyDown={onKey}
                style={{ left: thumbLeft, color: p.band }}
              >
                {p.cacao}%
              </div>
            </div>
            <div className="track__labels">
              {CUTS.map((c, n) => (
                <button key={c.handle} aria-pressed={n === i} onClick={() => setI(n)} style={{ left: left(c.sweetness ?? 0) }}>
                  {c.short}
                  <span>{c.tagline}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="row" style={{ gap: 16, alignItems: "baseline" }}>
            <span className="script" style={{ fontSize: 40, lineHeight: 1, color: p.band }}>
              Rough Cuts
            </span>
            <span className="sign sign-m">{p.short}</span>
          </div>
          <div className="uses">
            {p.uses.map((u) => {
              const [h, rest] = u.split(": ");
              return (
                <div key={h}>
                  <b>{h}</b>
                  {rest}
                </div>
              );
            })}
          </div>
          <div className="row" style={{ gap: 18 }}>
            <span className="price" style={{ fontSize: 28 }}>
              {moneyShort(p.price)}
            </span>
            <span className="ticket-t muted">{p.weight}</span>
            <button
              className="btn btn--primary"
              onClick={() => {
                add(p.handle);
                toast(`Added ${p.short} Rough Cuts to your bag`);
              }}
            >
              Add {p.cacao}% to Bag
            </button>
            <Link className="link" to={{ page: "product", handle: p.handle }}>
              Cut sheet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
