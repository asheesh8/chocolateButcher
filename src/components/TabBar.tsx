import { motion } from "framer-motion";
import { useCart } from "../lib/cart";
import { Link, useRouter, type Route } from "../lib/router";

const I = {
  home: "M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  shop: "M4 7h16l-1.5 12.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5zM9 7V5a3 3 0 0 1 6 0v2",
  gift: "M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3-5 0M12 7c1.5-3 5-3 5 0",
  visit: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  bag: "M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0",
};
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const TABS: [string, Route, string, Route["page"][]][] = [
  ["Home", { page: "home" }, I.home, ["home"]],
  ["Shop", { page: "shop" }, I.shop, ["shop", "roughcuts", "truffles", "product", "board"]],
  ["Gifts", { page: "holiday" }, I.gift, ["holiday", "gifting"]],
  ["Visit", { page: "visit" }, I.visit, ["visit", "near", "story", "reviews", "faq"]],
];

/** Phone-only bottom tab bar, the way a shop app works. */
export function TabBar() {
  const { route } = useRouter();
  const { count, setOpen } = useCart();
  return (
    <nav className="tabbar" aria-label="Quick">
      {TABS.map(([label, to, d, pages]) => {
        const on = pages.includes(route.page);
        return (
          <Link key={label} to={to} className="tab" aria-current={on ? "page" : undefined}>
            {on && <motion.i className="tab__pill" layoutId="tab-pill" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <motion.span className="tab__icon" whileTap={{ scale: 0.82, y: 2 }} animate={on ? { y: -2, scale: 1.12 } : { y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
              <Icon d={d} />
            </motion.span>
            <span>{label}</span>
          </Link>
        );
      })}
      <button className="tab" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
        <span className="tab__bag"><Icon d={I.bag} />{count > 0 && <i>{count}</i>}</span>
        <span>Bag</span>
      </button>
    </nav>
  );
}
