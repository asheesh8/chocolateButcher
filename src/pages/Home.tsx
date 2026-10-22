import { moneyShort } from "../lib/pricing";
import { PRESS, REVIEWS } from "../data/reviews";
import { useEffect, useState } from "react";
import { Wash } from "../components/Art";
import { ART } from "../data/art";
import { Seasons } from "../components/Seasons";
import { MapleRating } from "../components/Maple";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SHOP, byHandle } from "../data/catalog";
import { Link, type Route } from "../lib/router";

const ease = [0.2, 0.8, 0.2, 1] as const;

function ChopHeadline() {
  const still = useReducedMotion();
  const t = (d: number) => (still ? { duration: 0 } : { delay: d, duration: 0.5, ease });
  return (
    <h1 className="sign sign-xl chophead" aria-label="Chocolate, cut to order. Rough Cuts.">
      <motion.span className="w" initial={still ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={t(0.05)} aria-hidden="true">
        Chocolate,
      </motion.span>
      <motion.span className="w" initial={still ? false : { y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={t(0.18)} aria-hidden="true">
        <span className="cut" style={{ color: "var(--cleaver)" }}>
          <span className="piece piece--a">Cut</span>
          <motion.span className="piece piece--b" initial={still ? false : { x: 0, y: 0 }} animate={{ x: 6, y: 5, rotate: 1.5 }} transition={still ? { duration: 0 } : { delay: 0.95, type: "spring", stiffness: 260, damping: 14 }}>
            Cut
          </motion.span>
          <motion.span className="slash" style={{ rotate: -14 }} initial={still ? false : { scaleX: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }} transition={still ? { duration: 0 } : { delay: 0.7, duration: 0.7, times: [0, 0.35, 1] }} />
        </span>{" "}
        to order.
      </motion.span>
      <motion.span className="script chophead__script" initial={still ? false : { opacity: 0, rotate: -14, scale: 0.8 }} animate={{ opacity: 1, rotate: -8, scale: 1 }} transition={still ? { duration: 0 } : { delay: 1.15, type: "spring", stiffness: 200, damping: 12 }} aria-hidden="true">
        Rough Cuts
      </motion.span>
    </h1>
  );
}

function Counter() {
  const still = useReducedMotion();
  const fan = [
    { h: "milk-chocolate-roughly-chopped", rot: -8, x: "0%", z: 1, d: 0.5 },
    { h: "roughly-chopped-34-milk-chocolate", rot: -4, x: "16%", z: 2, d: 0.35 },
    { h: "belgian-54-dark-chocolate", rot: 0, x: "32%", z: 5, d: 0.2 },
    { h: "belgian-chocolate-roughly-chopped-70-extra-dark-chocolate", rot: 4, x: "47%", z: 3, d: 0.35 },
    { h: "semisweet-dark-chocolate-roughly-chopped", rot: 8, x: "62%", z: 1, d: 0.5 },
  ];
  return (
    <div className="hero__counter">
      {fan.map(({ h, rot, x, z, d }, i) => {
        const p = byHandle[h];
        return (
          <motion.div
            key={h}
            className="bag"
            style={{ left: x, zIndex: z }}
            initial={still ? false : { y: 300, rotate: 0, opacity: 0 }}
            animate={{ y: 0, rotate: rot, opacity: 1 }}
            whileHover={still ? undefined : { y: -26, rotate: rot * 0.4, scale: 1.06 }}
            whileTap={still ? undefined : { scale: 0.97 }}
            transition={still ? { duration: 0 } : { delay: d, type: "spring", stiffness: 150, damping: 15 }}
          >
            <Link className="bag__link" to={{ page: "product", handle: p.handle }} aria-label={`${p.name}, ${moneyShort(p.price)}`} style={{ animationDelay: `${-i * 0.9}s` }}>
              <img src={p.cut} alt={p.alt} width={600} height={800} fetchPriority={z === 5 ? "high" : "auto"} />
              <span className="bag__tag" aria-hidden="true">{p.short} · {moneyShort(p.price)}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

const DOORS: { to: Route; title: string; line: string; img: string; alt: string; cut?: boolean }[] = [
  { to: { page: "roughcuts" }, title: "Rough Cuts", line: "34, 54 or 70% Belgian, chopped into 7 oz bags.", img: "img/cut/belgian-54-dark-chocolate-1.webp", alt: "Rough Cuts 54% dark bag", cut: true },
  { to: { page: "truffles" }, title: "Truffles", line: "Twenty chef-grade truffles a bag. No gold box.", img: "img/dark-mint-truffles-4.webp", alt: "A dark mint truffle cut open to show the ganache" },
  { to: { page: "board" }, title: "Snack Boards", line: "Tell us the guest count. We do the chocolate math.", img: "img/site-charcuterieboard.webp", alt: "Chocolate charcuterie board with nuts and cranberries" },
  { to: { page: "holiday" }, title: "Holiday", line: "Order by Dec 17 for Christmas. Stocking stuffers under $20.", img: "img/site-img-7746.webp", alt: "Holiday market table with Chocolate Butcher bags" },
  { to: { page: "gifting" }, title: "Gifting", line: "Office and client gifts, one invoice, handled by Jeff.", img: "img/site-img-9035.webp", alt: "Three trays of chopped chocolate with pretzels and cashews" },
  { to: { page: "reviews" }, title: "Reviews & Press", line: "5.0 on Google. Every review answered by Jeff.", img: "img/site-jeffcb-headshot.webp", alt: "Jeff Mannion, founder" },
];

function QuoteTicker() {
  const [i, setI] = useState(0);
  const still = useReducedMotion();
  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setI((n) => (n + 1) % 6), 5000);
    return () => clearInterval(t);
  }, [still]);
  const r = REVIEWS[[2, 3, 4, 6, 8, 7][i]];
  return (
    <figure className="quote">
      <span className="review__stars" aria-label="5 out of 5 stars">★★★★★</span>
      <AnimatePresence mode="wait">
        <motion.blockquote key={r.author} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          “{r.text}” <cite>— {r.author}</cite>
        </motion.blockquote>
      </AnimatePresence>
    </figure>
  );
}

export function Home() {
  return (
    <>
      <section className="hero gut">
        <Wash src={ART.hero} />
        <div className="wrap">
          <div className="hero__copy">
            <span className="label">Rough-cut Belgian chocolate · Chopped in Williston, Vermont</span>
            <ChopHeadline />
            <p className="lede">
              We chop chocolate the way your neighborhood butcher would. Simple, a bit rough around the edges, uncompromising on quality. Big pieces and small, made for snacking, sharing and the board.
            </p>
            <div className="row" style={{ gap: 16 }}>
              <Link className="btn btn--primary" to={{ page: "shop" }}>Shop the Chop</Link>
              <Link className="btn" to={{ page: "visit" }}>Find the Shop</Link>
            </div>
            <div className="hero__stats">
              <span>Rough Cuts from <b>$14.50</b> · mix 4 for $48</span>
              <span>Chop Shop open <b>Wed–Sun, 12–7</b></span>
            </div>
          </div>
          <div className="hero__side">
            <MapleRating className="maple--hero" />
            <Counter />
          </div>
        </div>
      </section>

      <section className="band gut band--tight" aria-labelledby="doors-h">
        <div className="wrap stack" style={{ gap: 22 }}>
          <div className="row" style={{ justifyContent: "space-between", alignItems: "end" }}>
            <h2 id="doors-h" className="sign sign-l">Pick your counter.</h2>
            <Link className="link" to={{ page: "shop" }}>Or see everything</Link>
          </div>
          <div className="doors">
            {DOORS.map((d) => (
              <Link key={d.title} className={`door${d.cut ? " door--cut" : ""}`} to={d.to}>
                <span className="door__img"><img src={d.img} alt={d.alt} loading="lazy" /></span>
                <span className="door__body">
                  <b>{d.title}</b>
                  <span>{d.line}</span>
                  <i aria-hidden="true">→</i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--kraft gut band--tight" aria-labelledby="visit-h">
        <div className="wrap home-close">
          <div className="stack" style={{ gap: 16 }}>
            <span className="label">Williston, Vermont · Taft Corners</span>
            <h2 id="visit-h" className="sign sign-l">Come taste before you buy.</h2>
            <QuoteTicker />
            <div className="press-mini">
              <span>As seen in</span>
              <a href={PRESS[0].url} target="_blank" rel="noopener noreferrer">Williston Observer ↗</a>
              <Link to={{ page: "reviews" }}>Good Trade BTV</Link>
              <Link to={{ page: "reviews" }}>Hula</Link>
            </div>
            <div className="hours-mini ticket-t">{SHOP.street}, Williston · Wed–Sun 12–7 · {SHOP.phone}</div>
            <div className="row" style={{ gap: 14 }}>
              <Link className="btn btn--primary" to={{ page: "visit" }}>Plan a Visit</Link>
              <Link className="btn" to={{ page: "near" }}>Near You</Link>
            </div>
          </div>
          <Seasons />
        </div>
      </section>
    </>
  );
}
