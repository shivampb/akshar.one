import { Suspense } from 'react';
import Properties from "@/components/pages/Properties";
import { createClient } from "@/prismicio";
import { Property, PropertyType } from "@/data/properties";
import * as prismic from "@prismicio/client";
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

// Helper to map Prismic document to Property interface
function mapPrismicToProperty(doc: any): Property {
    const data = doc.data;

    // Collect all images from main image and gallery
    const images: string[] = [];
    if (prismic.isFilled.image(data.main_image)) {
        images.push(data.main_image.url || "");
    }
    if (data.gallery) {
        data.gallery.forEach((item: any) => {
            if (prismic.isFilled.image(item.image)) {
                images.push(item.image.url || "");
            }
        });
    }

    // Map amenities group to string array
    const amenities: string[] = data.amenities
        ? data.amenities.map((item: any) => item.name).filter(Boolean)
        : [];

    return {
        id: doc.id,
        name: data.name || "",
        slug: doc.uid,
        category: data.category || "Residential",
        type: (data.type as PropertyType) || "Apartment",
        location: data.location || "",
        address: data.address || "",
        price: data.price || 0,
        priceLabel: data.price_on_request ? "Price on Request" : `₹${(data.price || 0).toLocaleString('en-IN')}`,
        price_on_request: data.price_on_request || false,
        shortDescription: data.short_description || "",
        fullDescription: prismic.asHTML(data.full_description) || "",
        images: images,
        features: {
            area: data.area || 0,
        },
        amenities: amenities,
        isFeatured: data.is_featured || false,
        possession_status: data.possession_status || undefined,
        possession_date: data.possession_date,
        configuration: data.configuration,

        // SEO
        meta_title: data.meta_title || undefined,
        meta_description: data.meta_description || undefined,
        keywords: data.keywords || undefined,
        country: data.country || undefined, // Assuming country/state/city might be added to valid Property interface or Custom Type
        state: data.state || undefined,
        city: data.city || undefined,
    };
}

export default async function PropertiesPage() {
    const client = createClient();
    const propertyDocs = await client.getAllByType("property");
    const properties = propertyDocs.map(mapPrismicToProperty);

    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading properties...</div>}>
            <Properties initialProperties={properties} />
        </Suspense>
    );
}
