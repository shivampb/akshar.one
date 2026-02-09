import { useState, useEffect } from "react";
import { Property } from "@/data/properties";
import { Blog } from "@/data/blogs";
import { supabase } from "@/lib/supabase";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, LogOut, LayoutDashboard, FileText } from "lucide-react";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { PropertyList } from "@/components/admin/PropertyList";
import { PropertyDialog } from "@/components/admin/PropertyDialog";
import { BlogManager } from "@/components/admin/BlogManager";
import { BlogDialog } from "@/components/admin/BlogDialog";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Property State
    const [properties, setProperties] = useState<Property[]>([]);
    const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);

    // Blog State
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [activeTab, setActiveTab] = useState("properties");

    useEffect(() => {
        if (isAuthenticated) {
            fetchProperties();
            fetchBlogs();
        }
    }, [isAuthenticated]);

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
                author: item.author || "Admin"
            }));
            setBlogs(mappedBlogs);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
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

    const handleDeleteBlog = async (id: number) => {
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
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 pt-24 min-h-[calc(100vh-80px)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your website content and listings.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>

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

                        {activeTab === "properties" ? (
                            <Button onClick={startAddProperty} className="gap-2">
                                <Plus className="h-4 w-4" /> Add Property
                            </Button>
                        ) : (
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
                    onOpenChange={setIsPropertyDialogOpen}
                    editingProperty={editingProperty}
                    onSuccess={handlePropertyDialogSuccess}
                />

                <BlogDialog
                    open={isBlogDialogOpen}
                    onOpenChange={setIsBlogDialogOpen}
                    editingBlog={editingBlog}
                    onSuccess={handleBlogDialogSuccess}
                />
            </div>
        </Layout>
    );
};

export default Admin;
