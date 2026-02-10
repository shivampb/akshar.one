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

import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);
  const gaId = settings?.data.google_analytics_id;

  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <head>
        {settings?.data.header_scripts && (
          <script dangerouslySetInnerHTML={{ __html: settings.data.header_scripts }} />
        )}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased font-serif">
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
        <PrismicPreview repositoryName={repositoryName} />
        {settings?.data.footer_scripts && (
          <script dangerouslySetInnerHTML={{ __html: settings.data.footer_scripts }} />
        )}
      </body>
    </html>
  );
}
