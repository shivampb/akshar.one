import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://aksharone.com";

  // Static pages
  const routes = [
    "",
    "/properties",
    "/blogs",
    "/contact",
    "/about",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic properties
  let propertyRoutes: MetadataRoute.Sitemap = [];
  if (supabase) {
    try {
      const { data: properties } = await supabase
        .from("properties")
        .select("slug, updated_at");
      if (properties) {
        propertyRoutes = properties.map(
          (prop: { slug: string; updated_at: string | null }) => ({
            url: `${baseUrl}/properties/${prop.slug}`,
            lastModified: prop.updated_at
              ? new Date(prop.updated_at)
              : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          }),
        );
      }
    } catch (error) {
      console.error("Error fetching sitemap properties:", error);
    }
  }

  // Dynamic blogs
  let blogRoutes: MetadataRoute.Sitemap = [];
  if (supabase) {
    try {
      const { data: blogs } = await supabase.from("blogs").select(`
                    slug, 
                    updated_at,
                    categories (
                        slug
                    )
                `);
      if (blogs) {
        blogRoutes = blogs.map(
          (blog: {
            categories?: { slug: string };
            slug: string;
            updated_at: string | null;
          }) => ({
            url: `${baseUrl}/blogs/${blog.categories?.slug || "news"}/${blog.slug}`,
            lastModified: blog.updated_at
              ? new Date(blog.updated_at)
              : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
          }),
        );
      }
    } catch (error) {
      console.error("Error fetching sitemap blogs:", error);
    }
  }

  return [...routes, ...propertyRoutes, ...blogRoutes];
}
