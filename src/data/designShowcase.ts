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
      },
      {
        src: '/images/3d-design/wall-elevation-aa.png',
        alt: "Wall Elevation AA' drawing with aquarium niche and feature wall detailing, sectional plan, and 3D reference renders",
        label: "Wall Elevation — AA'",
        caption: 'Sectional Plan & 3D Reference',
        category: 'elevation',
      },
      {
        src: '/images/3d-design/floor-furniture-layout.png',
        alt: 'Detailed floor and furniture layout plan showing the dining table, sofa, aquarium, and staircase placement',
        label: 'Floor & Furniture Layout Plan',
        category: 'floor-plan',
      },
      {
        src: '/images/3d-design/floor-plan-sections.png',
        alt: 'Floor plan with section-cut markers A-A, B-B and C-C, showing furniture layout and room entry points',
        label: 'Floor Plan — Layout & Sections',
        category: 'floor-plan',
      },
    ],
  },
];
