// Google reviews for the Chop Shop, quoted as written (long ones trimmed where Google truncates them).
// Jeff answers his reviews himself; his replies are part of the proof.
export interface Review {
  author: string;
  meta: string;
  when: string;
  text: string;
  reply?: string;
}

export const RATING = { value: 5.0, count: 15, url: "https://www.google.com/maps/search/?api=1&query=The+Chocolate+Butcher+22+Merchants+Row+Williston+VT" };

export const REVIEWS: Review[] = [
  {
    author: "Kelly McKee",
    meta: "10 reviews",
    when: "2 months ago",
    text: "(Five stars simply aren’t enough.) I came for chocolate. I left questioning every life decision that didn’t involve …",
  },
  {
    author: "Samantha Savard",
    meta: "3 reviews",
    when: "2 months ago",
    text: "FANTASTIC EXPERIENCE! If you are tired of lame “big brand” chocolate please invest in yourself by shopping here. Jeffery greeted us with kind open arms and took us on a journey around the world of flavor.",
  },
  {
    author: "Hunter K",
    meta: "3 reviews",
    when: "4 months ago",
    text: "Amazing first experience, will definitely be returning. The gentleman that was there (I’m assuming the owner?) was very polite and gave me a bunch of info on a lot of products around the store. Very good quality products and packaging. Chocolate is amazing!",
    reply: "Truly appreciate the nice review Hunter! Thanks too, for carving out the time to write such a thoughtful summary...and for stopping by the shop to learn about us. Best, Jeff",
  },
  {
    author: "Chey T",
    meta: "6 reviews",
    when: "3 months ago",
    text: "The Chocolate Butcher does NOT DISAPPOINT! From the generous samples to the delicious high quality chocolate options, it's every serious chocolate lovers' dream shop! The Chocolate Butcher should come with an addiction warning!",
  },
  {
    author: "Denise Austin",
    meta: "Local Guide · 84 reviews",
    when: "5 months ago",
    text: "The chocolate was phenomenal! We bought mint balls, caramel balls, chocolate w almonds, chocolate w peanut butter, coffee flavored and an almond rocha type. We stopped in the area randomly and so glad we did. We have been eating it slowly over the past month and sad to finish the last of it!",
    reply: "Thanks Denise! Fun to read--brings a smile. And apologies for taking so long to reply...just noticed! Best, Jeff",
  },
  {
    author: "Andrea Gohl",
    meta: "Local Guide · 98 reviews",
    when: "9 months ago",
    text: "My friend and I stumbled across this place when we went to the Mexican restaurant next store, and I am now sure that it was fate. Not only is their chocolate some of the best that I have ever eaten, the owner was so nice.",
    reply: "Many thanks Andrea for nice words—and for just taking the time to write! Had a laugh regarding the fate reference...much appreciated. Best, Jeff",
  },
  {
    author: "Linda Gallant",
    meta: "8 reviews",
    when: "8 months ago",
    text: "So so good. High quality chocolate. Just placed another order. Lindt just isn't cutting it.",
    reply: "Many thanks Linda!! Just noticed your thoughtful feedback. Truly appreciated. Jeff",
  },
  {
    author: "Jennifer Bragg-Goguen",
    meta: "Local Guide · 18 reviews",
    when: "6 days ago",
    text: "Thank you to The Chocolate Butcher and their knowledgeable staff! The variety and quality of chocolates was pure magic! I will be back to make my Christmas shopping a one stop shop! ♥🪄🍫🎄🎁",
  },
  {
    author: "Me and Meatball",
    meta: "10 reviews",
    when: "10 months ago",
    text: "Love this place! Wide range of amazing chocolates and reasonably priced. Plenty of samples, no reason not to find something amazing.",
    reply: "It doesn't get any better for a chocolate butcher (and dog-lover)...hearing your dog is named meatball! Thank you for the thoughtful words. Best, Jeff",
  },
  {
    author: "Gary Davis",
    meta: "10 reviews",
    when: "a month ago",
    text: "Awesome chocolate. Wish there were closer to home!!",
  },
];

export const PRESS = [
  {
    outlet: "Williston Observer",
    kind: "News",
    title: "Meet your friendly neighborhood Chocolate Butcher",
    byline: "Jason Starr · Nov 20, 2025",
    url: "https://www.willistonobserver.com/business_hub/business/meet-your-friendly-neighborhood-chocolate-butcher/article_a36be016-1494-4c40-a524-34f7a04e0200.html",
  },
  {
    outlet: "The Good Trade BTV",
    kind: "Makers market",
    title: "Welcome The Chocolate Butcher to The Good Trade BTV",
    byline: "Burlington makers market",
  },
  {
    outlet: "Hula",
    kind: "Food & wine show",
    title: "At the table for the Hula food & wine show",
    byline: "Burlington",
  },
];
