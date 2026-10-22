import { Link } from "../lib/router";
import { Sketch } from "../components/Art";

export function NotFound() {
  return (
    <section className="band gut">
      <div className="wrap confirm">
        <Sketch name="chunks" className="sketch--center" />
        <span className="ticket-t muted">Error 404</span>
        <h1 className="sign sign-xl">This cut's off the menu.</h1>
        <p className="lede">The page you were after isn't here. The chocolate is, though.</p>
        <div className="row" style={{ gap: 16, justifyContent: "center" }}>
          <Link className="btn btn--primary" to={{ page: "shop" }}>Shop the Chop</Link>
          <Link className="btn" to={{ page: "home" }}>Back Home</Link>
        </div>
      </div>
    </section>
  );
}
