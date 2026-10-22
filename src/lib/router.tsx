import { createContext, useCallback, useContext, useEffect, useState, type ReactNode, type MouseEvent } from "react";

// A tiny hash router. Routes are plain tokens ("shop", "cut-dark-mint-truffles") so a shared
// link like …#truffles opens straight onto that view.
export type Route =
  | { page: "home" }
  | { page: "shop"; filter?: string }
  | { page: "product"; handle: string }
  | { page: "board" }
  | { page: "visit" }
  | { page: "story" }
  | { page: "faq" }
  | { page: "roughcuts" }
  | { page: "truffles" }
  | { page: "holiday" }
  | { page: "gifting" }
  | { page: "reviews" }
  | { page: "checkout" }
  | { page: "near"; town?: string }
  | { page: "notfound" };

export function parse(hash: string): Route {
  const t = hash.replace(/^#/, "");
  if (!t || t === "home") return { page: "home" };
  if (t === "near-you") return { page: "near" };
  if (t.startsWith("near-")) return { page: "near", town: t.slice(5) };
  if (t.startsWith("cut-")) return { page: "product", handle: t.slice(4) };
  if (t === "shop") return { page: "shop" };
  if (t.startsWith("shop-")) return { page: "shop", filter: t.slice(5) };
  if (t === "chop-shop") return { page: "shop", filter: "chop-shop" };
  if (t === "rough-cuts") return { page: "roughcuts" };
  if (t === "gifts") return { page: "holiday" };
  if (["board", "visit", "story", "faq", "checkout", "truffles", "holiday", "gifting", "reviews"].includes(t)) return { page: t as "board" };
  return { page: "notfound" };
}

export function toHash(r: Route): string {
  switch (r.page) {
    case "home":
      return "#home";
    case "shop":
      return r.filter ? `#shop-${r.filter}` : "#shop";
    case "roughcuts":
      return "#rough-cuts";
    case "product":
      return `#cut-${r.handle}`;
    case "near":
      return r.town ? `#near-${r.town}` : "#near-you";
    default:
      return `#${r.page}`;
  }
}

const Ctx = createContext<{ route: Route; go: (r: Route) => void } | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parse(location.hash));

  useEffect(() => {
    const onPop = () => location.hash !== "#main" && setRoute(parse(location.hash));
    addEventListener("popstate", onPop);
    addEventListener("hashchange", onPop);
    return () => {
      removeEventListener("popstate", onPop);
      removeEventListener("hashchange", onPop);
    };
  }, []);

  const go = useCallback((r: Route) => {
    try {
      history.pushState(null, "", toHash(r));
    } catch {
      /* some embeds refuse history writes; in-page state still moves */
    }
    setRoute(r);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: 0, behavior: reduce ? "auto" : ("instant" as ScrollBehavior) });
  }, []);

  return <Ctx.Provider value={{ route, go }}>{children}</Ctx.Provider>;
}

export function useRouter() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRouter outside RouterProvider");
  return c;
}

/** A real <a href> so middle-click and copy-link work, with in-page navigation on click. */
export function Link({ to, className, children, ...rest }: { to: Route; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { go } = useRouter();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(to);
  };
  return (
    <a href={toHash(to)} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
