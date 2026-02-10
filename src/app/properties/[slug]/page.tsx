// Suspense imported but not used - kept for future async component boundaries
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PropertyDetails from "@/components/pages/PropertyDetails";
import { supabase } from "@/lib/supabase";
import { Property } from "@/data/properties";

// Fetch property data
async function getProperty(slug: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }
  return data as Property;
}

// Fetch related properties
async function getRelatedProperties(property: Property) {
  if (!supabase) return [];

  let relatedData = null;

  // Try fetching by area
  if (property.area_name) {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("area_name", property.area_name)
      .neq("id", property.id)
      .limit(3);

    relatedData = data;
  }

  // Fallback to type if needed
  if (!relatedData || relatedData.length === 0) {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("type", property.type)
      .neq("id", property.id)
      .limit(3);

    relatedData = data;
  }

  return (relatedData || []) as Property[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.meta_title || `${property.name} | Real Estate`,
    description: property.meta_description || property.shortDescription,
    keywords: property.keywords,
    openGraph: {
      title: property.meta_title || `${property.name} | Real Estate`,
      description: property.meta_description || property.shortDescription,
      images: property.images?.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const relatedProperties = await getRelatedProperties(property);

  // Structured Data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.meta_description || property.shortDescription,
    image: property.images,
    url: `https://aksharone.com/properties/${property.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: property.country,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetails
        property={property}
        relatedProperties={relatedProperties}
      />
    </>
  );
}
