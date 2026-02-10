import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";

export async function getPageMetadata(path: string): Promise<Metadata> {
    const client = createClient();
    let prismicUid = path === "/" ? "home" : path.replace(/^\//, "");

    // Handle special paths if needed, e.g. /properties -> "properties"
    // Assuming pages are named by their path slug

    try {
        // Try fetching from Prismic first as primary source
        const page = await client.getByUID("page", prismicUid).catch(() => null);

        if (page && page.data) {
            return {
                title: page.data.meta_title || undefined,
                description: page.data.meta_description || undefined,
                openGraph: {
                    title: page.data.meta_title || undefined,
                    description: page.data.meta_description || undefined,
                    images: prismic.isFilled.image(page.data.meta_image) ? [page.data.meta_image.url || ""] : [],
                }
            };
        }
    } catch (e) {
        // Continue to Supabase fallback
        console.warn(`Prismic metadata fetch failed for ${prismicUid}, falling back to Supabase/Defaults.`);
    }

    if (!supabase) return {};

    try {
        const { data, error } = await supabase
            .from("page_metadata")
            .select("*")
            .eq("page_path", path)
            .single();

        if (error || !data) {
            return {};
        }

        return {
            title: data.meta_title,
            description: data.meta_description,
            keywords: data.keywords,
            openGraph: {
                title: data.meta_title,
                description: data.meta_description,
            }
        };
    } catch (error) {
        console.error(`Error fetching metadata for ${path}:`, error);
        return {};
    }
}
