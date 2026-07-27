export type Product = {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  material: string;
  movement: string;
  caseSize: string;
  waterResistance: string;
  strap: string;
  gender: "Men" | "Women" | "Unisex";
  isLimited?: boolean;
  edition?: string;
  remaining?: number;
  isNew?: boolean;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const collections = [
  "Classic",
  "Chronograph",
  "Skeleton",
  "Tourbillon",
  "Diver",
  "Limited Edition",
  "Women",
  "Men",
] as const;

export const products: Product[] = [
  {
    id: "aurelis-noir",
    name: "Aurelis Noir",
    collection: "Classic",
    price: 18400,
    image: img("1523275335684-37898b6baf30"),
    gallery: [
      img("1523275335684-37898b6baf30"),
      img("1524592094714-0f0654e20314"),
      img("1547996160-81dfa63595aa"),
    ],
    description:
      "A study in restraint. The Noir pairs a hand-finished onyx dial with an 18k rose gold case, powered by an in-house automatic movement developed over four years in our Geneva atelier.",
    shortDescription: "Onyx dial, 18k rose gold, in-house automatic.",
    material: "18k Rose Gold",
    movement: "In-house Automatic AH-01",
    caseSize: "40mm",
    waterResistance: "50m",
    strap: "Hand-stitched alligator leather",
    gender: "Men",
    isNew: true,
  },
  {
    id: "chronos-imperial",
    name: "Chronos Imperial",
    collection: "Chronograph",
    price: 24900,
    image: img("1495856458515-0637185db551"),
    gallery: [img("1495856458515-0637185db551"), img("1548171245-1d99ea50dedb")],
    description:
      "A column-wheel chronograph with a champagne guilloché dial. Every register is machined from solid brass, then hand-polished for 14 hours.",
    shortDescription: "Column-wheel chronograph, champagne guilloché.",
    material: "Platinum 950",
    movement: "Chronograph AH-C7",
    caseSize: "42mm",
    waterResistance: "100m",
    strap: "Blue alligator leather",
    gender: "Men",
  },
  {
    id: "skelet-lumen",
    name: "Skelet Lumen",
    collection: "Skeleton",
    price: 32000,
    image: img("1509048191080-d2984bad6ae5"),
    gallery: [img("1509048191080-d2984bad6ae5"), img("1622434641406-a158123450f9")],
    description:
      "Openworked to the last bridge. 187 components, each beveled by hand, suspended in a sapphire cage that reveals the beating heart of the movement.",
    shortDescription: "Openworked movement, sapphire cage.",
    material: "Grade 5 Titanium",
    movement: "Skeleton Manual AH-S3",
    caseSize: "41mm",
    waterResistance: "30m",
    strap: "Rubber with titanium deployant",
    gender: "Unisex",
  },
  {
    id: "tourbillon-celeste",
    name: "Tourbillon Céleste",
    collection: "Tourbillon",
    price: 168000,
    image: img("1614703418611-3f34f1c7b537"),
    gallery: [img("1614703418611-3f34f1c7b537")],
    description:
      "A flying tourbillon suspended at 6 o'clock, framed by an aventurine dial that captures the night sky. Limited to 28 pieces worldwide.",
    shortDescription: "Flying tourbillon, aventurine night sky dial.",
    material: "Platinum 950",
    movement: "Flying Tourbillon AH-T1",
    caseSize: "42mm",
    waterResistance: "30m",
    strap: "Midnight alligator leather",
    gender: "Men",
    isLimited: true,
    edition: "N° 07 / 28",
    remaining: 4,
  },
  {
    id: "profondeur-diver",
    name: "Profondeur Diver",
    collection: "Diver",
    price: 12800,
    image: img("1548171245-1d99ea50dedb"),
    gallery: [img("1548171245-1d99ea50dedb")],
    description:
      "Water resistant to 500 meters. A ceramic bezel, luminous indices, and a helium escape valve — engineered for the abyss, finished for the boulevard.",
    shortDescription: "500m ceramic bezel dive watch.",
    material: "Stainless Steel 904L",
    movement: "Automatic AH-D5",
    caseSize: "44mm",
    waterResistance: "500m",
    strap: "Integrated steel bracelet",
    gender: "Men",
    isNew: true,
  },
  {
    id: "lumiere-dame",
    name: "Lumière Dame",
    collection: "Women",
    price: 21400,
    image: img("1594534475808-b18fc33b045e"),
    gallery: [img("1594534475808-b18fc33b045e")],
    description:
      "A 34mm case set with 64 baguette-cut diamonds encircling a mother-of-pearl dial. Delicate, precise, unmistakably feminine.",
    shortDescription: "Diamond-set, mother-of-pearl dial.",
    material: "18k White Gold, Diamonds",
    movement: "Automatic AH-L2",
    caseSize: "34mm",
    waterResistance: "50m",
    strap: "Ivory satin",
    gender: "Women",
  },
  {
    id: "heritage-royale",
    name: "Heritage Royale",
    collection: "Classic",
    price: 15600,
    image: img("1524592094714-0f0654e20314"),
    gallery: [img("1524592094714-0f0654e20314")],
    description:
      "Our founder's original 1962 design, reissued with a modern in-house calibre. Every detail — down to the dauphine hands — is faithful to the archive.",
    shortDescription: "1962 heritage reissue.",
    material: "18k Yellow Gold",
    movement: "Automatic AH-01",
    caseSize: "39mm",
    waterResistance: "50m",
    strap: "Brown alligator leather",
    gender: "Men",
  },
  {
    id: "obsidian-limited",
    name: "Obsidian Éclipse",
    collection: "Limited Edition",
    price: 89000,
    image: img("1547996160-81dfa63595aa"),
    gallery: [img("1547996160-81dfa63595aa")],
    description:
      "Forged carbon case, obsidian dial, and a movement finished in ruthenium. A meditation on darkness. 50 pieces only.",
    shortDescription: "Forged carbon, ruthenium finish.",
    material: "Forged Carbon",
    movement: "Automatic Skeleton AH-S4",
    caseSize: "43mm",
    waterResistance: "100m",
    strap: "Black rubber",
    gender: "Unisex",
    isLimited: true,
    edition: "N° 12 / 50",
    remaining: 9,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
