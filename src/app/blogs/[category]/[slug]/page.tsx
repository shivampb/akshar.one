// Suspense imported but not used - kept for future async component boundaries
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetails from "@/components/pages/BlogDetails";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/data/blogs";

async function getBlog(slug: string) {
  if (!supabase) return null;

  let queryBuilder = supabase.from("blogs").select(`
          *,
          categories (
              name
          )
      `);

  // Check if it's purely numeric, might be an ID
  if (/^\d+$/.test(slug)) {
    queryBuilder = queryBuilder.or(`id.eq.${slug},slug.eq.${slug}`);
  } else {
    queryBuilder = queryBuilder.eq("slug", slug);
  }

  const { data, error } = await queryBuilder.single();

  if (error || !data) {
    // console.error("Error fetching blog:", error);
    return null;
  }

  const mappedBlog: Blog = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.categories?.name || "Uncategorized",
    date: new Date(data.created_at).toLocaleDateString(),
    image: data.image_url,
    author: data.author || "Admin",
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    keywords: data.keywords,
  };

  return mappedBlog;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.meta_title || `${blog.title} | Real Estate Insights`,
    description: blog.meta_description || blog.excerpt,
    keywords: blog.keywords,
    openGraph: {
      type: "article",
      title: blog.meta_title || `${blog.title} | Real Estate Insights`,
      description: blog.meta_description || blog.excerpt,
      images: [blog.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
}
