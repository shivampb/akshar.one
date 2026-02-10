import { Metadata } from 'next';
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "Akshar One | Luxury Real Estate",
  description: "Discover luxury living with Akshar One. Browse our exclusive collection of premium properties and find your perfect home.",
  keywords: "luxury real estate, premium properties, buy home, real estate agents, akshar one",
  openGraph: {
    title: "Akshar One | Luxury Real Estate",
    description: "Discover luxury living with Akshar One. Browse our exclusive collection of premium properties and find your perfect home.",
  },
};

export default function HomePage() {
  return <Home />;
}
