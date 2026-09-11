import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AIChatWidget from "@/components/AIChatWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rccbhopal.in"),
  title: {
    default: "RCC | Build Beyond Imagination",
    template: "%s | RCC",
  },
  description: "Premium construction solutions that transform your vision into architectural masterpieces. Experience luxury construction redefined.",
  keywords: ["construction", "luxury building", "premium construction", "architecture", "design build"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RCC | Build Beyond Imagination",
    description: "Premium construction solutions that transform your vision into architectural masterpieces. Experience luxury construction redefined.",
    url: "https://www.rccbhopal.in",
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
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0);`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ConstructionBusiness",
              "name": "Reliable Construction & Consultancy (RCC)",
              "image": "/logo.png",
              "@id": "https://www.rccbhopal.in/#business",
              "url": "https://www.rccbhopal.in",
              "telephone": "+917987900965",
              "priceRange": "$$$",
              "foundingDate": "2022",
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
        <GoogleAnalytics />
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
