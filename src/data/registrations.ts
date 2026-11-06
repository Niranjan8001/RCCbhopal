// RCC's statutory registrations, transcribed from the company letterhead.
//
// These appear in two places — the credentials card opened from the hero and
// the foundation band under the team — so they live here rather than inside
// either component.
//
// The letterhead does not record which individual personally holds each
// licence, so none of them is attributed to a named person. They are the
// firm's. Do not move a number under someone's name without being told whose
// it is: a licence printed under a person is a claim about that person.

export interface Registration {
  label: string;
  /** The registering authority. */
  body: string;
  no: string;
}

export const REGISTRATIONS: Registration[] = [
  { label: 'Architect', body: 'MP PWD', no: '4/CA/EDC/EMP/2024/2937' },
  { label: 'Supervision & Quality Control', body: 'MP PWD', no: '4/CA/EDC/EMP/2021/3946' },
  { label: 'Structural Engineer', body: 'BMC', no: 'BHO/0269/STR/2026/00018' },
  { label: 'Contractor', body: 'MP PWD Reg.', no: '230065044' },
];

export const GSTIN = '23ABEFR0366H1ZE';

export const TAGLINE = 'Building Planning | Construction | Supervision | Interior Works';

/**
 * RCC the registered firm, which is what this card represents.
 *
 * Not to be confused with 1991, which appears in the hero, the vision heading
 * and the team's foundation band: that is the founder's engineering legacy
 * (the 35 years), not the company's incorporation.
 */
export const ESTABLISHED = '2022';
