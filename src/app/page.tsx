import { Metadata } from 'next';
import Home from "@/components/pages/Home";

import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const dynamicMetadata = await getPageMetadata("/");

  return {
    title: dynamicMetadata.title || "Akshar One | Luxury Real Estate",
    description: dynamicMetadata.description || "Discover luxury living with Akshar One. Browse our exclusive collection of premium properties and find your perfect home.",
    keywords: dynamicMetadata.keywords || "luxury real estate, premium properties, buy home, real estate agents, akshar one",
    openGraph: {
      title: dynamicMetadata.title || "Akshar One | Luxury Real Estate",
      description: dynamicMetadata.description || "Discover luxury living with Akshar One. Browse our exclusive collection of premium properties and find your perfect home.",
    },
  };
}

export default function HomePage() {
  return <Home />;
}
