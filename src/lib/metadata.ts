import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

export async function getPageMetadata(path: string): Promise<Metadata> {
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
