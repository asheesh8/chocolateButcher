import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { DockItem, useDock } from "./Dock";
import { useEffect, useState } from "react";
import { SHOP } from "../data/catalog";
import { TOWNS } from "../data/towns";
import { ART } from "../data/art";
import { Wash } from "./Art";
import { useCart } from "../lib/cart";
import { Link, useRouter, type Route } from "../lib/router";

export function daysUntil(d: Date) {
  return Math.max(0, Math.ceil((d.getTime() - Date.now()) / 864e5));
}
const dateFmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

export function Ticker() {
  const days = daysUntil(SHOP.christmasCutoff);
  const items = [
    "Chopped in Williston, VT",
    "Ships to greater Boston",
    `Free 2-day over $${SHOP.freeShipping}`,
    days > 0 ? `Christmas: order by ${dateFmt.format(SHOP.christmasCutoff)}` : "Open Wed–Sun 12–7",
    "Samples every visit",
  ];
  const run = items.map((t) => (
    <span key={t}>
      {t}
      <i aria-hidden="true">•</i>
    </span>
  ));
  return (
    <div className="ticker" role="marquee" aria-label={items.join(". ")}>
      <div className="ticker__track" aria-hidden="true">
        <div>{run}</div>
        <div>{run}</div>
      </div>
    </div>
  );
}

export function TopBars() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Ticker />
    </>
  );
}

const NAV: [string, Route][] = [
  ["Rough Cuts", { page: "roughcuts" }],
  ["Truffles", { page: "truffles" }],
  ["Snack Boards", { page: "board" }],
  ["Holiday", { page: "holiday" }],
  ["Gifting", { page: "gifting" }],
  ["Reviews", { page: "reviews" }],
  ["Visit", { page: "visit" }],
  ["Our Story", { page: "story" }],
];

function isCurrent(cur: Route, r: Route) {
  if (cur.page !== r.page) return false;
  if (cur.page === "shop" && r.page === "shop") return (cur.filter ?? "") === (r.filter ?? "");
  return true;
}

export function Header() {
  const { route } = useRouter();
  const { count, setOpen, pulse } = useCart();
  const [menu, setMenu] = useState(false);
  const bump = useAnimationControls();
  const dock = useDock();
  const still = useReducedMotion();

  useEffect(() => {
    if (pulse) bump.start({ scale: [1, 1.18, 1], transition: { duration: 0.32 } });
  }, [pulse, bump]);
  useEffect(() => setMenu(false), [route]);

  return (
    <header className="nav gut">
      <div className="wrap">
        <Link to={{ page: "home" }} className="logo" aria-label="The Chocolate Butcher, home">
          <img src="img/logo.png" alt="The Chocolate Butcher Chop Shop" width={548} height={318} />
        </Link>
        <button className="bagbtn menubtn" aria-expanded={menu} aria-controls="links" onClick={() => setMenu((m) => !m)}>
          Menu
        </button>
        <nav className={`links dock${menu ? " open" : ""}`} id="links" aria-label="Main" {...(still ? {} : dock.bind)}>
          {NAV.map(([label, r]) => (
            <DockItem key={label} mouseX={dock.mouseX}>
              <Link to={r} aria-current={isCurrent(route, r) ? "page" : undefined}>
                {label}
              </Link>
            </DockItem>
          ))}
        </nav>
        <motion.button className="bagbtn" animate={bump} onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
          Bag <i>{count}</i>
        </motion.button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot gut">
      <Wash src={ART.footer} />
      <div className="wrap">
        <div className="stack" style={{ gap: 14 }}>
          <img src="img/logo.png" alt="The Chocolate Butcher Chop Shop" width={240} height={139} style={{ width: 240, height: "auto" }} />
          <p className="muted" style={{ maxWidth: "36ch" }}>
            We chop chocolate, the way your neighborhood butcher would. Simple, a bit rough around the edges, with uncompromising quality.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to={{ page: "shop" }}>Shop everything</Link></li>
            <li><Link to={{ page: "roughcuts" }}>Rough Cuts</Link></li>
            <li><Link to={{ page: "shop", filter: "chop-shop" }}>Chop Shop bags</Link></li>
            <li><Link to={{ page: "truffles" }}>Truffles</Link></li>
            <li><Link to={{ page: "board" }}>Build a board</Link></li>
          </ul>
        </div>
        <div>
          <h4>More</h4>
          <ul>
            <li><Link to={{ page: "holiday" }}>Holiday 2026</Link></li>
            <li><Link to={{ page: "gifting" }}>Office &amp; client gifts</Link></li>
            <li><Link to={{ page: "reviews" }}>Reviews &amp; press</Link></li>
            <li><Link to={{ page: "story" }}>Our story</Link></li>
            <li><Link to={{ page: "near", town: "boston" }}>Shipping to Boston</Link></li>
            <li><Link to={{ page: "faq" }}>FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4>Chop Shop</h4>
          <ul>
            <li translate="no">{SHOP.street}</li>
            <li>{SHOP.city}, {SHOP.region} {SHOP.zip}</li>
            <li style={{ userSelect: "all" }}>{SHOP.phone}</li>
            <li style={{ userSelect: "all" }}>{SHOP.email}</li>
            <li>Wed–Sun, 12–7</li>
          </ul>
        </div>
        <div className="full-row">
          <h4>Near you</h4>
          <ul className="inline">
            {TOWNS.map((t) => <li key={t.slug}><Link to={{ page: "near", town: t.slug }}>{t.name}</Link></li>)}
          </ul>
        </div>
        <p className="fine">
          © 2026 The Chocolate Butcher® · Chopped by hand at 160 Boyer Circle and sold at the Chop Shop, 22 Merchants Row, Williston, Vermont.
        </p>
      </div>
    </footer>
  );
}
