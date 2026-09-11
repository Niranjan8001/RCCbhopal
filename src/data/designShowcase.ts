// 3D Design Visualization — source of truth is the supplied 6-page design
// document (Living Area renders, Dining Area renders, two wall-elevation /
// sectional sheets, and two floor/furniture layout sheets). Image labels
// below are either transcribed verbatim from the drawing sheets ("Wall
// Elevation - BB'", "Sectional Plan") or are plain descriptive category
// names for the two floor-plan sheets, which carry no printed title of
// their own in the source document.

export interface DesignImage {
  src: string;
  alt: string;
  label: string;
  /** Secondary line shown under the label, for sheets that combine more than one drawing type. */
  caption?: string;
  /** Only set on documentation images — used by the Elevations / Floor Plans filter. */
  category?: 'elevation' | 'floor-plan';
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
    id: 'technical',
    eyebrow: '03 — Design Documentation',
    title: 'The Design Behind It',
    description:
      'The wall elevations, sections, and floor layouts that the 3D visualizations above were developed from.',
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
    ],
  },
];
