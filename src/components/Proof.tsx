import { PRESS, RATING, REVIEWS } from "../data/reviews";

export function PressStrip() {
  return (
    <div className="press" aria-label="As seen in">
      <span className="press__label">As seen in &amp; at</span>
      {PRESS.map((p) => {
        const body = (
          <>
            <b>{p.outlet}</b>
            <span className="press__title">{p.title}</span>
            <span className="press__by">{p.kind} · {p.byline}</span>
          </>
        );
        return p.url ? (
          <a key={p.outlet} className="press__item" href={p.url} target="_blank" rel="noopener noreferrer">
            {body}
            <span className="press__go">Read the article ↗</span>
          </a>
        ) : (
          <div key={p.outlet} className="press__item">{body}</div>
        );
      })}
    </div>
  );
}

export function ReviewWall({ limit = REVIEWS.length }: { limit?: number }) {
  return (
    <div className="reviewwall">
      <a className="score" href={RATING.url} target="_blank" rel="noopener noreferrer">
        <span className="label" style={{ color: "inherit" }}>Google rating</span>
        <big>{RATING.value.toFixed(1)}</big>
        <span className="ticket-t">★★★★★ · {RATING.count} reviews<br />Jeff answers them himself</span>
        <span className="score__go">See them on Google ↗</span>
      </a>
      {REVIEWS.slice(0, limit).map((r) => (
        <figure key={r.author} className="review">
          <span className="review__stars" aria-label="5 out of 5 stars">★★★★★</span>
          <blockquote>{r.text}</blockquote>
          <figcaption>
            <b>{r.author}</b> <span className="muted">· {r.meta} · {r.when}</span>
          </figcaption>
          {r.reply && (
            <div className="review__reply">
              <span className="script">Jeff replied</span>
              <p>{r.reply}</p>
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
