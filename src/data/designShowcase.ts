// Design gallery — sourced from RCC's own design documents:
//   - an interior design set (Living Area renders, Dining Area renders, two
//     wall-elevation/sectional sheets, two floor/furniture layout sheets)
//   - five 3D exterior elevation renders from other residential projects
//   - a residential drawing set (ground + first floor plans and matching
//     column layouts) and an office/MD cabin wall-elevation sheet
//
// Labels are transcribed verbatim from the sheets where they carry a printed
// title ("Wall Elevation - BB'", "Ground Floor Plan", "Column Plan");
// otherwise they use a plain descriptive category name.
//
// Deliberately NOT recorded here: areas, plot sizes, floor heights, wall
// thicknesses, material/paint codes or any other figure printed on a sheet.
// The gallery presents the drawings and renders as images only — do not add
// dimension or specification metadata back to these entries.
//
// Note on the residential drawing set: the source sheets carried a private
// client's name in the title block. That name was redacted out of the
// exported images before they were added here — do not reinstate it.

export interface DesignImage {
  src: string;
  alt: string;
  /** Short category printed above the label on the gallery page. */
  group: string;
  /** Specific identifier for this sheet or view. */
  label: string;
  /**
   * How the image sits in its frame. Line drawings and mixed-orientation
   * renders use 'contain' so nothing is cropped away. Defaults to 'cover'.
   */
  fit?: 'cover' | 'contain';
}

// Ordered as facing pairs — the gallery shows two consecutive entries per
// spread, so entries at even/odd indices sit left/right of the same fold.
export const DESIGN_GALLERY: DesignImage[] = [
  {
    src: '/images/3d-design/living-area-view-1.jpg',
    alt: 'Living area 3D render: L-shaped sofa and armchairs facing a botanical wall art panel, with a living moss wall to the left',
    group: 'Living Area',
    label: 'View 01',
  },
  {
    src: '/images/3d-design/living-area-view-2.jpg',
    alt: 'Living area 3D render: seating area opening toward the dining table, staircase, and a wood-fluted feature wall with neon signage',
    group: 'Living Area',
    label: 'View 02',
  },
  {
    src: '/images/3d-design/dining-area-view-1.jpg',
    alt: 'Dining area 3D render: dining table set for six beneath a crystal chandelier, staircase and living moss wall behind',
    group: 'Dining Area',
    label: 'View 01',
  },
  {
    src: '/images/3d-design/dining-area-view-2.jpg',
    alt: 'Dining area 3D render: under-stair planter with an aquarium feature built into the landscaped niche',
    group: 'Dining Area',
    label: 'View 02',
  },
  {
    src: '/images/3d-design/wall-elevation-aa.png',
    alt: "Wall Elevation AA' drawing with aquarium niche and feature wall detailing, alongside 3D reference renders",
    group: 'Wall Elevation',
    label: "Elevation AA'",
    fit: 'contain',
  },
  {
    src: '/images/3d-design/wall-elevation-bb.png',
    alt: "Wall Elevation BB' drawing with sliding door detailing, alongside a 3D reference render",
    group: 'Wall Elevation',
    label: "Elevation BB'",
    fit: 'contain',
  },
  {
    src: '/images/3d-design/floor-furniture-layout.png',
    alt: 'Floor and furniture layout plan showing the dining table, sofa, aquarium and staircase placement',
    group: 'Layout Plan',
    label: 'Floor & Furniture Layout',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/floor-plan-sections.png',
    alt: 'Floor plan marked with section cuts, showing the furniture layout and room entry points',
    group: 'Layout Plan',
    label: 'Layout & Sections',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/exterior-1.jpg',
    alt: '3D exterior elevation render: three-storey corner residence with grey and wood cladding, stone feature walls, and a slatted compound gate',
    group: 'Exterior Elevation',
    label: 'View 01',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/exterior-2.jpg',
    alt: '3D exterior elevation render: corner residence with cantilevered balconies, dark louvered panels, and stone-clad columns',
    group: 'Exterior Elevation',
    label: 'View 02',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/exterior-3.jpg',
    alt: '3D exterior elevation render: front facade in brown and peach tones with a decorative jali panel, planters, and a patterned compound wall',
    group: 'Exterior Elevation',
    label: 'View 03',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/exterior-4.jpg',
    alt: '3D exterior elevation render: grey and beige front facade with a tree motif panel, stacked balconies, and stone-tile cladding',
    group: 'Exterior Elevation',
    label: 'View 04',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/exterior-5.jpg',
    alt: '3D exterior elevation render: green and white facade with glass balcony railings, a tall slim window, and a carved jali panel',
    group: 'Exterior Elevation',
    label: 'View 05',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/office-wall-elevations.png',
    alt: 'Office cabin wall elevation sheet showing elevations at walls A, B, C and D around a central furniture plan',
    group: 'Wall Elevation',
    label: 'Office Cabin',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/plan-ground-floor.png',
    alt: 'Ground floor plan for a residential project, showing bedrooms, dining, hall, kitchen, lobby, porch and parking',
    group: 'Floor Plan',
    label: 'Ground Floor',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/plan-first-floor.png',
    alt: 'First floor plan for a residential project, showing bedrooms, living rooms, kitchen and dining areas, balconies and a sit-out',
    group: 'Floor Plan',
    label: 'First Floor',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/column-layout-ground-floor.png',
    alt: 'Expected column layout over the ground floor plan, marking column positions',
    group: 'Column Layout',
    label: 'Ground Floor',
    fit: 'contain',
  },
  {
    src: '/images/3d-design/column-layout-first-floor.png',
    alt: 'Expected column layout over the first floor plan, marking column positions',
    group: 'Column Layout',
    label: 'First Floor',
    fit: 'contain',
  },
];
