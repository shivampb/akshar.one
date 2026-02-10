import type { Metadata } from "next";
// import localFont from "next/font/local"; // If using local fonts
import { Outfit, Cormorant_Garamond } from "next/font/google"; // Using google fonts via next/font
import "./globals.css";
import { Providers } from "@/components/providers";
import { Layout } from "@/components/layout/Layout";

// Configure fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshar One | Luxury Real Estate Properties",
  description: "Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide. Experience real estate at its finest.",
  keywords: "luxury real estate, premium properties, luxury homes, villas, penthouses, estates, high-end properties",
  authors: [{ name: "Akshar One" }],
  openGraph: {
    type: "website",
    url: "https://aksharone.com/",
    title: "Akshar One | Luxury Real Estate Properties",
    description: "Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide.",
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AksharOne",
    title: "Akshar One | Luxury Real Estate Properties",
    description: "Discover exceptional luxury properties curated for discerning buyers. Premium villas, penthouses, and estates in prime locations worldwide.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="antialiased font-serif">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
