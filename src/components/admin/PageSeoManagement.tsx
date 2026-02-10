"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Globe, Loader2, Save } from "lucide-react";

interface PageMeta {
    id?: string;
    page_path: string;
    page_name: string;
    meta_title: string;
    meta_description: string;
    keywords: string;
}

const STATIC_PAGES = [
    { name: "Home Page", path: "/" },
    { name: "Properties Listing", path: "/properties" },
    { name: "Blogs Listing", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
];

export function PageSeoManagement() {
    const [pages, setPages] = useState<PageMeta[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchPageMetadata();
    }, []);

    const fetchPageMetadata = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("page_metadata")
                .select("*");

            if (error) {
                if (error.code === "PGRST116" || error.message.includes("does not exist")) {
                    // Table might not exist yet, we'll handle this gracefully
                    setPages(STATIC_PAGES.map(p => ({
                        page_path: p.path,
                        page_name: p.name,
                        meta_title: "",
                        meta_description: "",
                        keywords: ""
                    })));
                } else {
                    throw error;
                }
            } else {
                // Merge static page list with database data
                const mergedPages = STATIC_PAGES.map(staticPage => {
                    const dbPage = data?.find((d: any) => d.page_path === staticPage.path);
                    return {
                        id: dbPage?.id,
                        page_path: staticPage.path,
                        page_name: staticPage.name,
                        meta_title: dbPage?.meta_title || "",
                        meta_description: dbPage?.meta_description || "",
                        keywords: dbPage?.keywords || ""
                    };
                });
                setPages(mergedPages);
            }
        } catch (error) {
            console.error("Error fetching SEO metadata:", error);
            toast.error("Failed to load SEO settings");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (page: PageMeta) => {
        setIsSaving(page.page_path);
        try {
            const payload = {
                page_path: page.page_path,
                meta_title: page.meta_title,
                meta_description: page.meta_description,
                keywords: page.keywords,
                updated_at: new Date().toISOString(),
            };

            let error;
            if (page.id) {
                const { error: updateError } = await supabase
                    .from("page_metadata")
                    .update(payload)
                    .eq("id", page.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("page_metadata")
                    .insert([payload]);
                error = insertError;
            }

            if (error) throw error;

            toast.success(`SEO updated for ${page.page_name}`);
            fetchPageMetadata(); // Refresh to get IDs for new inserts
        } catch (error: any) {
            console.error("Error saving SEO metadata:", error);
            if (error.message?.includes("does not exist")) {
                toast.error("Database table 'page_metadata' not found. Please create it in Supabase.");
            } else {
                toast.error("Failed to save changes");
            }
        } finally {
            setIsSaving(null);
        }
    };

    const handleChange = (path: string, field: keyof PageMeta, value: string) => {
        setPages(prev => prev.map(p =>
            p.page_path === path ? { ...p, [field]: value } : p
        ));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {pages.map((page) => (
                <Card key={page.page_path} className="overflow-hidden border-l-4 border-l-blue-600">
                    <CardHeader className="bg-gray-50/50 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="h-5 w-5 text-gray-400" />
                                {page.page_name}
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    {page.page_path}
                                </span>
                            </CardTitle>
                            <Button
                                size="sm"
                                onClick={() => handleSave(page)}
                                disabled={isSaving === page.page_path}
                                className="bg-blue-600 hover:bg-blue-700 h-8 gap-2"
                            >
                                {isSaving === page.page_path ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Save className="h-3 w-3" />
                                )}
                                Save Settings
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor={`title-${page.page_path}`}>Meta Title</Label>
                            <Input
                                id={`title-${page.page_path}`}
                                value={page.meta_title}
                                onChange={(e) => handleChange(page.page_path, "meta_title", e.target.value)}
                                placeholder="Enter page title for browser tabs and search results"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`desc-${page.page_path}`}>Meta Description</Label>
                            <Textarea
                                id={`desc-${page.page_path}`}
                                value={page.meta_description}
                                onChange={(e) => handleChange(page.page_path, "meta_description", e.target.value)}
                                placeholder="Enter a brief summary of the page for search engines"
                                className="resize-none h-20"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`keywords-${page.page_path}`}>Keywords (Comma separated)</Label>
                            <Input
                                id={`keywords-${page.page_path}`}
                                value={page.keywords}
                                onChange={(e) => handleChange(page.page_path, "keywords", e.target.value)}
                                placeholder="luxury, property, real estate..."
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
