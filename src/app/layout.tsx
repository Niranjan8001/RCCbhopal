import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
