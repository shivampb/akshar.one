import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BlogCard } from "@/components/BlogCard";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/data/blogs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
    id: number;
    name: string;
    slug: string;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        if (!supabase) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            // Fetch Categories
            const { data: categoriesData } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (categoriesData) {
                setCategories(categoriesData);
            }

            // Fetch Blogs
            await fetchBlogs();

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBlogs = async (categoryName?: string) => {
        if (!supabase) return;
        let query = supabase
            .from('blogs')
            .select(`
                *,
                categories (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        // If categoryName is provided and not "All", filter
        // Note: filtering by joined column is tricky in simple syntax, usually easier to filter by category_id if we had it.
        // Or we can filter payload in JS.
        // But better to use !inner join to filter.

        // For simplicity, let's just fetch all and filter in JS for this demo, 
        // unless we want to do a proper filtered query which requires knowing category ID or using inner join.
        // Let's rely on finding category ID from the list.

        // If we want to filter by category name:
        if (categoryName && categoryName !== "All") {
            // Find category ID
            // The categories state might not be set yet if we call this directly, but it is set in fetchInitialData.
            // But valid point.
            // Let's simple filter client side for now as it's cleaner for "All" view anyway.
        }

        const { data, error } = await query;
        if (error) {
            console.error("Error fetching blogs:", error);
            return;
        }

        const mappedBlogs: Blog[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            content: item.content,
            category: item.categories?.name || "Uncategorized",
            date: new Date(item.created_at).toLocaleDateString(),
            image: item.image_url,
            author: item.author || "Admin"
        }));

        setBlogs(mappedBlogs);
    };

    const filteredBlogs = selectedCategory === "All"
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    return (
        <Layout>
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

                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="w-8 h-8 animate-spin text-gold" />
                        </div>
                    ) : filteredBlogs.length > 0 ? (
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
        </Layout>
    );
};

export default Blogs;
