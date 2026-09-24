export type Category =
  | "Tailoring"
  | "Shirts"
  | "Outerwear"
  | "Knitwear"
  | "Leather Goods"
  | "Evening Wear"
  | "Accessories"
  | "Horology"
  | "Fragrance"
  | "Grooming"
  | "Travel"
  | "Weekend Edit";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number; // in GBP
  image: string;
  description: string;
  details: string[];
  sizes: string[];
  isNew?: boolean;
  isSignature?: boolean;
  isLimited?: boolean;
  badge?: string;
}

// ---------------------------------------------------------------------------
// HARTWELL & CO. — The Autumn/Winter MMXXVI Catalogue
// 100% PURE PRODUCT PHOTOGRAPHY — Still life, ghost mannequin, clothes on hangers,
// folded garments, flat lays. Absolutely ZERO human models or faces.
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  // ====================================================================
  // TAILORING — Suits displayed on bespoke hangers & tailor mannequins
  // ====================================================================
  {
    id: "belgravia-three-piece",
    name: "The Belgravia Suit",
    subtitle: "Three-piece Super 150s, charcoal",
    category: "Tailoring",
    price: 2895,
    image: "/product-suit.jpg",
    description:
      "Our signature three-piece, cut in Savile Row tradition with a gently nipped waist and roped shoulder. Crafted from Italian Super 150s worsted wool woven at Vitale Barberis Canonico.",
    details: [
      "Super 150s Italian worsted wool — Vitale Barberis Canonico",
      "Half-canvas construction, hand-padded lapel",
      "Genuine horn buttons, working surgeon's cuffs",
      "Bemberg cupro lining, interior ticket pocket",
      "Cut and finished in England",
    ],
    sizes: ["36", "38", "40", "42", "44", "46"],
    isSignature: true,
    badge: "Atelier Favourite",
  },
  {
    id: "mayfair-two-piece",
    name: "Mayfair Two-Piece",
    subtitle: "Chalkstripe flannel, charcoal",
    category: "Tailoring",
    price: 2195,
    image:
      "https://images.pexels.com/photos/13673656/pexels-photo-13673656.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A city suit cut from Fox Brothers chalkstripe flannel, woven in Somerset since 1772. Single-breasted, two-button, with a clean shoulder.",
    details: [
      "Fox Brothers 13oz chalkstripe flannel",
      "Full-canvas construction",
      "Side-adjuster trouser, no belt loops",
      "Single-pleat, 18\" bottom opening",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    badge: "House Heritage",
  },
  {
    id: "kensington-hopsack",
    name: "Kensington Single-Breasted",
    subtitle: "Navy hopsack wool",
    category: "Tailoring",
    price: 1895,
    image:
      "https://images.pexels.com/photos/20428090/pexels-photo-20428090.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "The workhorse of a gentleman's wardrobe. A navy hopsack from Holland & Sherry that travels beautifully from boardroom to dinner.",
    details: [
      "Holland & Sherry 11oz hopsack",
      "Half-canvas construction",
      "Notch lapel, two-button closure",
      "Flat-front trouser with turn-ups",
    ],
    sizes: ["36", "38", "40", "42", "44"],
    isNew: true,
  },
  {
    id: "st-james-double-breasted",
    name: "St. James Double-Breasted",
    subtitle: "Prince-of-Wales check",
    category: "Tailoring",
    price: 2495,
    image:
      "https://images.pexels.com/photos/29569640/pexels-photo-29569640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A six-button double-breasted in a subtle Prince-of-Wales check. Peak lapel, side vents, and our house cut through the chest.",
    details: [
      "Harrison's of Edinburgh 12oz flannel",
      "Full-canvas construction",
      "Peak lapel, 6×2 buttoning",
      "Side-vented jacket",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    isSignature: true,
  },
  {
    id: "chelsea-linen",
    name: "Chelsea Linen Suit",
    subtitle: "Irish linen, ecru",
    category: "Tailoring",
    price: 1695,
    image:
      "https://images.pexels.com/photos/37524688/pexels-photo-37524688.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A summer suit in heavyweight Irish linen from Baird McNutt. Unstructured through the shoulder, half-lined for breathability.",
    details: [
      "Baird McNutt 12oz Irish linen",
      "Unstructured shoulder, patch pockets",
      "Half-lined jacket",
      "Drawstring trouser waist",
    ],
    sizes: ["38", "40", "42", "44"],
  },
  {
    id: "westminster-sb-flannel",
    name: "Westminster Grey Flannel",
    subtitle: "Mid-grey worsted flannel",
    category: "Tailoring",
    price: 1995,
    image:
      "https://images.pexels.com/photos/35564328/pexels-photo-35564328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "The grey flannel suit, reinterpreted. Mid-weight worsted flannel from Dugdale Bros, with a gentle taper through the trouser.",
    details: [
      "Dugdale Bros New Fine Worsteds",
      "Half-canvas construction",
      "Notch lapel, slanted pockets",
      "Flat-front trouser",
    ],
    sizes: ["36", "38", "40", "42", "44", "46"],
    isNew: true,
  },

  // ====================================================================
  // SHIRTS — Folded shirting, collar close-ups & hanging garments
  // ====================================================================
  {
    id: "wrenford-poplin",
    name: "Wrenford Sea Island Poplin",
    subtitle: "White, cutaway collar",
    category: "Shirts",
    price: 325,
    image:
      "https://images.pexels.com/photos/6276012/pexels-photo-6276012.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A crisp white poplin cut from genuine West Indian Sea Island cotton. The quiet foundation of an excellent wardrobe.",
    details: [
      "100% West Indian Sea Island cotton",
      "Mother-of-pearl buttons, cross-stitched",
      "Split yoke, single-needle stitching at 22 spi",
      "Removable brass collar stays",
    ],
    sizes: ["15", "15.5", "16", "16.5", "17", "17.5"],
    isSignature: true,
  },
  {
    id: "carlton-oxford",
    name: "Carlton Royal Oxford",
    subtitle: "Pale blue, button-down",
    category: "Shirts",
    price: 275,
    image:
      "https://images.pexels.com/photos/9558723/pexels-photo-9558723.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A slightly textured Royal Oxford in pale blue. Soft-roll button-down collar, ideal with or without a tie.",
    details: [
      "Two-fold 100s Egyptian cotton",
      "Unfused button-down collar",
      "Double-button barrel cuff",
      "Hand-attached sleeve",
    ],
    sizes: ["15", "15.5", "16", "16.5", "17"],
  },
  {
    id: "albemarle-stripe",
    name: "Albemarle Bengal Stripe",
    subtitle: "Blue & white Bengal",
    category: "Shirts",
    price: 295,
    image:
      "https://images.pexels.com/photos/39176732/pexels-photo-39176732.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A fine Bengal stripe with a cutaway collar. The shirt for the gentleman who means business.",
    details: [
      "Two-fold 120s cotton poplin",
      "Cutaway collar",
      "French cuffs",
      "Hand-rolled gauntlet button",
    ],
    sizes: ["15.5", "16", "16.5", "17", "17.5"],
    isNew: true,
  },
  {
    id: "jermyn-twill",
    name: "Jermyn Herringbone Twill",
    subtitle: "Ivory herringbone",
    category: "Shirts",
    price: 265,
    image:
      "https://images.pexels.com/photos/10131161/pexels-photo-10131161.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A refined herringbone twill with a soft hand. Ideal beneath a suit jacket or worn open at the collar.",
    details: [
      "Two-fold 100s cotton twill",
      "Spread collar",
      "Single-needle construction",
      "Mother-of-pearl buttons",
    ],
    sizes: ["15", "15.5", "16", "16.5", "17"],
  },
  {
    id: "burlington-chambray",
    name: "Burlington Chambray",
    subtitle: "Stone-washed chambray, sky",
    category: "Shirts",
    price: 245,
    image:
      "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A smart chambray with a lived-in hand. Button-down collar, single chest pocket.",
    details: [
      "Japanese cotton chambray",
      "Soft-roll button-down collar",
      "Single chest pocket",
      "Rounded hem",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "piccadilly-linen",
    name: "Piccadilly Linen Shirt",
    subtitle: "Sand, camp collar",
    category: "Shirts",
    price: 225,
    image: "/collection-shirts.jpg",
    description:
      "A relaxed camp-collar shirt in garment-washed linen. Built for long lunches and longer afternoons.",
    details: [
      "100% European linen",
      "Camp collar",
      "Coconut-shell buttons",
      "Straight hem",
    ],
    sizes: ["S", "M", "L", "XL"],
  },

  // ====================================================================
  // OUTERWEAR — Coats, trenches and jackets on wooden hangers & racks
  // ====================================================================
  {
    id: "chester-trench",
    name: "Chester Trench Coat",
    subtitle: "Cotton gabardine, stone",
    category: "Outerwear",
    price: 1650,
    image: "/product-trench.jpg",
    description:
      "A classic double-breasted trench in water-resistant cotton gabardine, woven in Lancashire. Built for English weather, anywhere in the world.",
    details: [
      "Water-resistant cotton gabardine",
      "Removable wool liner",
      "Genuine horn buttons, gun flap",
      "Storm cuffs, epaulettes",
    ],
    sizes: ["S", "M", "L", "XL"],
    isSignature: true,
  },
  {
    id: "grosvenor-overcoat",
    name: "Grosvenor Overcoat",
    subtitle: "Cashmere & wool, charcoal",
    category: "Outerwear",
    price: 2595,
    image:
      "https://images.pexels.com/photos/16470015/pexels-photo-16470015.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A single-breasted overcoat in a luxurious cashmere-wool blend from Loro Piana. Falls to the knee with an unstructured shoulder.",
    details: [
      "70% wool, 30% cashmere — Loro Piana",
      "Full-canvas construction",
      "Horn buttons, flap pockets",
      "Cupro half-lining",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    isLimited: true,
  },
  {
    id: "berkshire-donegal",
    name: "Berkshire Donegal Coat",
    subtitle: "Irish Donegal tweed, brown",
    category: "Outerwear",
    price: 1395,
    image:
      "https://images.pexels.com/photos/34888429/pexels-photo-34888429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A country overcoat in Irish Donegal tweed from Magee of Donegal. Relaxed through the body, perfect over a thick knit or sports jacket.",
    details: [
      "100% Donegal tweed — Magee 1866",
      "Patch pockets, throat latch",
      "Half-lined in cotton drill",
      "Made in the British Isles",
    ],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "camden-peacoat",
    name: "Camden Peacoat",
    subtitle: "Melton wool, navy",
    category: "Outerwear",
    price: 995,
    image:
      "https://images.pexels.com/photos/8113000/pexels-photo-8113000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A heavy Melton wool peacoat, cut to our 1950s archival pattern. Double-breasted with anchor-embossed brass buttons.",
    details: [
      "Heavy Melton wool — 30oz",
      "Corduroy-lined collar",
      "Brass anchor buttons",
      "Quilted satin lining",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "windsor-harrington",
    name: "Windsor Harrington",
    subtitle: "Cotton drill, olive",
    category: "Outerwear",
    price: 795,
    image:
      "https://images.pexels.com/photos/9594671/pexels-photo-9594671.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "The classic British Harrington, cut from water-resistant cotton drill with a tartan lining.",
    details: [
      "Water-resistant cotton drill",
      "Tartan cotton lining",
      "Brass two-way zip",
      "Funnel collar with throat tab",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },

  // ====================================================================
  // KNITWEAR — Folded cashmere stacks & flat lay knitwear
  // ====================================================================
  {
    id: "hampshire-cashmere",
    name: "Hampshire Cashmere Crew",
    subtitle: "Two-ply cashmere, navy",
    category: "Knitwear",
    price: 695,
    image:
      "https://images.pexels.com/photos/30569741/pexels-photo-30569741.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A crew-neck sweater in pure two-ply Scottish cashmere from Johnstons of Elgin. The quiet luxury of a well-lived weekend.",
    details: [
      "100% two-ply Scottish cashmere",
      "Fully-fashioned seams",
      "Ribbed cuffs & hem",
      "Knitted in the Scottish Borders",
    ],
    sizes: ["S", "M", "L", "XL"],
    isSignature: true,
  },
  {
    id: "balmoral-cable",
    name: "Balmoral Cable-Knit",
    subtitle: "Lambswool, oatmeal",
    category: "Knitwear",
    price: 545,
    image:
      "https://images.pexels.com/photos/30263570/pexels-photo-30263570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A chunky cable-knit in pure lambswool, knitted in the Borders. A fireside staple.",
    details: [
      "100% Scottish lambswool",
      "Hand-linked neck",
      "Raglan sleeve",
      "Made in Scotland",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sandringham-vneck",
    name: "Sandringham Merino V-Neck",
    subtitle: "Extra-fine merino, burgundy",
    category: "Knitwear",
    price: 395,
    image:
      "https://images.pexels.com/photos/30263575/pexels-photo-30263575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A fine-gauge V-neck in extra-fine merino. Ideal layered beneath a sports jacket.",
    details: [
      "Extra-fine 19.5 micron merino",
      "Fully-fashioned",
      "Fine-gauge knit",
      "Made in Italy",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "windsor-rollneck",
    name: "Windsor Roll-Neck",
    subtitle: "Cashmere-silk, black",
    category: "Knitwear",
    price: 595,
    image:
      "https://images.pexels.com/photos/9603625/pexels-photo-9603625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A fine roll-neck in a cashmere-silk blend. The perfect foil to a tailored overcoat.",
    details: [
      "85% cashmere, 15% silk",
      "Fine-gauge knit",
      "Ribbed roll-neck",
      "Made in Scotland",
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },

  // ====================================================================
  // LEATHER GOODS — Handcrafted shoes, briefcases & leather still life
  // ====================================================================
  {
    id: "halford-oxford",
    name: "Halford Oxford Shoe",
    subtitle: "Whole-cut calfskin, dark brown",
    category: "Leather Goods",
    price: 795,
    image: "/product-shoes.jpg",
    description:
      "A whole-cut Oxford, hand-burnished in our Northampton workshop. Goodyear-welted on our house last, with a bevelled waist.",
    details: [
      "Full-grain French calfskin — Annonay",
      "Goodyear welt, oak-bark tanned leather sole",
      "Hand-burnished finish, bevelled waist",
      "Made in Northampton",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    isSignature: true,
  },
  {
    id: "hartwell-derby",
    name: "Hartwell Derby",
    subtitle: "Calfskin, oxblood",
    category: "Leather Goods",
    price: 645,
    image:
      "https://images.pexels.com/photos/10259873/pexels-photo-10259873.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "An open-laced Derby in rich oxblood calfskin. A versatile shoe for business and evening alike.",
    details: [
      "Full-grain calfskin",
      "Goodyear welt, leather sole",
      "Hand-stitched apron",
      "Made in Northampton",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: "kensington-loafer",
    name: "Kensington Penny Loafer",
    subtitle: "Italian suede, tobacco",
    category: "Leather Goods",
    price: 595,
    image:
      "https://images.pexels.com/photos/38818880/pexels-photo-38818880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A classic penny loafer in soft Italian suede. Built on a generous last for all-day comfort.",
    details: [
      "Italian suede upper",
      "Leather sole",
      "Bologna construction",
      "Made in the Marche, Italy",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: "mayfair-briefcase",
    name: "Mayfair Briefcase",
    subtitle: "Bridle leather, cognac",
    category: "Leather Goods",
    price: 1495,
    image: "/collection-leather.jpg",
    description:
      "A structured two-gusset briefcase in English bridle leather from J. & F.J. Baker, the last commercial tannery in England. Lined in suede with solid brass hardware.",
    details: [
      "English oak-bark tanned bridle leather",
      "Suede-lined interior, three compartments",
      "Solid brass fittings, Samsonite lock",
      "Fits 15\" laptop",
    ],
    sizes: ["One Size"],
    isNew: true,
    isLimited: true,
  },
  {
    id: "belgravia-belt",
    name: "Belgravia Dress Belt",
    subtitle: "Polished calfskin, black",
    category: "Leather Goods",
    price: 275,
    image:
      "https://images.pexels.com/photos/12495664/pexels-photo-12495664.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A slim dress belt in polished calfskin with a solid brass roller buckle. Handmade in Walsall.",
    details: [
      "Polished calfskin",
      "Solid brass roller buckle",
      "30mm width",
      "Made in Walsall, England",
    ],
    sizes: ["32", "34", "36", "38", "40"],
  },
  {
    id: "savile-cardholder",
    name: "Savile Card Holder",
    subtitle: "Bridle leather, conker",
    category: "Leather Goods",
    price: 245,
    image:
      "https://images.pexels.com/photos/12495669/pexels-photo-12495669.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A slim six-card holder in English bridle leather, hand-stitched with linen thread.",
    details: [
      "English bridle leather",
      "Six card slots, centre compartment",
      "Saddle-stitched by hand",
      "Made in England",
    ],
    sizes: ["One Size"],
  },

  // ====================================================================
  // EVENING WEAR — Formalwear mannequins & flat lay evening pieces
  // ====================================================================
  {
    id: "grosvenor-tuxedo",
    name: "Grosvenor Dinner Suit",
    subtitle: "Black barathea wool",
    category: "Evening Wear",
    price: 3195,
    image:
      "https://images.pexels.com/photos/16213983/pexels-photo-16213983.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "The black-tie essential. A single-breasted peak-lapel dinner suit in pure barathea wool from Huddersfield, with silk grosgrain facings.",
    details: [
      "Pure barathea wool — Bower Roebuck",
      "Silk grosgrain peak lapel",
      "Satin side-braid trouser",
      "Full-canvas construction, covered button",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    isSignature: true,
  },
  {
    id: "albert-smoking",
    name: "Albert Smoking Jacket",
    subtitle: "Silk velvet, burgundy",
    category: "Evening Wear",
    price: 2195,
    image:
      "https://images.pexels.com/photos/16159027/pexels-photo-16159027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A shawl-collared smoking jacket in silk velvet, woven in Lyon. For the gentleman who entertains at home.",
    details: [
      "Silk velvet outer — woven in Lyon",
      "Silk satin shawl lapel",
      "Quilted silk lining",
      "Frogged cord closure",
    ],
    sizes: ["38", "40", "42", "44"],
    isLimited: true,
  },
  {
    id: "evening-shirt",
    name: "Marcella Evening Shirt",
    subtitle: "White, wing collar, pleated",
    category: "Evening Wear",
    price: 425,
    image: "/collection-evening.jpg",
    description:
      "A classic evening shirt with marcella bib and wing collar. Stud-fastening front, finished with mother-of-pearl.",
    details: [
      "100% cotton marcella",
      "Wing collar",
      "Mother-of-pearl studs included",
      "Double cuffs",
    ],
    sizes: ["15.5", "16", "16.5", "17"],
  },

  // ====================================================================
  // ACCESSORIES — Silk ties, pocket squares, scarves & cufflinks still life
  // ====================================================================
  {
    id: "drakes-silk-twill",
    name: "Ancient Macclesfield Tie",
    subtitle: "Silk twill, navy & gold",
    category: "Accessories",
    price: 175,
    image:
      "https://images.pexels.com/photos/31034511/pexels-photo-31034511.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "An ancient Macclesfield design printed on pure silk twill. Hand-rolled edges, untipped, three-fold construction.",
    details: [
      "100% silk twill — 36oz",
      "Printed in Macclesfield",
      "Hand-rolled edges",
      "Three-fold untipped construction",
    ],
    sizes: ["One Size"],
  },
  {
    id: "grenadine-silk",
    name: "Grenadine Silk Tie",
    subtitle: "Garza grossa, bottle green",
    category: "Accessories",
    price: 195,
    image:
      "https://images.pexels.com/photos/31034508/pexels-photo-31034508.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A grenadine tie in garza grossa weave, produced on antique looms in Como. The essential knit-alternative.",
    details: [
      "100% silk grenadine",
      "Woven on antique looms in Como",
      "Untipped, self-fabric keeper",
      "8cm width",
    ],
    sizes: ["One Size"],
    isSignature: true,
  },
  {
    id: "silk-pocket-square",
    name: "Silk Pocket Square Set",
    subtitle: "Three squares, tonal",
    category: "Accessories",
    price: 245,
    image:
      "https://images.pexels.com/photos/11911796/pexels-photo-11911796.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A trio of hand-rolled silk pocket squares in tonal paisley, polka-dot and plain white.",
    details: [
      "100% silk twill",
      "Hand-rolled edges",
      "Set of three, 40cm square",
      "Presented in a Hartwell gift box",
    ],
    sizes: ["One Size"],
  },
  {
    id: "onyx-cufflinks",
    name: "Onyx & Silver Cufflinks",
    subtitle: "Sterling silver, black onyx",
    category: "Accessories",
    price: 395,
    image:
      "https://images.pexels.com/photos/16156893/pexels-photo-16156893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A pair of T-bar cufflinks in sterling silver with polished black onyx cabochons. Hallmarked in London.",
    details: [
      "Sterling silver, hallmarked",
      "Black onyx cabochons",
      "T-bar swivel",
      "Made in the Hatton Garden quarter",
    ],
    sizes: ["One Size"],
    isLimited: true,
  },
  {
    id: "cashmere-scarf",
    name: "Cashmere Tartan Scarf",
    subtitle: "Pure cashmere, Hartwell tartan",
    category: "Accessories",
    price: 395,
    image:
      "https://images.pexels.com/photos/31034512/pexels-photo-31034512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A generous scarf in pure cashmere, woven to our registered Hartwell tartan by Johnstons of Elgin.",
    details: [
      "100% pure cashmere",
      "Registered Hartwell tartan",
      "Hand-fringed ends",
      "Woven in the Scottish Borders",
    ],
    sizes: ["One Size"],
    isSignature: true,
  },
  {
    id: "pantherella-socks",
    name: "Sea Island Socks",
    subtitle: "Sea Island cotton, navy",
    category: "Accessories",
    price: 45,
    image:
      "https://images.pexels.com/photos/31034509/pexels-photo-31034509.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "Over-the-calf socks in Sea Island cotton, hand-linked at the toe. Made in Leicester since 1947.",
    details: [
      "Sea Island cotton",
      "Hand-linked toe",
      "Over-the-calf length",
      "Made in Leicester",
    ],
    sizes: ["S/M", "M/L", "L/XL"],
  },
  {
    id: "fox-umbrella",
    name: "Fox Umbrellas Malacca",
    subtitle: "Malacca cane, black canopy",
    category: "Accessories",
    price: 345,
    image:
      "https://images.pexels.com/photos/28157686/pexels-photo-28157686.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A handmade umbrella from Fox Umbrellas of Dagenham, with a polished malacca cane handle and a black twill canopy.",
    details: [
      "Polished malacca cane handle",
      "Black cotton twill canopy",
      "Steel frame, eight ribs",
      "Handmade in England",
    ],
    sizes: ["One Size"],
  },
  {
    id: "bow-tie",
    name: "Self-Tie Bow Tie",
    subtitle: "Silk barathea, black",
    category: "Accessories",
    price: 145,
    image:
      "https://images.pexels.com/photos/38721568/pexels-photo-38721568.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A self-tie black bow tie in silk barathea. The only correct choice with a dinner jacket.",
    details: [
      "100% silk barathea",
      "Self-tie, batwing shape",
      "Adjustable neck strap",
      "Made in England",
    ],
    sizes: ["One Size"],
  },

  // ====================================================================
  // HOROLOGY — Swiss & English Mechanical Watches Still Life
  // ====================================================================
  {
    id: "savile-perpetual",
    name: "Savile Perpetual Calendar",
    subtitle: "18ct rose gold, ivory dial",
    category: "Horology",
    price: 24500,
    image:
      "https://images.pexels.com/photos/13273982/pexels-photo-13273982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A perpetual calendar in 18ct rose gold, with a hand-finished ivory lacquer dial. Powered by an in-house automatic calibre with a 72-hour power reserve.",
    details: [
      "18ct rose gold case, 40mm",
      "In-house automatic calibre, 72-hour reserve",
      "Perpetual calendar with moon-phase",
      "Hand-stitched alligator strap",
      "Sapphire crystal, 30m water-resistant",
    ],
    sizes: ["One Size"],
    isLimited: true,
    isSignature: true,
  },
  {
    id: "mayfair-chrono",
    name: "The Mayfair Chronograph",
    subtitle: "Stainless steel, black dial",
    category: "Horology",
    price: 12800,
    image:
      "https://images.pexels.com/photos/13273980/pexels-photo-13273980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A two-register chronograph in brushed steel. Column-wheel movement, blued steel hands, and a hand-finished rotor visible through the sapphire caseback.",
    details: [
      "316L stainless steel case, 41mm",
      "Column-wheel chronograph, automatic",
      "Blued steel hands, applied indices",
      "Calfskin strap with deployant clasp",
      "100m water-resistant",
    ],
    sizes: ["One Size"],
  },
  {
    id: "windsor-dress",
    name: "Windsor Dress Watch",
    subtitle: "Yellow gold, champagne dial",
    category: "Horology",
    price: 6950,
    image:
      "https://images.pexels.com/photos/13273983/pexels-photo-13273983.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "An ultra-thin dress watch at just 6.4mm. 18ct yellow gold case with a champagne sunburst dial and dauphine hands.",
    details: [
      "18ct yellow gold case, 38mm × 6.4mm",
      "Ultra-thin Swiss automatic movement",
      "Champagne sunburst dial",
      "Hand-stitched alligator strap",
      "Sapphire crystal",
    ],
    sizes: ["One Size"],
    isSignature: true,
  },

  // ====================================================================
  // FRAGRANCE — Crystal flacons & perfume still life
  // ====================================================================
  {
    id: "oud-1934",
    name: "Oud No. 1934",
    subtitle: "Eau de parfum, 100ml",
    category: "Fragrance",
    price: 385,
    image:
      "https://images.pexels.com/photos/16125025/pexels-photo-16125025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "Our signature scent. Cambodian oud, Damascus rose, and Mysore sandalwood, composed for us by a fourth-generation perfumer in Grasse.",
    details: [
      "Concentration: Eau de Parfum, 25%",
      "Top: Bergamot, saffron, pink pepper",
      "Heart: Damascus rose, oud",
      "Base: Mysore sandalwood, amber, musk",
      "Hand-finished crystal flacon",
    ],
    sizes: ["50ml", "100ml"],
    isSignature: true,
  },
  {
    id: "mayfair-cologne",
    name: "The Mayfair Cologne",
    subtitle: "Eau de cologne, 200ml",
    category: "Fragrance",
    price: 245,
    image:
      "https://images.pexels.com/photos/28406043/pexels-photo-28406043.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A brisk, citrus-led cologne in the English tradition. Lavender, bergamot and neroli over a base of cedar and white musk.",
    details: [
      "Concentration: Eau de Cologne, 5%",
      "Top: Bergamot, lemon, neroli",
      "Heart: Lavender, petitgrain",
      "Base: Cedarwood, white musk",
      "Hand-blown glass flacon",
    ],
    sizes: ["100ml", "200ml"],
  },
  {
    id: "tobacco-amber",
    name: "Tobacco & Amber",
    subtitle: "Eau de parfum, 100ml",
    category: "Fragrance",
    price: 295,
    image:
      "https://images.pexels.com/photos/6127875/pexels-photo-6127875.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A winter fragrance of dried tobacco leaf, amber resin and vanilla bourbon. Built to linger.",
    details: [
      "Concentration: Eau de Parfum, 22%",
      "Top: Cognac, dried fruit",
      "Heart: Tobacco leaf, tonka bean",
      "Base: Amber resin, vanilla bourbon",
      "Crystal flacon with brass cap",
    ],
    sizes: ["50ml", "100ml"],
    isNew: true,
  },
  {
    id: "leather-noir",
    name: "Leather Noir",
    subtitle: "Eau de parfum, 100ml",
    category: "Fragrance",
    price: 345,
    image:
      "https://images.pexels.com/photos/30999189/pexels-photo-30999189.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "An animalic leather scent built on a heart of birch tar and Spanish leather, softened with iris and suede.",
    details: [
      "Concentration: Eau de Parfum, 28%",
      "Top: Black pepper, elemi",
      "Heart: Birch tar, iris, Spanish leather",
      "Base: Oud, labdanum, castoreum accord",
      "Crystal flacon",
    ],
    sizes: ["50ml", "100ml"],
    isLimited: true,
  },

  // ====================================================================
  // GROOMING — Traditional shaving tools & apothecary bottles
  // ====================================================================
  {
    id: "gentleman-shaving-set",
    name: "The Gentleman's Shaving Set",
    subtitle: "Badger brush, safety razor, stand",
    category: "Grooming",
    price: 485,
    image:
      "https://images.pexels.com/photos/9230441/pexels-photo-9230441.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A four-piece shaving set made for us in Sheffield: pure silvertip badger brush, closed-comb safety razor, bowl and chrome stand.",
    details: [
      "Pure silvertip badger brush",
      "Closed-comb safety razor, chrome",
      "Handmade porcelain shaving bowl",
      "Solid chrome stand",
      "Made in Sheffield",
    ],
    sizes: ["One Size"],
    isSignature: true,
  },
  {
    id: "sandalwood-aftershave",
    name: "Sandalwood Aftershave",
    subtitle: "Splash, 100ml",
    category: "Grooming",
    price: 145,
    image:
      "https://images.pexels.com/photos/31251024/pexels-photo-31251024.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A brisk sandalwood aftershave with witch hazel and aloe. Built to soothe, not sting.",
    details: [
      "Witch hazel & aloe vera base",
      "Essential oils of sandalwood, cedar",
      "Alcohol-based splash, 100ml",
      "Made in England",
    ],
    sizes: ["100ml"],
  },
  {
    id: "cedar-soap-set",
    name: "Cedar & Oak Soap Trio",
    subtitle: "Triple-milled shaving soaps",
    category: "Grooming",
    price: 95,
    image:
      "https://images.pexels.com/photos/13583360/pexels-photo-13583360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "Three triple-milled shaving soaps: cedar, oak moss and tobacco leaf. Made in Norfolk using traditional cold-process methods.",
    details: [
      "Triple-milled vegetable base",
      "Three scents: cedar, oak moss, tobacco",
      "100g each",
      "Made in Norfolk",
    ],
    sizes: ["One Size"],
  },

  // ====================================================================
  // TRAVEL — Leather holdalls, wash bags & travel accessories
  // ====================================================================
  {
    id: "hartwell-weekender",
    name: "The Hartwell Weekender",
    subtitle: "Bridle leather, conker",
    category: "Travel",
    price: 1895,
    image:
      "https://images.pexels.com/photos/12495666/pexels-photo-12495666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A two-day holdall in English bridle leather, cut and stitched in Walsall. Lined in suede with a removable shoulder strap.",
    details: [
      "English oak-bark tanned bridle leather",
      "Suede lining, three internal pockets",
      "Solid brass hardware",
      "Removable shoulder strap",
      "50cm × 30cm × 25cm",
    ],
    sizes: ["One Size"],
    isSignature: true,
  },
  {
    id: "savile-holdall",
    name: "Savile Holdall",
    subtitle: "Calfskin, chestnut",
    category: "Travel",
    price: 2295,
    image:
      "https://images.pexels.com/photos/6601769/pexels-photo-6601769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A generous four-day holdall in French calfskin with a separate shoe compartment. The bag for the gentleman who packs properly.",
    details: [
      "French calfskin, hand-dyed",
      "Separate shoe compartment",
      "Padded laptop sleeve",
      "Combination lock closure",
      "60cm × 35cm × 30cm",
    ],
    sizes: ["One Size"],
    isLimited: true,
  },
  {
    id: "leather-wash-bag",
    name: "Leather Wash Bag",
    subtitle: "Bridle leather, black",
    category: "Travel",
    price: 395,
    image:
      "https://images.pexels.com/photos/12495665/pexels-photo-12495665.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A structured wash bag in English bridle leather with a waterproof lining and solid brass zip.",
    details: [
      "English bridle leather",
      "Waterproof nylon lining",
      "Solid brass Riri zip",
      "25cm × 15cm × 12cm",
    ],
    sizes: ["One Size"],
  },
  {
    id: "passport-holder",
    name: "Passport Holder",
    subtitle: "Calfskin, navy",
    category: "Travel",
    price: 245,
    image:
      "https://images.pexels.com/photos/12495668/pexels-photo-12495668.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A slim passport holder with four card slots, hand-stitched and embossed with the Hartwell crest.",
    details: [
      "French calfskin",
      "Four card slots, two slip pockets",
      "Hand-embossed Hartwell crest",
      "Made in England",
    ],
    sizes: ["One Size"],
  },

  // ====================================================================
  // WEEKEND EDIT — Flat lay knitwear, chinos & jackets on hanger
  // ====================================================================
  {
    id: "weekend-cashmere",
    name: "Suffolk Cashmere Henley",
    subtitle: "Cashmere, stone",
    category: "Weekend Edit",
    price: 595,
    image: "/collection-weekend.jpg",
    description:
      "A henley in pure two-ply cashmere. Horn buttons, long-line body, made in the Scottish Borders.",
    details: [
      "Two-ply Scottish cashmere",
      "Genuine horn buttons",
      "Long-line body",
      "Made in Scotland",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "richmond-chino",
    name: "Richmond Brushed Chino",
    subtitle: "Brushed cotton twill, sand",
    category: "Weekend Edit",
    price: 275,
    image:
      "https://images.pexels.com/photos/7444977/pexels-photo-7444977.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A garment-dyed chino in brushed cotton twill. Straight through the leg with a gentle taper.",
    details: [
      "Brushed cotton twill",
      "Garment-dyed for softness",
      "Slant pockets",
      "Made in Portugal",
    ],
    sizes: ["30", "32", "34", "36", "38"],
  },
  {
    id: "suffolk-waxed",
    name: "Suffolk Field Jacket",
    subtitle: "Waxed cotton, olive",
    category: "Weekend Edit",
    price: 895,
    image:
      "https://images.pexels.com/photos/27871997/pexels-photo-27871997.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A waxed-cotton field jacket with corduroy collar, cut in our Hartwell tartan lining. Built for the country, equally at home in the city.",
    details: [
      "8oz waxed cotton — Halley Stevensons",
      "Corduroy collar",
      "Hartwell tartan lining",
      "Brass zip & press-stud closure",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
  },
  {
    id: "devon-ocs",
    name: "Devon Oxford Cloth Shirt",
    subtitle: "Oxford cloth, washed blue",
    category: "Weekend Edit",
    price: 225,
    image:
      "https://images.pexels.com/photos/36910113/pexels-photo-36910113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A washed Oxford cloth button-down in the house cut. The shirt that does everything.",
    details: [
      "Heavy Oxford cloth, garment-washed",
      "Soft-roll button-down collar",
      "Box-pleat back",
      "Rounded hem",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "cornish-breton",
    name: "Cornish Breton Stripe",
    subtitle: "Cotton jersey, navy/ivory",
    category: "Weekend Edit",
    price: 195,
    image:
      "https://images.pexels.com/photos/17720471/pexels-photo-17720471.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    description:
      "A heavyweight Breton-stripe jersey in the 21-stripe tradition of the Cornish coast.",
    details: [
      "Heavyweight cotton jersey",
      "21-stripe pattern",
      "Boat neck",
      "Made in Cornwall",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
];

export const CATEGORIES: Category[] = [
  "Tailoring",
  "Shirts",
  "Outerwear",
  "Knitwear",
  "Leather Goods",
  "Evening Wear",
  "Accessories",
  "Horology",
  "Fragrance",
  "Grooming",
  "Travel",
  "Weekend Edit",
];

export const formatGBP = (amount: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
