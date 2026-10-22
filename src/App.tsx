import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { TabBar } from "./components/TabBar";
import { Footer, Header, TopBars } from "./components/Chrome";
import { byHandle } from "./data/catalog";
import { Board } from "./pages/Board";
import { Home } from "./pages/Home";
import { Faq, Gifting, Holiday, Story, Visit } from "./pages/Inner";
import { Reviews, RoughCuts, Truffles } from "./pages/Lines";
import { ProductPage } from "./pages/Product";
import { Shop } from "./pages/Shop";
import { Checkout } from "./pages/Checkout";
import { NearHub, NearTown } from "./pages/Near";
import { NotFound } from "./pages/NotFound";
import { townBySlug } from "./data/towns";
import { useRouter, toHash, type Route } from "./lib/router";
import { schemaFor } from "./lib/schema";

function View({ route }: { route: Route }) {
  switch (route.page) {
    case "home": return <Home />;
    case "shop": return <Shop filter={route.filter} />;
    case "product": return <ProductPage handle={route.handle} />;
    case "board": return <Board />;
    case "holiday": return <Holiday />;
    case "gifting": return <Gifting />;
    case "roughcuts": return <RoughCuts />;
    case "truffles": return <Truffles />;
    case "reviews": return <Reviews />;
    case "visit": return <Visit />;
    case "story": return <Story />;
    case "faq": return <Faq />;
    case "checkout": return <Checkout />;
    case "near": return route.town ? <NearTown slug={route.town} /> : <NearHub />;
    case "notfound": return <NotFound />;
  }
}

const TITLES: Record<Route["page"], string> = {
  home: "The Chocolate Butcher · Rough-cut chocolate, Williston VT",
  shop: "Shop the Cuts · The Chocolate Butcher",
  product: "The Chocolate Butcher",
  board: "Chocolate Snack Boards · The Chocolate Butcher",
  holiday: "Holiday Chocolate & Stocking Stuffers · The Chocolate Butcher",
  gifting: "Corporate & Client Chocolate Gifts · The Chocolate Butcher",
  roughcuts: "Rough Cuts: Rough-Chopped Belgian Chocolate · The Chocolate Butcher",
  truffles: "Chef-Grade Chocolate Truffles · The Chocolate Butcher",
  reviews: "Reviews & Press · The Chocolate Butcher",
  visit: "Visit the Chop Shop · The Chocolate Butcher",
  story: "Jeff's Story · The Chocolate Butcher",
  faq: "FAQ · The Chocolate Butcher",
  checkout: "Checkout · The Chocolate Butcher",
  near: "Chocolate near you · The Chocolate Butcher, Williston VT",
  notfound: "Page not found · The Chocolate Butcher",
};

export function App() {
  const { route } = useRouter();

  // Keep the JSON-LD in step with the view so answer engines see the right entities.
  useEffect(() => {
    const p = route.page === "product" ? byHandle[route.handle] : undefined;
    let el = document.getElementById("cb-schema") as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "cb-schema";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schemaFor(route, p));
    const town = route.page === "near" && route.town ? townBySlug[route.town] : undefined;
    document.title = p ? `${p.name} · The Chocolate Butcher` : town ? `Chocolate shop near ${town.name} · The Chocolate Butcher` : TITLES[route.page];
  }, [route]);

  return (
    <>
      <TopBars />
      <Header />
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={toHash(route)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
            <View route={route} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <TabBar />
      <CartDrawer />
    </>
  );
}
