"use client";

import { useState } from "react";
// import { Helmet } from "react-helmet-async"; // Removed
// import { Layout } from "@/components/layout/Layout"; // Removed
import { BlogCard } from "@/components/BlogCard";
import { Blog } from "@/data/blogs";
import { Button } from "@/components/ui/button";

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface BlogsProps {
    initialBlogs: Blog[];
    categories: Category[];
}

const Blogs = ({ initialBlogs, categories }: BlogsProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredBlogs = selectedCategory === "All"
        ? initialBlogs
        : initialBlogs.filter(blog => blog.category === selectedCategory);

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Blog Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Insights & Perspectives</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore the latest trends in luxury real estate, sustainable living, and modern architecture.
                    </p>
                </div>
            </section>

            {/* Blogs Grid Section */}
            <section className="py-20 bg-background min-h-[50vh]">
                <div className="container mx-auto px-6">

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        <Button
                            variant={selectedCategory === "All" ? "default" : "outline"}
                            onClick={() => setSelectedCategory("All")}
                            className="rounded-full px-6"
                        >
                            All
                        </Button>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.name ? "default" : "outline"}
                                onClick={() => setSelectedCategory(cat.name)}
                                className="rounded-full px-6"
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    {filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {filteredBlogs.map((blog, index) => (
                                <BlogCard key={blog.id} blog={blog} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-serif text-muted-foreground">No insights found in this category.</h3>
                            <Button
                                variant="link"
                                onClick={() => setSelectedCategory("All")}
                                className="mt-4 text-gold"
                            >
                                View all articles
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Blogs;
