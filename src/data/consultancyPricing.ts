// Design & consultancy service charges — transcribed from RCC's own
// "Consultancy Charges" rate card. This is a separate service line from
// construction execution (see PlanComparison): these are
// fees for design/drawing work (floor plans, elevations, structural,
// working, EPD, and complete civil drawing sets), not construction cost.
//
// The source document has two pricing modes for the same six services:
//   - flat fee per plan type, for projects under 5,000 sq ft
//   - a rate per sq ft, for projects at or above 5,000 sq ft
// Both are captured per-row here so nothing is duplicated across tiers.
//
// "Complete Civil Drawings" is the whole set, so its price IS the sum of the
// five individual sets — the 10% below is the only discount, and it applies on
// top. It used to be transcribed as four more hardcoded numbers, which drifted:
// duplex read ₹24,500 against parts totalling ₹25,500, and triplex read ₹27,000
// against parts totalling ₹26,500. It is now derived, so the published total can
// never disagree with the rows above it again. Change a service, the set follows.

export interface ConsultancyService {
  name: string;
  simplex: number;
  duplex: number;
  triplex: number;
  ratePerSqft: number;
  /** The bundled "complete set" row — called out distinctly in the source. */
  isBundle?: boolean;
}

/** The five individually-priced drawing sets. The source of truth for every figure. */
export const CONSULTANCY_ITEMS: ConsultancyService[] = [
  { name: 'Floor Plan & Furniture Layout', simplex: 4500, duplex: 5500, triplex: 5000, ratePerSqft: 2 },
  { name: 'Elevation 3D & 2D', simplex: 5000, duplex: 5500, triplex: 6000, ratePerSqft: 2 },
  { name: 'Structure Drawings', simplex: 5000, duplex: 5500, triplex: 5500, ratePerSqft: 3 },
  { name: 'Working Drawings', simplex: 4000, duplex: 4500, triplex: 5000, ratePerSqft: 1.5 },
  { name: 'EPD Drawings', simplex: 4000, duplex: 4500, triplex: 5000, ratePerSqft: 1.5 },
];

type PriceKey = 'simplex' | 'duplex' | 'triplex' | 'ratePerSqft';

/** Rounded to 2dp so a fractional per-sq-ft rate can't surface as 9.999999999. */
const totalOf = (key: PriceKey): number =>
  Math.round(CONSULTANCY_ITEMS.reduce((total, service) => total + service[key], 0) * 100) / 100;

export const CONSULTANCY_BUNDLE: ConsultancyService = {
  name: 'Complete Civil Drawings',
  simplex: totalOf('simplex'),
  duplex: totalOf('duplex'),
  triplex: totalOf('triplex'),
  ratePerSqft: totalOf('ratePerSqft'),
  isBundle: true,
};

export const CONSULTANCY_SERVICES: ConsultancyService[] = [
  ...CONSULTANCY_ITEMS,
  CONSULTANCY_BUNDLE,
];

// "Get an extra 10% discount on the complete set with a one time payment."
export const BUNDLE_ONE_TIME_DISCOUNT_PERCENT = 10;

export const CONSULTANCY_SQFT_THRESHOLD = 5000;
