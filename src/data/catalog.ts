// The real Chocolate Butcher line-up, read off chocolatebutcher.com and the packaging photos.
// Prices are the store's Shopify prices (Oct 2026). Anything not printed on a bag is left out
// rather than guessed.

export type Family = "rough-cuts" | "chop-shop" | "truffles";
export type BundleKind = "chop" | "truffle";

export interface Product {
  handle: string;
  family: Family;
  bundle: BundleKind;
  name: string;
  short: string;
  tagline: string;
  price: number;
  weight: string;
  count?: string;
  cacao?: number;
  /** Position on the bag's own sweetness scale, 0 = more sweet, 1 = less sweet. */
  sweetness?: number;
  band: string; // the bag's colour band, used for tints
  /** Light bands (mint, caramel) need dark text on top. */
  bandInk?: "dark";
  /** The script line printed on the bag: "Rough Cuts", "Dark Mint"… */
  line: string;
  description: string;
  uses: string[];
  pairings?: string[];
  ingredients?: string;
  allergens?: string;
  calories?: string;
  images: string[];
  /** Front of the bag with the studio background removed. */
  cut: string;
  alt: string;
}

const img = (handle: string, n: number) => Array.from({ length: n }, (_, i) => `img/${handle}-${i + 1}.webp`);

export const PRODUCTS: Product[] = [
  {
    handle: "roughly-chopped-34-milk-chocolate",
    line: "Rough Cuts",
    family: "rough-cuts",
    bundle: "chop",
    name: "Rough Cuts 34% Milk",
    short: "34% Milk",
    tagline: "Creamy and perfectly sweet",
    price: 15.5,
    weight: "7 oz (198 g)",
    cacao: 34,
    sweetness: 0,
    band: "#2f5d9e",
    description:
      "Belgian milk chocolate, roughly chopped from big slabs into a mix of large and small pieces. The sweetest of the three Rough Cuts.",
    uses: ["Snacking: a mix of unique snack shapes", "Entertaining: great on a charcuterie board or in a trail mix", "Melting: molding and hot chocolate (tempering required)"],
    images: img("roughly-chopped-34-milk-chocolate", 3),
    cut: "img/cut/roughly-chopped-34-milk-chocolate-1.webp",
    alt: "Kraft bag of The Chocolate Butcher Rough Cuts 34% milk Belgian chocolate, 7 oz",
  },
  {
    handle: "belgian-54-dark-chocolate",
    line: "Rough Cuts",
    family: "rough-cuts",
    bundle: "chop",
    name: "Rough Cuts 54% Dark",
    short: "54% Dark",
    tagline: "Semi-sweet and velvety smooth",
    price: 15.5,
    weight: "7 oz (198 g)",
    cacao: 54,
    sweetness: 0.5,
    band: "#6f2832",
    description:
      "Semi-sweet Belgian dark chocolate, roughly chopped. Right in the middle of the scale: smooth enough to snack on, dark enough for the board.",
    uses: ["Snacking: a mix of unique snack shapes", "Entertaining: great on a charcuterie board or in a trail mix", "Melting: molding and hot chocolate (tempering required)"],
    ingredients:
      "Semi-sweet chocolate (unsweetened chocolate, sugar, cocoa butter, soy lecithin, natural vanilla flavor).",
    allergens: "Contains soy. May contain traces of milk, peanuts, tree nuts and wheat.",
    calories: "140 calories per 1 oz serving, 7 servings per bag",
    images: img("belgian-54-dark-chocolate", 3),
    cut: "img/cut/belgian-54-dark-chocolate-1.webp",
    alt: "Kraft bag of The Chocolate Butcher Rough Cuts 54% dark Belgian chocolate, 7 oz",
  },
  {
    handle: "belgian-chocolate-roughly-chopped-70-extra-dark-chocolate",
    line: "Rough Cuts",
    family: "rough-cuts",
    bundle: "chop",
    name: "Rough Cuts 70% Extra Dark",
    short: "70% Extra Dark",
    tagline: "Bold and a hint of bitter",
    price: 15.5,
    weight: "7 oz (198 g)",
    cacao: 70,
    sweetness: 1,
    band: "#24664f",
    description:
      "Extra dark Belgian chocolate, roughly chopped. The least sweet of the line, for people who like their chocolate to talk back.",
    uses: ["Snacking: a mix of unique snack shapes", "Entertaining: great on a charcuterie board or in a trail mix", "Melting: molding and hot chocolate (tempering required)"],
    calories: "130 calories per 1 oz serving, 7 servings per bag",
    images: img("belgian-chocolate-roughly-chopped-70-extra-dark-chocolate", 3),
    cut: "img/cut/belgian-chocolate-roughly-chopped-70-extra-dark-chocolate-1.webp",
    alt: "Kraft bag of The Chocolate Butcher Rough Cuts 70% extra dark Belgian chocolate, 7 oz",
  },
  {
    handle: "milk-chocolate-roughly-chopped",
    line: "Creamy Sweet",
    family: "chop-shop",
    bundle: "chop",
    name: "Milk Chocolate, Roughly Chopped",
    short: "Creamy Sweet Milk",
    tagline: "Creamy sweet, for snacking",
    price: 14.5,
    weight: "5.8 oz (164 g)",
    band: "#2a3f9a",
    description:
      "The Chop Shop bag. Milky, creamy chocolate roughly chopped for snacking. Great on charcuterie and dessert boards, or straight from the bag.",
    uses: ["Boards: pairs with nuts, cheese and pretzels", "Snacking: straight from the bag when the craving strikes"],
    images: img("milk-chocolate-roughly-chopped", 3),
    cut: "img/cut/milk-chocolate-roughly-chopped-1.webp",
    alt: "Blue Chop Shop bag of roughly chopped milk chocolate for snacking",
  },
  {
    handle: "semisweet-dark-chocolate-roughly-chopped",
    line: "SemiSweet",
    family: "chop-shop",
    bundle: "chop",
    name: "SemiSweet Dark Chocolate, Roughly Chopped",
    short: "SemiSweet Dark",
    tagline: "Semi-sweet, for snacking",
    price: 14.5,
    weight: "5.8 oz (164 g)",
    band: "#c4213a",
    description:
      "The red Chop Shop bag. Semi-sweet dark chocolate roughly chopped for snacking. Great on charcuterie and dessert boards, or straight from the bag.",
    uses: ["Boards: pairs with nuts, dried fruit and cheese", "Snacking: straight from the bag when the craving strikes"],
    images: img("semisweet-dark-chocolate-roughly-chopped", 3),
    cut: "img/cut/semisweet-dark-chocolate-roughly-chopped-1.webp",
    alt: "Red Chop Shop bag of roughly chopped semi-sweet dark chocolate for snacking",
  },
  {
    handle: "dark-mint-truffles",
    line: "Dark Mint",
    bandInk: "dark",
    family: "truffles",
    bundle: "truffle",
    name: "Dark Chocolate Mint Truffles",
    short: "Dark Mint",
    tagline: "Dark chocolate shell, delightful mint ganache",
    price: 17.5,
    weight: "6.7 oz (190 g)",
    count: "20 chef-grade truffles",
    band: "#62c0a0",
    description:
      "Undecorated and unboxed. A dark chocolate shell around a cool, creamy mint ganache center. Twenty to a bag.",
    uses: ["Snacking: enjoy when you crave a sweet treat"],
    pairings: ["Cabernet Sauvignon", "Pinot Noir", "Champagne"],
    images: img("dark-mint-truffles", 4),
    cut: "img/cut/dark-mint-truffles-1.webp",
    alt: "Bag of 20 Dark Chocolate Mint Truffles from The Chocolate Butcher",
  },
  {
    handle: "dark-chocolate-raspberry-truffles",
    line: "Dark Raspberry",
    family: "truffles",
    bundle: "truffle",
    name: "Dark Chocolate Raspberry Truffles",
    short: "Dark Raspberry",
    tagline: "Dark chocolate shell, smooth raspberry ganache",
    price: 17.5,
    weight: "6.7 oz (190 g)",
    count: "20 chef-grade truffles",
    band: "#b0309a",
    description:
      "Undecorated and unboxed. A dark chocolate shell around a smooth raspberry ganache center. Twenty to a bag.",
    uses: ["Snacking: enjoy when you crave a sweet treat"],
    images: img("dark-chocolate-raspberry-truffles", 4),
    cut: "img/cut/dark-chocolate-raspberry-truffles-1.webp",
    alt: "Bag of 20 Dark Chocolate Raspberry Truffles from The Chocolate Butcher",
  },
  {
    handle: "milk-chocolate-caramel-truffles",
    line: "Milk Caramel",
    bandInk: "dark",
    family: "truffles",
    bundle: "truffle",
    name: "Milk Chocolate Caramel Truffles",
    short: "Milk Caramel",
    tagline: "Milk chocolate shell, creamy caramel ganache",
    price: 17.5,
    weight: "6.7 oz (190 g)",
    count: "20 chef-grade truffles",
    band: "#cc7a50",
    description:
      "Undecorated and unboxed. A milk chocolate shell around a creamy caramel ganache center. Twenty to a bag.",
    uses: ["Snacking: enjoy when you crave a sweet treat"],
    pairings: ["Pinot Noir", "Merlot", "Champagne"],
    ingredients:
      "Sugar, cocoa mass, cocoa butter, heavy cream, milk, skim milk, corn syrup, soy lecithin (an emulsifier), butter, natural and artificial flavors; contains 1% or less of coconut oil, invertase, potassium sorbate, hydrogenated coconut oil, mono and diglycerides, TBHQ and citric acid.",
    allergens:
      "Contains milk, soy, tree nuts (coconut). May contain traces of peanuts, wheat and tree nuts (walnuts) from shared equipment.",
    calories: "150 calories per 2 truffles, 10 servings per bag",
    images: img("milk-chocolate-caramel-truffles", 4),
    cut: "img/cut/milk-chocolate-caramel-truffles-1.webp",
    alt: "Bag of 20 Milk Chocolate Caramel Truffles from The Chocolate Butcher",
  },
];

export const byHandle = Object.fromEntries(PRODUCTS.map((p) => [p.handle, p])) as Record<string, Product>;

export const FAMILY_LABEL: Record<Family, string> = {
  "rough-cuts": "Rough Cuts",
  "chop-shop": "Chop Shop Bags",
  truffles: "Truffles",
};

/** Mix-and-match pricing, exactly as on the Chop Shop's holiday market table sign. */
export const DEALS = [
  { id: "4c", label: "4 Chopped", chop: 4, truffle: 0, price: 48 },
  { id: "2c", label: "2 Chopped", chop: 2, truffle: 0, price: 26 },
  { id: "4t", label: "4 Truffles", chop: 0, truffle: 4, price: 60 },
  { id: "2t", label: "2 Truffles", chop: 0, truffle: 2, price: 32 },
  { id: "1c1t", label: "1 Chop + 1 Truffle", chop: 1, truffle: 1, price: 29 },
] as const;

export const SHOP = {
  name: "The Chocolate Butcher",
  entity: "The Chocolate Butcher, a chocolate shop in Williston, Vermont",
  street: "22 Merchants Row",
  city: "Williston",
  region: "VT",
  zip: "05495",
  phone: "(802) 862-7993",
  email: "info@chocolatebutcher.com",
  production: "160 Boyer Circle, Williston, VT 05495",
  hours: [
    ["Wed–Sun", "12:00–7:00 pm"],
    ["Mon–Tue", "Closed"],
  ] as const,
  freeShipping: 50,
  christmasCutoff: new Date(2026, 11, 17, 12),
};
