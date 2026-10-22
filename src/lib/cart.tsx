import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { priceBag, type Lines, type Priced } from "./pricing";

type Action = { type: "add"; handle: string; qty: number } | { type: "set"; handle: string; qty: number } | { type: "clear" };

function reducer(state: Lines, a: Action): Lines {
  switch (a.type) {
    case "add":
      return { ...state, [a.handle]: Math.min(99, (state[a.handle] ?? 0) + a.qty) };
    case "set": {
      const next = { ...state };
      if (a.qty <= 0) delete next[a.handle];
      else next[a.handle] = Math.min(99, a.qty);
      return next;
    }
    case "clear":
      return {};
  }
}

const KEY = "cb-bag-v1";
function load(): Lines {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Lines) : {};
  } catch {
    return {};
  }
}

interface CartApi {
  lines: Lines;
  count: number;
  priced: Priced;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (handle: string, qty?: number) => void;
  set: (handle: string, qty: number) => void;
  clear: () => void;
  pulse: number; // increments on every add, drives the bag-button bump
}

const Ctx = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage can be unavailable in private views; the bag still works for this visit */
    }
  }, [lines]);

  const add = useCallback((handle: string, qty = 1) => {
    dispatch({ type: "add", handle, qty });
    setPulse((p) => p + 1);
  }, []);
  const set = useCallback((handle: string, qty: number) => dispatch({ type: "set", handle, qty }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartApi>(() => {
    const count = Object.values(lines).reduce((s, n) => s + n, 0);
    return { lines, count, priced: priceBag(lines), open, setOpen, add, set, clear, pulse };
  }, [lines, open, add, set, clear, pulse]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
