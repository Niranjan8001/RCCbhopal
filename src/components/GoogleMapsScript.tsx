'use client';

import Script from 'next/script';

interface GoogleMapsScriptProps {
  apiKey: string;
}

export default function GoogleMapsScript({ apiKey }: GoogleMapsScriptProps) {
  if (!apiKey) {
    console.error('[RCC] Google Maps API key is not configured. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.');
    return null;
  }

  return (
    <Script
      id="google-maps-script"
      src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      strategy="afterInteractive"
    />
  );
}
