import { PRODUCTS } from "../data/catalog";
import { DealSheet } from "../components/Bits";
import { ProductCard } from "../components/ProductCard";
import { PressStrip, ReviewWall } from "../components/Proof";
import { SweetnessScale } from "../components/SweetnessScale";
import { TruffleCounter } from "../components/Truffles";
import { RATING } from "../data/reviews";
import { Link } from "../lib/router";
import { Head } from "./Inner";

export function RoughCuts() {
  const bags = PRODUCTS.filter((p) => p.family === "chop-shop");
  return (
    <>
      <Head crumb="Rough Cuts" title="Rough Cuts." sketch="roughcut">
        <p className="lede">Belgian chocolate in 34%, 54% and 70%, roughly chopped into 7 oz bags. Big pieces and small, the way a butcher breaks it down.</p>
      </Head>
      <SweetnessScale />
      <section className="band gut">
        <div className="wrap side-by-side">
          <div className="stack" style={{ gap: 18 }}>
            <span className="label">Chop Shop bags</span>
            <h2 className="sign sign-l">For the board, or straight from the bag.</h2>
            <div className="grid grid--2">{bags.map((p) => <ProductCard key={p.handle} p={p} />)}</div>
          </div>
          <DealSheet />
        </div>
      </section>
    </>
  );
}

export function Truffles() {
  return (
    <>
      <Head crumb="Truffles" title="Truffles without the gold box." sketch="cocoa">
        <p className="lede">Twenty chef-grade truffles to a bag. The ganache center is the best part, so that's where the money goes. Tap a bag to see inside.</p>
      </Head>
      <section className="band gut">
        <div className="wrap stack" style={{ gap: 24 }}>
          <TruffleCounter />
          <div className="row" style={{ gap: 14, justifyContent: "space-between" }}>
            <p className="muted">Any 2 truffle bags for $32, any 4 for $60. Pair one with a chopped bag for $29.</p>
            <Link className="btn" to={{ page: "board" }}>Put Them on a Board</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function Reviews() {
  return (
    <>
      <Head crumb="Reviews & Press" title={`${RATING.value.toFixed(1)} stars. They say his name.`}>
        <p className="lede">Every Google review quoted as written, with Jeff's replies. He answers them himself.</p>
      </Head>
      <section className="band gut">
        <div className="wrap stack" style={{ gap: 28 }}>
          <ReviewWall />
          <PressStrip />
        </div>
      </section>
    </>
  );
}
