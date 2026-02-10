import { Suspense } from 'react';
import Properties from "@/components/pages/Properties";

export const metadata = {
    title: "Luxury Properties for Sale | Akshar One",
    description: "Browse our curated collection of luxury properties. From modern apartments to sprawling estates, find your dream home with Akshar One.",
    keywords: "luxury homes for sale, real estate listings, buy property, premium apartments, luxury villas",
    openGraph: {
        title: "Luxury Properties for Sale | Akshar One",
        description: "Browse our curated collection of luxury properties. From modern apartments to sprawling estates, find your dream home with Akshar One.",
    },
};

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading properties...</div>}>
            <Properties />
        </Suspense>
    );
}
