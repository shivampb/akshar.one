import { Suspense } from 'react';
import Properties from "@/components/pages/Properties";

import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const dynamicMetadata = await getPageMetadata("/properties");

    return {
        title: dynamicMetadata.title || "Luxury Properties for Sale | Akshar One",
        description: dynamicMetadata.description || "Browse our curated collection of luxury properties. From modern apartments to sprawling estates, find your dream home with Akshar One.",
        keywords: dynamicMetadata.keywords || "luxury homes for sale, real estate listings, buy property, premium apartments, luxury villas",
        openGraph: {
            title: dynamicMetadata.title || "Luxury Properties for Sale | Akshar One",
            description: dynamicMetadata.description || "Browse our curated collection of luxury properties. From modern apartments to sprawling estates, find your dream home with Akshar One.",
        },
    };
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading properties...</div>}>
            <Properties />
        </Suspense>
    );
}
