import { ART } from "../data/art";

type Dividers = keyof typeof ART.divider;

/** A quiet watercolour layer. "band" sits along the bottom; "side" fills the right and fades left. */
export function Wash({ src, kind = "band" }: { src: string; kind?: "band" | "side" }) {
  return <div className={`wash wash--${kind}`} aria-hidden="true" style={{ backgroundImage: `url(${src})` }} />;
}

/** A hand-drawn rule between sections. */
export function Divider({ art = "cleaver" }: { art?: Dividers }) {
  return (
    <div className="divider gut" aria-hidden="true">
      <img src={ART.divider[art]} alt="" loading="lazy" />
    </div>
  );
}

/** A pencil sketch tucked into a corner. */
export function Sketch({ name, className = "" }: { name: keyof typeof ART.sketch; className?: string }) {
  return <img className={`sketch ${className}`} src={ART.sketch[name]} alt="" aria-hidden="true" loading="lazy" />;
}

/** The Vermont outline with a pin on Williston, in the state's northwest near Burlington. */
export function VermontPin() {
  return (
    <div className="vtmap" aria-hidden="true">
      <img src={ART.sketch.vermont} alt="" loading="lazy" />
      <span className="vtmap__pin" style={{ left: "25%", top: "26%" }}>
        <i />
        <b>Williston</b>
      </span>
    </div>
  );
}
