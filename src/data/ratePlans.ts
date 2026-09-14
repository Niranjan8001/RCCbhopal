// Rate-card data, transcribed from the source PDFs:
//   rpdf/WA SILVER PLAN.pdf  and  rpdf/WA GOLD PLAN.pdf
// Both documents are titled "SPECIFICATIONS & RATES" but contain no price
// figures — only material specifications. Do not add pricing here; the
// ₹/sqft rates shown elsewhere on the site (the plan summary cards
// above this data) come from a separate source and are unrelated to these PDFs.
//
// `highlight: true` marks a row where Gold's specification is a genuine,
// sourced difference from Silver's (a different material, size, quantity, or
// an item Gold includes that Silver's document doesn't mention at all).
// Wording is kept as close to the source as legible prose allows; a `note`
// is added only where the two documents describe the same line item with
// different terminology or a different level of detail, so nothing is lost
// in the comparison.

export interface SpecItem {
  name: string;
  silver: string;
  gold: string;
  highlight?: boolean;
  note?: string;
}

export interface RateSection {
  id: string;
  title: string;
  icon:
    | 'structure'
    | 'flooring'
    | 'toilet'
    | 'kitchen'
    | 'ceiling'
    | 'electrical'
    | 'doors'
    | 'fabrication'
    | 'drainage'
    | 'painting';
  items: SpecItem[];
}

export const RATE_SECTIONS: RateSection[] = [
  {
    id: 'structure',
    title: 'Structure Work (RCC / Brick Work / Plaster)',
    icon: 'structure',
    items: [
      {
        name: 'Cement',
        silver: 'Ultratech / ACC / Birla / JK Super',
        gold: 'Ultratech / ACC / Birla / JK Super',
      },
      {
        name: 'Steel',
        silver: 'Goel TMT / GK TMT / Nakoda',
        gold: 'Goel TMT / Kamdhenu / GK TMT',
      },
      {
        name: 'Sand',
        silver: 'Narmada / Tawa',
        gold: 'Narmada',
      },
      {
        name: 'Black Metal / Crushed Stone / Gitti (20mm)',
        silver: 'As per approved specifications',
        gold: 'As per approved specifications',
      },
      {
        name: 'Bricks',
        silver: 'Red Bricks (Dummy Ghol) / Godrej AAC Block / ACC Fly Ash Bricks',
        gold: 'GHOL Bricks (RAVI, KAVI, MKC) / ACC Fly Ash Bricks / GODREJ AAC Blocks',
      },
    ],
  },
  {
    id: 'flooring',
    title: 'Flooring Work',
    icon: 'flooring',
    items: [
      {
        name: 'Flooring — Drawing, Dining (& Passage in Gold)',
        silver: "Vitrified tiles, size 2' x 2' (Kajaria / Johnson / Somany)",
        gold: "Vitrified tiles, size 2' x 4' (600mm x 1200mm) (Kajaria / Johnson / Somany) — covers drawing, dining and passage etc.",
        highlight: true,
      },
      {
        name: 'Flooring — Bedrooms',
        silver: "Vitrified tiles, size 2' x 2' (Kajaria / Johnson / Somany)",
        gold: "Vitrified tiles, size 2' x 2' (600mm x 600mm) (Kajaria / Johnson / Somany)",
      },
      {
        name: 'Stairs (Flooring)',
        silver: 'Kota stone on tread & tiles on riser',
        gold: 'Granite on tread & tiles on riser',
        highlight: true,
      },
      {
        name: 'Porch, Open Space',
        silver: 'Antiskid tiles (Kajaria / Johnson / Somany)',
        gold: 'Designer floor tiles (Kajaria / Johnson / Somany)',
        highlight: true,
      },
      {
        name: 'Wash Area',
        silver: 'Kota stone in flooring & wall tiles up to 2 ft height',
        gold: 'Kota stone in flooring & wall tiles up to 5 ft height',
        highlight: true,
      },
      {
        name: 'Sit Out',
        silver: '(Kajaria / Johnson / Somany)',
        gold: 'Designer rustic tiles (Kajaria / Johnson / Somany)',
        highlight: true,
        note: 'The Silver document lists brand options only for Sit Out; Gold additionally specifies a designer rustic tile.',
      },
    ],
  },
  {
    id: 'toilet',
    title: 'Toilet Work',
    icon: 'toilet',
    items: [
      {
        name: 'Flooring & Wall Tiles',
        silver: 'Anti-skid tiles in floor (300mm x 300mm) & ceramic glazed tiles (300mm x 450mm) up to 7 ft over wall',
        gold: 'Anti-skid tiles in floor (300mm x 300mm) & ceramic glazed tiles on wall (300mm x 450mm) up to ceiling height',
        highlight: true,
      },
      {
        name: 'Door',
        silver: 'PVC door shutter with frame',
        gold: 'WPC door frame',
        highlight: true,
        note: "Silver's spec covers both shutter and frame; Gold's Toilet Work list specifies the door frame material (WPC).",
      },
      {
        name: 'European WC Seat',
        silver: 'Jaquar (ESSCO) / Hindware / Bathsense',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
      {
        name: 'Basin (Toilet)',
        silver: 'Jaquar (ESSCO) / Hindware / Parryware / Somany / Bathsense',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
      {
        name: 'Basin — Granite Table Top (Common Area)',
        silver: 'Not included in the Silver plan',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense — granite table-top basin for the common area',
        highlight: true,
      },
      {
        name: 'Mixer',
        silver: 'Jaquar (ESSCO) / Hindware / Parryware / Somany / Bathsense',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
      {
        name: 'Shower with Arm',
        silver: 'Jaquar / Hindware / Parryware / Somany',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
      {
        name: 'Pillar Tap',
        silver: 'Jaquar (ESSCO) / Hindware / Parryware / Somany / Bathsense',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
      {
        name: 'Bib Cock',
        silver: 'Jaquar (ESSCO) / Hindware / Parryware / Somany / Bathsense',
        gold: 'Jaquar / Hindware / Somany / Parryware / Bathsense',
      },
    ],
  },
  {
    id: 'kitchen',
    title: 'Kitchen Work',
    icon: 'kitchen',
    items: [
      {
        name: 'Tiles Over Platform',
        silver: 'Ceramic tiles (300mm x 450mm) up to 2 ft height above platform',
        gold: "Ceramic tiles, 1' x 2' (300mm x 600mm), up to 2 ft height",
        highlight: true,
      },
      {
        name: 'Kitchen Platform / Top',
        silver: 'Marble, width up to 24"',
        gold: 'Granite',
        highlight: true,
        note: 'Silver refers to this item as "Kitchen Platform"; Gold refers to it as "Kitchen Top."',
      },
      {
        name: 'Kitchen Sink',
        silver: 'Single bowl (Speed)',
        gold: 'Quartz / Nirali / Carysil sink',
        highlight: true,
      },
    ],
  },
  {
    id: 'false-ceiling',
    title: 'False Ceiling Work',
    icon: 'ceiling',
    items: [
      {
        name: 'False Ceiling',
        silver: 'Not included in the Silver plan',
        gold: 'Drawing Room + all Bedrooms',
        highlight: true,
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    icon: 'electrical',
    items: [
      {
        name: 'Wiring',
        silver: 'Anchor / Polycab / Havells — 1mm for neutral & points, 1.5mm for earthing & 2.5mm for AC lines',
        gold: 'Anchor / Polycab / Havells — 1mm for neutral & points, 1.5mm for earthing & 2.5mm for AC lines',
      },
      {
        name: 'Conduit Pipes',
        silver: 'Crown',
        gold: 'Crown / Finolex / Anchor',
      },
      {
        name: 'Switches',
        silver: 'Anchor (Rider)',
        gold: 'Legrand / Anchor / Havells',
      },
      {
        name: 'MCBs',
        silver: 'Anchor / Havells',
        gold: 'Anchor / Havells',
      },
    ],
  },
  {
    id: 'doors-windows',
    title: 'Woodwork / Door & Window Work',
    icon: 'doors',
    items: [
      {
        name: 'Door Frame',
        silver: 'Hard wood frame',
        gold: '"Jambing work" of Granite frame',
        highlight: true,
      },
      {
        name: 'Window Frame',
        silver: "Not itemized separately in the Silver plan",
        gold: '"Jambing work" of Granite frame in all windows, with a granite photo-frame on front-side windows',
        highlight: true,
      },
      {
        name: 'Door Shutters (External)',
        silver: 'Flush door (30mm) with mica',
        gold: 'Flush door, 30mm thick, with designer lamination on both sides (1mm thick)',
        highlight: true,
      },
      {
        name: 'Door Shutters (Internal)',
        silver: 'Flush door',
        gold: 'Flush door, 30mm thick, with designer lamination on both sides (1mm thick)',
        highlight: true,
        note: 'Gold\'s Door/Window Work list specifies one "Door Shutters" standard without a separate internal/external split.',
      },
      {
        name: 'Aluminium Door Fittings',
        silver: 'L-drops, tower bolt & handles etc.',
        gold: 'Not itemized separately in the Gold plan',
      },
      {
        name: 'Mortise / Cylindrical Lock',
        silver: 'For external door',
        gold: 'Range of mortise lock up to ₹1,500/-',
        highlight: true,
      },
      {
        name: 'Aluminium Window',
        silver: "3-track aluminium window with jali shutters, Plain / clear / Transparent glass, 5mm thick",
        gold: "3-track aluminium window with jali shutters, Plain / clear / Transparent glass, 5mm thick",
      },
    ],
  },
  {
    id: 'fabrication',
    title: 'Fabrication Work',
    icon: 'fabrication',
    items: [
      {
        name: 'Window Grills',
        silver: 'M.S. square bars, 12mm (spacing 4" between bars)',
        gold: 'M.S. square bars, 12mm (spacing 4" between bars)',
      },
      {
        name: 'Main Gate',
        silver: 'Mild Steel, weight up to 100 kg',
        gold: 'M.S. pipes / box section, weight up to 150 kg',
        highlight: true,
      },
      {
        name: 'Stairs Railing',
        silver: 'Mild Steel (height 3 feet)',
        gold: 'Stainless Steel',
        highlight: true,
        note: "Gold's specification does not restate the 3 ft height for this item.",
      },
      {
        name: 'Front Balcony Railing & Roof (Front Side)',
        silver: 'Mild Steel (height 3 feet)',
        gold: 'Stainless Steel',
        highlight: true,
        note: "Gold's specification does not restate the 3 ft height for this item.",
      },
    ],
  },
  {
    id: 'drainage',
    title: 'Drainage Work',
    icon: 'drainage',
    items: [
      {
        name: 'Internal Water Supply',
        silver: 'CPVC pipe & fittings — Plasto / Astral / Ashirvad (15/20/25/32mm dia)',
        gold: 'CPVC pipe & fittings — Plasto / Astral / Ashirvad (32/25/20/15mm dia)',
      },
      {
        name: 'Sanitary Pipes',
        silver: 'PVC pipe & fittings — Plasto / Astral / Ashirvad (75mm/100mm)',
        gold: 'PVC pipe & fittings — Plasto / Astral / Ashirvad (75mm/100mm)',
      },
      {
        name: 'Terrace Water Tank',
        silver: 'Plasto / Astral / Ashirvad, three-layered, 1000 Ltr. (1 No.)',
        gold: 'Plasto / Astral / Ashirvad, three-layered, 1000 Ltr. (2 No.)',
        highlight: true,
      },
      {
        name: 'Underground Tank',
        silver: 'Not included in the Silver plan',
        gold: 'RCC top slab with brick walls — 5000 Ltr. capacity',
        highlight: true,
      },
    ],
  },
  {
    id: 'painting',
    title: 'Painting Work',
    icon: 'painting',
    items: [
      {
        name: 'Internal Walls (All Rooms)',
        silver: 'Two coats of Birla / JK wall putty + Two coats of Tractor Sparc emulsion, from Asian or equivalent range of Berger / Nerolac / Dulux',
        gold: 'Two coats of Birla / JK wall putty + Two coats of Tractor Shyne emulsion, from Asian or equivalent range of Berger / Nerolac / Dulux',
        highlight: true,
      },
      {
        name: 'External — Elevation, Terrace Tower, Terrace Parapet Wall & Other External Space',
        silver: 'One coat of white cement primer + Two coats of Ace Sparc emulsion, from Asian or equivalent range of Berger / Nerolac / Dulux',
        gold: 'One coat of white cement primer + Two coats of Birla wall putty + Two coats of Ace Shyne emulsion, from Asian or equivalent range of Berger / Nerolac / Dulux',
        highlight: true,
      },
      {
        name: 'Grills / Railing',
        silver: 'One coat of red oxide + Two coats of oil paint (Enamel), from Asian / Berger / Nerolac / Dulux',
        gold: 'One coat of red oxide + Two coats of oil paint (Enamel), from Asian / Berger / Nerolac / Dulux',
      },
      {
        name: 'External Gate',
        silver: 'One coat of red oxide + Two coats of oil paint (Enamel), from Asian / Berger / Nerolac / Dulux',
        gold: 'One coat of red oxide + Two coats of oil paint (Enamel), from Asian / Berger / Nerolac / Dulux',
      },
    ],
  },
];
