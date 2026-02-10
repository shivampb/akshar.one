"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { BlogManager } from "@/components/admin/BlogManager";
import { BlogDialog } from "@/components/admin/BlogDialog";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/data/blogs";
import { useParams } from "next/navigation";

export default function BlogsManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const params = useParams();
  const autoOpenRef = useRef(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase()) ||
          blog.category.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [search, blogs]);

  // Auto-open dialog based on URL (Only on initial load/mount)
  useEffect(() => {
    if (blogs.length === 0 || autoOpenRef.current) return;

    const id = params?.id;
    if (id) {
      const blog = blogs.find((b) => String(b.id) === String(id));
      if (blog) {
        setEditingBlog(blog);
        setIsDialogOpen(true);
        autoOpenRef.current = true; // Prevent re-triggering if we stay on this page
      }
    }
  }, [params, blogs]);

  async function fetchBlogs() {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
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

      if (error) throw error;

      const mappedBlogs: Blog[] = (data || []).map(
        (item: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          categories?: { name: string };
          created_at: string;
          image_url: string;
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
          meta_title: item.meta_title,
          meta_description: item.meta_description,
          keywords: item.keywords,
        }),
      );

      setBlogs(mappedBlogs);
      setFilteredBlogs(mappedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    if (!supabase) return;

    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;

      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  }

  function handleEdit(blog: Blog) {
    setEditingBlog(blog);
    setIsDialogOpen(true);
    window.history.pushState(null, "", `/admin/blogs/edit/${blog.id}`);
  }

  function handleAdd() {
    setEditingBlog(null);
    setIsDialogOpen(true);
    window.history.pushState(null, "", `/admin/blogs/add`);
  }

  function handleDialogClose(open: boolean) {
    setIsDialogOpen(open);
    if (!open) {
      setEditingBlog(null);
      window.history.pushState(null, "", `/admin/blogs`);
    }
  }

  function handleSuccess() {
    handleDialogClose(false);
    fetchBlogs();
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            <p className="text-gray-600 mt-1">
              Create and manage your blog content
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Blogs List */}
        <Card className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          ) : (
            <BlogManager
              blogs={filteredBlogs}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </Card>

        <BlogDialog
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
          editingBlog={editingBlog}
          onSuccess={handleSuccess}
        />
      </div>
    </AdminLayout>
  );
}
