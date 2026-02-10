import { notFound } from "next/navigation";
import { Metadata } from "next";
import PropertyDetails from "@/components/pages/PropertyDetails";
import { createClient } from "@/prismicio";
import { Property, PropertyType } from "@/data/properties";
import * as prismic from "@prismicio/client";

type Params = { slug: string };

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
      area: typeof data.area === 'string' ? parseFloat(data.area) || 0 : (data.area || 0),
    },
    amenities: amenities as string[],
    isFeatured: data.is_featured || false,

    // Project Specifications
    project_units: data.project_units || undefined,
    project_area: data.project_area || undefined,
    project_size: data.project_size || undefined,
    launch_date: data.launch_date || undefined,
    possession_status: data.possession_status || undefined,
    possession_date: data.possession_date || undefined,
    configuration: data.configuration || undefined,
    rera_id: prismic.asText(data.rera_id) || undefined,
    map_url: data.map_url || undefined,
    brochure_url: prismic.asLink(data.brochure) || undefined,
    faqs: data.faqs
      ? data.faqs.map((item: any) => ({
        question: item.question || "",
        answer: prismic.asText(item.answer) || "",
      }))
      : [],

    // SEO
    meta_title: data.meta_title || undefined,
    meta_description: data.meta_description || undefined,
    keywords: data.keywords || undefined,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = createClient();
  const property = await client.getByUID("property", slug).catch(() => null);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.data.meta_title || `${property.data.name} | Real Estate`,
    description: property.data.meta_description || property.data.short_description,
    keywords: property.data.keywords,
    openGraph: {
      title: property.data.meta_title || `${property.data.name} | Real Estate` || undefined,
      description: property.data.meta_description || property.data.short_description || undefined,
      images: prismic.isFilled.image(property.data.main_image) ? [property.data.main_image.url || ""] : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const client = createClient();

  const propertyDoc = await client.getByUID("property", slug).catch(() => null);

  if (!propertyDoc) {
    notFound();
  }

  const property = mapPrismicToProperty(propertyDoc);

  // Fetch related properties (basic implementation matching existing logic)
  // We can't easily query by area_name if it's not a clear field, so we fallback to type or category
  const relatedDocs = await client.getAllByType("property", {
    limit: 3,
    filters: [
      prismic.filter.at("my.property.type", property.type),
      prismic.filter.not("document.id", property.id)
    ]
  });

  const relatedProperties = relatedDocs.map(mapPrismicToProperty);

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
      addressLocality: property.location, // Approximate
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

export async function generateStaticParams() {
  const client = createClient();
  const properties = await client.getAllByType("property");

  return properties.map((property) => {
    return { slug: property.uid };
  });
}
