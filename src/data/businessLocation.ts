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
  /** Business name exactly as it appears on the Google listing. */
  listingName: 'Reliable Construction & Consultancy (RCC)',
  lat: 23.1690396,
  lng: 77.5036516,
  /** Google Maps customer ID for the listing — the canonical maps.google.com/?cid= link. */
  cid: '1588800241530572993',
} as const;

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

/**
 * The business's Google listing — where the rating and reviews shown on the
 * site come from. Linked wherever the rating is displayed so a visitor can
 * verify it at the source.
 */
export const LISTING_URL = `https://maps.google.com/?cid=${BUSINESS_LOCATION.cid}`;

/**
 * Google Maps directions link.
 *
 * `destination` must be the business NAME, not coordinates. Passing a bare
 * lat/lng alongside destination_place_id makes Maps drop a literal pin at
 * that point instead of resolving the listing, which sent people to the
 * wrong spot. Google's URL API expects the two parameters to describe the
 * same place, with the place ID disambiguating the name.
 *
 * Falls back to the canonical listing link if the place ID is unavailable at
 * build time.
 */
export const DIRECTIONS_URL = PLACE_ID
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      BUSINESS_LOCATION.listingName
    )}&destination_place_id=${encodeURIComponent(PLACE_ID)}`
  : `https://maps.google.com/?cid=${BUSINESS_LOCATION.cid}`;
