import { useState, useEffect } from "react";
import { Blog } from "@/data/blogs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface BlogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingBlog: Blog | null;
    onSuccess: () => void;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

export const BlogDialog = ({ open, onOpenChange, editingBlog, onSuccess }: BlogDialogProps) => {
    // Content State
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [author, setAuthor] = useState("");

    // SEO State
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [keywords, setKeywords] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
    const [activeTab, setActiveTab] = useState("content");

    useEffect(() => {
        if (open) {
            fetchCategories();
            setActiveTab("content");
            if (editingBlog) {
                setTitle(editingBlog.title);
                setContent(editingBlog.content);
                setExcerpt(editingBlog.excerpt);
                setCategory(editingBlog.category);
                setImageUrl(editingBlog.image);
                setAuthor(editingBlog.author);
                setMetaTitle(editingBlog.meta_title || "");
                setMetaDescription(editingBlog.meta_description || "");
                setKeywords(editingBlog.keywords || "");
            } else {
                resetForm();
            }
        }
    }, [open, editingBlog]);

    const fetchCategories = async () => {
        const { data, error } = await supabase.from('categories').select('*');
        if (!error && data) {
            setCategories(data);
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setExcerpt("");
        setCategory("");
        setNewCategory("");
        setImageUrl("");
        setAuthor("");
        setImageFile(null);
        setMetaTitle("");
        setMetaDescription("");
        setKeywords("");
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setImageUrl(url);
        }
    };

    const uploadImage = async (file: File) => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            const fileExt = compressedFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, compressedFile);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    const handleCategoryHandling = async () => {
        if (category === "new" && newCategory) {
            const slug = newCategory.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const { data, error } = await supabase
                .from('categories')
                .insert([{ name: newCategory, slug }])
                .select()
                .single();

            if (error) {
                toast.error("Failed to create category");
                return null;
            }
            return data.id;
        }

        const existing = categories.find(c => c.name === category);
        return existing ? existing.id : null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl;
            if (imageFile) {
                finalImageUrl = await uploadImage(imageFile);
            }

            const categoryId = await handleCategoryHandling();
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const blogData = {
                title,
                slug,
                content,
                excerpt,
                image_url: finalImageUrl,
                category_id: categoryId,
                author,
                published: true,
                meta_title: metaTitle,
                meta_description: metaDescription,
                keywords: keywords
            };

            if (editingBlog) {
                const { error } = await supabase
                    .from('blogs')
                    .update(blogData)
                    .eq('id', editingBlog.id);
                if (error) throw error;
                toast.success("Blog updated successfully");
            } else {
                const { error } = await supabase
                    .from('blogs')
                    .insert([blogData]);
                if (error) throw error;
                toast.success("Blog created successfully");
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((c) => (
                                                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                                ))}
                                                <SelectItem value="new">+ Add New Category</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {category === "new" && (
                                            <Input
                                                placeholder="New Category Name"
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value)}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="author">Author <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="author"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image">Featured Image</Label>
                                        <div className="flex items-center gap-4">
                                            {imageUrl && (
                                                <img src={imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded" />
                                            )}
                                            <div className="flex-1">
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="cursor-pointer"
                                                />
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Images will be compressed automatically before upload.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt <span className="text-destructive">*</span></Label>
                                        <Textarea
                                            id="excerpt"
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            rows={3}
                                            required
                                            placeholder="Short summary for preview cards..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Content (Markdown) <span className="text-destructive">*</span></Label>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Button
                                                type="button"
                                                variant={viewMode === 'edit' ? 'default' : 'ghost'}
                                                size="sm"
                                                onClick={() => setViewMode('edit')}
                                            >
                                                Write
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={viewMode === 'preview' ? 'default' : 'ghost'}
                                                size="sm"
                                                onClick={() => setViewMode('preview')}
                                            >
                                                Preview
                                            </Button>
                                        </div>

                                        {viewMode === 'edit' ? (
                                            <Textarea
                                                id="content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="font-mono min-h-[300px]"
                                                placeholder="# Write your blog content here..."
                                                required
                                            />
                                        ) : (
                                            <div className="border rounded-md p-4 min-h-[300px] prose prose-sm max-w-none dark:prose-invert overflow-y-auto bg-muted/50">
                                                <ReactMarkdown>{content}</ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="seo" className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
                                        placeholder="SEO optimized title (defaults to blog title)"
                                    />
                                    <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={metaDescription}
                                        onChange={(e) => setMetaDescription(e.target.value)}
                                        placeholder="SEO description for search results"
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        placeholder="Comma separated keywords (e.g. real estate, investment, luxury)"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editingBlog ? "Update Blog" : "Create Blog"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
