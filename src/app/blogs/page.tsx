import { Metadata } from "next";
import Blogs from "@/components/pages/Blogs";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/data/blogs";

import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const dynamicMetadata = await getPageMetadata("/blogs");

  return {
    title:
      dynamicMetadata.title || "Real Estate Insights & News | Akshar One Blog",
    description:
      dynamicMetadata.description ||
      "Stay updated with the latest luxury real estate trends, market insights, and property news on the Akshar One blog.",
    keywords:
      dynamicMetadata.keywords ||
      "real estate blog, luxury property news, property investment tips, real estate trends, akshar one insights",
    openGraph: {
      title:
        dynamicMetadata.title ||
        "Real Estate Insights & News | Akshar One Blog",
      description:
        dynamicMetadata.description ||
        "Stay updated with the latest luxury real estate trends, market insights, and property news on the Akshar One blog.",
    },
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

async function getCategories() {
  if (!supabase) return [];

  const { data } = await supabase.from("categories").select("*").order("name");

  return (data || []) as Category[];
}

async function getBlogs() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
          *,
          categories (
              name
          )
      `,
    )
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching blogs:", error);
    return [];
  }

  // Map to Blog interface
  const mappedBlogs: Blog[] = data.map(
    (item: {
      id: string;
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      categories?: { name: string };
      created_at: string;
    }) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      category: item.categories?.name || "Uncategorized",
      date: new Date(item.created_at).toLocaleDateString(),
      image: item.image_url,
      author: item.author || "Admin",
    }),
  );

  return mappedBlogs;
}

export default async function BlogsPage() {
  const [categories, blogs] = await Promise.all([getCategories(), getBlogs()]);

  return <Blogs initialBlogs={blogs} categories={categories} />;
}
