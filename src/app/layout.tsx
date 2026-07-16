import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AIChatWidget from "@/components/AIChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "RCC | Build Beyond Imagination",
  description: "Premium construction solutions that transform your vision into architectural masterpieces. Experience luxury construction redefined.",
  keywords: ["construction", "luxury building", "premium construction", "architecture", "design build"],
  openGraph: {
    title: "RCC | Build Beyond Imagination",
    description: "Premium construction solutions that transform your vision into architectural masterpieces. Experience luxury construction redefined.",
    url: "https://rccbuild.in",
    siteName: "Reliable Construction & Consultancy",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "RCC Premium Construction Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RCC | Build Beyond Imagination",
    description: "Premium construction solutions redefining luxury architectural design.",
    images: ["/hero-bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="noise-overlay">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ConstructionBusiness",
              "name": "Reliable Construction & Consultancy (RCC)",
              "image": "/logo.png",
              "@id": "https://rccbuild.in/#business",
              "url": "https://rccbuild.in",
              "telephone": "+917987900965",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Katara Hills",
                "addressLocality": "Bhopal",
                "addressRegion": "MP",
                "postalCode": "462043",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.2597,
                "longitude": 77.4126
              },
              "founder": [
                {
                  "@type": "Person",
                  "name": "Sanjay Saxena"
                },
                {
                  "@type": "Person",
                  "name": "Roshan Saxena"
                }
              ]
            })
          }}
        />
        {children}
        <AIChatWidget />
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <Script
            id="google-maps-script"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
