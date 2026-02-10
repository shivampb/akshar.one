import { Metadata } from "next";
import Blogs from "@/components/pages/Blogs";
import { createClient } from "@/prismicio";
import { Blog } from "@/data/blogs";
import * as prismic from "@prismicio/client";
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
      answer: faq.answer // Keep as Rich Text for component to handle, or convert if needed
    })) || [],
  };
}

export default async function BlogsPage() {
  const client = createClient();
  const blogDocs = await client.getAllByType("blog_post", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  const blogs = blogDocs.map(mapPrismicToBlog);

  // Extract unique categories from blogs
  const uniqueCategories = Array.from(new Set(blogs.map(b => b.category)));
  const categories: Category[] = uniqueCategories.map((name, index) => ({
    id: index,
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }));

  return <Blogs initialBlogs={blogs} categories={categories} />;
}
