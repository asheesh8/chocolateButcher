import { DEALS, byHandle } from "../data/catalog";

export type Lines = Record<string, number>; // handle -> qty

export interface Priced {
  list: number;
  total: number;
  savings: number;
  applied: { label: string; times: number; price: number }[];
}

/**
 * Finds the cheapest way to ring up a bag using the market-table deals.
 * Items are expanded into unit prices sorted high to low per kind, then a DP over
 * (chops used, truffles used) tries every deal or a single at each step. Bundles always
 * swallow the priciest remaining units, which is optimal because deal prices are flat.
 */
export function priceBag(lines: Lines): Priced {
  const chops: number[] = [];
  const truffles: number[] = [];
  for (const [handle, qty] of Object.entries(lines)) {
    const p = byHandle[handle];
    if (!p || qty <= 0) continue;
    for (let i = 0; i < qty; i++) (p.bundle === "chop" ? chops : truffles).push(p.price);
  }
  chops.sort((a, b) => b - a);
  truffles.sort((a, b) => b - a);
  const list = [...chops, ...truffles].reduce((s, n) => s + n, 0);

  const C = chops.length, T = truffles.length;
  type Cell = { cost: number; from?: [number, number]; via?: string };
  const best: Cell[][] = Array.from({ length: C + 1 }, () => Array.from({ length: T + 1 }, () => ({ cost: Infinity })));
  best[0][0] = { cost: 0 };
  for (let c = 0; c <= C; c++) {
    for (let t = 0; t <= T; t++) {
      const here = best[c][t];
      if (here.cost === Infinity) continue;
      const relax = (nc: number, nt: number, add: number, via: string) => {
        if (nc > C || nt > T) return;
        const cost = here.cost + add;
        if (cost < best[nc][nt].cost - 1e-9) best[nc][nt] = { cost, from: [c, t], via };
      };
      if (c < C) relax(c + 1, t, chops[c], "single");
      if (t < T) relax(c, t + 1, truffles[t], "single");
      for (const d of DEALS) relax(c + d.chop, t + d.truffle, d.price, d.id);
    }
  }

  const counts = new Map<string, number>();
  let cur: [number, number] = [C, T];
  while (best[cur[0]][cur[1]].from) {
    const cell = best[cur[0]][cur[1]];
    if (cell.via && cell.via !== "single") counts.set(cell.via, (counts.get(cell.via) ?? 0) + 1);
    cur = cell.from!;
  }
  const total = Math.round(best[C][T].cost * 100) / 100;
  const applied = DEALS.filter((d) => counts.has(d.id)).map((d) => ({ label: d.label, times: counts.get(d.id)!, price: d.price }));
  return { list, total, savings: Math.round((list - total) * 100) / 100, applied };
}

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const money = (n: number) => fmt.format(n);
export const moneyShort = (n: number) => (Number.isInteger(n) ? `$${n}` : fmt.format(n));
