import { useEffect, useState } from "react";

// The same corner of Taft Corners through a year. Frames are aligned on the building,
// so a plain crossfade reads like a timelapse.
const SEASONS = [
  { src: "img/seasons/01.webp", label: "Spring", alt: "The Chop Shop in spring, crocuses and daffodils along the walk" },
  { src: "img/seasons/02.webp", label: "Summer nights", alt: "The Chop Shop on a summer evening, lamps lit and hydrangeas in bloom" },
  { src: "img/seasons/03.webp", label: "Fall", alt: "The Chop Shop in fall under red and gold maples, mums and pumpkins by the door" },
  { src: "img/seasons/04.webp", label: "Fall rain", alt: "The Chop Shop on a rainy fall evening, lamplight on the wet pavers" },
  { src: "img/seasons/05.webp", label: "Winter", alt: "The Chop Shop on a bright winter day after fresh snow" },
  { src: "img/seasons/06.webp", label: "The holidays", alt: "The Chop Shop at the holidays, wreath on the wall and garland lit along the walk" },
];
const HOLIDAYS = SEASONS.length - 1;
const STEP = 3200;

export function Seasons() {
  const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(HOLIDAYS);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((n) => (n + 1) % SEASONS.length), STEP);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <figure className={`seasons${playing ? " is-playing" : ""}`} aria-roledescription="slideshow" aria-label="The Chop Shop through the seasons">
      <div className="seasons__stage">
        <div className="seasons__pan">
        {SEASONS.map((s, n) => (
          <img key={s.src} src={s.src} alt={n === i ? s.alt : ""} aria-hidden={n !== i} className={n === i ? "on" : ""} width={1295} height={863} loading={n === HOLIDAYS ? "eager" : "lazy"} />
        ))}
        </div>
        <span className="seasons__tag" key={i} aria-live={playing ? "off" : "polite"}>
          {SEASONS[i].label}
        </span>
      </div>
      <figcaption className="seasons__bar">
        <button className="seasons__play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the seasons" : "Play the seasons"}>
          {playing ? "❚❚" : "▶"}
        </button>
        <div className="seasons__dots" role="group" aria-label="Pick a season">
          {SEASONS.map((s, n) => (
            <button
              key={s.label}
              aria-pressed={n === i}
              onClick={() => {
                setI(n);
                setPlaying(false);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
