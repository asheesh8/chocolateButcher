// Local pages. Each town gets its own way in, its own occasions and its own questions.
// Drive times are typical, off-peak, from the town centre to 22 Merchants Row.
export interface Town {
  slug: string;
  name: string;
  short: string;
  minutes: string;
  miles: string;
  from: string;
  route: string[];
  intro: string;
  occasions: { title: string; text: string; pick: string }[];
  getIt: string;
  faq: [string, string][];
}

export const TOWNS: Town[] = [
  {
    slug: "williston",
    name: "Williston",
    short: "Williston",
    minutes: "0–5 min",
    miles: "in town",
    from: "Taft Corners",
    route: ["We're at Taft Corners, on the corner of Route 2A and Marshall Avenue.", "Same building as Casa Grande. Park out front.", "From I-89, take Exit 12 and head north on 2A; we're on the right after the light at Marshall Ave."],
    intro: "This is home. The chocolate is chopped a mile away on Boyer Circle and sold here at the Chop Shop, so the bag you pick up on Merchants Row was broken down by hand a few days earlier.",
    occasions: [
      { title: "Taft Corners errands", text: "Grabbing groceries or picking up dinner next door? Stop in for a sample and a 7 oz bag for the week.", pick: "belgian-54-dark-chocolate" },
      { title: "Teacher and coach gifts", text: "A bag of truffles works for end-of-season thank-yous at Williston Central and Allen Brook. No box, no fuss.", pick: "milk-chocolate-caramel-truffles" },
      { title: "Neighborhood parties", text: "Put a pile of Rough Cuts out with pretzels and cheddar. Our board builder works out how much you need.", pick: "roughly-chopped-34-milk-chocolate" },
    ],
    getIt: "Walk in Wednesday to Sunday, 12 to 7. You'll get samples, and Jeff will probably tell you the story behind the name.",
    faq: [
      ["Where exactly is the Chop Shop in Williston?", "22 Merchants Row at Taft Corners, on the corner of Route 2A and Marshall Avenue, sharing a building with Casa Grande."],
      ["Is the chocolate made in Williston?", "It's chopped and bagged at our production space at 160 Boyer Circle in Williston, then sold at the Chop Shop and shipped from there."],
      ["Can I try before I buy?", "Yes. Samples are out every day we're open, and you're welcome to taste across the 34%, 54% and 70% before choosing."],
    ],
  },
  {
    slug: "south-burlington",
    name: "South Burlington",
    short: "South Burlington",
    minutes: "about 10 min",
    miles: "about 5 mi",
    from: "Dorset Street",
    route: ["Take Williston Road (US-2) east past the airport.", "Stay on US-2 into Williston and turn left onto Route 2A north at Taft Corners.", "Or hop on I-89 south one exit to Exit 12 and head north on 2A."],
    intro: "South Burlington is our closest neighbor to the west, and a lot of our regulars commute through Taft Corners on the way home. It's an easy detour off Williston Road.",
    occasions: [
      { title: "Office treats", text: "A few bags of Rough Cuts on the break-room table beats a box of donuts. Ask about corporate orders for teams along Kimball Ave and Community Drive.", pick: "belgian-54-dark-chocolate" },
      { title: "Visitors flying in", text: "Meeting someone at BTV? A bag of Vermont-chopped chocolate is a better welcome than anything in the terminal.", pick: "dark-mint-truffles" },
      { title: "Game night", text: "Mix 34% milk with salted pretzels and dried cranberries for a no-cook board.", pick: "roughly-chopped-34-milk-chocolate" },
    ],
    getIt: "Swing by on the way home, or order online and we'll ship it 2-day. Shipping is free over $50.",
    faq: [
      ["How long is the drive from South Burlington?", "About 10 minutes from Dorset Street, either straight out Williston Road (US-2) or one exit down I-89."],
      ["Do you do office or corporate orders?", "Yes. Use the corporate form on our Gifts page with your headcount and date, and Jeff will put together bags and a quote."],
      ["Is there parking?", "Yes, there's a lot right out front at 22 Merchants Row."],
    ],
  },
  {
    slug: "burlington",
    name: "Burlington",
    short: "Burlington",
    minutes: "about 15–20 min",
    miles: "about 10 mi",
    from: "downtown",
    route: ["From downtown, take Main Street to I-89 south (or Williston Road east).", "Take Exit 12 for Williston and turn north on Route 2A.", "We're at the Marshall Avenue light, at 22 Merchants Row."],
    intro: "From Church Street, the Chop Shop is a short drive out past the airport. Plenty of our customers found us at Burlington markets first and came out to taste the full lineup.",
    occasions: [
      { title: "Parents' weekend and graduation", text: "A bag of truffles to send home with a UVM or Champlain College student, or for the family visiting from away.", pick: "dark-chocolate-raspberry-truffles" },
      { title: "Dinner party on the hill", text: "The 70% extra dark next to a cheese plate and a bottle of red is all the dessert you need.", pick: "belgian-chocolate-roughly-chopped-70-extra-dark-chocolate" },
      { title: "Holiday shopping off Church Street", text: "Skip the crowds. Pick up gifts in one stop, and we'll tell you which bag fits which person.", pick: "milk-chocolate-caramel-truffles" },
    ],
    getIt: "Drive out for samples Wednesday to Sunday, or order online for 2-day shipping, free over $50.",
    faq: [
      ["Is The Chocolate Butcher in Burlington?", "The Chop Shop is in Williston, about 15 to 20 minutes from downtown Burlington via I-89 Exit 12 or Williston Road."],
      ["Can I send chocolate to a UVM student?", "Yes. Order online and we'll ship 2-day to their address. In warmer months it goes out insulated and iced."],
      ["What's good with wine?", "Our 70% extra dark with a big red, and the dark mint truffles with Champagne. Every truffle bag lists pairings on the back."],
    ],
  },
  {
    slug: "essex",
    name: "Essex & Essex Junction",
    short: "Essex",
    minutes: "about 10 min",
    miles: "about 5 mi",
    from: "Five Corners",
    route: ["From Five Corners, take Route 2A (Park Street) south.", "Stay on 2A across the river into Williston.", "We're on the left at the Marshall Avenue light, just before Taft Corners."],
    intro: "Essex Junction is a straight shot down Route 2A. You don't need the highway: Five Corners to the Chop Shop is about ten minutes.",
    occasions: [
      { title: "Fair week", text: "Heading to the Champlain Valley Fair? Grab a bag for the car. Chocolate holds up better than fried dough.", pick: "milk-chocolate-roughly-chopped" },
      { title: "Shift snacks", text: "A 7 oz bag lasts a week in a desk drawer, if you're disciplined.", pick: "belgian-54-dark-chocolate" },
      { title: "Hosting at home", text: "Build a board for the neighbors with 54% dark, salted cashews and Vermont cheddar.", pick: "semisweet-dark-chocolate-roughly-chopped" },
    ],
    getIt: "Come down 2A Wednesday to Sunday, 12 to 7, or order online for 2-day shipping.",
    faq: [
      ["How do I get to the Chop Shop from Essex Junction?", "Take Route 2A south from Five Corners straight into Williston. We're at 22 Merchants Row, at the Marshall Avenue light."],
      ["Are you open on weekends?", "Yes, Wednesday through Sunday, 12 to 7. We're closed Monday and Tuesday."],
      ["Do you have dark chocolate without dairy?", "Check the ingredient list on each product page. The truffles and milk chocolates contain milk, and allergens are listed per bag."],
    ],
  },
  {
    slug: "colchester",
    name: "Colchester",
    short: "Colchester",
    minutes: "about 20 min",
    miles: "about 12 mi",
    from: "Exit 16",
    route: ["Take I-89 south from Exit 16 (or Exit 17 from Malletts Bay).", "Get off at Exit 12 for Williston.", "Turn north on Route 2A; we're at 22 Merchants Row on the Marshall Avenue corner."],
    intro: "From Colchester it's an easy run down I-89. In summer, that means a bag for the boat; in winter, a bag for the drive back from the slopes.",
    occasions: [
      { title: "Malletts Bay afternoons", text: "Chocolate for the beach bag. In warm weather keep it in the cooler; we ship insulated and iced for the same reason.", pick: "roughly-chopped-34-milk-chocolate" },
      { title: "Saint Mike's care packages", text: "Send a bag of truffles to a student for exams. We'll ship it 2-day.", pick: "dark-mint-truffles" },
      { title: "Book club", text: "Two bags and a bottle of Pinot Noir. The caramel truffles list it as a pairing.", pick: "milk-chocolate-caramel-truffles" },
    ],
    getIt: "About 20 minutes down I-89. Or order online and have it at your door in 2 days.",
    faq: [
      ["How far is the Chop Shop from Colchester?", "About 20 minutes via I-89 south to Exit 12, then north on Route 2A."],
      ["Will chocolate melt in summer shipping?", "In warmer months we pack orders insulated and iced, and ship 2-day."],
      ["What's the best gift under $50?", "Our two-truffle deal is $32, or mix any four chocolate bags for $48."],
    ],
  },
  {
    slug: "shelburne",
    name: "Shelburne",
    short: "Shelburne",
    minutes: "about 20 min",
    miles: "about 12 mi",
    from: "the village",
    route: ["Take Route 7 north, then I-189 east to I-89 south.", "Take Exit 12 for Williston.", "Turn north on Route 2A to 22 Merchants Row."],
    intro: "Shelburne loves a good spread: farm cheese, local wine, a long table. Our Rough Cuts were made for exactly that board.",
    occasions: [
      { title: "Wedding welcome bags", text: "Guests in town for a farm wedding? A small bag of truffles in each welcome tote. Ask us about quantities.", pick: "dark-chocolate-raspberry-truffles" },
      { title: "Wine and cheese night", text: "70% extra dark with a red, 54% with a cheddar. Use the board builder to size it.", pick: "belgian-chocolate-roughly-chopped-70-extra-dark-chocolate" },
      { title: "Hostess gifts", text: "Bring a bag of caramel truffles instead of another candle.", pick: "milk-chocolate-caramel-truffles" },
    ],
    getIt: "Make the 20-minute drive for samples, or order online with 2-day shipping, free over $50.",
    faq: [
      ["Can you do chocolate for a wedding?", "Yes. Tell us the guest count and date through the corporate and event form on the Gifts page and we'll plan the bags."],
      ["Which chocolate goes with wine?", "The truffle bags list pairings: dark mint with Cabernet Sauvignon, Pinot Noir or Champagne; milk caramel with Pinot Noir, Merlot or Champagne."],
      ["How do I get there from Shelburne?", "Route 7 north to I-189, then I-89 south to Exit 12 and north on Route 2A. About 20 minutes."],
    ],
  },
  {
    slug: "winooski",
    name: "Winooski",
    short: "Winooski",
    minutes: "about 15 min",
    miles: "about 8 mi",
    from: "the roundabout",
    route: ["From the roundabout, take Main Street to I-89 at Exit 15.", "Head south to Exit 12 for Williston.", "Turn north on Route 2A to 22 Merchants Row."],
    intro: "Winooski does food well, so it knows the difference between candy and chocolate. Come taste three cacao levels side by side.",
    occasions: [
      { title: "After dinner downtown", text: "Keep a bag of 54% in the car for dessert after the roundabout restaurants close.", pick: "belgian-54-dark-chocolate" },
      { title: "Housewarming", text: "New apartment at the mills? Chocolate is the gift that doesn't need shelf space for long.", pick: "milk-chocolate-roughly-chopped" },
      { title: "Baking", text: "Rough Cuts melt for molding and hot chocolate (temper first). Big pieces make better cookie puddles than chips.", pick: "semisweet-dark-chocolate-roughly-chopped" },
    ],
    getIt: "Fifteen minutes by I-89, or 2-day shipping right to your door.",
    faq: [
      ["Can I bake with Rough Cuts?", "Yes. They work for melting, molding and hot chocolate (tempering required) and make great chunks in cookies."],
      ["How long from Winooski?", "About 15 minutes via I-89 south from Exit 15 to Exit 12."],
      ["Do you have bundle deals?", "Mix any four chocolate bags for $48 or two for $26; two truffle bags are $32 and four are $60."],
    ],
  },
  {
    slug: "jericho-underhill",
    name: "Jericho & Underhill",
    short: "Jericho",
    minutes: "about 20–25 min",
    miles: "about 12 mi",
    from: "Jericho Center",
    route: ["Head west on Route 15 toward Essex.", "At Five Corners, pick up Route 2A south.", "Follow 2A into Williston to 22 Merchants Row."],
    intro: "Coming down off the mountain? The Chop Shop is on the way to almost everything in Williston, and chocolate is the right reward after a day on Mansfield.",
    occasions: [
      { title: "Trail snack", text: "A handful of 70% extra dark weighs nothing and goes a long way on the Long Trail.", pick: "belgian-chocolate-roughly-chopped-70-extra-dark-chocolate" },
      { title: "Après ski", text: "Mint truffles and hot cocoa after Smuggs or Bolton.", pick: "dark-mint-truffles" },
      { title: "Snow day baking", text: "Chop-free chunks for a batch of cookies when the roads are closed.", pick: "milk-chocolate-roughly-chopped" },
    ],
    getIt: "About 20 to 25 minutes via Route 15 and 2A, or order online for 2-day shipping.",
    faq: [
      ["What's the best chocolate for hiking?", "The 70% extra dark Rough Cuts: bold, a hint of bitter, and less sweet, so it doesn't get cloying."],
      ["How do I get there from Jericho?", "Route 15 west to Five Corners in Essex Junction, then Route 2A south into Williston."],
      ["Are you open Sundays?", "Yes, 12 to 7, Wednesday through Sunday."],
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    short: "Richmond",
    minutes: "about 15 min",
    miles: "about 9 mi",
    from: "the village",
    route: ["Take US-2 west out of the village (or I-89 north from Exit 11).", "Stay on US-2 into Williston.", "At Taft Corners, turn right onto Route 2A north to 22 Merchants Row."],
    intro: "Richmond is just up US-2. Plenty of our customers stop in on the way home from work in Burlington, so the Chop Shop is right on the route.",
    occasions: [
      { title: "Ski weekends", text: "Chocolate for the lodge after a day at Cochran's.", pick: "roughly-chopped-34-milk-chocolate" },
      { title: "Farmers market potlucks", text: "A bag of SemiSweet next to the berries always goes first.", pick: "semisweet-dark-chocolate-roughly-chopped" },
      { title: "Stocking stuffers", text: "Small, light and under $20. One bag per stocking.", pick: "dark-chocolate-raspberry-truffles" },
    ],
    getIt: "About 15 minutes on US-2, or order online for 2-day shipping.",
    faq: [
      ["Is the Chop Shop on the way from Richmond to Burlington?", "Close to it. Stay on US-2 into Williston and turn north on Route 2A at Taft Corners."],
      ["How much are stocking stuffers?", "Every bag is between $14.50 and $17.50."],
      ["What are your hours?", "Wednesday through Sunday, 12 to 7."],
    ],
  },
  {
    slug: "hinesburg",
    name: "Hinesburg",
    short: "Hinesburg",
    minutes: "about 20 min",
    miles: "about 11 mi",
    from: "the village",
    route: ["Take Route 116 north toward South Burlington.", "Turn right on Hinesburg Road, then right on Williston Road (US-2) east.", "At Taft Corners, turn left onto Route 2A north to 22 Merchants Row."],
    intro: "From Hinesburg it's a pretty drive up 116. It's a good excuse to stock up before the holidays, when the country roads get slow.",
    occasions: [
      { title: "CVU team snacks", text: "A shareable bag for the bus ride to away games.", pick: "milk-chocolate-roughly-chopped" },
      { title: "Lake Iroquois days", text: "Chocolate for the cooler. It's packed to travel.", pick: "roughly-chopped-34-milk-chocolate" },
      { title: "Holiday hosting", text: "A full board for the family, sized by guest count.", pick: "belgian-54-dark-chocolate" },
    ],
    getIt: "About 20 minutes by 116 and US-2, or 2-day shipping, free over $50.",
    faq: [
      ["How do I get to the Chop Shop from Hinesburg?", "Route 116 north, Hinesburg Road to Williston Road (US-2) east, then north on Route 2A at Taft Corners."],
      ["How much chocolate do I need for a party?", "About an ounce of chocolate and two truffles per guest. The Build a Board page does the math."],
      ["Do you ship within Vermont?", "Yes, 2-day shipping, free on orders over $50."],
    ],
  },
  {
    slug: "boston",
    name: "Greater Boston",
    short: "Boston",
    minutes: "2-day shipping",
    miles: "about 210 mi",
    from: "Boston",
    route: ["Order online and we ship 2-day from Williston, free over $50.", "In warmer months, orders go out insulated and iced.", "Driving up? It's about 3.5 hours via I-93 N and I-89 N, and Exit 12 puts you a minute from the shop."],
    intro: "Vermont-made, Boston-raised. Jeff grew up outside Boston, and for about ten years our chocolate was on grocery shelves in Massachusetts before the Chop Shop opened. Most of our Boston customers now order direct.",
    occasions: [
      { title: "Client gifts", text: "Firms around Boston send Vermont chocolate in December. Tell us the headcount and we'll handle the bags.", pick: "milk-chocolate-caramel-truffles" },
      { title: "Taste of Vermont", text: "For the Bostonian who skied every winter in college and misses it.", pick: "dark-mint-truffles" },
      { title: "Fall foliage trip", text: "Drive up for leaf season and take home a few bags for the office.", pick: "belgian-54-dark-chocolate" },
    ],
    getIt: "Ships 2-day to Greater Boston, free over $50. Christmas orders: place them by Dec 17.",
    faq: [
      ["Do you ship to Boston?", "Yes, 2-day shipping from Williston, free on orders over $50, packed insulated and iced in warmer months."],
      ["What's the Christmas shipping cutoff for Massachusetts?", "Order by noon on Thursday, Dec 17, 2026 for Christmas delivery."],
      ["Can I send corporate gifts to a Boston office?", "Yes. Use the corporate form on the Gifts page with headcount and date, and we'll quote it."],
    ],
  },
];

export const townBySlug: Record<string, Town> = Object.fromEntries(TOWNS.map((t) => [t.slug, t]));
