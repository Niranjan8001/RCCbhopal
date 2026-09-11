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

export interface ConsultancyService {
  name: string;
  simplex: number;
  duplex: number;
  triplex: number;
  ratePerSqft: number;
  /** The bundled "complete set" row — called out distinctly in the source. */
  isBundle?: boolean;
}

export const CONSULTANCY_SERVICES: ConsultancyService[] = [
  { name: 'Floor Plan & Furniture Layout', simplex: 4500, duplex: 5500, triplex: 5000, ratePerSqft: 2 },
  { name: 'Elevation 3D & 2D', simplex: 5000, duplex: 5500, triplex: 6000, ratePerSqft: 2 },
  { name: 'Structure Drawings', simplex: 5000, duplex: 5500, triplex: 5500, ratePerSqft: 3 },
  { name: 'Working Drawings', simplex: 4000, duplex: 4500, triplex: 5000, ratePerSqft: 1.5 },
  { name: 'EPD Drawings', simplex: 4000, duplex: 4500, triplex: 5000, ratePerSqft: 1.5 },
  {
    name: 'Complete Civil Drawings',
    simplex: 22500,
    duplex: 24500,
    triplex: 27000,
    ratePerSqft: 10,
    isBundle: true,
  },
];

// "Get an extra 10% discount on the complete set with a one time payment."
export const BUNDLE_ONE_TIME_DISCOUNT_PERCENT = 10;

export const CONSULTANCY_SQFT_THRESHOLD = 5000;
