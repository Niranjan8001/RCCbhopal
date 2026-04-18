import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleMapsScript from "@/components/GoogleMapsScript";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="noise-overlay">
        {children}
        <GoogleMapsScript apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} />
      </body>
    </html>
  );
}
