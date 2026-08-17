export interface SiteVisit {
  id: string;
  title: string;
  slug: string;
  lat: number;
  lng: number;
  locality: string;
  address: string;
  date: string;
  projectType: string;
  description: string;
  photos: string[];
}

// Real site-visit entries, extracted from "GPS Map Camera"-watermarked
// photos (source photos had no EXIF GPS — likely stripped by WhatsApp in
// transit — so coordinates below were read directly off each photo's
// on-image GPS stamp instead). See scripts/extract-photo-geo.mjs for the
// EXIF-based path once photos retain their metadata.
//
// Two more photos (Roosa Ryt. and Barnai Mal., both PIN 481884) are pending:
// they only carry a locality name with no on-image coordinates, and
// reverse/forward geocoding is currently blocked because the Geocoding API
// isn't enabled on the project's Maps API key. Source photos are staged in
// public/images/site-visits/pending-geocode/ until coordinates are available.
export const siteVisits: SiteVisit[] = [
  {
    id: 'sv-pairibahara',
    title: 'Foundation & Column Inspection — Pairibahara',
    slug: 'pairibahara',
    lat: 23.500321,
    lng: 81.723872,
    locality: 'Pairibahara, Madhya Pradesh',
    address: 'GP2F+R9X, Pairibahara, Madhya Pradesh 484669, India',
    date: '2022-11-05',
    projectType: 'Construction',
    description: 'Footing and column reinforcement inspection at Pairibahara — rebar cage spacing verified with tape measurement, followed by a plinth-level progress check on a later visit.',
    photos: [
      '/images/site-visits/pairibahara/visit-2.jpeg',
      '/images/site-visits/pairibahara/visit-1.jpeg',
    ],
  },
  {
    id: 'sv-padariya-ryt',
    title: 'Column & Slab Framing Review — Padariya Ryt.',
    slug: 'padariya-ryt',
    lat: 22.942065,
    lng: 80.680667,
    locality: 'Padariya Ryt., Madhya Pradesh',
    address: 'WMRJ+R7F, Padariya Ryt., Madhya Pradesh 481672, India',
    date: '2023-12-09',
    projectType: 'Construction',
    description: 'Multi-storey RCC frame inspection at Padariya Ryt. — column and slab work reviewed at an open framing stage, ahead of walling.',
    photos: ['/images/site-visits/padariya-ryt/visit-1.jpeg'],
  },
  {
    id: 'sv-ghogama',
    title: 'Foundation Layout Inspection — Ghogama',
    slug: 'ghogama',
    lat: 21.640085,
    lng: 77.684731,
    locality: 'Ghogama, Madhya Pradesh',
    address: 'JMQP+44, Ghogama, Madhya Pradesh 460225, India',
    date: '2022-09-25',
    projectType: 'Construction',
    description: 'Early-stage foundation and column layout review at Ghogama — footing columns cast and boundary wall under construction, revisited three weeks later for a follow-up check.',
    photos: [
      '/images/site-visits/ghogama/visit-1.jpeg',
      '/images/site-visits/ghogama/visit-2.jpeg',
    ],
  },
  {
    id: 'sv-singhodi-basti',
    title: 'Finishing & Facade Review — Singhodi Basti',
    slug: 'singhodi-basti',
    lat: 22.120056,
    lng: 80.516780,
    locality: 'Singhodi Basti, Madhya Pradesh',
    address: 'Baihar Lamta Rd, Singhodi Basti, Madhya Pradesh 481111, India',
    date: '2023-07-01',
    projectType: 'Construction',
    description: 'Exterior plaster and window-frame finishing review at Singhodi Basti, with a follow-up facade inspection roughly a year later.',
    photos: [
      '/images/site-visits/singhodi-basti/visit-1.jpeg',
      '/images/site-visits/singhodi-basti/visit-2.jpeg',
    ],
  },
];
