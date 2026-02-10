"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Property } from "@/data/properties";
import { Blog } from "@/data/blogs";
import { supabase } from "@/lib/supabase";
// import { Layout } from "@/components/layout/Layout"; // Removed
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, LogOut, LayoutDashboard, FileText } from "lucide-react";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { PropertyList } from "@/components/admin/PropertyList";
import { PropertyDialog } from "@/components/admin/PropertyDialog";
import { BlogManager } from "@/components/admin/BlogManager";
import { BlogDialog } from "@/components/admin/BlogDialog";
import { PageSeoManagement } from "@/components/admin/PageSeoManagement";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAdminAuthenticated") === "true";
        setIsAuthenticated(isAuth);
    }, []);

    // Property State
    const [properties, setProperties] = useState<Property[]>([]);
    const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    // Blog State
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [activeTab, setActiveTab] = useState("properties");

    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            fetchProperties();
            fetchBlogs();
        }
    }, [isAuthenticated]);

    // Handle Auto-opening Dialogs based on URL
    useEffect(() => {
        if (!isAuthenticated || properties.length === 0 && blogs.length === 0) return;

        const id = params?.id;

        if (pathname.includes('/properties/edit/') && id) {
            const prop = properties.find(p => String(p.id) === String(id));
            if (prop) startEditProperty(prop);
        } else if (pathname.includes('/properties/add')) {
            startAddProperty();
        } else if (pathname.includes('/blogs/edit/') && id) {
            const blog = blogs.find(b => String(b.id) === String(id));
            if (blog) startEditBlog(blog);
        } else if (pathname.includes('/blogs/add')) {
            startAddBlog();
        }
    }, [isAuthenticated, pathname, params, properties, blogs]);

    const fetchProperties = async () => {
        const { data, error } = await supabase.from('properties').select('*');
        if (error) {
            console.error("Error fetching properties:", error);
        } else {
            setProperties(data as Property[]);
        }
    };

    const fetchBlogs = async () => {
        const { data, error } = await supabase
            .from('blogs')
            .select(`
                *,
                categories (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching blogs:", error);
        } else {
            // Map Supabase response to Blog interface
            const mappedBlogs: Blog[] = data.map((item: any) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                excerpt: item.excerpt,
                content: item.content,
                category: item.categories?.name || "Uncategorized",
                date: new Date(item.created_at).toLocaleDateString(),
                image: item.image_url,
                author: item.author || "Admin",
                meta_title: item.meta_title,
                meta_description: item.meta_description,
                keywords: item.keywords
            }));
            setBlogs(mappedBlogs);
        }
    };

    // Handlers to go back when dialog is closed
    const onPropertyDialogOpenChange = (open: boolean) => {
        setIsPropertyDialogOpen(open);
        if (!open && (pathname.includes('/properties/edit/') || pathname.includes('/properties/add'))) {
            router.push('/admin/properties');
        }
    };

    const onBlogDialogOpenChange = (open: boolean) => {
        setIsBlogDialogOpen(open);
        if (!open && (pathname.includes('/blogs/edit/') || pathname.includes('/blogs/add'))) {
            router.push('/admin/blogs');
        }
    };

    // Property Handlers
    const startEditProperty = (property: Property) => {
        setEditingProperty(property);
        setIsPropertyDialogOpen(true);
    };

    const startAddProperty = () => {
        setEditingProperty(null);
        setIsPropertyDialogOpen(true);
    };

    const handleDeleteProperty = async (id: string) => {
        if (confirm("Are you sure you want to delete this property?")) {
            const { error } = await supabase.from('properties').delete().eq('id', id);
            if (error) {
                toast.error("Failed to delete property");
            } else {
                toast.success("Property deleted");
                fetchProperties();
            }
        }
    };

    const handlePropertyDialogSuccess = () => {
        setIsPropertyDialogOpen(false);
        setEditingProperty(null);
        fetchProperties();
        if (pathname.includes('/properties/edit/') || pathname.includes('/properties/add')) {
            router.push('/admin/properties');
        }
    };

    // Blog Handlers
    const startEditBlog = (blog: Blog) => {
        setEditingBlog(blog);
        setIsBlogDialogOpen(true);
    };

    const startAddBlog = () => {
        setEditingBlog(null);
        setIsBlogDialogOpen(true);
    };

    const handleDeleteBlog = async (id: number | string) => {
        if (confirm("Are you sure you want to delete this blog post?")) {
            const { error } = await supabase.from('blogs').delete().eq('id', id);
            if (error) {
                toast.error("Failed to delete blog");
            } else {
                toast.success("Blog deleted");
                fetchBlogs();
            }
        }
    };

    const handleBlogDialogSuccess = () => {
        setIsBlogDialogOpen(false);
        setEditingBlog(null);
        fetchBlogs();
    };

    if (!isAuthenticated) {
        return null; // AdminLayout handles the redirect
    }

    return (
        <div className="space-y-6">

            <Tabs defaultValue="properties" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="properties" className="gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Properties
                        </TabsTrigger>
                        <TabsTrigger value="blogs" className="gap-2">
                            <FileText className="h-4 w-4" /> Blog Posts
                        </TabsTrigger>
                    </TabsList>

                    {activeTab === "properties" && (
                        <Button onClick={startAddProperty} className="gap-2">
                            <Plus className="h-4 w-4" /> Add Property
                        </Button>
                    )}
                    {activeTab === "blogs" && (
                        <Button onClick={startAddBlog} className="gap-2">
                            <Plus className="h-4 w-4" /> New Post
                        </Button>
                    )}
                </div>

                <TabsContent value="properties" className="space-y-4">
                    <PropertyList
                        properties={properties}
                        onEdit={startEditProperty}
                        onDelete={handleDeleteProperty}
                    />
                </TabsContent>

                <TabsContent value="blogs" className="space-y-4">
                    <BlogManager
                        blogs={blogs}
                        onEdit={startEditBlog}
                        onDelete={handleDeleteBlog}
                    />
                </TabsContent>
            </Tabs>

            <PropertyDialog
                open={isPropertyDialogOpen}
                onOpenChange={onPropertyDialogOpenChange}
                editingProperty={editingProperty}
                onSuccess={handlePropertyDialogSuccess}
            />

            <BlogDialog
                open={isBlogDialogOpen}
                onOpenChange={onBlogDialogOpenChange}
                editingBlog={editingBlog}
                onSuccess={handleBlogDialogSuccess}
            />
        </div>
    );
};

export default Admin;
