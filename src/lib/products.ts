export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  fabric: string;
  description: string;
  details: string[];
  sizes: string[];
  badge?: string;
};

const px = (id: number, w = 900, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const HERO_IMAGE = px(9199098, 1920, 1280);

/* Cinematic hero film — Thomas Shelby style, slow drag + exhale (UHD 4K
   public MP4). Loops forever with autoPlay + muted + loop + playsInline. */
export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/14500437/14500437-uhd_3840_2160_25fps.mp4";
export const HERO_VIDEO_POSTER = px(9199098, 1920, 1280);

/* Fallback still — shown ONLY if the video file itself fails to load. */
export const HERO_FREEZE = "/images/hero-shelby-freeze.jpg";
export const ATELIER_FITTING = px(6764997, 1600, 1000);
export const ATELIER_CUTTING = px(17731748, 1400, 900);
export const ATELIER_CHECK = px(6764919, 1400, 900);

export const CATEGORIES = [
  "Tailoring",
  "Shirts",
  "Outerwear",
  "Leather Goods",
  "Evening Wear",
  "Weekend Edit",
] as const;

export const COLLECTIONS = [
  {
    name: "Tailoring",
    line: "Suits, blazers & waistcoats, cut to the half-inch.",
    image: px(33800036),
  },
  {
    name: "Shirts",
    line: "Poplin, oxford & fine flannel, finished by hand.",
    image: px(8346218),
  },
  {
    name: "Outerwear",
    line: "Trenches, overcoats & country wool for the London season.",
    image: px(8346041),
  },
  {
    name: "Leather Goods",
    line: "Calf, bridle & vegetable-tanned. Made to outlast you.",
    image: px(9566324),
  },
  {
    name: "Evening Wear",
    line: "Dinner jackets and silk — the house after dark.",
    image: px(37322579),
  },
  {
    name: "Weekend Edit",
    line: "Knitwear, shoes & the quiet art of dressing down.",
    image: px(14641430),
  },
];

const SUITS = ["36R", "38R", "40R", "42R", "44R", "46R"];
const SHIRTS = ["15.5", "16", "16.5", "17", "17.5"];
const COATS = ["46", "48", "50", "52", "54"];
const TROUSERS = ["30", "32", "34", "36"];
const SHOES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"];
const KNITS = ["S", "M", "L", "XL"];
const ONE = ["One Size"];

export const PRODUCTS: Product[] = [
  {
    slug: "the-belgravia-suit",
    name: "The Belgravia Suit",
    category: "Tailoring",
    price: 1895,
    image: px(20428090),
    fabric: "Super 130s wool, Loro Piana",
    description:
      "Our definitive three-piece. Half-canvas construction, a soft shoulder and a waistcoat that has carried the house name since 1934. Cut to sit high, close and effortless.",
    details: [
      "Half-canvas, hand-padded lapels",
      "Pick-stitched pocket welts, five-button back vent",
      "Corozo horn buttons, charcoal silk lining",
      "Complimentary first alteration with every suit",
    ],
    sizes: SUITS,
    badge: "Atelier Favourite",
  },
  {
    slug: "mayfair-two-piece",
    name: "Mayfair Two-Piece",
    category: "Tailoring",
    price: 1450,
    image: px(34319006),
    fabric: "Super 150s wool",
    description:
      "A razor-dry two-piece in midnight blue, woven on a loom that has served English tailors for four generations. The everyday answer to every occasion.",
    details: [
      "Semi-lined for weightless drape",
      "Single-vent, flat-front trouser",
      "Hand-felled lapels, mother-of-pearl buttons",
      "Unpickable seams throughout",
    ],
    sizes: SUITS,
  },
  {
    slug: "st-james-blazer",
    name: "St James Blazer",
    category: "Tailoring",
    price: 745,
    image: px(31280406),
    fabric: "Flannel & hopsack",
    description:
      "An unstructured evening blazer cut from a soft, light-touch flannel. Worn open over a T-shirt on Thursday, buttoned with a dinner jacket by midnight.",
    details: [
      "Unpadded, unstructured shoulder",
      "Two-button stance, patch pockets",
      "Brushed twill lining, hand-finished edge",
      "Available in midnight navy only",
    ],
    sizes: SUITS,
    badge: "New for 2026",
  },
  {
    slug: "pimlico-waistcoat",
    name: "Pimlico Waistcoat",
    category: "Tailoring",
    price: 325,
    image: px(34327744),
    fabric: "Wool & silk",
    description:
      "Five buttons, a low V, and a back panel of elasticated silk for an untroubled fit. The quiet workhorse of a three-piece wardrobe.",
    details: [
      "Elasticated back panel",
      "Single lower pocket with flap",
      "Silk-faced placket, corozo buttons",
      "Cut to pair with the Belgravia jacket",
    ],
    sizes: SUITS,
  },
  {
    slug: "wrenford-poplin-shirt",
    name: "Wrenford Poplin Shirt",
    category: "Shirts",
    price: 185,
    image: px(10131161),
    fabric: "Egyptian cotton poplin, 100s",
    description:
      "The shirt our clients ask for by name. A crisp spread collar in 100-count Egyptian cotton, cut through the shoulder for a modern, unbroken line.",
    details: [
      "Two-needle French cuffs",
      "Cut-through shoulder, curved back hem",
      "Mother-of-pearl buttons to the waistband",
      "Washed once, hand-pressed at the house",
    ],
    sizes: SHIRTS,
    badge: "Atelier Favourite",
  },
  {
    slug: "carlton-oxford-shirt",
    name: "Carlton Oxford Shirt",
    category: "Shirts",
    price: 165,
    image: px(14459666),
    fabric: "Oxford cotton, 2-ply",
    description:
      "A soft, dry-hand oxford in bone white. Softer with every wash, it is the shirt that outlives its rivals and outlives the decade.",
    details: [
      "Button-down collar, cut through shoulder",
      "Y-seams for all-day ease",
      "Gusseted cuffs, mother-of-pearl buttons",
      "Garment-dyed to a soft chalk white",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "grosvenor-overcoat",
    name: "Grosvenor Overcoat",
    category: "Outerwear",
    price: 1195,
    image: px(14833749),
    fabric: "Double-faced wool, 480gsm",
    description:
      "A heavy, storm-proof overcoat in charcoal grey, cut long enough to shield a tailored trouser. The house coat of choice through every Mayfair winter.",
    details: [
      "Double-faced wool, bound seams",
      "Full horn-button closure",
      "Interior pocket for gloves",
      "Naturally water-shedding finish",
    ],
    sizes: COATS,
  },
  {
    slug: "chester-trench",
    name: "Chester Trench",
    category: "Outerwear",
    price: 985,
    image: px(16470015),
    fabric: "Bonded cotton gabardine",
    description:
      "Our reinterpretation of the classic trench — storm flap, horn buckle and a water-repellent cotton that breaks in like a good glove.",
    details: [
      "Bonded seam construction",
      "Storm flap, gun flap & horn belt",
      "Cotton twill lining",
      "Cut generously over a suit",
    ],
    sizes: COATS,
    badge: "New for 2026",
  },
  {
    slug: "berkshire-wool-coat",
    name: "Berkshire Wool Coat",
    category: "Outerwear",
    price: 1050,
    image: px(35714493),
    fabric: "Harris-inspired tweed",
    description:
      "A country coat in a hard-spun brown tweed, cut boxy and warm for the fields and the Friday after. Built to be worn for thirty years and apologised for by none.",
    details: [
      "Full canvas front, wool-lined",
      "Pick-stitched welt pockets",
      "Patch back pocket for the dog",
      "Waxed cotton lining at the shoulder",
    ],
    sizes: COATS,
    badge: "Atelier Favourite",
  },
  {
    slug: "kensington-briefcase",
    name: "Kensington Leather Briefcase",
    category: "Leather Goods",
    price: 695,
    image: px(6650001),
    fabric: "Vegetable-tanned calf leather",
    description:
      "Cut from a single hide of vegetable-tanned calf and lined in bottle green. A lifetime of briefs, in a case made to hold them all.",
    details: [
      "Single-hide vegetable-tanned calf",
      "Solid brass fittings, hand riveted",
      "Laptop compartment, bottle-green lining",
      "Finishes with a deep, natural patina",
    ],
    sizes: ONE,
  },
  {
    slug: "belgrave-card-case",
    name: "Belgrave Card Case",
    category: "Leather Goods",
    price: 245,
    image: px(7085799),
    fabric: "Bridle leather, edge-painted",
    description:
      "Eight cards, two notes, one hundred years of quiet use. Cut from bridle leather and edge-painted the house gold.",
    details: [
      "Eight card slots, twin note pockets",
      "Hand-painted edges in champagne gold",
      "Solid brass clasp, hand-set",
      "Made in our Mayfair leather workshop",
    ],
    sizes: ONE,
  },
  {
    slug: "mayfair-driving-gloves",
    name: "Mayfair Driving Gloves",
    category: "Leather Goods",
    price: 145,
    image: px(32725728),
    fabric: "Lambskin leather, cashmere-lined",
    description:
      "Featherweight lambskin lined with cashmere, cut for the open top and the opera box. The smallest luxury in the house, and the most worn.",
    details: [
      "Featherweight lambskin, cashmere lined",
      "Hand-stitched thumb gusset",
      "Fold-back cuff, gold-thread monogram option",
      "Sold as a single pair, as it should be",
    ],
    sizes: ONE,
    badge: "New for 2026",
  },
  {
    slug: "cavendish-dinner-jacket",
    name: "Cavendish Dinner Jacket",
    category: "Evening Wear",
    price: 1295,
    image: px(16213983),
    fabric: "Midnight wool, silk lapels",
    description:
      "The house dinner jacket: midnight wool, silk peak lapels and a single button. Made for the ballroom, the gallery opening and the rare evening that matters.",
    details: [
      "Silk peak lapels, hand-padded",
      "Single corozo button, back vent",
      "Two inside pockets, ticket pocket",
      "Trousers in silk-faced midnight wool",
    ],
    sizes: SUITS,
  },
  {
    slug: "regent-silk-trousers",
    name: "Regent Silk Trousers",
    category: "Evening Wear",
    price: 395,
    image: px(29210804),
    fabric: "Silk-faced wool, satin peak",
    description:
      "The trouser half of formal evening dress — a soft, lustrous peak and a clean break over a wholecut shoe. Never creased, never hurried.",
    details: [
      "Satin peak, 4cm",
      "Elasticated back for the late hour",
      "Clean break, side tab adjuster",
      "Pressed to order at the house",
    ],
    sizes: TROUSERS,
  },
  {
    slug: "kensington-loafer",
    name: "Kensington Penny Loafer",
    category: "Weekend Edit",
    price: 495,
    image: px(8069881),
    fabric: "Hand-burnished calf, leather sole",
    description:
      "A penny loafer in hand-burnished tan calf, built on a flexible leather sole. Dressed down to socks by day, polished and resoled by the house when it's time.",
    details: [
      "Hand-burnished tan calf",
      "Blake-stitched leather sole",
      "Leather footbed, natural lining",
      "Fits a low-sock, no-anklet silhouette",
    ],
    sizes: SHOES,
  },
  {
    slug: "halford-oxford",
    name: "Halford Oxford Shoe",
    category: "Weekend Edit",
    price: 525,
    image: px(6766308),
    fabric: "Patent-ready calf, leather sole",
    description:
      "A closed-lace oxford in dark brown calf that will shine like patent within a season of honest wear. The sole shoe to pair with a three-piece.",
    details: [
      "Closed-lace (oxford) construction",
      "Blake-stitched, resoleable",
      "Dark brown calf, edge waxed",
      "Fits true to the house last",
    ],
    sizes: SHOES,
    badge: "Atelier Favourite",
  },
  {
    slug: "hartwell-derby",
    name: "Hartwell Derby",
    category: "Weekend Edit",
    price: 465,
    image: px(15557045),
    fabric: "Polished calf, leather sole",
    description:
      "An open-lace derby in polished black, cut for the broader foot and the longer day. Comfortable enough to forget you're wearing it; handsome enough to be remembered for it.",
    details: [
      "Open-lace (derby) construction",
      "Polished black calf, tonal stitching",
      "Corked, mouldable footbed",
      "Fits half a size large — we suggest true",
    ],
    sizes: SHOES,
  },
  {
    slug: "belgravia-cashmere-crew",
    name: "Belgravia Cashmere Crew",
    category: "Weekend Edit",
    price: 345,
    image: px(30569741),
    fabric: "12-gauge Mongolian cashmere",
    description:
      "A 12-gauge crew in undyed oat cashmere, knitted slowly on looms that have worked the same pattern since the fifties. The house uniform for the weekend.",
    details: [
      "12-gauge Mongolian cashmere",
      "Fully fashioned seams, no bulk",
      "Ribbed neck, cuff and hem",
      "Knitted to size, never heat-shrunk",
    ],
    sizes: KNITS,
  },
  {
    slug: "belgrave-morning-coat",
    name: "Belgrave Morning Coat",
    category: "Tailoring",
    price: 1395,
    image: px(27871997),
    fabric: "Blue worsted, single-faced",
    description:
      "Sweeping tails, a single button and no front pockets but one — the morning coat, cut in the old way for races, weddings and anything worth arriving early to.",
    details: [
      "Cinch and tails, hand-pressed",
      "Single corozo button stance",
      "Blue worsted, silk-lined lapel",
      "Made to order, six weeks, no exceptions",
    ],
    sizes: SUITS,
  },
  {
    slug: "rutland-pinstripe-suit",
    name: "Rutland Pinstripe Suit",
    category: "Tailoring",
    price: 1595,
    image: px(4464880),
    fabric: "Super 120s pinstripe wool",
    description:
      "One inch apart, charcoal on midnight. The pinstripe is the house's loudest quiet word — cut with a full canvas and a back vent that moves when you do.",
    details: [
      "Full-canvas construction",
      "Single back vent, two-needle buttonholes",
      "Pinstripe set to the body, not the light",
      "Charcoal on midnight, unlined sleeve",
    ],
    sizes: SUITS,
    badge: "Atelier Favourite",
  },
  {
    slug: "kensington-flannel-shirt",
    name: "Kensington Flannel Shirt",
    category: "Shirts",
    price: 175,
    image: px(5908375),
    fabric: "Brushed cotton flannel",
    description:
      "A soft, dry hand and a check that holds its nerve. The flannel shirt, made properly — cut boxy enough for a jumper, close enough to wear alone.",
    details: [
      "Brushed 8oz cotton flannel",
      "Button-down collar, spread chest yoke",
      "Bar-tacked at every stress point",
      "Washed once to settle, never to shrink",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "wrentham-camp-collar",
    name: "Wrentham Camp Collar Shirt",
    category: "Shirts",
    price: 195,
    image: px(6068961),
    fabric: "Washed cotton poplin",
    description:
      "An open collar, a light hand, and no tie required until someone asks you for one. The Wrentham is the house's answer to a long afternoon.",
    details: [
      "Open camp collar, button to the top",
      "Single chest pocket, flapped",
      "Curved hem, cut for in or out",
      "Washed poplin — soft from the first wear",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "hampstead-linen-shirt",
    name: "Hampstead Linen Shirt",
    category: "Shirts",
    price: 155,
    image: px(7671168),
    fabric: "European flax linen",
    description:
      "Linen that creases and is never apologised for. Stone-grey, cut relaxed through the body, and cool in a way no cotton can manage.",
    details: [
      "100% European flax, 150gsm",
      "Relaxed body, regular collar",
      "Mother-of-pearl buttons throughout",
      "The crease is the point, iron optional",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "aldersgate-striped-shirt",
    name: "Aldersgate Striped Shirt",
    category: "Shirts",
    price: 175,
    image: px(33302806),
    fabric: "Poplin, fine stripe",
    description:
      "A fine stripe in powder blue on white — narrow enough to sit inside a waistcoat, clear enough to read from across the room.",
    details: [
      "Fine 10/10 powder blue stripe",
      "Crisp 100s poplin",
      "French cuffs, two-needle",
      "Cut through the shoulder for a clean break",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "harrow-pea-coat",
    name: "Harrow Pea Coat",
    category: "Outerwear",
    price: 695,
    image: px(12299940),
    fabric: "Melton wool, double-breasted",
    description:
      "Short enough to run in, thick enough not to. The pea coat in black melton, six brass buttons, and a collar that comes up when the day changes its mind.",
    details: [
      "Double-breasted, six brass buttons",
      "Heavyweight melton, bound seams",
      "Patch pockets, wool-faced",
      "Cropped to sit above the hip",
    ],
    sizes: COATS,
    badge: "New for 2026",
  },
  {
    slug: "clerkenwell-duffle-coat",
    name: "Clerkenwell Duffle Coat",
    category: "Outerwear",
    price: 595,
    image: px(14585229),
    fabric: "Waxed twill, natural horn toggles",
    description:
      "The school uniform of every English winter, made by an adult who can afford to be fussy. Waxed twill, horn toggles, a hood that is actually there.",
    details: [
      "Water-resistant waxed twill",
      "Natural horn toggles and loop",
      "Full hood, stowable",
      "Two front flap pockets, one inner",
    ],
    sizes: COATS,
  },
  {
    slug: "savile-storm-mac",
    name: "Savile Storm Mac",
    category: "Outerwear",
    price: 495,
    image: px(8274720),
    fabric: "Waterproof cotton, sealed seams",
    description:
      "For the forty minutes of rain that decide a day. A storm-proven mac with sealed seams and a storm flap, cut to fit over the Grosvenor without swallowing it.",
    details: [
      "Fully taped seams, 10,000mm rating",
      "Storm flap and triple snap cuff",
      "Adjustable hood, elastic waist",
      "Sheds water like it's personal",
    ],
    sizes: COATS,
  },
  {
    slug: "rutland-leather-belt",
    name: "Rutland Leather Belt",
    category: "Leather Goods",
    price: 95,
    image: px(38053200),
    fabric: "Vegetable-tanned calf",
    description:
      "A 3cm belt in vegetable-tanned calf with a solid silver-plate buckle, cut to your trouser size and edge-painted to match the house.",
    details: [
      "Single piece of veg-tan calf, 3cm",
      "Solid silver-plate buckle",
      "Edges painted champagne gold",
      "Made to your size, free adjustment",
    ],
    sizes: ONE,
  },
  {
    slug: "hampstead-weekender",
    name: "Hampstead Weekender Bag",
    category: "Leather Goods",
    price: 895,
    image: px(167686),
    fabric: "Full-grain bridle leather",
    description:
      "Forty-eight hours, one bag. Full-grain bridle, a shoe compartment lined in cotton twill, and a base that has walked from Mayfair to every platform that matters.",
    details: [
      "Full-grain bridle, hand-laid",
      "Separate twill-lined shoe pocket",
      "Solid brass hardware, riveted",
      "Carry handle with leather wrap",
    ],
    sizes: ONE,
    badge: "Atelier Favourite",
  },
  {
    slug: "grosvenor-bifold-wallet",
    name: "Grosvenor Bifold Wallet",
    category: "Leather Goods",
    price: 225,
    image: px(37326708),
    fabric: "Box calf, hand-stitched",
    description:
      "A bifold in dark box calf, stitched by hand with waxed linen thread. Six cards, a note, and nothing it does not need.",
    details: [
      "Dark box calf, burnished edges",
      "Hand-stitched, waxed linen thread",
      "Six card slots, twin note pockets",
      "Delivered in the house gift box",
    ],
    sizes: ONE,
  },
  {
    slug: "wrentham-opera-coat",
    name: "Wrentham Opera Coat",
    category: "Evening Wear",
    price: 1450,
    image: px(5264910),
    fabric: "Midnight wool, silk lapels",
    description:
      "Floor-length, midnight, and cut with a swing for the walk in. The opera coat is the house's most dramatic garment and its most restrained — it says everything in a single line.",
    details: [
      "Single-faced midnight wool",
      "Silk shawl lapels, hand-padded",
      "Floor-length sweep, single vent",
      "Cut with a swing for movement",
    ],
    sizes: COATS,
  },
  {
    slug: "regent-silk-tie",
    name: "Regent Silk Tie",
    category: "Evening Wear",
    price: 85,
    image: px(12700581),
    fabric: "Mulberry silk, hand-rolled",
    description:
      "A mulberry silk tie in the house pattern — a fine chequer that reads as solid from across the room. Hand-rolled at the tip, self-faced, exactly 8 inches wide.",
    details: [
      "Mulberry silk, hand-rolled tip",
      "Self-faced, the correct weight of silk",
      "8-inch blade, uncut ends",
      "The house chequer, midnight on gold",
    ],
    sizes: ONE,
  },
  {
    slug: "belgrave-pocket-square",
    name: "Belgrave Silk Pocket Square",
    category: "Evening Wear",
    price: 65,
    image: px(29998298),
    fabric: "Mulberry silk, two-pack",
    description:
      "Two squares of mulberry silk — ivory and the house chequer — because one is never enough for a season. Pre-hemmed by hand, ready for the presidential fold.",
    details: [
      "Two-pack: ivory and house chequer",
      "Mulberry silk, hand-hemmed",
      "25cm square, the classic size",
      "Folded flat, pressed, boxed",
    ],
    sizes: ONE,
  },
  {
    slug: "aldersgate-bow-tie",
    name: "Aldersgate Silk Bow Tie",
    category: "Evening Wear",
    price: 45,
    image: px(13153341),
    fabric: "Silk, self-tied",
    description:
      "A self-tie bow in silk, the width of a decision. Worn at weddings, funerals and the occasional funeral of a bad first dance.",
    details: [
      "Self-tie, mulberry silk",
      "7cm width — the house standard",
      "Adjustable silk-lined band",
      "Keeps its shape; we check, honestly",
    ],
    sizes: ONE,
  },
  {
    slug: "rutland-monk-strap",
    name: "Rutland Monk Strap Shoe",
    category: "Weekend Edit",
    price: 495,
    image: px(5336942),
    fabric: "Dark calf, twin buckle",
    description:
      "A double monk in dark calf with two real buckles — the most adjustable shoe on the foot and the most likely to be stopped about on a street.",
    details: [
      "Double buckle, solid brass",
      "Blake-stitched, resoleable",
      "Dark calf, hand-burnished toe",
      "Fits true; the buckle does the work",
    ],
    sizes: SHOES,
    badge: "New for 2026",
  },
  {
    slug: "hampstead-cashmere-cardigan",
    name: "Hampstead Cashmere Cardigan",
    category: "Weekend Edit",
    price: 395,
    image: px(6276043),
    fabric: "12-gauge Mongolian cashmere",
    description:
      "The crew's smarter brother — the same 12-gauge cashmere, now with a button line and the sense of having read the terms of the day before dressing for it.",
    details: [
      "12-gauge Mongolian cashmere",
      "Corozo buttons to the bottom",
      "Fully fashioned, no shoulder bulk",
      "Wears with trousers or the good jeans",
    ],
    sizes: KNITS,
  },
  {
    slug: "chandos-hopsack-blazer",
    name: "Chandos Hopsack Blazer",
    category: "Tailoring",
    price: 895,
    image: px(35865086),
    fabric: "Wool hopsack, unlined",
    description:
      "A summer blazer in open-weave hopsack — unlined, unpadded, and light enough to forget by lunch. The bridge between the boardroom and the boat.",
    details: [
      "Unlined, breathable hopsack weave",
      "Soft unstructured shoulder",
      "Patch pockets, single corozo button",
      "Navy or stone, no third option",
    ],
    sizes: SUITS,
    badge: "New for 2026",
  },
  {
    slug: "clerkenwell-grey-flannel-suit",
    name: "Clerkenwell Grey Flannel Suit",
    category: "Tailoring",
    price: 1550,
    image: px(3459730),
    fabric: "Mid-grey flannel, Super 110s",
    description:
      "The grey flannel — the suit that has signed more treaties and closed more deals than it will ever know. Mid-grey, full canvas, cut straight and true.",
    details: [
      "Mid-grey flannel, Super 110s",
      "Full canvas, half-lined",
      "Straight-cut, single vent",
      "The house's most re-ordered suit",
    ],
    sizes: SUITS,
  },
  {
    slug: "wrentham-double-breasted",
    name: "Wrentham Double-Breasted",
    category: "Tailoring",
    price: 1750,
    image: px(35564328),
    fabric: "Midnight wool, full canvas",
    description:
      "Six buttons, one of them used. The double-breasted is the house's assertion of fact — cut close through the waist with a lapel that means it.",
    details: [
      "6x2 stance, cut to the waist",
      "Deep roll lapel, hand-padded",
      "Full canvas, single back vent",
      "Midnight, naturally",
    ],
    sizes: SUITS,
    badge: "Atelier Favourite",
  },
  {
    slug: "belgrave-tweed-blazer",
    name: "Belgrave Tweed Blazer",
    category: "Tailoring",
    price: 825,
    image: px(37524688),
    fabric: "Brown wool tweed",
    description:
      "A country blazer in hard-spun brown tweed, lined with a patch pocket for the dog and a ticket pocket for the tickets. Made for where the pavement gives out.",
    details: [
      "Hard-spun brown tweed",
      "Patch and jet pockets",
      "Corduroy-faced lapel option",
      "Slightly longer in the tail",
    ],
    sizes: SUITS,
  },
  {
    slug: "grosvenor-white-formal-shirt",
    name: "Grosvenor White Formal Shirt",
    category: "Shirts",
    price: 195,
    image: px(6276005),
    fabric: "Silk-touch poplin, 120s",
    description:
      "A white shirt so well made it looks like it has opinions. A cutaway collar, double-pleated back, and a cuff that sits under the watch, not over it.",
    details: [
      "120s silk-touch poplin",
      "Cutaway formal collar, 3.5in spread",
      "Double back-pleat construction",
      "Mother-of-pearl to the placket",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "chandos-houndstooth-shirt",
    name: "Chandos Houndstooth Shirt",
    category: "Shirts",
    price: 185,
    image: px(39176732),
    fabric: "Fine houndstooth cotton",
    description:
      "A fine houndstooth small enough to read as texture, clear enough to read as intention. The house's loudest shirt — and still, somehow, quiet.",
    details: [
      "Fine 3mm houndstooth, ivory and ink",
      "Spread collar, cut through shoulder",
      "Y-seams, gusseted cuffs",
      "Looks patterned up close; correct at a distance",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "wrentham-navy-oxford",
    name: "Wrentham Navy Oxford Shirt",
    category: "Shirts",
    price: 175,
    image: px(9594681),
    fabric: "Navy oxford, 2-ply",
    description:
      "The navy oxford — the only shirt a man can be caught in on any day of the week without incident. Soft hand, button-down collar, zero excuses.",
    details: [
      "True navy 2-ply oxford",
      "Button-down collar",
      "Soft from the first wash, softer by the fifth",
      "Pairs with everything it meets",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "belgrave-linen-stripe-shirt",
    name: "Belgrave Linen Stripe Shirt",
    category: "Shirts",
    price: 165,
    image: px(4641824),
    fabric: "European linen, fine stripe",
    description:
      "An oat linen with a whisper of stripe — light as a question, and wearing well by the second week. The shirt for the long lunch that overruns.",
    details: [
      "100% European flax, 140gsm",
      "Fine stripe in chalk and oat",
      "Open collar, cutaway to the waist",
      "Unworn-soft, and softening",
    ],
    sizes: SHIRTS,
  },
  {
    slug: "grosvenor-duster-coat",
    name: "Grosvenor Duster Coat",
    category: "Outerwear",
    price: 1295,
    image: px(8113002),
    fabric: "Full-grain leather, weatherproofed",
    description:
      "An ankle-length duster in saddle-brown leather, cut to part around the stride. The horseman's coat, now for the driver — with a pocket deep enough for the dog.",
    details: [
      "Full-grain, weatherproofed leather",
      "Ankle length, side-strap cuffs",
      "Belted, with a deep horse pocket",
      "Saddle brown, the colour of the trail",
    ],
    sizes: COATS,
  },
  {
    slug: "chandos-boiled-wool-coat",
    name: "Chandos Boiled Wool Coat",
    category: "Outerwear",
    price: 1150,
    image: px(9594671),
    fabric: "Boiled wool, brushed",
    description:
      "A brushed boiled-wool coat in soft brown — the weight of a proper coat, with the hand of something you would touch in a shop and not put back.",
    details: [
      "Brushed boiled wool, 400gsm",
      "Single-breasted, horn buttons",
      "Bound edges throughout",
      "Softens into the shape of its owner",
    ],
    sizes: COATS,
  },
  {
    slug: "mayfair-cashmere-overcoat",
    name: "Mayfair Cashmere Overcoat",
    category: "Outerwear",
    price: 1395,
    image: px(36180266),
    fabric: "Wool-cashmere blend, 320gsm",
    description:
      "A camel overcoat with 20% cashmere in the cloth — lighter on the shoulder, warmer at the collar, and the one a man is photographed in for the record.",
    details: [
      "80/20 wool-cashmere, 320gsm",
      "Semi-lined, hand-finished collar",
      "Three back pleats for the stride",
      "The photograph coat",
    ],
    sizes: COATS,
    badge: "Atelier Favourite",
  },
  {
    slug: "harrow-shearling-coat",
    name: "Harrow Shearling Coat",
    category: "Outerwear",
    price: 1450,
    image: px(12111440),
    fabric: "Sheepskin, brushed wool face",
    description:
      "A shearling-collared coat for the last month of the year — the warmest thing in the house, cut short, with a collar you would keep up.",
    details: [
      "Genuine shearling collar and cuffs",
      "Brushed wool face, quilted lining",
      "Cut hip-length for the stride",
      "The December coat, and January's",
    ],
    sizes: COATS,
  },
  {
    slug: "belgrave-messenger-bag",
    name: "Belgrave Messenger Bag",
    category: "Leather Goods",
    price: 695,
    image: px(29464416),
    fabric: "Vegetable-tanned calf, brass",
    description:
      "A satchle in vegetable-tanned calf with a rolled top and solid brass clasp — the bag for the man who still carries papers and has no shame about it.",
    details: [
      "Veg-tan calf, hand-rolled top",
      "Solid brass clasp and strap",
      "Twill-lined, twin document pockets",
      "Shoulder strap in matching calf",
    ],
    sizes: ONE,
  },
  {
    slug: "pimlico-key-ring",
    name: "Pimlico Key Ring",
    category: "Leather Goods",
    price: 75,
    image: px(16329491),
    fabric: "Calf leather, silver ring",
    description:
      "A leather-wrapped key ring in dark calf with a solid silver ring. The smallest piece of the house, sold at the counter, and the first thing a new client buys.",
    details: [
      "Dark calf, hand-wrapped ring",
      "Solid sterling-style silver",
      "Room for three keys, no more",
      "The counter classic, since 1934",
    ],
    sizes: ONE,
  },
  {
    slug: "st-james-luggage-tag",
    name: "St James Luggage Tag",
    category: "Leather Goods",
    price: 65,
    image: px(27872008),
    fabric: "Veg-tan calf, hand-stamped",
    description:
      "A luggage tag in vegetable-tanned calf, stamped by hand in the house script. For the weekender, the briefcase, the dog. Stamped, not printed.",
    details: [
      "Single-piece veg-tan calf",
      "Hand-stamped in the house script",
      "Solid ring and reinforced stitch",
      "Darkens beautifully with the luggage",
    ],
    sizes: ONE,
    badge: "New for 2026",
  },
  {
    slug: "wrenford-watch-strap",
    name: "Wrenford Watch Strap",
    category: "Leather Goods",
    price: 120,
    image: px(28157826),
    fabric: "Calf leather, 20mm",
    description:
      "A 20mm strap in dark calf, stitched in the house and fitted to your watch. The house fits it, breaks it in, and guarantees the first re-stitch free.",
    details: [
      "Dark calf, hand-stitched",
      "20mm, quick-change pins",
      "Silver or gold pin fitting",
      "First re-stitch on us, no questions",
    ],
    sizes: ONE,
  },
  {
    slug: "grosvenor-midnight-tuxedo",
    name: "Grosvenor Midnight Tuxedo",
    category: "Evening Wear",
    price: 1395,
    image: px(6065984),
    fabric: "Midnight wool, silk peak",
    description:
      "The complete midnight set — dinner jacket and silk-trouser, pressed and boxed as one. For the evenings that are in the album, not the story.",
    details: [
      "Jacket and silk-faced trousers",
      "Silk peak lapels, hand-padded",
      "Single corozo button, back vent",
      "Boxed as a set, with the silk tie",
    ],
    sizes: SUITS,
    badge: "New for 2026",
  },
  {
    slug: "chandos-silk-cummerbund",
    name: "Chandos Silk Cummerbund",
    category: "Evening Wear",
    price: 95,
    image: px(31517347),
    fabric: "Mulberry silk, house chequer",
    description:
      "A cummerbund in the house chequer, deep enough to hide a secret and handsome enough to be the point. Worn low, as the rules require.",
    details: [
      "Mulberry silk, house chequer",
      "Elasticated back, 9cm deep",
      "Folds to the correct depth, we checked",
      "Worn with the Grosvenor set",
    ],
    sizes: ONE,
  },
  {
    slug: "savile-velvet-smoking-jacket",
    name: "Savile Velvet Smoking Jacket",
    category: "Evening Wear",
    price: 495,
    image: px(37900994),
    fabric: "Silk-velvet, shawl collar",
    description:
      "A midnight silk-velvet smoking jacket with a shawl collar — for the study, the opera interval, and the last drink when the guests have gone.",
    details: [
      "Midnight silk-velvet",
      "Shawl collar, jetted pockets",
      "Silk floral lining",
      "Unlined sleeves, hand-finished",
    ],
    sizes: SUITS,
  },
  {
    slug: "belgrave-cashmere-silk-stole",
    name: "Belgrave Cashmere-Silk Stole",
    category: "Evening Wear",
    price: 295,
    image: px(6633536),
    fabric: "Cashmere-silk blend",
    description:
      "A 200cm stole in cashmere and silk, in a soft painterly check — the length that drapes, not sits. Over the dinner jacket, over the duster, over the argument.",
    details: [
      "70/30 cashmere-silk, 200cm",
      "Hand-rolled hems",
      "Soft painterly check, garment-dyed",
      "Draps at the correct length",
    ],
    sizes: ONE,
  },
  {
    slug: "mayfair-merino-tee",
    name: "Mayfair Merino Tee",
    category: "Weekend Edit",
    price: 95,
    image: px(12025472),
    fabric: "2-gauge extra-fine merino",
    description:
      "A T-shirt in 2-gauge merino — the house's answer to the question no one asks: how is a T-shirt a luxury? White, undyed, and cut with the same patience as a suit.",
    details: [
      "Extra-fine merino, 2-gauge",
      "Set-in sleeves, no shoulder seam bulk",
      "Undyed white, no print, no logo",
      "Worn under the blazer, and alone",
    ],
    sizes: KNITS,
  },
  {
    slug: "hampstead-tweed-flat-cap",
    name: "Hampstead Tweed Flat Cap",
    category: "Weekend Edit",
    price: 110,
    image: px(37578220),
    fabric: "Brown wool tweed",
    description:
      "A flat cap in brown tweed, blocked by hand and lined with cotton flannel. For the market, the match, and the walk that does not have a destination.",
    details: [
      "Hard-spun brown tweed",
      "Cotton flannel lining",
      "Blocked by hand, leather sweatband",
      "One size, adjusted at the back",
    ],
    sizes: ONE,
  },
  {
    slug: "chandos-merino-socks",
    name: "Chandos Merino Socks, Three-Pack",
    category: "Weekend Edit",
    price: 45,
    image: px(9594141),
    fabric: "Extra-fine merino wool",
    description:
      "Three pairs of merino socks — ink, oat and the house chequer — the only socks in the drawer you will not have bought at an airport.",
    details: [
      "Extra-fine merino, reinforced heel",
      "Ink, oat and house chequer",
      "S, M and L, marked in the house script",
      "The entry to the house, at the counter",
    ],
    sizes: ["S", "M", "L"],
  },
  {
    slug: "wrentham-harrington-jacket",
    name: "Wrentham Harrington Jacket",
    category: "Weekend Edit",
    price: 425,
    image: px(16341730),
    fabric: "Waxed cotton, quilted lining",
    description:
      "A harrington in waxed cotton with a quilted lining — zip at the cuff, pleat at the back, and a collar that sits against the wind. The weekend's outer layer.",
    details: [
      "Waxed cotton, water-shedding",
      "Quilted lining, zip cuffs",
      "Back pleat for the stride",
      "Torn, not washed — wax it, and keep it",
    ],
    sizes: KNITS,
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function countForCategory(category: string): number {
  return PRODUCTS.filter((p) => p.category === category).length;
}

