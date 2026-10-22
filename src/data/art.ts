// Ashish's hand-painted watercolour and pencil art, cleaned up in scripts/artprep.py.
// Scenes are washes (low opacity, multiplied, edges faded); sketches are ink-only cut-outs.
const A = (n: string) => `img/art/${n}.webp`;

export const ART = {
  hero: A("wc-waterfront-faded"),
  pagehead: A("wc-panorama"),
  footer: A("wc-waterfront-faded"),
  divider: {
    cleaver: A("div-cleaver"),
    mountains: A("div-mountains"),
    pines: A("div-pines"),
    botanical: A("div-botanical"),
  },
  sketch: {
    cocoa: A("sketch-cocoa"),
    chunks: A("sketch-chunks"),
    pod: A("sketch-pod"),
    roughcut: A("sketch-roughcut"),
    vermont: A("sketch-vermont"),
  },
};

// One scene per town page, matched to what you'd see there.
export const TOWN_SCENE: Record<string, string> = {
  williston: A("wc-green-mountains"),
  "south-burlington": A("wc-sunset"),
  burlington: A("wc-church-street"),
  essex: A("wc-forest"),
  colchester: A("wc-sailboat"),
  shelburne: A("wc-panorama"),
  winooski: A("wc-church-sketch"),
  "jericho-underhill": A("wc-forest"),
  richmond: A("wc-green-mountains"),
  hinesburg: A("wc-mountains-faded"),
  boston: A("wc-waterfront"),
};
