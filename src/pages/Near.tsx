import { byHandle, SHOP } from "../data/catalog";
import { TOWNS, townBySlug } from "../data/towns";
import { useCart } from "../lib/cart";
import { moneyShort } from "../lib/pricing";
import { useToast } from "../lib/toast";
import { Link } from "../lib/router";
import { Head } from "./Inner";
import { TOWN_SCENE } from "../data/art";
import { VermontPin } from "../components/Art";
import { NotFound } from "./NotFound";

const MAP = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("The Chocolate Butcher, 22 Merchants Row, Williston, VT 05495")}`;

function Pick({ title, text, handle }: { title: string; text: string; handle: string }) {
  const p = byHandle[handle];
  const { add } = useCart();
  const toast = useToast();
  return (
    <article className="pick-row">
      <Link to={{ page: "product", handle }} className="pick-row__img" aria-label={p.name}><img src={p.cut} alt={p.alt} loading="lazy" /></Link>
      <div className="pick-row__body">
        <b>{title}</b>
        <p>{text}</p>
        <div className="row" style={{ gap: 10 }}>
          <Link to={{ page: "product", handle }} className="link">{p.short}</Link>
          <span className="price" style={{ fontSize: 17 }}>{moneyShort(p.price)}</span>
          <button className="btn btn--sm btn--add" onClick={() => { add(handle); toast(`Added ${p.short} to your bag`); }}><span className="btn__t">Add</span><span className="btn__i" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /><path className="plus" d="M12 11.5v5M9.5 14h5" /></svg></span></button>
        </div>
      </div>
    </article>
  );
}

export function NearHub() {
  return (
    <>
      <Head crumb="Near you" title="Chocolate near you." sketch="vermont">
        <p className="lede">The Chop Shop sits at Taft Corners in Williston, the middle of Chittenden County. Here's how to reach it from your town, and what people nearby pick up.</p>
      </Head>
      <section className="band gut">
        <div className="wrap towns">
          {TOWNS.map((t) => (
            <Link key={t.slug} className="town" to={{ page: "near", town: t.slug }}>
              <b>{t.name}</b>
              <span className="town__time ticket-t">{t.minutes}</span>
              <span className="muted">{t.slug === "boston" ? "Shipped 2-day from Williston" : `${t.miles} from ${t.from}`}</span>
              <span className="town__go">Directions &amp; local picks →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function NearTown({ slug }: { slug: string }) {
  const t = townBySlug[slug];
  if (!t) return <NotFound />;
  const others = TOWNS.filter((o) => o.slug !== slug).slice(0, 10);
  const boston = t.slug === "boston";
  return (
    <>
      <Head crumb={`Near you / ${t.name}`} title={boston ? "Vermont chocolate, shipped to Boston." : `Chocolate near ${t.name}.`} scene={TOWN_SCENE[t.slug]}>
        <p className="lede">{t.intro}</p>
        <p className="ticket-t town__drive">{boston ? "Ships 2-day from Williston" : `${t.minutes} from ${t.short}`}</p>
        <div className="row" style={{ gap: 16 }}>
          {boston ? (
            <Link className="btn btn--primary" to={{ page: "shop" }}>Shop the Chop</Link>
          ) : (
            <a className="btn btn--primary" href={MAP} target="_blank" rel="noopener noreferrer">Get Directions</a>
          )}
          <Link className="btn" to={{ page: "shop" }}>{boston ? "See the Deals" : "Order Ahead"}</Link>
        </div>
      </Head>

      <section className="band gut band--tight">
        <div className="wrap town-grid">
          <div className="stack" style={{ gap: 14 }}>
            <h2 className="sign sign-m">{boston ? "How it gets to you" : `From ${t.short} to the Chop Shop`}</h2>
            <ol className="route">
              {t.route.map((r) => <li key={r}>{r}</li>)}
            </ol>
            <p className="muted">{t.getIt}</p>
            <div className="row" style={{ gap: 18, alignItems: "flex-start" }}>
              {!boston && <VermontPin />}
              <p className="ticket-t" style={{ fontSize: 14 }}>{SHOP.street}<br />{SHOP.city}, {SHOP.region} {SHOP.zip}<br />Wed–Sun 12–7<br />{SHOP.phone}</p>
            </div>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <h2 className="sign sign-m">{boston ? "What Boston orders" : `What ${t.short} picks up`}</h2>
            <div className="picks">
              {t.occasions.map((o) => <Pick key={o.title} title={o.title} text={o.text} handle={o.pick} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="band band--kraft gut band--tight">
        <div className="wrap split">
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="sign sign-m">{t.short} questions</h2>
            <div className="faq">
              {t.faq.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <h2 className="sign sign-m">Also near the Chop Shop</h2>
            <div className="chips">
              {others.map((o) => (
                <Link key={o.slug} className="chip" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }} to={{ page: "near", town: o.slug }}>{o.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
