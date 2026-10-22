import { Link } from "../lib/router";
import { RATING } from "../data/reviews";

// Maple leaf outline (after the Canadian flag leaf), drawn as a loose ink line over a watercolor wash.
const LEAF =
  "m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z";

export function MapleRating({ className = "" }: { className?: string }) {
  return (
    <Link className={`maple ${className}`} to={{ page: "reviews" }} aria-label={`Rated ${RATING.value.toFixed(1)} out of 5 from ${RATING.count} Google reviews`}>
      <svg className="maple__leaf" viewBox="-2600 -2500 5200 4700" aria-hidden="true">
        <defs>
          <filter id="maple-wc" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="140" />
          </filter>
          <filter id="maple-ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <radialGradient id="maple-g" cx="45%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ffc93c" />
            <stop offset=".55" stopColor="#f08a3c" />
            <stop offset="1" stopColor="#d7262e" />
          </radialGradient>
        </defs>
        <path d={LEAF} fill="url(#maple-g)" opacity=".6" filter="url(#maple-wc)" transform="translate(60 40) rotate(-3)" />
        <g filter="url(#maple-ink)" fill="none" stroke="#2a1a14" strokeLinecap="round" strokeLinejoin="round">
          <path d={LEAF} strokeWidth="34" />
          <path d="M0 1900 L0 -1500 M0 400 L-1500 -700 M0 400 L1500 -700 M0 900 L-1250 650 M0 900 L1250 650" strokeWidth="18" opacity=".45" />
        </g>
      </svg>
      <span className="maple__text">
        <b>{RATING.value.toFixed(1)}</b>
      </span>
      <span className="maple__side">
        <i aria-hidden="true">★★★★★</i>
        <span className="maple__cap">{RATING.count} Google reviews</span>
      </span>
    </Link>
  );
}
