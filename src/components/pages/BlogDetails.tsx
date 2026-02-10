"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { PrismicRichText } from "@prismicio/react";
import { Blog } from "@/data/blogs";

interface BlogDetailsProps {
    blog: Blog;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif mb-4">Blog Post Not Found</h1>
                    <Link href="/blogs" className="text-gold hover:underline">
                        Return to Insights
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl pt-24 md:pt-32">

                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blogs" className="hover:text-gold transition-colors">Communication Corner</Link>
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

                        <button
                            onClick={async () => {
                                try {
                                    if (navigator.share) {
                                        await navigator.share({
                                            title: blog.title,
                                            text: blog.excerpt,
                                            url: window.location.href,
                                        });
                                    } else {
                                        await navigator.clipboard.writeText(window.location.href);
                                        alert("Link copied to clipboard!");
                                    }
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
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
                        className="prose prose-lg md:prose-xl prose-stone mx-auto"
                    >
                        {/* We use a div to wrap formatted content if it's already HTML string from mapPrismicToBlog */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </motion.div>

                    {/* FAQs Section */}
                    {blog.faqs && blog.faqs.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-border">
                            <h2 className="text-2xl font-serif font-bold mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {blog.faqs.map((faq, index) => (
                                    <div key={index} className="border border-border rounded-lg overflow-hidden">
                                        <details className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 bg-secondary/20 hover:bg-secondary/40 transition-colors">
                                                <span>{faq.question}</span>
                                                <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                                </span>
                                            </summary>
                                            <div className="text-muted-foreground p-4 bg-background border-t border-border prose prose-sm max-w-none">
                                                {/* Use PrismicRichText for the answer if it's structured text, or simple render if it's text. 
                                                    Since we mapped it as 'any' in blogs.ts but it comes from Prismic Group StructuredText, 
                                                    we should treat it as Rich Text. */}
                                                <PrismicRichText field={faq.answer} />
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer with Tags/Share (Optional) */}
                    <div className="mt-16 pt-8 border-t border-border">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-gold hover:underline font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Insights
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetails;
