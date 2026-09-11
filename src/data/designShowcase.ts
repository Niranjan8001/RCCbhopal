// 3D Design Visualization — sourced from RCC's own design documents:
//   - an interior design set (Living Area renders, Dining Area renders, two
//     wall-elevation/sectional sheets, two floor/furniture layout sheets)
//   - five 3D exterior elevation renders from other residential projects
//   - a residential drawing set (ground + first floor plans and matching
//     column layouts) and an office/MD cabin wall-elevation sheet
//
// Labels are transcribed verbatim from the sheets where they carry a printed
// title ("Wall Elevation - BB'", "Sectional Plan", "Ground Floor Plan",
// "Column Plan"); otherwise they use a plain descriptive category name.
//
// Note on the residential drawing set: the source sheets carried a private
// client's name in the title block. That name was redacted out of the
// exported images before they were added here — do not reinstate it.

export interface DesignImage {
  src: string;
  alt: string;
  label: string;
  /** Secondary line shown under the label, for sheets that combine more than one drawing type. */
  caption?: string;
  /** Only set on documentation images — drives the Design Documentation filter. */
  category?: 'elevation' | 'floor-plan' | 'column-layout';
  /**
   * Key callouts transcribed directly from the drawing sheet (paint codes,
   * material finishes, dimensions, fixture notes) so they're readable
   * without zooming into the image. Verbatim from the source — nothing
   * inferred beyond what's printed on the sheet.
   */
  specs?: { label: string; value: string }[];
}

export interface DesignSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  type: 'render' | 'documentation';
  /**
   * How renders fill the gallery frame. Use 'contain' for sections whose
   * images mix portrait and landscape, so no part of the building is cropped.
   * Defaults to 'cover'.
   */
  fit?: 'cover' | 'contain';
  images: DesignImage[];
}

export const DESIGN_SECTIONS: DesignSection[] = [
  {
    id: 'living-area',
    eyebrow: '01 — Living Area',
    title: 'Living Area',
    description:
      'Two perspectives of the same living space — from the seating arrangement to the view opening toward the dining area beyond.',
    type: 'render',
    images: [
      {
        src: '/images/3d-design/living-area-view-1.jpg',
        alt: 'Living area 3D render: L-shaped sofa and armchairs facing a botanical wall art panel, with a living moss wall to the left',
        label: 'View 01',
      },
      {
        src: '/images/3d-design/living-area-view-2.jpg',
        alt: 'Living area 3D render: seating area opening toward the dining table, staircase, and a wood-fluted feature wall with neon signage',
        label: 'View 02',
      },
    ],
  },
  {
    id: 'dining-area',
    eyebrow: '02 — Dining Area',
    title: 'Dining Area',
    description:
      'The dining space set beneath a crystal chandelier, with the under-stair landscaping and aquarium feature as a second viewpoint.',
    type: 'render',
    images: [
      {
        src: '/images/3d-design/dining-area-view-1.jpg',
        alt: 'Dining area 3D render: dining table set for six beneath a crystal chandelier, staircase and living moss wall behind',
        label: 'View 01',
      },
      {
        src: '/images/3d-design/dining-area-view-2.jpg',
        alt: 'Dining area 3D render: under-stair planter with an aquarium feature built into the landscaped niche',
        label: 'View 02',
      },
    ],
  },
  {
    id: 'exterior-elevations',
    eyebrow: '03 — Exterior Elevations',
    title: 'Exterior Elevations',
    description:
      '3D elevation studies from across our residential projects — the front-facade treatments, balcony lines, and material palettes worked out before a single brick is laid.',
    type: 'render',
    fit: 'contain',
    images: [
      {
        src: '/images/3d-design/exterior-1.jpg',
        alt: '3D exterior elevation render: three-storey corner residence with grey and wood cladding, stone feature walls, and a slatted compound gate',
        label: 'View 01',
      },
      {
        src: '/images/3d-design/exterior-2.jpg',
        alt: '3D exterior elevation render: corner residence with cantilevered balconies, dark louvered panels, and stone-clad columns',
        label: 'View 02',
      },
      {
        src: '/images/3d-design/exterior-3.jpg',
        alt: '3D exterior elevation render: front facade in brown and peach tones with a decorative jali panel, planters, and a patterned compound wall',
        label: 'View 03',
      },
      {
        src: '/images/3d-design/exterior-4.jpg',
        alt: '3D exterior elevation render: grey and beige front facade with a tree motif panel, stacked balconies, and stone-tile cladding',
        label: 'View 04',
      },
      {
        src: '/images/3d-design/exterior-5.jpg',
        alt: '3D exterior elevation render: green and white facade with glass balcony railings, a tall slim window, and a carved jali panel',
        label: 'View 05',
      },
    ],
  },
  {
    id: 'technical',
    eyebrow: '04 — Design Documentation',
    title: 'The Design Behind It',
    description:
      'The wall elevations, sections, floor plans, and column layouts our visualizations are developed from — drawn to the same standard we hand to site.',
    type: 'documentation',
    images: [
      {
        src: '/images/3d-design/wall-elevation-bb.png',
        alt: "Wall Elevation BB' drawing with sliding door detailing, sectional plan, and a 3D reference render",
        label: "Wall Elevation — BB'",
        caption: 'Sectional Plan & 3D Reference',
        category: 'elevation',
        specs: [
          { label: 'False Ceiling', value: '12" down false ceiling' },
          { label: 'Sliding Door Glass', value: '8mm thick toughened glass (as/selec)' },
          { label: 'Door Louvers', value: 'Fluted louvers (as/selec) pasted on sliding door, level +1"' },
          { label: 'Signage', value: 'Neon sign (as/purchase)' },
          { label: 'Wall Finish', value: 'AsianPaint 7935 Yellow Charm' },
          { label: 'Wall Moulding', value: "38mm x 19mm MDF moulding pasted on wall finish, AsianPaint 7935 Yellow Charm" },
          { label: 'Skirting', value: '4" stone skirting (as/selec)' },
          { label: 'Ceiling Height', value: "8'-2\"" },
          { label: 'Overall Elevation Width', value: "21'-0\"" },
          { label: 'Sectional Plan', value: 'Wooden sliding door finish with fluted louvers; highlighter wall; way to toilet' },
        ],
      },
      {
        src: '/images/3d-design/wall-elevation-aa.png',
        alt: "Wall Elevation AA' drawing with aquarium niche and feature wall detailing, sectional plan, and 3D reference renders",
        label: "Wall Elevation — AA'",
        caption: 'Sectional Plan & 3D Reference',
        category: 'elevation',
        specs: [
          { label: 'False Ceiling', value: '14" down false ceiling' },
          { label: 'Wall Finish', value: 'AsianPaint 8298 Silver Trinket' },
          { label: 'Wall Moulding', value: "38mm x 19mm MDF moulding pasted on wall finish, AsianPaint 8292 White Gold" },
          { label: 'Wallpaper', value: 'As per selection (as/selec)' },
          { label: 'Lighting', value: 'Wall sconce light' },
          { label: 'Feature Panel', value: '12mm thick ply pasted on wall finish with laminate (SF 5113 Red Gate Dark), advance brand, with profile light on both sides' },
          { label: 'Accent Wall', value: 'Artificial grass wall panel pasted on level ±00' },
          { label: 'Skirting', value: '4" stone skirting (as/selec)' },
          { label: 'Aquarium Platform', value: '3" raised platform' },
          { label: 'Aquarium Height', value: "5'-9\"" },
          { label: 'Overall Elevation Width', value: "24'-4\"" },
          { label: 'Sectional Plan', value: 'Aquarium with landscaping under staircase area; L-shape sofa' },
        ],
      },
      {
        src: '/images/3d-design/floor-furniture-layout.png',
        alt: 'Detailed floor and furniture layout plan showing the dining table, sofa, aquarium, and staircase placement',
        label: 'Floor & Furniture Layout Plan',
        category: 'floor-plan',
        specs: [
          { label: 'Furniture Shown', value: 'Dining table, L-shape sofa, sofa chairs, center table, side table' },
          { label: 'Feature', value: 'Aquarium with landscaping under the staircase area' },
          { label: 'Door Finish', value: 'Wooden sliding door finish with fluted louvers' },
          { label: 'Accent Wall', value: 'Highlighter wall' },
          { label: 'Circulation', value: 'Marked routes to the kitchen, bedroom and toilet, plus the staircase (up/down) and main entry' },
        ],
      },
      {
        src: '/images/3d-design/floor-plan-sections.png',
        alt: 'Floor plan with section-cut markers A-A, B-B and C-C, showing furniture layout and room entry points',
        label: 'Floor Plan — Layout & Sections',
        category: 'floor-plan',
        specs: [
          { label: 'Furniture Shown', value: 'Dining table, two L-shape sofas, sofa chairs, center table, side table' },
          { label: 'Feature', value: 'Aquarium with landscaping under the staircase area' },
          { label: 'Section Markers', value: 'Section cuts A-A, B-B and C-C' },
          { label: 'Door Finish', value: 'Wooden sliding door finish with fluted louvers' },
          { label: 'Accent Wall', value: 'Highlighter wall' },
          { label: 'Circulation', value: 'Marked route to the toilet and main entry' },
        ],
      },
      {
        src: '/images/3d-design/plan-ground-floor.png',
        alt: 'Ground floor plan for a residential project, showing bedrooms, dining, hall, kitchen, lobby, porch and parking with dimensions',
        label: 'Ground Floor Plan',
        caption: 'Residential — 2,547.285 sq ft slab area',
        category: 'floor-plan',
        specs: [
          { label: 'Slab Area', value: '2,547.285 sq ft' },
          { label: 'Plot Frontage', value: "70'-1\" x 48'-0\"" },
          { label: 'Floor Height', value: "11'6\" (including slab)" },
          { label: 'Staircase', value: "Width 3'-4\"; riser 7\"; tread 10\"" },
          { label: 'Wall Thickness', value: 'Outer 9"; inner 4"' },
          { label: 'Rooms Shown', value: 'Two bedrooms, dining, hall, kitchen, lobby, store, two toilets, porch and parking' },
        ],
      },
      {
        src: '/images/3d-design/plan-first-floor.png',
        alt: 'First floor plan for a residential project, showing bedrooms, two living rooms, kitchen/dining areas, balconies and a sit-out with dimensions',
        label: 'First Floor Plan',
        caption: 'Residential — 2,547.285 sq ft slab area',
        category: 'floor-plan',
        specs: [
          { label: 'Slab Area', value: '2,547.285 sq ft' },
          { label: 'Floor Height', value: "11'6\" (including slab)" },
          { label: 'Staircase', value: "Width 3'-4\"; riser 7\"; tread 10\"" },
          { label: 'Wall Thickness', value: 'Outer 9"; inner 4"' },
          { label: 'Rooms Shown', value: 'Two bedrooms, two living rooms, two kitchen/dining areas, toilets, store, balconies, sit-out and lobby' },
          { label: 'Sheet Note', value: 'The shared designs are according to our expertise and the best possibilities as per the technical perspective' },
        ],
      },
      {
        src: '/images/3d-design/column-layout-ground-floor.png',
        alt: 'Expected column layout over the ground floor plan, marking column positions with structural specification notes',
        label: 'Column Layout — Ground Floor',
        caption: 'Expected column positions',
        category: 'column-layout',
        specs: [
          { label: 'Scope', value: 'This layout only shows position of the columns. Sizes of the columns will be decided after analysis.' },
          { label: 'Steel Reinforcement', value: 'Conforming to IS 1786-1985 code; FE-550 grade should be used' },
          { label: 'Concrete Grades', value: 'M7.5 = 1:4:8 (used as P.C.C.); M20 = 1:1.5:3 (used in building); M25 = 1:1:2' },
          { label: 'Clear Cover', value: 'Footings 50mm; raft top 50mm, bottom/sides 75mm; strap beam 50mm; grade slab 20mm; column 40mm; shear wall 25mm; beams 25mm; slabs 15mm; staircase 15mm; water-retaining structures 20/30mm' },
          { label: 'Lapping Length', value: '48D-50D (D = dia of bar)' },
          { label: 'Bar Spacing', value: 'Minimum spacing between longitudinal bars: 2 inches or 50mm' },
          { label: 'Foundations', value: 'Designed according to given site soil condition (soil bearing capacity)' },
        ],
      },
      {
        src: '/images/3d-design/column-layout-first-floor.png',
        alt: 'Expected column layout over the first floor plan, marking column positions with formwork and curing notes',
        label: 'Column Layout — First Floor',
        caption: 'Expected column positions',
        category: 'column-layout',
        specs: [
          { label: 'Scope', value: 'This layout only shows position of the columns. Sizes of the columns will be decided after analysis.' },
          { label: 'Formwork Removal', value: 'Vertical formwork of column, beam and wall: 16-24 hours' },
          { label: 'Props — Beams & Arches', value: 'Span up to 6m: 14 days; beyond 6m: 21 days' },
          { label: 'Props — Slab', value: 'Span up to 4.5m: 7 days; beyond 4.5m: 14 days' },
          { label: 'Curing Time', value: 'PCC 14 days; RCC 10 days; flooring 10 days; plastering & pointing 7 days; brick & stone work 7 days' },
        ],
      },
      {
        src: '/images/3d-design/office-wall-elevations.png',
        alt: 'Office cabin wall elevation sheet showing elevations at walls A, B, C and D around a central furniture plan with an MD desk',
        label: 'Wall Elevations — Office Cabin',
        caption: 'Elevations @ Walls A, B, C & D',
        category: 'elevation',
        specs: [
          { label: 'Sheet Contents', value: 'Elevations at Wall A, B, C and D, with a central furniture plan' },
          { label: 'Furniture Plan', value: "MD desk (LVL +2'6\"), desktop table, overhead unit, shelf and low-height storage (LVL +24\")" },
          { label: 'Wall A', value: 'Wooden paneling, white paint, drawer and openable shutter units, glass door, floor skirting' },
          { label: 'Wall B', value: 'Wooden paneling, wallpaper, TV, AC, wooden beading, wall paneling up to sill level' },
          { label: 'Wall C', value: 'Wooden paneling, wallpaper, slider window with blinds, wall lamp (as per selection), wall paneling' },
          { label: 'Wall D', value: 'Curtain, wallpaper, display shelves, beam in white paint, floor skirting' },
        ],
      },
    ],
  },
];
