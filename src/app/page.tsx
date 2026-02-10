import { Metadata } from 'next';
import Home from "@/components/pages/Home";
import { createClient } from "@/prismicio";
import { Property, PropertyType } from "@/data/properties";
import { Blog } from "@/data/blogs";
import * as prismic from "@prismicio/client";
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
    fullDescription: (Array.isArray(data.full_description) ? prismic.asHTML(data.full_description) : "") || "",
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
    country: data.country || undefined,
    state: data.state || undefined,
    city: data.city || undefined,
  };
}

function mapPrismicToBlog(doc: any): Blog {
  const data = doc.data;
  return {
    id: doc.id,
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "Uncategorized",
    date: data.publish_date
      ? new Date(data.publish_date).toLocaleDateString()
      : new Date(doc.first_publication_date).toLocaleDateString(),
    image: prismic.isFilled.image(data.featured_image) ? data.featured_image.url || "" : "",
    author: data.author || "Admin",
    content: (Array.isArray(data.content) ? prismic.asHTML(data.content) : "") || "",
    slug: doc.uid,

    // SEO
    meta_title: data.meta_title || undefined,
    meta_description: data.meta_description || undefined,
    keywords: data.keywords || undefined,
  };
}

export default async function HomePage() {
  const client = createClient();

  // Fetch featured properties
  const propertyDocs = await client.getAllByType("property", {
    // limit: 6 // Optional limit
  });
  const featuredProperties = propertyDocs.map(mapPrismicToProperty);

  // Fetch latest blogs
  const blogDocs = await client.getAllByType("blog_post", {
    limit: 6,
    orderings: {
      field: "my.blog_post.publish_date",
      direction: "desc",
    },
  });
  const latestBlogs = blogDocs.map(mapPrismicToBlog);

  return <Home featuredProperties={featuredProperties} latestBlogs={latestBlogs} />;
}
