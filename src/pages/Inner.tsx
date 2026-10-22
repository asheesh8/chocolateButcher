import { Divider, Sketch, VermontPin, Wash } from "../components/Art";
import { ART, TOWN_SCENE } from "../data/art";
import { Seasons } from "../components/Seasons";
import { useState, type FormEvent } from "react";
import { SHOP, byHandle } from "../data/catalog";
import { DealSheet, FaqList, VisitInfo } from "../components/Bits";
import { daysUntil } from "../components/Chrome";
import { ProductCard } from "../components/ProductCard";
import { Link } from "../lib/router";
import { useToast } from "../lib/toast";

export function Head({ crumb, title, children, scene, sketch }: { crumb: string; title: string; children?: React.ReactNode; scene?: string; sketch?: keyof typeof ART.sketch }) {
  return (
    <section className="pagehead gut">
      {scene ? <Wash src={scene} kind="side" /> : <Wash src={ART.pagehead} />}
      {sketch && <Sketch name={sketch} className="sketch--head" />}
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to={{ page: "home" }}>Home</Link> / <span>{crumb}</span></nav>
        <h1 className="sign sign-xl" style={{ fontSize: "clamp(52px, 8.5vw, 116px)" }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function Holiday() {
  const days = daysUntil(SHOP.christmasCutoff);
  return (
    <>
      <Head crumb="Holiday" title="The holiday counter is open." scene={TOWN_SCENE.burlington}>
        <div className="countdown">
          <big>{days}</big>
          <p className="lede">days left to order for Christmas delivery. Order by <b>Thursday, December 17</b>. Every box ships insulated.</p>
        </div>
      </Head>
      <section className="band gut">
        <div className="wrap holiday-split">
          <div className="stack" style={{ gap: 18 }}>
          <div className="stack" style={{ gap: 10 }}><span className="label">Dates to know</span><h2 className="sign sign-l">Holiday calendar</h2></div>
          <div className="cal cal--stack">
            <div><span className="m">Sun, Nov 22</span><span className="d">22</span><b>Chop Shop turns one</b><span className="muted">Anniversary samples in Williston.</span></div>
            <div><span className="m">Sat, Nov 28</span><span className="d">28</span><b>Small Business Saturday</b><span className="muted">Shop local, stock the board.</span></div>
            <div><span className="m">Fri, Dec 4</span><span className="d">4</span><b>Hanukkah begins</b><span className="muted">Order by Mon, Nov 30.</span></div>
            <div><span className="m">Fri, Dec 11</span><span className="d">11</span><b>Office orders</b><span className="muted">Last day for client gift lists.</span></div>
            <div className="hot"><span className="m">Thu, Dec 17</span><span className="d">17</span><b>Last day to ship</b><span>For Christmas delivery.</span></div>
          </div>
          </div>
          <div className="stack" style={{ gap: 18 }}>
            <div className="stack" style={{ gap: 10 }}><span className="label">Under $20, every one</span><h2 className="sign sign-l">Stocking stuffers</h2></div>
            <div className="grid grid--2">
              {["belgian-54-dark-chocolate", "dark-chocolate-raspberry-truffles", "milk-chocolate-roughly-chopped", "dark-mint-truffles"].map((h) => <ProductCard key={h} p={byHandle[h]} />)}
            </div>
            <Link className="btn btn--primary" style={{ alignSelf: "start" }} to={{ page: "gifting" }}>Gifts for a Whole Office</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function Gifting() {
  const toast = useToast();
  const [err, setErr] = useState<string | null>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!String(f.get("name")).trim()) return setErr("Add your name so Jeff knows who to reply to.");
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) return setErr("Add an email address like you@company.com.");
    setErr(null);
    e.currentTarget.reset();
    toast("Thanks! Your request is on its way to Jeff.");
  };
  return (
    <>
      <Head crumb="Gifting" title="Gifts people actually open." scene={TOWN_SCENE.shelburne}>
        <p className="lede">Mix-and-match sets of Rough Cuts and truffles, for one person or a hundred. The bag does the gift math for you.</p>
      </Head>
      <section className="band band--kraft gut" id="corporate">
        <div className="wrap split">
          <div className="stack">
            <span className="label">Office &amp; client gifts</span>
            <h2 className="sign sign-l">Office &amp; client gifts</h2>
            <p>Mix-and-match sets of Rough Cuts and truffles, shipped to one office or a hundred addresses. Jeff handles corporate orders himself, so you get one person, one invoice, and a handwritten note if you want it.</p>
            <p className="muted">Good for client thank-yous, team gifts, realtor closings, and the lobby bowl at the all-hands. The 1 Chop + 1 Truffle pair at $29 is the easy default.</p>
            <span className="ticket-t" style={{ userSelect: "all" }}>{SHOP.email}</span>
          </div>
          <form className="inq" onSubmit={submit} noValidate>
            <label>Name<input name="name" autoComplete="name" /></label>
            <label>Company<input name="company" autoComplete="organization" /></label>
            <label>Email<input name="email" type="email" autoComplete="email" spellCheck={false} /></label>
            <label>How many gifts<select name="qty" defaultValue="25–99"><option>10–24</option><option>25–99</option><option>100+</option></select></label>
            <label className="full">Notes<textarea name="notes" rows={3} placeholder="e.g. 40 addresses, logo tags, deliver by Dec 14…" /></label>
            {err && <span className="err full" role="alert">{err}</span>}
            <div className="full row"><button className="btn btn--primary" type="submit">Send to Jeff</button><span className="muted" style={{ fontSize: 14 }}>Jeff replies within a day.</span></div>
          </form>
        </div>
      </section>
      <section className="band gut">
        <div className="wrap deals">
          <div className="deals__photo"><img src="img/site-img-7746.webp" alt="Holiday market table with Chocolate Butcher bags" width={1600} height={1200} loading="lazy" /></div>
          <DealSheet title="Gift math" />
        </div>
      </section>
    </>
  );
}

export function Visit() {
  return (
    <>
      <Head crumb="Visit" title="Vermont-made. Boston-raised." scene={TOWN_SCENE.boston}>
        <p className="lede">Chopped at Taft Corners in Williston. Raised outside Boston. Here's how to get it in either place.</p>
      </Head>
      <section className="band gut">
        <div className="wrap stack" style={{ gap: 28 }}>
          <div className="visit">
            <div className="visit__img"><Seasons /></div>
            <div className="visit__info"><VisitInfo /><VermontPin /></div>
          </div>
          <Divider art="mountains" />
          <div className="grid">
            <figure className="photo-chop" style={{ margin: 0, aspectRatio: "1 / 1" }}><img src="img/site-img-1106.webp" alt="The Chop Shop's glass front doors with the logo" width={1200} height={1277} loading="lazy" /></figure>
            <div className="stack" style={{ justifyContent: "center", padding: "8px 4px" }}>
              <span className="label">Production</span>
              <h2 className="sign sign-m">Chopped on Boyer Circle</h2>
              <p>Every slab is chopped and packed at our production space, {SHOP.production}, a few minutes from the shop.</p>
            </div>
            <div className="stack" style={{ justifyContent: "center", padding: "8px 4px" }}>
              <span className="label">Boston</span>
              <h2 className="sign sign-m">2-day to the Boston area</h2>
              <p>Jeff grew up outside Boston, and our chocolate spent its first decade on grocery shelves in Boston, Connecticut and New York. Orders ship 2-day, insulated and iced in warm months, free over $50.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Story() {
  return (
    <>
      <Head crumb="Jeff's story" title="It started with the broken pieces." sketch="pod" />
      <section className="band gut">
        <div className="wrap jeff">
          <div className="nametag">
            <div className="nametag__hello">Hello, my name is</div>
            <img src="img/site-jeffcb-headshot.webp" alt="Jeffrey Mannion, founder of The Chocolate Butcher" width={525} height={543} />
            <div className="nametag__name">Jeff</div>
          </div>
          <div className="prose">
            <p>Jeffrey Mannion grew up outside Boston and spent his career in advertising and food. In chocolate factories he kept seeing the same thing: the people who worked there snacked on the rough, broken pieces that came off the big wholesale blocks. Those pieces were the best part, and nobody sold them.</p>
            <p>So he did. The Chocolate Butcher takes Belgian chocolate in big slabs and chops it the way a butcher breaks down a side of beef. Every bag gets big pieces and small ones, because sometimes you want a sliver and sometimes you want a slab.</p>
            <p>For about ten years the chunks were sold through grocery stores in Boston, Connecticut and New York, chopped at the production space on Boyer Circle in Williston. In November 2025 Jeff opened the first Chop Shop at Taft Corners.</p>
            <p>We keep it simple on purpose. The truffles come in a bag, not a gold box, because the ganache is the point. The boards come with pretzels and nuts, because chocolate is better with salt.</p>
            <div className="row" style={{ gap: 20 }}>
              <img src="img/favicon-cleavers.webp" alt="The Chocolate Butcher crossed-cleavers mark" width={88} height={88} style={{ width: 88, height: 88 }} />
              <span className="script" style={{ fontSize: 34 }}>Flavor without the fancy.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="band band--kraft gut band--tight">
        <div className="wrap row" style={{ gap: 16, justifyContent: "space-between" }}>
          <h2 className="sign sign-m">Fifteen reviews, every one answered by Jeff.</h2>
          <div className="row" style={{ gap: 14 }}>
            <Link className="btn" to={{ page: "reviews" }}>Read the Reviews</Link>
            <Link className="btn btn--primary" to={{ page: "roughcuts" }}>Shop the Chop</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function Faq() {
  return (
    <>
      <Head crumb="FAQ" title="Questions, answered plainly." sketch="cocoa" />
      <section className="band gut"><div className="wrap" style={{ maxWidth: 900 }}><FaqList /></div></section>
    </>
  );
}
