#!/usr/bin/env node
/**
 * Reads GPS EXIF data out of site-visit photos and prints ready-to-paste
 * `SiteVisit` object stubs (see src/data/siteVisits.ts) grouped by location.
 *
 * Usage:
 *   node scripts/extract-photo-geo.mjs <folder-path>
 *
 * This script only reads files and prints to stdout — it never writes to
 * siteVisits.ts, so hand-authored fields (title, description, projectType)
 * are never clobbered. Photos with no GPS EXIF (some watermark apps strip
 * it while keeping the visible text stamp) are listed separately so their
 * coordinates can be filled in manually from the visible address text.
 */

import { readdir } from 'node:fs/promises';
import path from 'node:path';
import exifr from 'exifr';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.heif']);
const GROUP_RADIUS_METERS = 150; // photos within this distance are treated as one site visit

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function groupByProximity(points) {
  const groups = [];
  for (const point of points) {
    const existing = groups.find(
      (g) => haversineMeters(g[0], point) <= GROUP_RADIUS_METERS
    );
    if (existing) {
      existing.push(point);
    } else {
      groups.push([point]);
    }
  }
  return groups;
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function reverseGeocode(lat, lng, apiKey) {
  if (!apiKey) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data?.results?.[0];
    if (!result) return null;
    const locality =
      result.address_components?.find((c) => c.types.includes('sublocality') || c.types.includes('locality'))
        ?.long_name ?? null;
    return { formattedAddress: result.formatted_address, locality };
  } catch {
    return null;
  }
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error('Usage: node scripts/extract-photo-geo.mjs <folder-path>');
    process.exit(1);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.log('(No GOOGLE_MAPS_API_KEY / NEXT_PUBLIC_GOOGLE_MAPS_API_KEY found in env — skipping reverse geocoding; locality/address fields will need to be filled in manually.)\n');
  }

  const entries = await readdir(folder, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(folder, e.name));

  if (files.length === 0) {
    console.error(`No image files found in ${folder}`);
    process.exit(1);
  }

  const withGps = [];
  const withoutGps = [];

  for (const file of files) {
    const gps = await exifr.gps(file).catch(() => null);
    if (gps?.latitude && gps?.longitude) {
      const meta = await exifr.parse(file, ['DateTimeOriginal']).catch(() => null);
      withGps.push({
        file,
        lat: gps.latitude,
        lng: gps.longitude,
        date: meta?.DateTimeOriginal ?? null,
      });
    } else {
      withoutGps.push(file);
    }
  }

  const groups = groupByProximity(withGps);

  console.log(`Found ${withGps.length} photo(s) with GPS EXIF, grouped into ${groups.length} site visit(s).\n`);

  let index = 0;
  for (const group of groups) {
    index += 1;
    const avgLat = group.reduce((sum, p) => sum + p.lat, 0) / group.length;
    const avgLng = group.reduce((sum, p) => sum + p.lng, 0) / group.length;
    const earliestDate = group
      .map((p) => p.date)
      .filter(Boolean)
      .sort()[0];

    const geo = await reverseGeocode(avgLat, avgLng, apiKey);
    const locality = geo?.locality ?? 'TODO: locality (e.g. Nehru Nagar, Bhopal)';
    const address = geo?.formattedAddress ?? 'TODO: full address';
    const slug = slugify(locality !== null ? `${locality}-${index}` : `site-visit-${index}`);

    console.log(`--- Site Visit ${index} (${group.length} photo${group.length > 1 ? 's' : ''}) ---`);
    console.log(`  {
    id: 'sv-${slug}',
    title: 'TODO: project title',
    slug: '${slug}',
    lat: ${avgLat.toFixed(6)},
    lng: ${avgLng.toFixed(6)},
    locality: '${locality}',
    address: '${address}',
    date: '${earliestDate ? new Date(earliestDate).toISOString().slice(0, 10) : 'TODO: YYYY-MM-DD'}',
    projectType: 'TODO: Construction / Renovation / Commercial / Government',
    description: 'TODO: short description of the visit.',
    photos: [
${group.map((p) => `      '/images/site-visits/${slug}/${path.basename(p.file)}',`).join('\n')}
    ],
  },`);
    console.log(`  (source files: ${group.map((p) => p.file).join(', ')})`);
    console.log(`  → copy these files into public/images/site-visits/${slug}/ before using this entry\n`);
  }

  if (withoutGps.length > 0) {
    console.log(`\n⚠ ${withoutGps.length} photo(s) had no GPS EXIF data (location/coordinates must be entered manually, e.g. from the visible watermark text):`);
    withoutGps.forEach((f) => console.log(`  - ${f}`));
  }
}

main();
