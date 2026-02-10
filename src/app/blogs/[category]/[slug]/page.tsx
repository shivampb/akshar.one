import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetails from "@/components/pages/BlogDetails";
import { createClient } from "@/prismicio";
import { Blog } from "@/data/blogs";
import * as prismic from "@prismicio/client";

type Params = { slug: string; category: string };

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
    faqs: data.faqs?.map((faq: any) => ({
      question: faq.question || "",
      answer: faq.answer
    })) || [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = createClient();
  const blogDoc = await client.getByUID("blog_post", slug).catch(() => null);

  if (!blogDoc) {
    return {
      title: "Blog Not Found",
    };
  }

  const blog = mapPrismicToBlog(blogDoc);

  return {
    title: blog.meta_title || `${blog.title} | Real Estate Insights`,
    description: blog.meta_description || blog.excerpt,
    keywords: blog.keywords,
    openGraph: {
      type: "article",
      title: blog.meta_title || `${blog.title} | Real Estate Insights` || undefined,
      description: blog.meta_description || blog.excerpt || undefined,
      images: [blog.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const client = createClient();

  const blogDoc = await client.getByUID("blog_post", slug).catch(() => null);

  if (!blogDoc) {
    notFound();
  }

  const blog = mapPrismicToBlog(blogDoc);

  return <BlogDetails blog={blog} />;
}

export async function generateStaticParams() {
  const client = createClient();
  const blogs = await client.getAllByType("blog_post");

  return blogs.map((blog) => {
    // We need to match the URL structure: /blogs/[category]/[slug]
    // Note: If the category in Prismic changes, the URL changes.
    // Ideally we should slugify the category.
    const category = blog.data.category
      ? blog.data.category.toLowerCase().replace(/\s+/g, '-')
      : 'uncategorized';

    return {
      slug: blog.uid,
      category: category
    };
  });
}
