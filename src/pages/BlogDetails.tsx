import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Calendar, User, Clock, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/data/blogs";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) {
            fetchBlog(slug);
        }
    }, [slug]);

    const fetchBlog = async (slugOrId: string) => {
        setIsLoading(true);

        // Try to fetch by slug first, or ID as fallback if it looks like a number (for legacy)
        // But since we are using 'slug' param, we mainly search by valid slug.
        // For robustness, let's query where slug matches OR id matches (if numeric)

        let queryBuilder = supabase
            .from('blogs')
            .select(`
                *,
                categories (
                    name
                )
            `);

        // Check if it's purely numeric, might be an ID
        if (/^\d+$/.test(slugOrId)) {
            queryBuilder = queryBuilder.or(`id.eq.${slugOrId},slug.eq.${slugOrId}`);
        } else {
            queryBuilder = queryBuilder.eq('slug', slugOrId);
        }

        const { data, error } = await queryBuilder.single();

        if (error) {
            console.error("Error fetching blog:", error);
        } else if (data) {
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
            setBlog(mappedBlog);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
            </Layout>
        );
    }

    if (!blog) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif mb-4">Blog Post Not Found</h1>
                        <Link to="/blogs" className="text-gold hover:underline">
                            Return to Insights
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Helmet>
                <title>{blog.meta_title || blog.title} | Real Estate Insights</title>
                <meta name="title" content={`${blog.meta_title || blog.title} | Real Estate Insights`} />
                <meta name="description" content={blog.meta_description || blog.excerpt} />
                <meta name="keywords" content={blog.keywords || "real estate, luxury homes, investment, property trends"} />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={blog.meta_title || blog.title} />
                <meta property="og:description" content={blog.meta_description || blog.excerpt} />
                <meta property="og:image" content={blog.image} />
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={blog.meta_title || blog.title} />
                <meta property="twitter:description" content={blog.meta_description || blog.excerpt} />
                <meta property="twitter:image" content={blog.image} />
            </Helmet>

            <article className="min-h-screen bg-background pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-5xl pt-24 md:pt-32">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/blogs" className="hover:text-gold transition-colors">Communication Corner</Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">{blog.category}</span>
                        <span className="mx-2">/</span>
                        <span className="text-foreground truncate max-w-[200px]">{blog.title}</span>
                    </nav>

                    {/* Header Section */}
                    <div className="mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight"
                        >
                            {blog.title}
                        </motion.h1>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span>{blog.date}</span>
                                    <span>in</span>
                                    <span className="font-medium text-foreground">{blog.category}</span>
                                </div>
                                <div className="hidden md:flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span>By {blog.author}</span>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-lg md:prose-xl prose-stone mx-auto
                            prose-headings:font-sans prose-headings:font-bold prose-headings:text-foreground
                            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-normal
                            prose-strong:text-foreground prose-strong:font-bold
                            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                            marker:text-gold"
                        >
                            <ReactMarkdown>{blog.content}</ReactMarkdown>
                        </motion.div>

                        {/* Footer with Tags/Share (Optional) */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <Link
                                to="/blogs"
                                className="inline-flex items-center gap-2 text-gold hover:underline font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to All Insights
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogDetails;
