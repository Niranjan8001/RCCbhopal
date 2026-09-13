// Single source of truth for RCC's physical location.
//
// Every value below is transcribed from the company's own Google Business
// Profile (fetched via the Places Details API for the place ID in
// NEXT_PUBLIC_GOOGLE_PLACE_ID). Do not hand-edit the coordinates: if the
// listing moves, re-read them from the Places API rather than estimating.
//
// This file exists because the coordinates were previously hardcoded
// separately in the JSON-LD and in the "Get Directions" link, and the two
// drifted onto a point ~14 km from the real office.

export const BUSINESS_LOCATION = {
  /** Verbatim from the Google Business Profile listing. */
  streetAddress: 'F-12A, 2nd Floor, Ramayan Arcade-I, Katara Hills, Bagli Village',
  locality: 'Bhopal',
  region: 'MP',
  postalCode: '462043',
  country: 'IN',
  /** Short form used in body copy. */
  shortAddress: 'Katara Hills, Bhopal, Madhya Pradesh',
  lat: 23.1690396,
  lng: 77.5036516,
} as const;

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

/**
 * Google Maps directions link. The coordinates are the destination; the place
 * ID is appended when available so Maps resolves to the exact business pin
 * rather than the nearest road point.
 */
export const DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}` +
  (PLACE_ID ? `&destination_place_id=${encodeURIComponent(PLACE_ID)}` : '');
