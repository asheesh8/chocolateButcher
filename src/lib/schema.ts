import { SHOP, type Product } from "../data/catalog";
import type { Route } from "./router";
import { FAQ } from "../data/faq";
import { REVIEWS } from "../data/reviews";
import { townBySlug } from "../data/towns";

// Structured data for answer engines. One LocalBusiness entity that never changes name,
// plus per-view Product / FAQPage / BreadcrumbList nodes.
const ORG = {
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": "https://chocolatebutcher.com/#shop",
  name: SHOP.name,
  description: "Rough-cut Belgian chocolate, chef-grade truffles and chocolate for charcuterie boards, chopped in Williston, Vermont.",
  url: "https://chocolatebutcher.com",
  logo: "https://chocolatebutcher.com/logo.png",
  telephone: "+1-802-862-7993",
  email: SHOP.email,
  address: { "@type": "PostalAddress", streetAddress: SHOP.street, addressLocality: SHOP.city, addressRegion: SHOP.region, postalCode: SHOP.zip, addressCountry: "US" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "12:00", closes: "19:00" }],
  founder: { "@type": "Person", name: "Jeffrey Mannion" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "15" },
  areaServed: ["Williston", "South Burlington", "Burlington", "Essex Junction", "Colchester", "Shelburne", "Winooski", "Jericho", "Richmond", "Hinesburg", "Vermont", "Greater Boston"],
  review: REVIEWS.map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.author }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: r.text })),
};

function product(p: Product) {
  return {
    "@type": "Product",
    name: p.name,
    description: p.description,
    brand: { "@type": "Brand", name: SHOP.name },
    weight: p.weight,
    image: p.images.map((i) => `https://chocolatebutcher.com/${i}`),
    offers: { "@type": "Offer", priceCurrency: "USD", price: p.price.toFixed(2), availability: "https://schema.org/InStock", seller: { "@id": ORG["@id"] } },
  };
}

export function schemaFor(route: Route, p?: Product) {
  const graph: object[] = [ORG];
  if (route.page === "product" && p) graph.push(product(p));
  if (route.page === "faq")
    graph.push({ "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  if (route.page === "near" && route.town && townBySlug[route.town]) {
    const t = townBySlug[route.town];
    graph.push({ "@type": "WebPage", name: `Chocolate shop near ${t.name}`, about: { "@id": ORG["@id"] }, spatialCoverage: { "@type": "Place", name: `${t.name}, ${t.slug === "boston" ? "MA" : "VT"}` } });
    graph.push({ "@type": "FAQPage", mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
